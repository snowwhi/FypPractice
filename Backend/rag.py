import faiss, json
import numpy as np
from sentence_transformers import SentenceTransformer
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

print("⏳ Loading FAISS index...")
index = faiss.read_index('/home/khadija/Desktop/RagPractice/DataBase/Embedding/faiss_index.bin')

print("⏳ Loading chunks...")
with open('/home/khadija/Desktop/RagPractice/DataBase/Embedding/chunks_store.json', 'r') as f:
    chunks = json.load(f)

print("⏳ Loading embedding model...")
embed_model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

print("✅ RAG pipeline ready!")

def retrieve(query: str, top_k: int = 5):
    query_vec = embed_model.encode([query], convert_to_numpy=True)
    distances, indices = index.search(query_vec, top_k)
    results = []
    for dist, idx in zip(distances[0], indices[0]):
        chunk = chunks[idx]
        results.append({
            "id"     : chunk['id'],
            "title"  : chunk['metadata']['title'],
            "genre"  : chunk['metadata']['genre'],
            "content": chunk['text'],
            "score"  : round(float(dist), 4)
        })
    return results

def rag_answer(user_query: str):
    retrieved = retrieve(user_query, top_k=5)
    context = ""
    for i, doc in enumerate(retrieved):
        context += f"\n[{i+1}] {doc['content']}\n"

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a helpful Netflix recommendation assistant. "
                    "Use the provided context to give friendly conversational "
                    "recommendations. Always mention the title and why it matches."
                )
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nUser question: {user_query}"
            }
        ],
        temperature=0.7,
        max_tokens=500
    )

    return {
        "answer" : response.choices[0].message.content,
        "sources": retrieved
    }

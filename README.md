# 🎬 CineBot — AI-Powered Netflix Recommendation Assistant

A RAG-powered conversational assistant that recommends Netflix shows and movies based on natural-language questions, backed by a vector search engine over real show data.

> "Stop scrolling. Start watching." — Our neural engine maps your taste to thousands of titles in seconds.

---

## 📋 Overview

CineBot lets users describe what they're in the mood to watch — by genre, vibe, or specific preferences — and get conversational, source-grounded recommendations instead of generic search results. Rather than relying on a hardcoded recommendation list, it uses Retrieval-Augmented Generation (RAG) to search a vector database of show data and ground every recommendation in actual content, then explains *why* each title matches.

---

## ✨ Features

- **Landing page** with hero section, "Why Us," and about sections introducing the product
- **Conversational chat interface** for asking natural-language questions like *"recommend something funny but not too long"*
- **RAG-grounded answers** — recommendations are retrieved from real show data via vector similarity search, not hallucinated by the LLM
- **Source transparency** — each response includes the retrieved shows (title, genre, content) backing the recommendation
- **Markdown-rendered responses** for clean formatting of AI answers in the chat
- **Login flow** for a personalized chat experience
- **Show lookup** by ID for retrieving full details on a specific title

---

## ⚙️ How It Works

```
User Question
      ↓
Convert to Vector Embedding (sentence-transformers)
      ↓
Search FAISS Vector Index of Show Data
      ↓
Retrieve Top 5 Most Relevant Shows
      ↓
Feed Shows + Question to LLM (Llama 3.3 70B via Groq)
      ↓
Generate Friendly, Source-Grounded Recommendation
      ↓
Display in Chat with Markdown Formatting
```

This is a **RAG (Retrieval-Augmented Generation)** architecture — it grounds the AI's recommendations in actual show data rather than letting the model rely solely on its own (potentially outdated or hallucinated) knowledge.

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion |
| **Backend** | Python, FastAPI |
| **Vector Search** | FAISS |
| **Embeddings** | sentence-transformers (all-MiniLM-L6-v2) |
| **LLM** | Llama 3.3 70B via Groq API |
| **Database** | MongoDB (show metadata) |
| **Testing** | Vitest, React Testing Library |

---

## 📁 Project Structure

```
FypPractice/
├── Backend/
│   ├── main.py          # FastAPI app & routes
│   ├── rag.py           # RAG pipeline: retrieval + generation
│   └── database.py      # MongoDB show lookups
│
├── DataBase/
│   ├── Embedding/       # FAISS index + chunked show data
│   └── mongo/           # MongoDB data
│
├── Colab/
│   └── Review.ipynb     # Experimentation / data prep notebook
│
└── Frontend/
    └── src/
        ├── pages/        # Index, ChatPage, LoginPage
        └── components/   # Hero, Navbar, Footer, About, Why Us
```

---

## 🚀 Getting Started

### Backend
```bash
cd Backend
pip install fastapi uvicorn pymongo sentence-transformers faiss-cpu groq python-dotenv
uvicorn main:app --reload
```

Create a `.env` file in `Backend/` with:
```
MONGO_URI=
GROQ_API_KEY=
```

> **Note:** `rag.py` currently loads the FAISS index and chunk data from a hardcoded local path. Update these to relative paths (e.g. `./DataBase/Embedding/...`) before running on another machine.

### Frontend
```bash
cd Frontend
pnpm install
pnpm dev
```

---

## 📄 License

Built as a final year project. Open to discussing the architecture or extending it further.

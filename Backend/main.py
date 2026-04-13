from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rag import rag_answer
from database import get_show_by_id

app = FastAPI(title="Netflix RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.get("/")
def root():
    return {"status": "Netflix RAG API is running ✅"}

@app.post("/ask")
def ask(request: QueryRequest):
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    return rag_answer(request.query)

@app.get("/show/{show_id}")
def get_show(show_id: str):
    show = get_show_by_id(show_id)
    if not show:
        raise HTTPException(status_code=404, detail="Show not found")
    show["_id"] = str(show["_id"])
    return show

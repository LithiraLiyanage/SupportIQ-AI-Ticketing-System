from fastapi import FastAPI
from .schemas import TicketInput
from .analyzer import analyze_ticket
app=FastAPI(title="SupportIQ AI Service")
@app.get("/")
def root(): return {"message":"SupportIQ AI service is running"}
@app.post("/analyze-ticket")
def analyze(payload: TicketInput): return analyze_ticket(payload.title, payload.description)

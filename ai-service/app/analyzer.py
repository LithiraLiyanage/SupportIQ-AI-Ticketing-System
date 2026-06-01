from .rules import analyze_text
def analyze_ticket(title: str, description: str):
    return analyze_text(title, description)

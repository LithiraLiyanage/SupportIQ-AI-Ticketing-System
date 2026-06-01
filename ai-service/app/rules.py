def analyze_text(title: str, description: str):
    text=f"{title} {description}".lower()
    priority="low"
    if any(w in text for w in ["account hacked","security issue","data loss","production outage","system down","cannot access account"]): priority="critical"
    elif any(w in text for w in ["billing error","login problem","broken feature","major bug","blocked","urgent"]): priority="high"
    elif any(w in text for w in ["slow","configuration","invoice","product issue"]): priority="medium"
    category="General Inquiry"
    if any(w in text for w in ["payment","billing","invoice","refund"]): category="Billing"
    elif any(w in text for w in ["login","password","account","access","hacked"]): category="Account Access"
    elif any(w in text for w in ["bug","error","crash","broken"]): category="Bug Report"
    elif any(w in text for w in ["feature","request","enhancement"]): category="Feature Request"
    sentiment="Neutral"
    if any(w in text for w in ["angry","furious","terrible","worst"]): sentiment="Angry"
    elif any(w in text for w in ["urgent","immediately","asap","critical"]): sentiment="Urgent"
    elif any(w in text for w in ["bad","failed","problem","issue","broken"]): sentiment="Negative"
    tags=list(set([tag for tag in ["login","billing","bug","refund","account","urgent","api","feature"] if tag in text]))
    return {"aiSuggestedCategory":category,"aiSuggestedPriority":priority,"sentiment":sentiment,"aiSummary":description.split('.')[0][:220] if description else title,"aiTags":tags,"recommendedTone":"Empathetic and urgent" if priority=="critical" or sentiment=="Angry" else "Professional and helpful"}

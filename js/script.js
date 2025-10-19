
fetch("https://formspree.io/f/xrbydqrw", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    visitor_id: Math.random().toString(36).substring(2, 8),
    user_agent: navigator.userAgent,
    language: navigator.language,
    timestamp: new Date().toISOString(),
  })
});


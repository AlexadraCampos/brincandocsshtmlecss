
// função simples para extrair navegador e sistema do userAgent
function parseUserAgent(ua) {
  ua = ua || navigator.userAgent;
  const info = { browser: 'Desconhecido', os: 'Desconhecido', device: 'Desconhecido' };

  if (/OPR\/|Opera/.test(ua)) info.browser = 'Opera';
  else if (/Edg\//.test(ua)) info.browser = 'Edge';
  else if (/Chrome\//.test(ua)) info.browser = 'Chrome';
  else if (/Firefox\//.test(ua)) info.browser = 'Firefox';
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) info.browser = 'Safari';

  const osMatch = ua.match(/\(([^)]+)\)/);
  if (osMatch) {
    const parts = osMatch[1].split(';').map(s => s.trim());
    info.os = parts[0] || info.os;
    if (parts.length > 1) info.device = parts.slice(1).join(' / ');
  }

  return info;
}

// obtenha o nome (ou deixe vazio) — adicione um campo <input id="name"> no seu formulário
const name = (document.getElementById('name') && document.getElementById('name').value) || 'anônimo';

// parse do userAgent
const uaInfo = parseUserAgent(navigator.userAgent);

// formate a hora para America/Sao_Paulo
const utcDate = new Date(); // ou use a data que queira converter
const localString = utcDate.toLocaleString('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
});

// enviar para Formspree
fetch("https://formspree.io/f/xrbydqrw", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    visitor_id: Math.random().toString(36).substring(2, 8),
    name: name,
    user_agent: navigator.userAgent,
    browser: uaInfo.browser,
    os: uaInfo.os,
    device: uaInfo.device,
    language: navigator.language,
    timestamp_utc: new Date().toISOString(),
    timestamp_sao_paulo: localString
  })
});
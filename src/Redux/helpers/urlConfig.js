const baseURL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : 'https://vespi-server.onrender.com'
export const API = `${baseURL}/api`

// API endpoint configuration
// On web/simulator: use localhost
// On physical device: use your machine's LAN IP (e.g., 192.168.x.x)

export const API_BASE_URL = __DEV__ 
  ? 'http://192.168.88.15:5000'  // Change 192.168.1.100 to your actual machine LAN IP
  : 'https://your-production-api.com';

// Usage: fetch(`${API_BASE_URL}/api/gemini`, {...})

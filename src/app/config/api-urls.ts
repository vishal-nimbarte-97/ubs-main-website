export const API_BASE_URL = 'http://ubsapi.xplorelogic.in/api';
export const API_BASE_URL_LOCAL = 'https://localhost:7257/api';

export const API_URLS = {
  live: {
    status: `${API_BASE_URL}/live/status`,
    statusLocal: `${API_BASE_URL_LOCAL}/live/status`,
  },
  siteConfig: {
    root: `${API_BASE_URL}/site-config`,
    rootLocal: `${API_BASE_URL_LOCAL}/site-config`,
  },
  notifications: {
    root: `${API_BASE_URL}/notifications`,
    rootLocal: `${API_BASE_URL_LOCAL}/notifications`,
  },
  people: {
    root: `${API_BASE_URL}/people`,
    rootLocal: `${API_BASE_URL_LOCAL}/people`,
  },
  fees: {
    root: `${API_BASE_URL}/fees`,
    rootLocal: `${API_BASE_URL_LOCAL}/fees`,
  },
  admissions: {
    essentials: `${API_BASE_URL}/admissions/essentials`,
    essentialsLocal: `${API_BASE_URL_LOCAL}/admissions/essentials`,
  },
  publications: {
    root: `${API_BASE_URL}/publications`,
    rootLocal: `${API_BASE_URL_LOCAL}/publications`,
  },
  gallery: {
    root: `${API_BASE_URL}/gallery`,
    rootLocal: `${API_BASE_URL_LOCAL}/gallery`,
  },
  studentZone: {
    root: `${API_BASE_URL}/student-zone/gallery`,
    rootLocal: `${API_BASE_URL_LOCAL}/student-zone/gallery`,
  },
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    loginLocal: `${API_BASE_URL_LOCAL}/auth/login`,
  },
};

export const getApiUrl = (key: keyof typeof API_URLS, subKey?: string) => {
  const endpoint = API_URLS[key] as Record<string, string>;
  return subKey ? endpoint[subKey] : endpoint['root'] ?? endpoint['status'] ?? endpoint['essentials'] ?? '';
};

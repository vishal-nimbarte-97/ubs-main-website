export const API_BASE_URL = 'http://ubsapi.xplorelogic.in/api';
export const API_BASE_URL_LOCAL = 'https://localhost:7257/api';

export const API_URLS = {
  live: {
    getStatus: `${API_BASE_URL}/Live/GetStatus`,
    getStatusLocal: `${API_BASE_URL_LOCAL}/Live/GetStatus`,
    setStatus: `${API_BASE_URL}/Live/SetStatus`,
    setStatusLocal: `${API_BASE_URL_LOCAL}/Live/SetStatus`,
  },
  siteConfig: {
    get: `${API_BASE_URL}/SiteConfig/Get`,
    getLocal: `${API_BASE_URL_LOCAL}/SiteConfig/Get`,
    save: `${API_BASE_URL}/SiteConfig/Save`,
    saveLocal: `${API_BASE_URL_LOCAL}/SiteConfig/Save`,
  },
  notifications: {
    getAll: `${API_BASE_URL}/Notifications/GetAll`,
    getAllLocal: `${API_BASE_URL_LOCAL}/Notifications/GetAll`,
    insert: `${API_BASE_URL}/Notifications/Insert`,
    insertLocal: `${API_BASE_URL_LOCAL}/Notifications/Insert`,
    delete: (id: number) => `${API_BASE_URL}/Notifications/Delete/${id}`,
    deleteLocal: (id: number) => `${API_BASE_URL_LOCAL}/Notifications/Delete/${id}`,
  },
  people: {
    getAll: `${API_BASE_URL}/People/GetAll`,
    getAllLocal: `${API_BASE_URL_LOCAL}/People/GetAll`,
    insert: `${API_BASE_URL}/People/Insert`,
    insertLocal: `${API_BASE_URL_LOCAL}/People/Insert`,
    delete: (id: number) => `${API_BASE_URL}/People/Delete/${id}`,
    deleteLocal: (id: number) => `${API_BASE_URL_LOCAL}/People/Delete/${id}`,
  },
  fees: {
    getAll: `${API_BASE_URL}/TuitionFees/GetAll`,
    getAllLocal: `${API_BASE_URL_LOCAL}/TuitionFees/GetAll`,
    insert: `${API_BASE_URL}/TuitionFees/Insert`,
    insertLocal: `${API_BASE_URL_LOCAL}/TuitionFees/Insert`,
    delete: (id: number) => `${API_BASE_URL}/TuitionFees/Delete/${id}`,
    deleteLocal: (id: number) => `${API_BASE_URL_LOCAL}/TuitionFees/Delete/${id}`,
  },
  admissions: {
    getEssentials: `${API_BASE_URL}/Admissions/GetEssentials`,
    getEssentialsLocal: `${API_BASE_URL_LOCAL}/Admissions/GetEssentials`,
    saveEssentials: `${API_BASE_URL}/Admissions/SaveEssentials`,
    saveEssentialsLocal: `${API_BASE_URL_LOCAL}/Admissions/SaveEssentials`,
  },
  publications: {
    getAll: `${API_BASE_URL}/Publications/GetAll`,
    getAllLocal: `${API_BASE_URL_LOCAL}/Publications/GetAll`,
    insert: `${API_BASE_URL}/Publications/Insert`,
    insertLocal: `${API_BASE_URL_LOCAL}/Publications/Insert`,
    delete: (id: number) => `${API_BASE_URL}/Publications/Delete/${id}`,
    deleteLocal: (id: number) => `${API_BASE_URL_LOCAL}/Publications/Delete/${id}`,
  },
  gallery: {
    getAll: `${API_BASE_URL}/Gallery/GetAll`,
    getAllLocal: `${API_BASE_URL_LOCAL}/Gallery/GetAll`,
    insert: `${API_BASE_URL}/Gallery/Insert`,
    insertLocal: `${API_BASE_URL_LOCAL}/Gallery/Insert`,
    delete: (id: number) => `${API_BASE_URL}/Gallery/Delete/${id}`,
    deleteLocal: (id: number) => `${API_BASE_URL_LOCAL}/Gallery/Delete/${id}`,
  },
  studentZone: {
    getAll: `${API_BASE_URL}/StudentZoneGallery/GetAll`,
    getAllLocal: `${API_BASE_URL_LOCAL}/StudentZoneGallery/GetAll`,
    insert: `${API_BASE_URL}/StudentZoneGallery/Insert`,
    insertLocal: `${API_BASE_URL_LOCAL}/StudentZoneGallery/Insert`,
    delete: (id: number) => `${API_BASE_URL}/StudentZoneGallery/Delete/${id}`,
    deleteLocal: (id: number) => `${API_BASE_URL_LOCAL}/StudentZoneGallery/Delete/${id}`,
  },
  auth: {
    login: `${API_BASE_URL}/Auth/Login`,
    loginLocal: `${API_BASE_URL_LOCAL}/Auth/Login`,
    register: `${API_BASE_URL}/Auth/Register`,
    registerLocal: `${API_BASE_URL_LOCAL}/Auth/Register`,
  },
};

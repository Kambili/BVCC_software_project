// src/utils/storage.ts

export interface RecentFile {
  id: string;
  name: string;
  size?: number;
  rowCount: number;
  columnCount: number;
  uploadedAt: string;
}

export interface SavedInsight {
  id: string;
  title: string;
  description: string;
  confidence: string;
  column?: string;
  fileName?: string; 
  savedAt: string;
}

// Recent Files Storage
export const getRecentFiles = (): RecentFile[] => {
  const stored = localStorage.getItem('recentFiles');
  return stored ? JSON.parse(stored) : [];
};

export const addRecentFile = (file: RecentFile): RecentFile[] => {
  const recent = getRecentFiles();
  const filtered = recent.filter(f => f.name !== file.name);
  const updated = [file, ...filtered].slice(0, 10);
  localStorage.setItem('recentFiles', JSON.stringify(updated));
  return updated;
};

export const clearRecentFiles = (): void => {
  localStorage.removeItem('recentFiles');
};

// Saved Insights Storage
export const getSavedInsights = (): SavedInsight[] => {
  const stored = localStorage.getItem('savedInsights');
  return stored ? JSON.parse(stored) : [];
};

export const addSavedInsight = (insight: SavedInsight): SavedInsight[] => {
  const saved = getSavedInsights();
  const exists = saved.find(i => i.id === insight.id);
  if (exists) return saved;
  
  const updated = [...saved, { ...insight, savedAt: new Date().toISOString() }];
  localStorage.setItem('savedInsights', JSON.stringify(updated));
  return updated;
};

export const removeSavedInsight = (insightId: string): SavedInsight[] => {
  const saved = getSavedInsights();
  const updated = saved.filter(i => i.id !== insightId);
  localStorage.setItem('savedInsights', JSON.stringify(updated));
  return updated;
};

export const isSavedInsight = (insightId: string): boolean => {
  const saved = getSavedInsights();
  return saved.some(i => i.id === insightId);
};

export const clearSavedInsights = (): void => {
  localStorage.removeItem('savedInsights');
};

// Store actual file data
export const saveFileData = (fileName: string, data: any[]) => {
  try {
    localStorage.setItem(`fileData_${fileName}`, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Failed to save file data:', e);
    return false;
  }
};

export const getFileData = (fileName: string): any[] | null => {
  try {
    const stored = localStorage.getItem(`fileData_${fileName}`);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.error('Failed to load file data:', e);
    return null;
  }
};
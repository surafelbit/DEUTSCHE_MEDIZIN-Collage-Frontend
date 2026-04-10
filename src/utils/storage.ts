// utils/storage.ts
export const FILTER_OPTIONS_STORAGE_KEY = "filter-options-data";
export const FILTER_OPTIONS_STORAGE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export const saveFilterOptionsToStorage = (data: any) => {
  const storageData = {
    data: data,
    timestamp: Date.now(),
  };
  sessionStorage.setItem(
    FILTER_OPTIONS_STORAGE_KEY,
    JSON.stringify(storageData),
  );
  console.log(
    "Saved filter options to storage with key:",
    FILTER_OPTIONS_STORAGE_KEY,
  );
};

export const loadFilterOptionsFromStorage = () => {
  const stored = sessionStorage.getItem(FILTER_OPTIONS_STORAGE_KEY);
  console.log(
    "Loading from storage, key:",
    FILTER_OPTIONS_STORAGE_KEY,
    "stored:",
    !!stored,
  );

  if (!stored) return null;

  try {
    const { data, timestamp } = JSON.parse(stored);
    const isExpired = Date.now() - timestamp > FILTER_OPTIONS_STORAGE_DURATION;

    if (isExpired) {
      console.log("Filter options expired");
      sessionStorage.removeItem(FILTER_OPTIONS_STORAGE_KEY);
      return null;
    }

    console.log("Loaded valid filter options from storage");
    return data;
  } catch (e) {
    console.error("Error loading filter options:", e);
    return null;
  }
};

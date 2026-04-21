// services/cacheService.ts
import endPoints from "./endPoints";

// ================= CACHE CONFIGURATION =================
interface CacheConfig {
  ttl: number; // Time to live in milliseconds
}

export const CACHE_CONFIG: Record<string, CacheConfig> = {
  [endPoints.lookupsDropdown]: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days

  // 🌍 Geographic / Location data (rarely changes)
  "/region": { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  "/zone": { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  "/woreda": { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  "/zone/region": { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  "/woreda/zone": { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days

  // MOE datasets (infrequently updated)
  [endPoints.impairments]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.schoolBackgrounds]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.enrollmentTypes]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.attritionCauses]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.semesters]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.programLevels]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.programModalities]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.academicYears]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days

  // 🎓 Academic dropdowns (updated at start of each semester, but generally stable)
  [endPoints.departments]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.classYears]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.courseSources]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.courseCategory]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.batchClassSemsterYear]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.batches]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.classYears]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.studentStatus]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  [endPoints.gradingSystem]: { ttl: 30 * 24 * 60 * 60 * 1000 }, // 30 days

  // DropDown options (change infrequently)
  [endPoints.allCourses]: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  [endPoints.courseLists]: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  [endPoints.studentUserNames]: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days
  [endPoints.studentsSlip]: { ttl: 7 * 24 * 60 * 60 * 1000 }, // 7 days
};

const CACHE_STORE_NAME = "api-response-cache";
// =======================================================

const LOOKUPS_DROPDOWN_DEPENDENCIES = new Set<string>([
  endPoints.impairments,
  endPoints.schoolBackgrounds,
  endPoints.enrollmentTypes,
  endPoints.attritionCauses,
  endPoints.semesters,
  endPoints.programLevels,
  endPoints.programModalities,
  endPoints.academicYears,
  endPoints.departments,
  endPoints.classYears,
  endPoints.courseSources,
  endPoints.courseCategory,
  endPoints.batchClassSemsterYear,
  endPoints.batches,
  endPoints.studentStatus,
  endPoints.gradingSystem,
]);

const getBasePath = (url: string | undefined): string => {
  if (!url) return "";
  return url.split("?")[0];
};

const generateCacheKey = (url: string | undefined): string => {
  const basePath = getBasePath(url);
  // Encode to safely handle special characters in URLs
  const encoded = encodeURIComponent(basePath);
  return `https://app-cache.local/${encoded}`;
};

export const getCachedResponse = async <T = any>(
  url: string,
  fetchFn: () => Promise<T>,
): Promise<T> => {
  const basePath = getBasePath(url);
  const config = CACHE_CONFIG[basePath];

  // If not configured for caching or Cache API unavailable, fetch normally
  if (!config || typeof caches === "undefined") {
    return fetchFn();
  }

  const dataKey = generateCacheKey(url);
  const metaKey = `${dataKey}/meta`;

  try {
    const cache = await caches.open(CACHE_STORE_NAME);

    // 1️⃣ Check expiry
    const metaRes = await cache.match(metaKey);
    let isExpired = true;

    if (metaRes) {
      const meta = await metaRes.json();
      isExpired = Date.now() - meta.timestamp > config.ttl;
    }

    // 2️⃣ Return cached data if valid
    if (!isExpired) {
      const dataRes = await cache.match(dataKey);
      if (dataRes) {
        console.log(`✅ [CACHE HIT] ${url}`);
        return dataRes.json() as Promise<T>;
      }
    }

    // 3️⃣ Fetch fresh data
    console.log(`🔄 [CACHE MISS/EXPIRED] Fetching ${url}...`);
    const data = await fetchFn();

    // 4️⃣ Save to cache (now with valid https:// keys)
    await cache.put(
      metaKey,
      new Response(JSON.stringify({ timestamp: Date.now() }), {
        headers: { "Content-Type": "application/json" },
      }),
    );

    await cache.put(
      dataKey,
      new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      }),
    );

    console.log(`💾 [CACHED] ${url}`);
    return data;
  } catch (error) {
    console.warn(`⚠️ Cache failed for ${url}, falling back to network:`, error);
    return fetchFn(); // Safe fallback
  }
};

/**
 * Manually clear cache for a specific endpoint
 */
export const clearCacheForUrl = async (url: string): Promise<void> => {
  if (typeof caches === "undefined") return;

  const basePath = getBasePath(url);
  const dataKey = generateCacheKey(url);
  const metaKey = `${dataKey}/meta`;

  try {
    const cache = await caches.open(CACHE_STORE_NAME);
    await cache.delete(dataKey);
    await cache.delete(metaKey);

    // Keep lookupsDropdown in sync when one of its dependency endpoints is invalidated.
    if (LOOKUPS_DROPDOWN_DEPENDENCIES.has(basePath)) {
      const lookupsDataKey = generateCacheKey(endPoints.lookupsDropdown);
      const lookupsMetaKey = `${lookupsDataKey}/meta`;
      await cache.delete(lookupsDataKey);
      await cache.delete(lookupsMetaKey);
      console.log(
        `🗑️ lookupsDropdown cache also cleared due to dependency invalidation: ${url}`,
      );
    }

    console.log(`🗑️ Cache cleared for ${url}`);
  } catch (error) {
    console.warn(`Failed to clear cache for ${url}:`, error);
  }
};

export const clearAllApiCache = async (): Promise<void> => {
  if (typeof caches !== "undefined") {
    await caches.delete(CACHE_STORE_NAME);
    console.log("🗑️ All API response caches cleared");
  }
};

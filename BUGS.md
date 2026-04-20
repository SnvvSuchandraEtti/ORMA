# ORMA Full Application Test Report

The following is a comprehensive summary of bugs and issues observed while testing the local development instance of the ORMA marketplace application (`http://localhost:3000`). Tests covered the homepage, category navigation, search bar functionality, listing details page, and core interactions.

## 1. Functional Bugs

### Search Query Mismatch
- **Issue:** Searching for general terms like "camera" or "GoPro Camera" sometimes returns 0 results, even when listings like "Sony A7 III Full Frame Mirrorless" or "GoPro Hero 11 Black" exist and are active in the database.
- **Cause:** The `useInfiniteListings` hook uses a strict `.ilike` match on the entire query string (`title.ilike.%${q}%`). Multi-word queries or generic category terms fail to match if the exact continuous substring isn't found in the title or description.
- **Impact:** High. Users cannot discover products easily unless they search the exact matching title.

### City Filter Logical Discrepancy
- **Issue:** When a user selects a city (e.g., 'Mumbai') from the homepage filter, the interface displays "Rentals in Mumbai" or "Showing X results in Mumbai," but the results include items from other cities (like Kolkata or Bangalore).
- **Cause:** In `useInfiniteListings.ts`, the `city` parameter is used to *sort* items locally rather than *filter* them out (`aLocal === bLocal ? 0 : aLocal ? -1 : 1`). While this ensures local items are pushed to the top, the UI copy misleadingly implies a strict filter limitation.
- **Impact:** High. Highly confusing user experience.

### Search Suggestions Lag
- **Issue:** The search autocomplete dropdown frequently displays a persistent "Loading suggestions..." message that lingers without populating results.
- **Impact:** Medium. Degrades the perceived performance of the search tool.

### Inactive Share Button
- **Issue:** Clicking the "Share" button beneath the image gallery on the listing details page does not always trigger the expected share modal or perform any clipboard copy action.
- **Cause:** The `handleShare` function relies on `navigator.share`. On modern desktop browsers, `navigator.share` might be defined but can fail silently or throw unrecognized errors. Because the fallback `setShowShareModal(true)` is only triggered when `navigator.share` throws an `AbortError` or is completely undefined, the custom `<ShareModal />` often fails to appear on desktop.
- **Impact:** Medium. Prevents users from sharing listings with their network.

### City Filter Freezing
- **Issue:** The homepage city filter occasionally causes the listing grid to get stuck indefinitely on skeleton loaders.
- **Impact:** High. Can break the homepage experience entirely, requiring a manual refresh.

## 2. Visual & UI Anomalies

### Broken Fallback Images
- **Issue:** The local `/placeholder.jpg` fallback (used when remote Unsplash URLs 404 or fail to load) fails to optimize via `next/image`, resulting in a `400 Bad Request` in the console and empty, broken spaces on the cards.
- **Cause:** The `placeholder.jpg` image file is physically missing from the `/public` directory. `next/image` crashes when attempting to optimize a non-existent local asset.
- **Impact:** High for UI aesthetics.

## 3. Console & Network Errors

### Invalid Supabase Queries
- **Issue:** Supabase fetches yield `400` status errors on queries like `GET .../rest/v1/listings?id=in.(...)`.
- **Cause:** Potential empty or invalid ID sequences being passed to the `in.` filter during batch fetching of recommended, recently viewed, or similar listings.

### Web App Manifest
- **Issue:** Console logs report size specification errors for `icon-192.png` inside the `manifest.json`.
- **Impact:** Very low. Could slightly affect PWA installation reliability on strict browsers. 

// --- Asset imports ---
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";
declare module "*.css";
declare module "*.scss";
declare module "*.json";

// --- Global variables ---
declare global {
  interface Window {
    myGlobalVar: any; // replace if needed
  }
}

// --- Catch-all for unknown modules ---
declare module "*";

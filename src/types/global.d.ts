// src/types/global.d.ts

// If you have custom module imports (like images, CSV, JSON, etc.)
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";
declare module "*.css";
declare module "*.scss";
declare module "*.json";

// If you want to declare global variables
declare global {
  interface Window {
    myGlobalVar: any;
  }
}

// Optional: If you want a catch-all for any unknown modules
declare module "*";

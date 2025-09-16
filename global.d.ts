// global.d.ts

// Allow importing JS/JSX/TS/TSX files without type declarations
declare module "*.js" {
  const content: any;
  export default content;
}
declare module "*.jsx" {
  const content: any;
  export default content;
}
declare module "*.ts" {
  const content: any;
  export default content;
}
declare module "*.tsx" {
  const content: any;
  export default content;
}

// Missing type packages fallback
declare module "prop-types" {
  const content: any;
  export default content;
}

// Generic fallback for any module without types
declare module "*";

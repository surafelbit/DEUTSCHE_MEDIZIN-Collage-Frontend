// Allow importing JS/JSX files without type declarations
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

// Missing type packages fallbacks
declare module "prop-types" {
  const content: any;
  export default content;
}

// Generic fallback for any unknown module
declare module "*";

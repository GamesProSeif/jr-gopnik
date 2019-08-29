declare module '*/config.json' {
  export const ownerID: string[];
  export const prefix: string;
  export const sharding: boolean;
  export const colors: {
    primary: string;
    secondary: string;
    info: string;
    warning: string;
    error: string;
  };
  export const emojis: object;
}

declare module '*/package.json' {
  export const version: string;
}

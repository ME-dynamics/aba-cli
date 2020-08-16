export interface IValidDirectory {
    isValid: boolean;
    base: "root" | "packages" | "downTheRoad" | null;
  }
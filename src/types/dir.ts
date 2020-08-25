import { TLibraries } from './commandActions';

export interface IValidDirectory {
    isValid: boolean;
    base: "root" | "packages" | "downTheRoad" | "src" | null;
    type: TLibraries | null;
  }
import { TLibraries } from './commandActions';

export interface IValidDirectory {
    validDir: boolean;
    base: "root" | "packages" | "downTheRoad" | "src" | undefined;
    type: TLibraries | undefined;
  }
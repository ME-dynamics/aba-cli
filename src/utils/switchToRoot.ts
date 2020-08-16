import { isValidDirectory } from '../dir';
import { join } from 'path';




export function switchToRoot(): void {
    const validDir = isValidDirectory();
    // check if project is valid
    if (!validDir.isValid) throw new Error("not in nca project");
  
    // if base is in root, no need to change directory
    if (validDir.base === "root") return;
  
    const currentPath = process.cwd();
    // if base is in packages, should go one level up
    if (validDir.base === "packages") {
      const upDir = join(currentPath, "..");
      process.chdir(upDir);
      return;
    }
  
    // if base is into project folder tree, should go up
    // until it reaches root base
    if (validDir.base === "downTheRoad") {
      let upDir: string = currentPath;
      // 3, because three level of structure is allowed from root base
      for (let index = 0; index < 3; index++) {
        upDir = join(upDir, "..");
        process.chdir(upDir);
        if (isValidDirectory().base === "root") {
          return;
        }
      }
    }
  }
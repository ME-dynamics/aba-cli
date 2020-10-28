import { is_valid_directory } from '../dir';
import { join } from 'path';




export function switch_to_root(): void {
    const valid_dir = is_valid_directory();
    // check if project is valid
    if (!valid_dir.valid_dir) throw new Error(`not a nca / nodelib/ rrn project`);
  
    // if base is in root, no need to change directory
    if (valid_dir.base === "root") return;
  
    const current_path = process.cwd();
    // if base is in packages, should go one level up
    if (valid_dir.base === "packages" || valid_dir.base === "src") {
      const upDir = join(current_path, "..");
      process.chdir(upDir);
      return;
    }
  
    // if base is into project folder tree, should go up
    // until it reaches root base
    if (valid_dir.base === "down_the_road") {
      let up_dir: string = current_path;
      // 4, because four level of structure is allowed from root base
      for (let index = 0; index < 4; index++) {
        up_dir = join(up_dir, "..");
        process.chdir(up_dir);
        if (is_valid_directory().base === "root") {
          return;
        }
      }
    }
  }
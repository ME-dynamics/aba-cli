import { join } from 'path';
import { mkdirSync } from 'fs-extra';

/**
 * creates service directory
 */

export async function createDir(serviceName: string) {
    try {
      const dir = join(process.cwd(), serviceName);
      mkdirSync(dir);
    } catch (error) {
      throw error; // TODO: use error factory
    }
  }
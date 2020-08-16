import {join} from "path";
import { copy, remove } from 'fs-extra';
/**
 * cause files from github are in folder named your project master
 * when you download from github, this will move it's files a level up
 * to fix this extra folder
 */

export async function moveTemplateFiles(serviceName: string) {
  const rootPath = join(process.cwd(), serviceName);
  const path = join(rootPath, "nca-template-master");
  try {
    await copy(path, rootPath, { recursive: true, dereference: true });
    await remove(path);
  } catch (error) {
    throw error; // TODO: use error factory
  }
}

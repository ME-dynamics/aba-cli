import { join } from "path";
import { mkdirSync } from "fs-extra";
import { ErrorFactory } from "aba-utils";

/**
 * creates service directory
 */

export async function createDir(serviceName: string) {
  const currentDir = process.cwd();
  try {
    const dir = join(currentDir, serviceName);
    mkdirSync(dir);
  } catch (error) {
    throw new ErrorFactory({
      name: "fsError",
      message: "unable to create directory",
      detail: `unable to create ${serviceName} directory in ${currentDir}`,
      nativeError: error,
      path: undefined,
      timestamp: undefined
    });
  }
}

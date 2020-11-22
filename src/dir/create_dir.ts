import { join } from "path";
import { mkdirSync } from "fs-extra";
import { error_factory } from "aba-utils";

/**
 * creates service directory
 */

export async function create_dir(service_name: string) {
  const current_dir = process.cwd();
  try {
    const dir = join(current_dir, service_name);
    mkdirSync(dir);
  } catch (error) {
    throw new error_factory({
      name: "fs_error",
      message: "unable to create directory",
      detail: `unable to create ${current_dir} directory in ${service_name}`,
      native_error: error,
      path: undefined,
    });
  }
}

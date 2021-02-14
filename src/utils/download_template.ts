import fetch from "node-fetch";
import { t_libraries } from "../types";
/**
 * download template for nca project  from github for now
 */

export async function download_template(
  mode: t_libraries
): Promise<Buffer | undefined> {
  let file: Buffer | undefined;
  const nodelib_url =
    "https://github.com/eyousefifar/nodelib-template/archive/master.zip";
  const nca_url =
    "https://github.com/eyousefifar/nca-template/archive/master.zip";
  // const rrn_url =
  //   "https://github.com/eyousefifar/rrn-template/archive/master.zip";

  try {
    let url;
    switch (mode) {
      case "service":
        url = nca_url;
        break;
      case "nodelib":
        url = nodelib_url;
        break;
      default:
        throw new Error(`mode: ${mode} is not valid`);
    }
    const template = await fetch(url);
    if (template.ok) {
      const templateFile = await fetch(template.url);
      if (templateFile.ok) {
        file = await templateFile.buffer();
      } else {
        file = undefined;
        return file;
      }
    } else {
      file = undefined;
      return file;
    }
  } catch (error) {
    throw error;
  }
  return file;
}

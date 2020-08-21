import fetch from "node-fetch";
import { TLibraries } from "../types";
/**
 * download template for nca project  from github for now
 */

export async function downloadTemplate(
  mode: TLibraries
): Promise<Buffer | undefined> {
  let file: Buffer | undefined;
  const nodelibUrl =
    "https://github.com/eyousefifar/nodelib-template/archive/master.zip";
  const ncaUrl =
    "https://github.com/eyousefifar/nca-template/archive/master.zip";
  const rrnUrl =
    "https://github.com/eyousefifar/rrn-template/archive/master.zip";

  try {
    let url;
    switch (mode) {
      case "service":
        url = ncaUrl;
        break;
      case "nodelib":
        url = nodelibUrl;
        break;
      case "rrn":
        url = rrnUrl;
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

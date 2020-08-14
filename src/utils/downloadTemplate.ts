import fetch from "node-fetch";

/**
 * download template for nca project  from github for now
 */

export async function downloadTemplate(): Promise<Buffer | undefined> {
  let file: Buffer | undefined;
  try {
    const template = await fetch(
      "https://github.com/eyousefifar/nca-template/archive/master.zip"
    ); // TODO: use my own file server
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

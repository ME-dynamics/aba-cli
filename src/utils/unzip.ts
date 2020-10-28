import { join } from "path";
import { Open } from "unzipper";

export async function unzip(file: Buffer, service_name: string): Promise<void> {
  const directory = join(process.cwd(), service_name);
  const zipped_buf = await Open.buffer(file);
  await zipped_buf.extract({
    path: directory,
    concurrency: 8,
  });
}

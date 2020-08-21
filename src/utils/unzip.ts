import { join } from "path";
import { Open } from "unzipper";

export async function unzip(file: Buffer, serviceName: string): Promise<void> {
  const directory = join(process.cwd(), serviceName);
  const zippedBuf = await Open.buffer(file);
  await zippedBuf.extract({
    path: directory,
    concurrency: 8,
  });
}

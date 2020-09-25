export function terminateWithError(error: unknown, exitCode: number) {
  console.error(error);
  process.exit(exitCode);
}

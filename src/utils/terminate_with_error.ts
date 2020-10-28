export function terminate_with_error(error: unknown, exit_code: number) {
  console.error(error);
  process.exit(exit_code);
}

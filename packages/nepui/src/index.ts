import { createProgram } from "./cli.js"
import * as logger from "@/utils/logger.js"
import { isCliError, UserCancelledError } from "@/utils/errors.js"

process.on("SIGINT", () => {
  logger.info("")
  logger.warn("Cancelled.")
  process.exit(0)
})

process.on("unhandledRejection", (reason: unknown) => {
  const detail = reason instanceof Error ? reason.message : String(reason)
  logger.error(`Unexpected error: ${detail}`)
  process.exit(1)
})

async function main(): Promise<void> {
  const program = createProgram()
  await program.parseAsync(process.argv)
}

main().catch((err: unknown) => {
  if (err instanceof UserCancelledError) {
    logger.warn(err.message)
    process.exit(err.exitCode)
  }

  if (isCliError(err)) {
    logger.error(err.message)
    process.exit(err.exitCode)
  }

  const detail = err instanceof Error ? err.message : String(err)
  logger.error(`Unexpected error: ${detail}`)
  process.exit(1)
})

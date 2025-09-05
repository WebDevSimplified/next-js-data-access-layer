import { DrizzleQueryError } from "drizzle-orm"

export type DalReturn<T, E extends DalError = DalError> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: E
    }

export type DalError =
  | {
      type: "no-user"
    }
  | {
      type: "no-access"
    }
  | {
      type: "drizzle-error"
      error: DrizzleQueryError
    }
  | {
      type: "unknown-error"
      error: unknown
    }

export class ThrowableDalError extends Error {
  dalError: DalError

  constructor(dalError: DalError) {
    super("ThrowableDalError")
    this.dalError = dalError
  }
}

export function createSuccessReturn<T>(data: T): DalReturn<T> {
  return { success: true, data }
}

export function createErrorReturn<E extends DalError>(
  error: E,
): DalReturn<never> {
  return { success: false, error }
}

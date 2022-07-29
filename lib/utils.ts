export const stringOfError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return `${error}`
}

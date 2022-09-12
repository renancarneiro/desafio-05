export default (nameError: string[]) => {
  return {
    message: 'DuplicateKeyError',
    details: `${nameError} is not unique`
  }
}

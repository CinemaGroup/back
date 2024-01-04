export const generateCode = (count: number) => {
  const min = 10 ** (count - 1)
  const max = 10 ** count - 1

  const randomCode = Math.floor(Math.random() * (max - min + 1)) + min

  return randomCode
}

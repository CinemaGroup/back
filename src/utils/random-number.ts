export const generateRandomNumber = (
  min: number,
  max: number,
  variant: 'float' | 'number'
): number => {
  const randomNumber = Math.random() * (max - min) + min

  return variant === 'float'
    ? parseFloat(randomNumber.toFixed(2))
    : Math.floor(randomNumber)
}

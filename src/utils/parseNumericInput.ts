export const parseNumericInput = (value: string): number => {
  const digits = value.replace(/\D/g, '');

  return digits === '' ? 0 : Number(digits);
};

export const validateEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

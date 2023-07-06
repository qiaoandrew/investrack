import { validateEmail } from './helpers';

export const validateSignUp = (values: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  } = {};

  if (!values.email) errors.email = 'Please enter an email.';
  if (!validateEmail(values.email))
    errors.email = 'Please enter a valid email.';
  if (!values.password) errors.password = 'Please enter a password.';
  if (!values.confirmPassword)
    errors.confirmPassword = 'Please confirm your password.';
  if (values.password !== values.confirmPassword)
    errors.confirmPassword = "Your passwords don't match. Please try again.";

  return errors;
};

export const validateLogIn = (values: { email: string; password: string }) => {
  const errors: { email?: string; password?: string } = {};

  if (!values.email) errors.email = 'Please enter your email.';
  if (!values.password) errors.password = 'Please enter your password.';

  return errors;
};

export const validateAddToPortfolio = (values: {
  portfolioId: string;
  purchaseDate: {
    month: string;
    day: string;
    year: string;
  };
  quantity: string;
  purchasePrice: string;
}) => {
  const errors: {
    quantity?: string;
    purchasePrice?: string;
  } = {};

  if (!values.quantity) errors.quantity = 'Please enter a quantity.';

  if (isNaN(parseInt(values.quantity)))
    errors.quantity = 'Please enter a valid quantity.';

  if (!values.purchasePrice)
    errors.purchasePrice = 'Please enter a purchase price.';

  if (isNaN(parseFloat(values.purchasePrice)))
    errors.purchasePrice = 'Please enter a valid purchase price.';

  return errors;
};

export const validateName = (values: { name: string }) => {
  const errors: { name?: string } = {};

  if (!values.name) errors.name = 'Please enter a name.';

  return errors;
};

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
  const errors: {
    email?: string;
    password?: string;
  } = {};

  if (!values.email) errors.email = 'Please enter your email.';
  if (!values.password) errors.password = 'Please enter your password.';

  return errors;
};

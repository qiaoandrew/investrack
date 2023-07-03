import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'react-feather';
import { FcGoogle } from 'react-icons/fc';

import AuthLayout from '@/components/layouts/AuthLayout';
import TextInput from '@/components/UI/TextInput';
import InputFeedback from '@/components/UI/InputFeedback';
import Button from '@/components/UI/Button';

import { RootState } from '@/store/store';
import { signInWithGoogle, signUp } from '@/util/auth';
import { createUser } from '@/util/user';
import { validateSignUp } from '@/util/formValidation';
import { COLORS } from '@/constants/colors';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateSignUp,
    onSubmit: async (values) => {
      setError('');
      try {
        const { uid, email } = await signUp(values.email, values.password);
        await createUser(uid, email);
      } catch (error: any) {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/weak-password':
            formik.setFieldError(
              'password',
              'Password must be at least 6 characters.'
            );
            break;
          case 'auth/email-already-in-use':
            formik.setFieldError(
              'email',
              'An account with this email already exists.'
            );
            break;
          case 'auth/invalid-email':
            formik.setFieldError('email', 'Invalid email. Please try again.');
            break;
          default:
            setError('Something went wrong. Please try again.');
            break;
        }
      }
    },
  });

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSignUpWithGoogle = async () => {
    setError('');
    try {
      const { uid, email } = await signInWithGoogle();
      await createUser(uid, email);
    } catch (error: any) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <AuthLayout>
      <h1 className='mb-4 text-center text-5xl font-semibold xl:text-6xl'>
        <span className='text-gradient'>Sign Up</span>
      </h1>
      <p className='mb-9 text-center text-white'>
        Have an account?{' '}
        <Link href='/log-in' className='text-gradient bg-gradient'>
          Log In.
        </Link>
      </p>
      <form onSubmit={formik.handleSubmit} className='flex flex-col'>
        <div className='mb-5'>
          <TextInput
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder='Email'
          />
          {formik.errors.email && formik.touched.email && (
            <InputFeedback state='error'>{formik.errors.email}</InputFeedback>
          )}
        </div>
        <div className='mb-5'>
          <TextInput
            id='password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder='Password'
            icon={
              showPassword ? (
                <EyeOff color={COLORS.grey1} size={24} />
              ) : (
                <Eye color={COLORS.grey1} size={24} />
              )
            }
            iconOnClick={() => setShowPassword((prev) => !prev)}
          />
          {formik.errors.password && formik.touched.password && (
            <InputFeedback state='error'>
              {formik.errors.password}
            </InputFeedback>
          )}
        </div>
        <div className='mb-16'>
          <TextInput
            id='confirmPassword'
            name='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder='Confirm Password'
            icon={
              showConfirmPassword ? (
                <EyeOff color={COLORS.grey1} size={24} />
              ) : (
                <Eye color={COLORS.grey1} size={24} />
              )
            }
            iconOnClick={() => setShowConfirmPassword((prev) => !prev)}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <InputFeedback state='error'>
              {formik.errors.confirmPassword}
            </InputFeedback>
          )}
          {error && <InputFeedback state='error'>{error}</InputFeedback>}
        </div>
        <Button
          type='submit'
          hierarchy='primary'
          font='font-semibold'
          classes='mb-5'
        >
          Sign Up
        </Button>
      </form>
      <Button
        type='button'
        onClick={handleSignUpWithGoogle}
        hierarchy='quaternary'
        font='font-semibold'
        classes='w-full'
      >
        Sign up with Google
        <FcGoogle className='absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2' />
      </Button>
    </AuthLayout>
  );
}

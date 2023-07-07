import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'react-feather';

import SEO from '@/components/SEO/SEO';
import AuthLayout from '@/components/layouts/AuthLayout';
import TextInput from '@/components/UI/TextInput';
import InputFeedback from '@/components/UI/InputFeedback';
import Button from '@/components/UI/Button';

import { RootState } from '@/store/store';
import { signIn, signInWithGoogle } from '@/util/auth';
import { createUser } from '@/util/user';
import { validateLogIn } from '@/util/formValidation';
import { COLORS } from '@/constants/colors';

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const { user } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogIn,
    onSubmit: async (values) => {
      setError('');
      try {
        await signIn(values.email, values.password);
      } catch (error: any) {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/wrong-password':
            formik.setFieldError(
              'password',
              'Incorrect password. Please try again.'
            );
            break;
          case 'auth/invalid-email':
            formik.setFieldError('email', 'Invalid email. Please try again.');
            break;
          case 'auth/user-not-found':
            formik.setFieldError('email', 'User not found. Please sign up.');
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

  const handleSignInWithGoogle = async () => {
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
    <>
      <SEO title='Log In | Investrack' />
      <AuthLayout>
        <h1 className='mb-4 text-center text-5xl font-semibold xl:text-6xl'>
          <span className='text-gradient'>Log In</span>
        </h1>
        <p className='mb-9 text-center text-white'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' className='text-gradient bg-gradient'>
            Sign Up.
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
          <div className='mb-16'>
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
              iconOnClick={() =>
                setShowPassword((preShowPassword) => !preShowPassword)
              }
            />
            {formik.errors.password && formik.touched.password && (
              <InputFeedback state='error'>
                {formik.errors.password}
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
            Log In
          </Button>
        </form>
        <Button
          type='button'
          onClick={handleSignInWithGoogle}
          hierarchy='quaternary'
          font='font-semibold'
          classes='w-full'
        >
          Log in with Google
          <FcGoogle className='absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2' />
        </Button>
      </AuthLayout>
    </>
  );
}

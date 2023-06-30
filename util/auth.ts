import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email as string,
  };
};

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email as string,
  };
};

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email as string,
  };
};

export const logOut = async () => {
  await signOut(auth);
};

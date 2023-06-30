import { auth } from '@/lib/firebase';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user.uid;
};

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user.uid;
};

export const signInWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
  return { uid: userCredential.user.uid, email: userCredential.user.email };
};

export const logOut = async () => {
  await signOut(auth);
};

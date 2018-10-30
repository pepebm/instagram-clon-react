import { auth } from './init';

// Sign Up
export const createUser = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signinUser = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign out
export const signoutUser = () =>
    auth.signOut();

// Password Reset
export const passwordReset = (email) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const passwordUpdate = (password) =>
    auth.currentUser.updatePassword(password);
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase.js";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Логінізація користувача
// export const loginUser = async (email, password) => {
//   const userCredential = await signInWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   return userCredential.user;
// };

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Вихід з акаунту
// export const logoutUser = async () => {
//   await signOut(auth);
// };

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Отримання поточного користувача
export const getCurrentUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// export const getCurrentUser = createAsyncThunk(
//   "auth/getCurrentUser",
//   async ({ callback }, { rejectWithValue }) => {
//     try {
//       return onAuthStateChanged(auth, callback);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// )
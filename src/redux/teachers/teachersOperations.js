import { db } from "../../config/firebase.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ref,
  set,
  // get,
  // query,
  // limitToFirst,
  // orderByKey,
  // startAfter,
} from "firebase/database";

export const saveTeachers = createAsyncThunk(
  "teachers/saveTeachers",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      await set(ref(db, "teachers/"), data);
      return console.log("Дані завантажено");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const fetchTeachers = createAsyncThunk(
//   "teachers/fetchTeachers",
//   async (_, { getState, rejectWithValue }) => {
//     const state = getState();
//     const { lastVisible, pageSize } = state.teachers;

//     try {
//       const dbRef = ref(db, "teachers/");

//       let q;

//       if (lastVisible) {
//         q = query(
//           dbRef,
//           orderByKey(),
//           startAfter(lastVisible),
//           limitToFirst(pageSize + 1)
//         );
//       } else {
//         q = query(dbRef, orderByKey(), limitToFirst(pageSize + 1));
//       }

//       const snapshot = await get(q);

//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const teachers = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));

//         const lastTeacher = teachers[teachers.length - 2];
//         const newLastVisible = lastTeacher ? lastTeacher.id : null;

//         const isLastPage = teachers.length < pageSize + 1;

//         if (isLastPage) {
//           return {
//             teachers: [...teachers],
//             lastVisible: newLastVisible,
//             isLastPage: true,
//           };
//         } else {
//           const validTeachers = teachers.slice(0, pageSize);
//           return {
//             teachers: [...validTeachers],
//             lastVisible: newLastVisible,
//             isLastPage: false,
//           };
//         }
//       } else {
//         return rejectWithValue("Дані відсутні");
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const { priceMax, language, level } = state.filter;
    const { lastKey, pageSize, page } = state.teachers;
    try {
      const URL = import.meta.env.VITE_URL;
      const response = await fetch(
        `${URL}?priceMax=${priceMax}&language=${language}&level=${level}&limit=${pageSize}&lastKey=${lastKey}&page=${page}`
      );
      if (!response.ok) throw new Error("Дані не знайдено");
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

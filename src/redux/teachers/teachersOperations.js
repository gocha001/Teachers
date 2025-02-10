import { db } from "../../config/firebase.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set, get, child } from "firebase/database";

export const saveTeachers = createAsyncThunk(
  "teachers/saveTeachers",
  async ( data , { rejectWithValue }) => {
    console.log(data);
    try {
      await set(ref(db, "teachers/"), data);
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "teachers/"));

      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return rejectWithValue("Дані відсутні");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

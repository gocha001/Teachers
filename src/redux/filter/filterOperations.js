import { db } from "../../config/firebase.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, get, child } from "firebase/database";

export const fetchFilterTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "teachers/"));

      if (snapshot.exists()) {
        const data = snapshot.val();
        const teachers = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        return teachers;
      } else {
        return rejectWithValue("Дані відсутні");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

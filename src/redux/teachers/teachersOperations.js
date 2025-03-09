import { db } from "../../config/firebase.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";

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

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

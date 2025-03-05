//  * See a full list of supported triggers at https://firebase.google.com/docs/functions

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

initializeApp();
const db = getDatabase();

export const getFilteredTeachers = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  try {
    const { priceMax, language, level, limit, lastKey, page } = req.query;
    let ref = db.ref("teachers/").orderByChild("price_per_hour");

    if (priceMax) {
      ref = ref.endAt(Number(priceMax) || 9999);
    }

    const snapshot = await ref.once("value");
    const data = snapshot.val();

    if (!data) {
      return res.status(404).json({ message: "No teachers found" });
    }

    let teachers = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    teachers = teachers.filter(
      (t) =>
        (!language || language === "" || t.languages?.includes(language)) &&
        (!level || level === "" || t.levels?.includes(level))
    );

    let isLastPage = teachers.length <= limit * page;

    if (lastKey) {
      const startIndex = teachers.findIndex((t) => t.id === lastKey);

      if (startIndex !== -1) {
        teachers = teachers.slice(
          startIndex + 1,
          startIndex + 1 + Number(limit)
        );
      } else {
        teachers = teachers.slice(0, Number(limit));
      }
    } else {
      teachers = teachers.slice(0, Number(limit));
    }

    const newLastKey =
      teachers.length > 0 ? teachers[teachers.length - 1].id : null;

    res.json({
      teachers,
      lastKey: newLastKey,
      isLastPage: isLastPage,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

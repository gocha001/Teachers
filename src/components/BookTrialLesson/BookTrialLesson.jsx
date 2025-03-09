import css from "./BookTrialLesson.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = yup.object().shape({
  reasons: yup.string().required("Choose a reason"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Incorrect email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,14}$/, "Incorrect phone number")
    .required("Phone is required"),
});

const BookTrialLesson = ({ teacher, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const reasons = [
    "Career and business",
    "Lesson for kids",
    "Living abroad",
    "Exams and coursework",
    "Culture, travel or hobby",
  ];

  const onSubmit = (data) => {
    console.log("Форма надіслана:", data);
    onClose();
    toast.info("Lesson booking request sent", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div className={css.bookTrialLesson}>
      <div className={css.bookTrialLessonTitleCont}>
        <h2 className={css.bookTrialLessonTitle}>Book trial lesson</h2>
        <p className={css.bookTrialLessonText}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
      </div>
      <div className={css.bookTrialLessonTeacher}>
        <img src={teacher.avatar_url} className={css.bookTrialLessonAvatar} />
        <div className={css.bookTrialLessonTeacherText}>
          <p className={css.bookTrialLessonTeacherSubText}>Your teacher</p>
          <h4 className={css.bookTrialLessonTeacherName}>
            {teacher.name} {teacher.surname}
          </h4>
        </div>
      </div>
      <h3 className={css.bookTrialLessonFormTitle}>
        What is your main reason for learning a foreign language?
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={css.bookTrialLessonForm}
      >
        <fieldset className={css.bookTrialLessonFieldset}>
          {reasons.map((reason) => (
            <label key={reason} className={css.bookTrialLessonLabel}>
              <input
                type="radio"
                value={reason}
                {...register("reasons")}
                className={css.BookTrialLessonInput}
              />
              <p className={css.reason}>{reason}</p>
            </label>
          ))}
          <p className={css.error}>{errors.reasons?.message}</p>
        </fieldset>
        <div className={css.for}>
          <input
            {...register("name")}
            className={css.forInput}
            placeholder="Full Name"
          />
          <p className={css.error}>{errors.name?.message}</p>

          <input
            type="email"
            {...register("email")}
            className={css.forInput}
            placeholder="Email"
          />
          <p className={css.error}>{errors.email?.message}</p>

          <input
            type="tel"
            {...register("phone")}
            className={css.forInput}
            placeholder="Phone number"
          />
          <p className={css.error}>{errors.phone?.message}</p>
        </div>
        <button type="submit" className={css.bookTrialLessonBtn}>
          Book
        </button>
      </form>
    </div>
  );
};

export default BookTrialLesson;

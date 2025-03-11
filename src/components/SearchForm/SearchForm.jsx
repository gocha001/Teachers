import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectTeachersError } from "../../redux/teachers/selectors";
import css from "./SearchForm.module.css";
import { filterTeachers } from "../../redux/filter/filterSlice";
import { resetTeachers } from "../../redux/teachers/teachersSlice";
import { fetchTeachers } from "../../redux/teachers/teachersOperations";

const schema = yup.object().shape({
  language: yup.string(),
  level: yup.string(),
  priceMax: yup.number(),
});

const SearchForm = () => {
  const error = useSelector(selectTeachersError);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { language: "French", level: "A1 Beginner", priceMax: "25" },
  });

  const dispatch = useDispatch();

  const handleFilterChange = (field, value) => {
    const currentFilters = getValues();
    setValue(field, value);
    const updatedFilters = { ...currentFilters, [field]: value };

    setTimeout(() => {
      dispatch(resetTeachers());
      dispatch(filterTeachers(updatedFilters));
      dispatch(fetchTeachers());
    }, 0);
  };

  return (
    <div className={css.search}>
      <form className={css.searchForm}>
        <div className={css.searchSelects}>
          <div className={`${css.searchSelect} ${css.language}`}>
            <label className={css.searchLabel} htmlFor="language">
              Languages
            </label>
            <select
              {...register("language")}
              id="language"
              className={css.selectBox}
              onChange={(e) => handleFilterChange("language", e.target.value)}
              onClick={(e) => handleFilterChange("language", e.target.value)}
            >
              <option value="French">French</option>
              <option value="English">English</option>
              <option value="German">German</option>
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
              <option value="Mandarin Chinese">Mandarin Chinese</option>
              <option value="Korean">Korean</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>

            {errors.language && (
              <p className={css.error}>{errors.language.message}</p>
            )}
          </div>

          <div className={`${css.searchSelect} ${css.level}`}>
            <label className={css.searchLabel} htmlFor="level">
              Level of knowledge
            </label>
            <select
              {...register("level")}
              id="level"
              className={css.selectBox}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              onClick={(e) => handleFilterChange("level", e.target.value)}
            >
              <option value="A1 Beginner">A1 Beginner</option>
              <option value="A2 Elementary">A2 Elementary</option>
              <option value="B1 Intermediate">B1 Intermediate</option>
              <option value="B2 Upper-Intermediate">
                B2 Upper-Intermediate
              </option>
              <option value="C1 Advanced">C1 Advanced</option>
              <option value="C2 Proficient">C2 Proficient</option>
            </select>

            {errors.level && (
              <p className={css.error}>{errors.level.message}</p>
            )}
          </div>

          <div className={`${css.searchSelect} ${css.price}`}>
            <label className={css.searchLabel} htmlFor="priceMax">
              Price
            </label>
            <select
              {...register("priceMax")}
              id="priceMax"
              className={css.selectBox}
              onChange={(e) => handleFilterChange("priceMax", e.target.value)}
              onClick={(e) => handleFilterChange("priceMax", e.target.value)}
            >
              <option value="25">25 $</option>
              <option value="30">30 $</option>
              <option value="35">35 $</option>
              <option value="40">40 $</option>
            </select>

            {errors.price && (
              <p className={css.error}>{errors.price.message}</p>
            )}
          </div>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </div>
  );
};

export default SearchForm;

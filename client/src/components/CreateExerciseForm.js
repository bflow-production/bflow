import { useEffect, useState } from "react";
import categoriesService from "../services/categories";
import trainingService from "../services/trainings";
import "./createExerciseForm.css";

const CreateExerciseForm = ({ showNotification }) => {
  const [categories, setCategories] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [isNumericRating, setIsNumericRating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    categoriesService
      .getCategories()
      .then((response) => {
        setCategories(response);
        console.log("Fetched categories:", response);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();

    const newExercise = {
      exerciseName,
      exerciseDescription,
      isNumericRating,
      categoryId: selectedCategoryId,
      categoryName: selectedCategory,
    };

    console.log("New exercise data:", newExercise);

    try {
      const response = await trainingService.createNewExercise(newExercise);
      showNotification("Uuden harjoituksen luonti onnistui");
      console.log("Response from server:", response);

      // Reset the form fields after successful creation
      setExerciseName("");
      setExerciseDescription("");
      setIsNumericRating(false);
      setSelectedCategory("");
      setSelectedCategoryId(null);
    } catch (error) {
      console.error(
        "Error creating new exercise:",
        error.response ? error.response.data : error.message
      );
      showNotification("Virhe uuden harjoituksen luonnissa", true);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedName = event.target.value;
    setSelectedCategory(selectedName);

    const selectedCategoryObject = categories.find(
      (category) => category.name === selectedName
    );

    if (selectedCategoryObject) {
      setSelectedCategoryId(selectedCategoryObject.id);
    }
  };

  return (
    <div className="create-exercise-form">
      <h2>Luo harjoitus</h2>
      <form className="form-group" onSubmit={handleSave}>
        <div>
          <label htmlFor="exercise-name">Harjoituksen nimi:</label>
          <input
            type="text"
            id="exercise-name"
            name="exercise-name"
            value={exerciseName}
            onChange={(event) => setExerciseName(event.target.value)}
            required
          />
          <label htmlFor="exercise-description">Harjoituksen kuvaus:</label>
          <input
            type="text"
            id="exercise-description"
            name="exercise-description"
            value={exerciseDescription}
            onChange={(event) => setExerciseDescription(event.target.value)}
            required
          />
          <label className="exercise-isNumeric" htmlFor="exercise-isNumeric">
            Onko kirjallisen arvion lisäksi numeerinen arvio?
          </label>
          <div className="radio-group">
            <label htmlFor="numeric-yes">Kyllä</label>
            <input
              type="radio"
              id="numeric-yes"
              name="exercise-is-numeric-rating"
              onChange={() => setIsNumericRating(true)}
              checked={isNumericRating === true}
            />

            <label htmlFor="numeric-no">Ei</label>
            <input
              type="radio"
              id="numeric-no"
              name="exercise-is-numeric-rating"
              onChange={() => setIsNumericRating(false)}
              checked={isNumericRating === false}
            />
          </div>
          <label htmlFor="exercise-category">Valitse kategoria:</label>
          <select
            id="exercise-category"
            name="exercise-category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Tallenna</button>
      </form>
    </div>
  );
};
export default CreateExerciseForm;

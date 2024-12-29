import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();
        if (data.meals) {
          setMeal(data.meals[0]);
        } else {
          setError("Meal not found.");
        }
      } catch (err) {
        setError("Error fetching meal details.");
      }
    };

    fetchMealDetails();
  }, [id]);

  const getInstructionsList = (instructions) =>
    instructions
      ? instructions.split("\n").filter((step) => step.trim())
      : [];

  if (error) return <p className="text-red-500">{error}</p>;
  if (!meal) return (
  <div className="flex justify-center items-center h-64">
    <p className="text-center text-3xl font-bold text-gray-600 text-xl">...</p>
  </div>
);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded shadow">
    <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 text-center">
      {meal.strMeal}
    </h1>
    <div className="flex flex-col md:flex-row gap-6">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full md:w-1/2 h-auto object-cover rounded-md"
      />
      <div className="flex-1">
        <h2 className="text-xl sm:text-2xl font-semibold">Ingredients</h2>
        <ul className="list-disc pl-6 text-sm sm:text-base">
          {Array.from({ length: 20 }, (_, i) => i + 1)
            .map((num) => ({
              ingredient: meal[`strIngredient${num}`],
              measure: meal[`strMeasure${num}`],
            }))
            .filter((item) => item.ingredient)
            .map((item, index) => (
              <li key={index}>
                {item.ingredient} - {item.measure}
              </li>
            ))}
        </ul>
      </div>
    </div>
    <div className="mt-6">
      <h2 className="text-xl sm:text-2xl font-semibold">Instructions</h2>
      {getInstructionsList(meal.strInstructions).map((step, index) => (
        <p key={index} className="text-sm sm:text-base mb-2">
          {step}
        </p>
      ))}
    </div>
  </div>
  
  );
};

export default RecipeDetails;

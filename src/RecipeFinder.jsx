import React, { useState } from "react";

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch meal details from the API
  const fetchMeal = async () => {
    if (!query || query.trim().length < 2) {
      setError("Please enter a valid dish name.");
      setMeal(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the meal.");
      }
      const data = await response.json();
      if (data.meals) {
        setMeal(data.meals[0]);
      } else {
        setMeal(null);
        setError("No such dish found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Split instructions into an array of steps
  const getInstructionsList = (instructions) => {
    return instructions
      ? instructions.split("\n").filter((step) => step.trim() !== "")
      : [];
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-sans bg-white rounded-lg shadow-md">
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-orange-600 mb-4 sm:mb-6">
        Find Recipe for your Favorite Meals
      </h1>

      {/* Search Box */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a meal..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-64 p-3 text-lg border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchMeal}
          className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Meal Details */}
      {meal && (
        <div className="mt-6 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full sm:w-80 h-80 object-cover rounded-lg shadow-md md:w-1/3 md:mr-6"
            />
            <div className="mt-4 md:mt-0 w-full md:w-2/3">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                {meal.strMeal}
              </h3>
              <p className="text-lg text-black-600 mt-2">
                <span className="font-bold">Category: </span>
                <span className="font-light">{meal.strCategory}</span>
              </p>
              <p className="text-lg text-black-600">
                <span className="font-bold">Area: </span>
                <span className="font-light">{meal.strArea}</span>
              </p>
              <h4 className="mt-4 text-xl font-medium text-gray-800">
                Instructions:
              </h4>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                {getInstructionsList(meal.strInstructions).map(
                  (step, index) => (
                    <li key={index} className="mb-2">
                      {step}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeFinder;

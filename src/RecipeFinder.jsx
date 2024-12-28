import React, { useState, useEffect } from "react";

const RecipeFinder = () => {
  const [query, setQuery] = useState(""); // Search input
  const [suggestions, setSuggestions] = useState([]); // Suggested meals
  const [meal, setMeal] = useState(null); // Selected meal details
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  // Fetch suggestions as the user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]); // Clear suggestions if query is too short
        return;
      }

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await response.json();
        if (data.meals) {
          setSuggestions(data.meals.slice(0, 5)); // Show up to 5 suggestions
        } else {
          setSuggestions([]); // No matches found
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  // Fetch the selected meal's details
  const fetchMeal = async (selectedMeal) => {
    const searchQuery = selectedMeal || query; // Use selected meal or search input
    if (!searchQuery.trim()) {
      setError("Enter a valid meal name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await response.json();
      if (data.meals) {
        setMeal(data.meals[0]); // Display the first matching meal
        setSuggestions([]); // Clear suggestions
      } else {
        setError("No meal found with that name.");
        setMeal(null);
      }
    } catch (err) {
      setError("Error fetching meal details.");
    } finally {
      setLoading(false);
    }
  };

  // Break down instructions into steps
  const getInstructionsList = (instructions) =>
    instructions
      ? instructions.split("\n").filter((step) => step.trim())
      : [];

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Recipe Finder
      </h1>

      {/* Search bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a meal name..."
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => fetchMeal()}
          className="ml-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Loading and error messages */}
      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Meal details */}
      {meal && (
        <div className="mt-6 bg-white p-4 rounded-md shadow-lg flex space-x-6">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-1/4 h-auto rounded-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{meal.strMeal}</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Category:</span> {meal.strCategory}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Area:</span> {meal.strArea}
            </p>

            <h3 className="mt-4 font-semibold">Instructions:</h3>
            <ul className="list-disc pl-6 mt-2">
              {getInstructionsList(meal.strInstructions).map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => fetchMeal(suggestion.strMeal)} // Select suggestion
            >
              {suggestion.strMeal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeFinder;

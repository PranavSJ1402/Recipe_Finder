import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [meals, setMeals] = useState([]); // Changed meal to meals to hold multiple results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await response.json();
        if (data.meals) {
          setSuggestions(data.meals.slice(0, 5));
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  const fetchMeals = async () => {
    if (!query.trim()) {
      setError("Enter a valid meal name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals); // Store multiple results here
        setSuggestions([]);
      } else {
        setMeals([]); // Clear meals if no results found
        setError("No meals found with that name.");
      }
    } catch (err) {
      setError("Error fetching meals.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4 mt-10 bg-gray-100 rounded shadow">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6">
        Recipe Finder
      </h1>

      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a meal name..."
          className="w-full sm:flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchMeals}
          className="mt-2 sm:mt-0 sm:ml-2 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {meals.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Results:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="border p-4 rounded-md shadow-sm"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg sm:text-xl font-bold">{meal.strMeal}</h3>
                <p className="text-gray-600 text-sm">{meal.strCategory}</p>
                <Link to={`/recipe-details/${meal.idMeal}`}>
                  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Find Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => fetchMeals(suggestion.strMeal)}
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

# Recipe_Finder
  A React-based application that allows users to search for recipes by their favorite meals. Users can input a dish name, fetch details via an API, and view meal information, including category, area, and step-by-step cooking instructions.

- Features
  - Search for recipes using keywords.
  - Fetch meal details from TheMealDB API.
  - Display meal information:
    - Meal name
    - Category
    - Area (origin)
    - Cooking instructions
    - Meal image
    - Error handling for invalid or empty searches.
    - Loading indicator while fetching data.

- Technologies Used
  - React.js
  - Tailwind CSS (for styling)
  - TheMealDB API

- Installation

- Clone the repository:

       git clone https://github.com/your-username/recipe-finder.git

- Navigate to the project directory:

      cd recipe-finder

- Install dependencies using Yarn:

      yarn or npm install

- Start the development server:

     yarn start or npm start

- Usage

1. Open the application in your browser at http://localhost:3000/.
2. Enter a dish name in the search box.
3. Click on the Search button.
4. View meal details if found, or an appropriate error message if not.

- API Reference
  -The application uses TheMealDB API to fetch meal details. The key endpoint utilized:

           https://www.themealdb.com/api/json/v1/1/search.php?s=<query>
  -Replace <query> with the meal name to search.  

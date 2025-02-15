# React Recipe Book

## Description

This project is a recipe book web application built with React. It allows users to browse and view detailed information about each recipe. If logged in they can add, edit, and delete there own recipes. The application features user authentication and uses context for state management.

**New Feature (15.02.2025):** The application now allows users to customize the background color of the recipe pages. The color is controlled through a query parameter (color) in the URL, providing a more persistent experience across page loads or when sharing links.

## Table of Contents

- [Features](#features)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- **User Authentication**: Users can log in and out, and their session is maintained across pages.
- **Recipe Management**: Users can add new recipes, edit existing ones, and delete recipes.
- **Recipe Browsing**: Users can browse all recipes or view recipes by a specific author.
- **Recipe Details**: Users can view detailed information about a recipe.
- **Protected Routes**: Certain pages and actions are restricted to logged-in users only.
- **Query Parameter**: The background color of recipe detail pages is controlled by a query parameter (color) in the URL.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **React Router**: Library for handling routing in React applications.
- **Axios**: Promise-based HTTP client for making restfull API requests.
- **Icon Library**: Custom SVG icons from a library I developed.

## License

This project is licensed under the [MIT License](https://github.com/justArale/recipe-book-app/blob/main/LICENSE).

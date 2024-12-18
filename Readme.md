# Food Explorer Project

This project is a simple React-based application that allows users to filter food products by category and sort them based on different criteria such as product name, nutrition score, and nutrition grade. It fetches data from the [Open Food Facts API](https://world.openfoodfacts.org/) and displays the products accordingly.

## Features

- **Category Filter**: Allows users to filter food products based on categories fetched from the Open Food Facts API.
- **Sort Options**: Provides options to sort the products by product name, nutrition score, or nutrition grade in ascending or descending order.
- **Loading State**: Displays a loading indicator while fetching categories and products.
- **Responsive Design**: The app is built to be fully responsive, providing a good user experience across devices.

## Tech Stack

- **Frontend**: React, Tailwind CSS (for styling), Material Tailwind (for select dropdown)
- **API**: Open Food Facts API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/martiantony054/Food-Task-App.git
   cd Food-Task-App
2. Install the required dependencies:

   npm install

3. Start the development server:

   npm start

4. Open the app in your browser at http://localhost:3000

## How it Works

1. **Category Selection**:  
   The user can select a category from a dropdown list. Once a category is selected, the app fetches products associated with that category from the Open Food Facts API.
   
2. **Sort Products**:  
   Users can sort the displayed products based on criteria such as Product Name, Nutrition Score, or Nutrition Grades. The sorting order can be toggled between ascending and descending.

3. **Display Products**:  
   The fetched products are displayed in a grid layout with their images, product names, brands, and ingredients.

4. **Loading State**:  
   While the categories and products are being fetched, a loading spinner is shown to inform the user that the data is loading.

## APIs Used

This project uses the following API:

- **Open Food Facts API**  
  API documentation: [https://world.openfoodfacts.org/data](https://world.openfoodfacts.org/data)  
  This API provides access to food product data, including product names, images, categories, ingredients, brands, and more.


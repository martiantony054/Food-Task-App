import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody } from "@material-tailwind/react";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the product details from the state
  const product = location.state?.product;

  // Set up state to store nutrient values
  const [nutrients, setNutrients] = useState({});

  useEffect(() => {
    if (product?.nutriments) {
      setNutrients(product.nutriments); // Directly set the nutrients object
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg">No product details available.</p>
        <button
          onClick={() => navigate(-1)}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="bg-blue-100 min-h-screen p-8 translate-y-28">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back to Products
      </button>
      <Card className="neu-brutal max-w-4xl mx-auto">
        <CardBody className="p-6">
          <img
            src={product.image_url || "https://via.placeholder.com/400"}
            alt={product.product_name || "Food product"}
            className="w-full h-64 object-cover mb-6 neu-brutal"
          />
          <h2 className="text-2xl font-bold mb-4">
            {product.product_name || "Unknown Product"}
          </h2>
          <p className="text-lg mb-4">
            <strong>Brand:</strong> {product.brands || "Unknown"}
          </p>
          <p className="text-lg mb-4">
            <strong>Ingredients:</strong>{" "}
            {product.ingredients_text || "No ingredients available"}
          </p>

          {/* Nutrients Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-100 p-4 neu-brutal">
              <strong>Energy:</strong> {nutrients.energy || "N/A"} kJ
            </div>
            <div className="bg-yellow-100 p-4 neu-brutal">
              <strong>Fat:</strong> {nutrients.fat || "N/A"} g
            </div>
            <div className="bg-yellow-100 p-4 neu-brutal">
              <strong>Carbohydrates:</strong> {nutrients.carbohydrates || "N/A"} g
            </div>
            <div className="bg-yellow-100 p-4 neu-brutal">
              <strong>Proteins:</strong> {nutrients.proteins || "N/A"} g
            </div>
          </div>
          <div className="bg-yellow-100 p-4 my-6 neu-brutal">
              <strong>Labels:</strong>{" "}
              {product.labels || "N/A"}
            </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProductDetails;

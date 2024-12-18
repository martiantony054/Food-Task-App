import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategoryLoading(true);
      try {
        const response = await fetch("https://world.openfoodfacts.org/categories.json");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCategories(data.tags || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    const fetchProducts = async () => {
      setCategoryLoading(true);
      try {
        const response = await fetch(`https://world.openfoodfacts.org/category/${selectedCategory}.json`);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setCategoryLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="bg-blue-100 min-h-screen">
      <header className="bg-white neu-brutal m-4 p-8">
        <h1 className="text-4xl font-bold mb-4">Filter by Category</h1>
        <p className="text-xl">Select a category to filter food products.</p>
      </header>

      <div className="m-4 bg-yellow-100">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="neu-brutal p-2 bg-yellow-100 w-full"
        >
          <option value="">Select Category</option>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="">Loading Categories...</option>
          )}
        </select>
      </div>

      {categoryLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="loading w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className="neu-brutal p-4 bg-white">
                <img
                  src={product.image_url || "https://via.placeholder.com/150"}
                  alt={product.product_name || "Food product"}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="font-bold text-xl mb-2">{product.product_name || "Unknown Product"}</h3>
                <p className="text-gray-500">{product.brands || "Unknown Brand"}</p>
                <p className="text-gray-500">{product.ingredients_text || "Ingredients not available"}</p>
              </div>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Category;

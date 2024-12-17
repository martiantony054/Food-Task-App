import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardBody, Input } from "@material-tailwind/react";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const navigate = useNavigate();

  // Fetch products based on search term or category
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      let url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(searchTerm)}&json=true`;

      // If category is selected, fetch products by category

      try {
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]); // Fetch on searchTerm or category change

  const handleProductClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <header className="bg-white neu-brutal m-4 p-8">
        <h1 className="text-4xl font-bold mb-4">Fresh Food Facts</h1>
        <p className="text-xl">
          Discover nutritional information about your favorite foods!
        </p>
      </header>

     

      <div className="m-4 bg-yellow-100">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for food products..."
          className="neu-brutal bg-yellow-100"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="loading w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <Card
                key={index}
                className="neu-brutal"
                onClick={() => handleProductClick(product)}
              >
                <CardBody className="p-4">
                  <img
                    src={product.image_url || "https://via.placeholder.com/150"}
                    alt={product.product_name || "Food product"}
                    className="w-full h-48 object-cover mb-4 neu-brutal"
                  />
                  <h3 className="font-bold text-xl mb-2">
                    {product.product_name || "Unknown Product"}
                  </h3>
                  <p className="mb-2">{product.brands || "Unknown Brand"}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-yellow-100 p-2 neu-brutal">
                      <strong>Ingredients:</strong>
                      <br />
                      {product.ingredients_text || "N/A"}
                    </div>
                    <div className="bg-yellow-100 p-2 neu-brutal">
                      <strong>Nutrient Grade/Score</strong>
                      <br />
                      <p className="font-bold text-sm">Grade:</p>
                      {product.nutriscore_grade || "N/A"}
                      <p className="font-bold text-sm">Score:</p>
                      {product.nutriscore_score || "N/A"}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))
          ) : (
            <p className="text-center">No products found</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePreviousPage}
          className="p-2 bg-blue-500 text-white rounded-l"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-xl">
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          className="p-2 bg-blue-500 text-white rounded-r"
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;

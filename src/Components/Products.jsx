import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Card, CardBody, Input } from "@material-tailwind/react";
import Sort from "./Sort";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("product_name");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
  
      // Determine if the search term is a barcode or a name
      const isBarcode = /^\d+$/.test(searchTerm) && searchTerm.length >= 8; // Adjust length as needed for your barcodes
  
      // API endpoint: Use appropriate search parameters for barcode or name
      let url;
      if (isBarcode) {
        url = `https://world.openfoodfacts.org/api/v0/product/${searchTerm}.json`; // For barcode search
      } else {
        url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          searchTerm
        )}&json=true`; // For name search
      }
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        // Handle API response structure
        if (isBarcode) {
          setProducts(data.status === 1 ? [data.product] : []); // Barcode returns a single product
        } else {
          setProducts(data.products || []); // Name search returns a list
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Clear products on error
      } finally {
        setIsLoading(false);
      }
    };
  
    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);
  

  const sortedProducts = products.slice().sort((a, b) => {
    let aValue, bValue;

    if (sortCriteria === "product_name") {
      aValue = a.product_name?.toLowerCase() || "";
      bValue = b.product_name?.toLowerCase() || "";
    } else if (sortCriteria === "nutrition_grades") {
      aValue = a.nutrition_grades || "Z";
      bValue = b.nutrition_grades || "Z";
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleProductClick = (product) => {
    navigate("/productdetails", { state: { product } });
  };

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

  const handleSortCriteriaChange = (value) => {
    setSortCriteria(value);
    setSortOrder("asc");
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="bg-blue-100 min-h-screen translate-y-28">
      <header className="bg-white neu-brutal m-4 p-8">
        <h1 className="text-4xl font-bold mb-4">Fresh Food Facts</h1>
        <p className="text-xl">
          Discover nutritional information about your favorite foods!
        </p>
      </header>

      <div className="m-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for food products..."
          className="neu-brutal bg-yellow-100"
        />
        <Sort
          sortCriteria={sortCriteria}
          sortOrder={sortOrder}
          onCriteriaChange={handleSortCriteriaChange}
          onToggleOrder={toggleSortOrder}
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
                      {product.nutrition_grades || "N/A"}
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
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;

import "./App.css";
import Products from "./Components/Products";
import { Route, Routes } from "react-router-dom";
import Productdetails from "./Components/Productdetails";
import Nav from "./Components/Nav";
import Category from "./Components/Category";
function App() {
  return (
    <>
      <Nav/>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/productdetails" element={<Productdetails/>}/>
        <Route path ='/category' element={<Category/>}/>
      </Routes>
    </>
  );
}

export default App;

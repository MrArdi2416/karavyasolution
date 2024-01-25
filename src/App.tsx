import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { ContactUs } from "./Components/ContactUs/ContactUs";
import { AboutUs } from "./Components/AboutUs/AboutUs";
import { Registration } from "./Components/Registration/Registration";
import { Users } from "./Components/Users/Users";

import Nav from "./Components/Navbar/Nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

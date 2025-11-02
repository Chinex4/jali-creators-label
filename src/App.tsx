import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Resources from "./pages/Resources";
import CreatorRegister from "./pages/register/CreatorRegister";
import BusinessRegister from "./pages/register/BusinessRegister";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F2] text-primary">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/register/creator" element={<CreatorRegister />} />
          <Route path="/register/business" element={<BusinessRegister />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

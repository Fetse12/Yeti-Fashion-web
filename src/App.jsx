import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import EnrollModal from "./components/EnrollModal.jsx";

export default function App() {
  const [enrollOpen, setEnrollOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar onEnrollClick={() => setEnrollOpen(true)} />
                <Home onEnrollClick={() => setEnrollOpen(true)} />
                <EnrollModal isOpen={enrollOpen} onClose={() => setEnrollOpen(false)} />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import ModifyUI from "./pages/ModifyUI";
import AddCategory from "./pages/AddCategory";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
            <Navbar setToken={setToken} />
          </div>
          <hr />
          <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] w-[230px] bg-white shadow z-40">
            <Sidebar />
          </div>
          <div className="flex w-full">
            <div className="ml-[250px] mt-[64px] p-6 w-full text-gray-600 text-base">
              <Routes>
                <Route
                  path="/add-category"
                  element={<AddCategory token={token} />}
                />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/modify" element={<ModifyUI token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

import "./App.css";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasUUID = localStorage.getItem("formData");

    if (!hasUUID) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="App">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;

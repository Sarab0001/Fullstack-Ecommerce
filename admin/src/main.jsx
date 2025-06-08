import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const SetFavicon = () => {
  const [logoImgUrl, setLogoImgUrl] = useState("");
  const getLogo = async () => {
    const response = await axios({
      method: "get",
      url: backendURL + "api/modify/get_logo",
    });
    setLogoImgUrl(response.data.logo_img);
  };
  useEffect(() => {
    getLogo();
  }, []);

  useEffect(() => {
    if (logoImgUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = logoImgUrl;
    }
  }, [logoImgUrl]);

  return null;
};
const Root = () => (
  <BrowserRouter>
    <SetFavicon />
    <App />
  </BrowserRouter>
);
createRoot(document.getElementById("root")).render(<Root />);

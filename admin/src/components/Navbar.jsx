import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const backendURL = import.meta.env.VITE_BACKEND_URL;

const Navbar = ({ setToken }) => {
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

  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[40px]" src={logoImgUrl} alt=" " />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const ModifyUI = () => {
  const [heroImgUrl, setHeroImgUrl] = useState(null);
  const [logoImgUrl, setLogoImgUrl] = useState(null);
  const [color, setColor] = useState("");
  const [getColor, setGetColor] = useState("");
  const [formData, setFormData] = useState({
    description: "",
    number: "",
    email: "",
    address: "",
    social: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },
  });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["facebook", "instagram", "twitter", "youtube"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        social: {
          ...prev.social,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFooterContent = async (e) => {
    e.preventDefault();

    // Merge submittedData (old values) and formData (new inputs)
    const mergedData = {
      ...submittedData,
      ...formData,
      social: {
        ...submittedData?.social,
        ...formData.social,
      },
    };

    try {
      const res = await axios.post(
        backendURL + "api/footer/post_footer",
        mergedData
      );

      if (res.data.success === true) {
        toast.success("Footer info submitted successfully!");
        fetchFooterContent();
      } else {
        toast.error("Error submitting footer info");
      }
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    }
  };

  const fetchFooterContent = async () => {
    try {
      const res = await axios.get(backendURL + "api/footer/get_footer");
      if (res.data.success && res.data.data.length > 0) {
        const latestFooter = res.data.data[res.data.data.length - 1];

        setSubmittedData({
          description: latestFooter.description,
          number: latestFooter.number,
          email: latestFooter.email,
          address: latestFooter.address,
          social: {
            facebook: latestFooter.social.facebook,
            instagram: latestFooter.social.instagram,
            twitter: latestFooter.social.twitter,
            youtube: latestFooter.social.youtube,
          },
        });
      } else {
        toast.error("No footer data found");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching footer content");
    }
  };

  const HandleChangeColor = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${backendURL}api/settings/post_color`, {
      backgroundColor: color,
    });
    if (response.status === 200) {
      setColor(response.data.backgroundColor);
      toast.success("Background color updated successfully!");
      fetchColor();
    } else {
      toast.error("Error updating background color");
    }
  };

  const fetchImages = async () => {
    try {
      const logoRes = await axios.get(`${backendURL}api/modify/get_logo`, {});

      const heroRes = await axios.get(`${backendURL}api/modify/get_hero`, {});

      if (logoRes.data.success && logoRes.data.logo_img) {
        setLogoImgUrl(logoRes.data.logo_img);
      }

      if (heroRes.data.success && heroRes.data.hero_img) {
        setHeroImgUrl(heroRes.data.hero_img);
      }
    } catch (err) {
      console.error("Failed to fetch UI images:", err);
    }
  };
  const fetchColor = async () => {
    try {
      const response = await axios.get(
        `${backendURL}api/settings/get_color`,
        {}
      );
      setGetColor(response.data.backgroundColor);
    } catch (err) {
      console.error("Failed to fetch UI images:", err);
    }
  };

  const HandleUploadHeroImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("hero_img", e.target.hero_img.files[0]);

    try {
      const res = await axios.post(
        `${backendURL}api/modify/upload_hero`,
        formData
      );

      if (res.data.success) {
        toast.success("Hero Image Uploaded Successfully");
        fetchImages();
      } else {
        toast.error("Error Uploading Hero Image");
      }
    } catch (error) {
      console.error("Upload Hero Error:", error);
    }
  };

  const HandleUploadLogo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo_img", e.target.logo_img.files[0]);

    try {
      const res = await axios.post(
        `${backendURL}api/modify/upload_logo`,
        formData
      );

      if (res.data.success) {
        toast.success("Logo Uploaded Successfully");
        fetchImages();
      } else {
        toast.error("Error Uploading Logo");
      }
    } catch (error) {
      console.error("Upload Logo Error:", error);
      toast.error("Something went wrong while uploading Logo");
    }
  };

  useEffect(() => {
    fetchImages();
    fetchColor();
    fetchFooterContent();
  }, []);
  useEffect(() => {
    if (submittedData) {
      setFormData(submittedData);
    }
  }, [submittedData]);

  return (
    <>
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Customize Store UI
      </h2>
      <div className="flex flex-col gap-6 max-w-6xl w-full mx-auto">
        {/* Upload Logo */}
        <div className="flex justify-center items-start bg-gray-100 p-6">
          <div className="flex flex-col gap-6 max-w-6xl w-full">
            <p className="text-sm text-gray-600 mb-4">
              Use the options below to upload or remove the logo for your store.
            </p>
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Upload Logo
                </h3>
                <form onSubmit={HandleUploadLogo}>
                  <input
                    type="file"
                    name="logo_img"
                    accept="image/*"
                    required
                    className="block w-full mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-black hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-200"
                  >
                    Upload Logo
                  </button>
                </form>
              </div>
              {logoImgUrl && (
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  <img
                    src={logoImgUrl}
                    alt="Logo Preview"
                    className="max-h-40 object-contain"
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-6">
              Note: The logo represents your store branding.
              <br />
              For best results, use a high-resolution image with removed
              background.
            </p>
          </div>
        </div>

        {/* Upload Hero Image */}
        <div className="flex justify-center items-start bg-gray-100 p-6">
          <div className="flex flex-col gap-6 max-w-6xl w-full">
            <p className="text-sm text-gray-600 mb-4">
              Use the options below to upload or remove the hero image for your
              homepage.
            </p>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 w-full">
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Upload Hero Image
                  </h3>
                  <form onSubmit={HandleUploadHeroImg}>
                    <input
                      type="file"
                      name="hero_img"
                      accept="image/*"
                      required
                      className="block w-full mb-4 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-black hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-200"
                    >
                      Upload Image
                    </button>
                  </form>
                </div>
                {heroImgUrl && (
                  <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img
                      src={heroImgUrl}
                      alt="Hero Preview"
                      className="max-h-40 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Note: The hero image is the main banner on your homepage.
              <br />
              For best results, use a high-resolution image with removed
              background.
            </p>
          </div>
        </div>
        {/* Update Background color */}
        <div className="flex justify-center items-start bg-gray-100 p-6">
          <div className="flex flex-col gap-6 max-w-6xl w-full">
            <p className="text-sm text-gray-600 mb-4">
              Use the options below to update background color for your store.
            </p>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 w-full">
                <div className="w-full md:w-1/2">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Select Background Color
                  </h3>
                  <form onSubmit={HandleChangeColor}>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-black hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-200"
                    >
                      Update Color
                    </button>
                  </form>
                </div>
                <div className="w-full md:w-1/2 flex items-center justify-center">
                  {/* Display the selected color */}

                  <div className="flex items-center space-x-4 mt-4">
                    {/* Display color box */}
                    <div
                      className="w-20 h-20 rounded border border-gray-300"
                      style={{ backgroundColor: getColor }}
                    ></div>

                    {/* Display hex code as text */}
                    <span className="text-gray-700 font-medium">
                      {getColor}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Note: The hero image is the main banner on your homepage.
            </p>
          </div>
        </div>
        {/* Update Footer Content */}
        <div className="flex justify-center items-start bg-gray-100 p-6">
          <div className="flex flex-col gap-6 max-w-6xl w-full">
            <p className="text-sm text-gray-600 mb-4">
              Use the options below to update footer content for your store.
            </p>

            <div className="bg-white shadow-lg rounded-xl p-6 w-full">
              <h3 className="text-lg font-semibold text-gray-700 mb-6">
                Fill the details
              </h3>

              <form onSubmit={handleFooterContent} className="w-full">
                <div className="flex flex-col lg:flex-row gap-10 w-full">
                  {/* Footer Details */}
                  <div className="flex-1 min-w-[300px]">
                    <h2 className="text-xl font-semibold mb-4">
                      Footer Details
                    </h2>

                    {/* Description */}
                    <div className="mb-4">
                      <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-2 border rounded resize-none"
                      />
                      <span className="text-sm text-gray-700 block mt-1">
                        {submittedData?.description}
                      </span>
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                      <input
                        type="text"
                        name="number"
                        placeholder="Phone Number"
                        value={formData.number}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      />
                      <span className="text-sm text-gray-700 block mt-1">
                        {submittedData?.number}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      />
                      <span className="text-sm text-gray-700 block mt-1">
                        {submittedData?.email}
                      </span>
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      />
                      <span className="text-sm text-gray-700 block mt-1">
                        {submittedData?.address}
                      </span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex-1 min-w-[300px]">
                    <h3 className="text-lg font-medium mb-4">Social Links</h3>

                    {[
                      { name: "facebook", label: "Facebook URL" },
                      { name: "instagram", label: "Instagram URL" },
                      { name: "youtube", label: "YouTube URL" },
                    ].map((social) => (
                      <div className="mb-4" key={social.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {social.label}
                        </label>
                        <input
                          type="text"
                          name={social.name}
                          placeholder={social.label}
                          value={formData.social[social.name]}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                        />
                        <span className="text-sm text-gray-700 block mt-1">
                          {submittedData?.social?.[social.name]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 mt-6 bg-black hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-200"
                >
                  Submit
                </button>
              </form>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              Note: The footer content is the bottom section of your store.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyUI;

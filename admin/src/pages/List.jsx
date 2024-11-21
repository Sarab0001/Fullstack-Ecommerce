import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <ToastContainer />
      <p className="mb-2 text-lg font-semibold">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* List Table Title (Visible on Desktop) */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            className="flex flex-col md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm bg-white rounded-lg shadow-sm"
            key={index}
          >
            {/* Image */}
            <div className="flex justify-center">
              <img className="w-12 h-12 object-cover rounded-md" src={item.image[0]} alt={item.name} />
            </div>

            {/* Name */}
            <p className="font-medium text-gray-700">{item.name}</p>

            {/* Category (Hidden on Mobile) */}
            <p className="hidden md:block text-gray-500">{item.category}</p>

            {/* Price */}
            <p className="font-medium text-gray-800">
              {currency}
              {item.price}
            </p>

            {/* Action */}
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-red-700 font-semibold text-center"
            >
              Remove
            </button>

            {/* Mobile-specific layout */}
            <div className="block md:hidden mt-2 text-gray-500">
              <p>
                <span className="font-semibold">Category:</span> {item.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

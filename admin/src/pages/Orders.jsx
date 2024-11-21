import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h3 className="text-lg font-bold text-gray-700 mb-6">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 items-start border rounded-lg bg-white shadow-md p-5 md:p-8 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            {/* Order Details */}
            <div className="space-y-3">
              <div className="space-y-2">
                {order.items.map((item, itemIndex) => (
                  <div className="flex items-center gap-3" key={itemIndex}>
                    <img
                      className="w-12 h-12 object-cover rounded"
                      src={item.image}
                      alt={item.name}
                    />
                    <p className="text-gray-700">
                      <span className="font-semibold">{item.name}</span> x{" "}
                      {item.quantity}{" "}
                      {item.size && <span className="text-gray-500">({item.size})</span>}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3 text-gray-800">
                <p className="font-medium">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country} -{" "}
                  {order.address.zipcode}
                </p>
                <p className="text-gray-600">{order.address.phone}</p>
              </div>
            </div>

            {/* Payment and Delivery Info */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base">
                <span className="font-semibold">Items:</span> {order.items.length}
              </p>
              <p>
                <span className="font-semibold">Method:</span> {order.paymentMethod}
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.payment ? (
                  <span className="text-green-500 font-semibold">Done</span>
                ) : (
                  <span className="text-red-500 font-semibold">Pending</span>
                )}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>

            {/* Order Amount */}
            <div className="font-bold text-lg text-gray-800 text-center">
              {currency}
              {order.amount}
            </div>

            {/* Status Selector */}
            <div>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="block w-full p-2 border rounded text-gray-700 bg-gray-50 focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

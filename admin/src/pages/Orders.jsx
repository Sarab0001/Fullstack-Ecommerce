import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAllOrders = async () => {
    if (!token) return;
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
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) =>
    (order.address.firstName + " " + order.address.lastName)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-100 text-blue-700";
      case "Packing":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-purple-100 text-purple-700";
      case "Out for delivery":
        return "bg-orange-100 text-orange-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Orders</h3>

      <input
        type="text"
        placeholder="Search by customer name..."
        className="mb-6 w-full md:w-1/3 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-6">
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition-all duration-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-pink-800 mb-2">
                  {order.address.firstName + " " + order.address.lastName}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {order.address.street}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
                <p className="text-sm text-gray-600">{order.address.phone}</p>
              </div>

              <div className="text-sm text-gray-700">
                <p>
                  <strong>Items:</strong> {order.items.length}
                </p>
                <p>
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Payment:</strong> {order.payment ? "Done" : "Pending"}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total:</strong> {currency}
                  {order.amount}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-t pt-2"
                >
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">
                      Qty: {item.quantity} | Size: {item.size}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label className="block mb-1 text-sm font-medium text-gray-600">
                Order Status:
              </label>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className={`w-full md:w-60 p-2 rounded-lg font-medium ${getStatusColor(
                  order.status
                )} border border-gray-300`}
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

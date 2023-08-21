import React, { useState, useEffect } from "react";
import axios from "axios";

const ManufacturerDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("api/orders");
        setOrders(response.data);
      } catch (error) {
        console.log("Error fetching error: ", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Manufacturer Dashboard</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order ID: {order.orderId}
            <br />
            From: {order.from}
            <br />
            To: {order.to}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManufacturerDashboard;

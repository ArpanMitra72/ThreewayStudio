import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateOrder.css";
import api from "../../services/api";

const CreateOrder = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    orderId: "",
    from: "",
    to: "",
    quantity: "",
    pickupAddress: "",
    transporter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const generatedOrderId = generateOrderId();

    try {
      const response = await api.post("/orders/createorders", {
        ...order,
        orderId: generatedOrderId,
      });
      console.log("Order Created: ", response.data);
      setOrder({
        orderId: "",
        from: "",
        to: "",
        quantity: "",
        pickupAddress: "",
        transporter: "",
      });
    } catch (error) {
      console.error("Error creating order: ", error);
    }
  };

  const generateOrderId = () => {
    const timestamp = Date.now();
    const uniqueId = Math.floor(Math.random() * 1000);
    return `XB${uniqueId}${timestamp}`;
  };

  const handleDashboardClick = () => {
    // Navigate to the "/manufacturerdashboard" route
    navigate("/manufacturerdashboard");
  };

  return (
    <div className="fullPage">
      <div className="CreateOrderStyle">
        <h2>Create New Order</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="From"
            name="from"
            value={order.from}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="To"
            name="to"
            value={order.to}
            onChange={handleChange}
          />
          <select
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
          >
            <option value="">Select Quantity</option>
            <option value="1">1 ton</option>
            <option value="2">2 tons</option>
            <option value="3">3 tons</option>
          </select>
          <input
            type="text"
            placeholder="Pickup Address"
            name="pickupAddress"
            value={order.pickupAddress}
            onChange={handleChange}
          />
          <select
            name="transporter"
            value={order.transporter}
            onChange={handleChange}
          >
            <option value="">Select Transporter</option>
            <option value="ShyamTransporter">Shyam Transporter</option>
          </select>
          <button type="submit">Submit Request</button>
          <button type="button" onClick={handleDashboardClick}>
            Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;

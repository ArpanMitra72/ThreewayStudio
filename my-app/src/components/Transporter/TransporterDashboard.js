import React, { useState } from "react";
import axios from "axios"; // You might not need this if not making API calls
import api from "../../services/api";

const TransporterDashboard = () => {
  const [orderId, setOrderId] = useState("");
  const [selectedOrderPrice, setSelectedOrderPrice] = useState("");
  const [reply, setReply] = useState("");

  const handleSendReply = async () => {
    try {
      // You might want to replace this with your actual API call
      const response = await api.post("/orders/sendreply", {
        orderId: orderId, // Hardcoded order ID
        reply: reply,
        price: selectedOrderPrice,
      });
      console.log("Reply sent:", response.data);
      setOrderId("");
      setSelectedOrderPrice("");
      setReply("");
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div>
      <h2>Transporter Dashboard</h2>
      <label>
        Order ID:{" "}
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Price:{" "}
        <input
          type="number"
          value={selectedOrderPrice}
          onChange={(e) => setSelectedOrderPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Reply:{" "}
        <textarea value={reply} onChange={(e) => setReply(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSendReply}>Send Reply</button>
    </div>
  );
};

export default TransporterDashboard;

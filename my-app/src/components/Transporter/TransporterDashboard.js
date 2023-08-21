import React, { useState, useEffect } from "react";
import axios from "axios";

const TransporterDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const fetchedAssignedOrders = async () => {
      try {
        const response = await axios.get("api/assignedorders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching assigned orders:", error);
      }
    };
    fetchedAssignedOrders();
  }, []);

  const handleOrderSelect = (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    setSelectedOrder(order);
  };

  const handleSendReply = async () => {
    try {
      const response = await axios.post("/api/sendreply", {
        orderId: selectedOrder._id,
        reply,
      });
      console.log("Reply sent: ", response.data);
      setReply("");
      setSelectedOrder(null);
    } catch (error) {
      console.error("Error sending reply: ", error);
    }
  };

  return (
    <div>
      <h2>Transporter Dashboard</h2>
      <select onChange={(e) => handleOrderSelect(e.target.value)}>
        <option value="">Select an Order</option>
        {orders.map((order) => (
          <option key={order._id} value={order._id}>
            {order.orderId}
          </option>
        ))}
      </select>
      {selectedOrder && (
        <div>
          <h3>Selected Order: {selectedOrder.orderId}</h3>
          <p>From: {selectedOrder.from}</p>
          <p>To: {selectedOrder.to}</p>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Enter your reply..."
          />
          <button onClick={handleSendReply}>Send Reply</button>
        </div>
      )}
    </div>
  );
};

export default TransporterDashboard;

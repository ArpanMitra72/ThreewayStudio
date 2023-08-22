import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const LandingPage = () => {
  const { role } = useParams();
  console.log("Role in LandingPage:", role);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get(`/orders/landingpage?role=${role}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetchins orders: ", error);
    }
  };

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.order_id.includes(search) ||
        order.to.includes(search) ||
        order.from.includes(search)
    );
    setFilteredOrders(filtered);
  }, [search, orders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>
        Welcome to the{" "}
        {role === "manufacturer" ? "Manufacturer" : "Transporter"}
        Landing Page
      </h2>
      <input
        type="text"
        placeholder="Search by order_id, To, or From"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredOrders.map((order) => (
          <li key={order._id}>
            <a href={`/order/${order._id}`}>{order.order_id}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LandingPage;

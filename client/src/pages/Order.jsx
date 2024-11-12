import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import apiClient from "../utils/apiClient";
import { useAuth } from "../context/AuthContext";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    } else if (user) {
      const fetchOrders = async () => {
        try {
          const response = await apiClient.get("/order");
          setOrders(response.data);
        } catch (err) {
          setError("Errore durante il recupero degli ordini.");
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [user, authLoading, navigate]); // Esegui quando l'autenticazione è pronta

  if (authLoading || loading) {
    return <p>Caricamento degli ordini...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (orders.length === 0) {
    return <p className="text-center">Non hai ancora effettuato ordini.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4  pt-20">
        <h1 className="text-2xl font-bold mb-4">I miei ordini</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="order-card bg-white rounded-lg shadow-md p-4"
            >
              <h2 className="text-xl font-semibold mb-2">
                Ordine #{order._id}
              </h2>
              <p className="text-gray-600 mb-2">
                Data: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                Totale: €{order.total.toFixed(2)}
              </p>
              <h3 className="font-medium mb-2">Prodotti:</h3>
              <ul className="list-disc list-inside mb-4">
                {order.items.map((item) => (
                  <li key={item.productId}>
                    {item.name} - {item.quantity} x €{item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-medium">
                Stato: <span className="capitalize">{order.status}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Order;

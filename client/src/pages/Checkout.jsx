import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [shippingAddress, setAddress] = useState("");
  const [errors, setErrors] = useState({ email: false, shippingAddress: false });
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);
  const [loading, setLoading] = useState(false); // Stato per la chiamata al server
  const [serverError, setServerError] = useState(null); // Stato per eventuali errori del server

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handlePurchase = async () => {
    const newErrors = {
      email: !email,
      shippingAddress: !shippingAddress,
    };
    setErrors(newErrors);

    if (newErrors.email || newErrors.shippingAddress) return;

    setLoading(true);
    setServerError(null); // Resetta eventuali errori precedenti

    try {
    console.log(cartItems);
      const response = await axios.post("http://localhost:5555/api/order", {
        email,
        shippingAddress,
        items: cartItems,
        total: calculateTotal(),
      });

      if (response.status === 201) {
        setPurchaseCompleted(true);
        localStorage.removeItem("cart"); // Svuota il carrello
        setCartItems([]); // Aggiorna lo stato del carrello
      }
    } catch (error) {
      setServerError(
        "Si è verificato un errore durante la creazione dell'ordine. Riprova.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !purchaseCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom">
        <h1 className="text-2xl font-bold">Il tuo carrello è vuoto</h1>
      </div>
    );
  }

  if (purchaseCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom">
        <h1 className="text-2xl font-bold text-center">
          Acquisto completato! Grazie per il tuo ordine.
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-custom p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>

          {/* Messaggio di errore del server */}
          {serverError && (
            <p className="text-red-500 text-center mb-4">{serverError}</p>
          )}

          {/* Lista dei prodotti */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Prodotti nel carrello:
            </h2>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded"
                    />
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                  </div>
                  <span>€{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="font-bold mt-4 text-right">
              Totale: €{calculateTotal()}
            </p>
          </div>

          {/* Form Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Indirizzo Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-bg-custom-red focus:border-bg-custom-red`}
              placeholder="Inserisci la tua email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                La mail è obbligatoria.
              </p>
            )}
          </div>

          {/* Form Indirizzo */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Indirizzo di Spedizione
            </label>
            <textarea
              id="address"
              value={shippingAddress}
              onChange={(e) => setAddress(e.target.value)}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.shippingAddress ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-bg-custom-red focus:border-bg-custom-red`}
              placeholder="Inserisci il tuo indirizzo completo"
            />
            {errors.shippingAddress && (
              <p className="text-red-500 text-sm mt-1">
                L'indirizzo è obbligatorio.
              </p>
            )}
          </div>

          <button
            onClick={handlePurchase}
            className="Main-button w-full py-2"
            disabled={loading}
          >
            {loading ? "Caricamento..." : "Completa Acquisto"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;

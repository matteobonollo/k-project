import React, { useState, useEffect } from "react";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({ email: false, address: false });
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePurchase = () => {
    const newErrors = {
      email: !email,
      address: !address,
    };
    setErrors(newErrors);

    if (!newErrors.email && !newErrors.address) {
      setPurchaseCompleted(true);
      localStorage.removeItem("cart"); // Svuota il carrello
      setCartItems([]); // Aggiorna lo stato del carrello
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>

        {/* Lista dei prodotti */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Prodotti nel carrello:</h2>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center space-x-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded" />
                  <span>{item.name} (x{item.quantity})</span>
                </div>
                <span>€{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="font-bold mt-4 text-right">Totale: €{calculateTotal()}</p>
        </div>

        {/* Form Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <p className="text-red-500 text-sm mt-1">La mail è obbligatoria.</p>
          )}
        </div>

        {/* Form Indirizzo */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Indirizzo di Spedizione
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`mt-1 block w-full px-4 py-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md focus:ring-bg-custom-red focus:border-bg-custom-red`}
            placeholder="Inserisci il tuo indirizzo completo"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">L'indirizzo è obbligatorio.</p>
          )}
        </div>

        <button
          onClick={handlePurchase}
          className="Main-button w-full py-2"
        >
          Completa Acquisto
        </button>
      </div>
    </div>
  );
}

export default Checkout;

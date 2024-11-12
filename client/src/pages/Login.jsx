import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await login(credentials);
      if (success) {
        window.location.href = "http://localhost:3333/collection";
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Accedi</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Inserisci la tua email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Inserisci la tua password"
              />
            </div>
            <button type="submit" className="w-full Main-button">
              Accedi
            </button>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <p className="text-center text-gray-600 mt-4">
            Non hai un account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Registrati
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

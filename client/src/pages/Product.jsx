import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from "axios";


function Product(){
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(
              `http://localhost:5555/api/collection/${id}`
            ); // Cambia con la tua API
            setProduct(response.data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProduct();
      }, []);

      if (loading) return <p>Loading collections...</p>;
      if (error) return <p>Error: {error}</p>;

    return(
        <>
        <Navbar/>
        <div className="flex pt-20">CIAO</div>
        
        </>

    );

}

export default Product;
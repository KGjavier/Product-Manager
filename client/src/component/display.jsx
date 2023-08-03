import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom"

const Display = (props) => {
    const [allProduct, setAllProduct] = useState([]);

    const deleteProduct = (productId) => {
        axios.delete("http://localhost:8000/api/product/" + productId)
            .then(() => {
                console.log("Successful deleted from backend");
                removeFromDom(productId);
                window.location.reload();
            })
            .catch((err) => console.log(err));  
    }
    
    const removeFromDom = (productId) => {
        setAllProduct(allProduct.filter(p => p.id !== productId));
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/product")
            .then((res) => setAllProduct(res.data))
            .catch((err) => console.log(err));
    }, []);
        
    return (
        <div>
            <h1>All Products:</h1>
            <div className="list">
                {allProduct.length > 0 &&
                    allProduct.map((product, index) => {
                        return (
                            <div key={index}>
                                <Link to={'/' + product._id}>
                                    <p className="product__title">{product.title}</p>
                                </Link>
                                <span>
                                <Link className="update" to={'/edit/' + product._id}>Update</Link>
                                <button onClick={()=>deleteProduct(product._id)}>Delete</button>    
                                </span>    
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Display;
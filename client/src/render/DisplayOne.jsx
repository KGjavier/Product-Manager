import{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DisplayOne = (props) => {
    const { id } = useParams()
    const [product, setProduct] = useState({});
    
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/product/" + id)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <div className="container">
            <div className="">
                <h2>{product.title}</h2>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
            </div>
        </div>
    );
};

export default DisplayOne;
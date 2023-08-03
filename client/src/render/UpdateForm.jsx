import{useState,useEffect} from "react";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const UpdateForm = (props) => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [allProduct, setAllProduct] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    const deleteProduct = (productId) => {
        axios.delete("http://localhost:8000/api/product/" + productId)
            .then(() => {
                console.log("Successful deleted from backend");
                removeFromDom(productId);
                navigate('/', { replace: true });
            })
            .catch((err) => console.log(err));   
    }
    
    const removeFromDom = (productId) => {
        setAllProduct(allProduct.filter(p => p.id !== productId));
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/product/" + id)
            .then(res => {
                setTitle(res.data.title)
                setPrice(res.data.price)
                setDescription(res.data.description)
            })
            .catch(err => console.log(err))
    }, [id])
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newProduct = {
            title,
            price,
            description
        };
        axios
            .put("http://localhost:8000/api/product/" + id, newProduct)
            .then(() => {
                console.log("Update successful on backend");
            })
            .catch((err) => {
                console.log(err)
                const errorRes = err.response.data.error.errors;
                const errorArray = [];

                for (const key of Object.keys(errorRes)) {
                errorArray.push(errorRes[key].message);
                }
                setErrors(errorArray);
            });
        
        //navigate('/' + id, { replace: true });
    }
    
        
    return (
        <div>
            <h1>Product Manager</h1>
            <form onSubmit={onSubmitHandler}>
                    {errors.length > 0 && errors.map((error, i) => (
                    <p key={i}
                        className="text-danger">
                        {error}
                    </p>
                        
                ))}
                <div className="title">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="price">
                    <label>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="description">
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="create">
                    <button className="update 2">Update</button>
                    <button onClick={() => deleteProduct(id)}>Delete</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;
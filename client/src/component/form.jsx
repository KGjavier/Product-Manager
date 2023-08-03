import{useState} from "react";
import axios from "axios";
import React from "react";

const Form = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newProduct = {
            title,
            price,
            description
        };
        axios
            .post("http://localhost:8000/api/product", newProduct)
            .then(() => console.log("Creation successful on backend"))
            .catch((err) => {
                    console.log(err)
                    const errorRes = err.response.data.error.errors;
                    const errorArray = [];

                    for (const key of Object.keys(errorRes)) {
                        errorArray.push(errorRes[key].message);
                    }
                    setErrors(errorArray);
            });
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
                    <button>Create</button>
                </div>
            </form>
        </div>
    );
};

export default Form;

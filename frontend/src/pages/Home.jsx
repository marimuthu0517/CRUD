import { useEffect, useState } from "react";

function Home() {

    const API_URL = "http://localhost:3000/product";

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: ""
    });

    const [editId, setEditId] = useState(null);


    // GET PRODUCTS
    const getProducts = async () => {
        try {

            const response = await fetch(API_URL);

            const data = await response.json();

            setProducts(data);

        } catch (error) {

            console.log(error);

        }
    };


    // LOAD PRODUCTS
    useEffect(() => {

        getProducts();

    }, []);


    // HANDLE INPUT
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    // CREATE / UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editId) {

                // UPDATE

                await fetch(`${API_URL}/${editId}`, {

                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(form)

                });

                setEditId(null);

            } else {

                // CREATE

                await fetch(API_URL, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(form)

                });

            }


            setForm({
                name: "",
                price: "",
                description: ""
            });


            getProducts();

        } catch (error) {

            console.log(error);

        }

    };


    // EDIT
    const editProduct = (product) => {

        setEditId(product._id);

        setForm({
            name: product.name,
            price: product.price,
            description: product.description
        });

    };


    // DELETE
    const deleteProduct = async (id) => {

        try {

            await fetch(`${API_URL}/${id}`, {

                method: "DELETE"

            });

            getProducts();

        } catch (error) {

            console.log(error);

        }

    };


    return (

        <div className="home">

            <h1>Product Management</h1>


            {/* FORM */}

            <form
                className="product-form"
                onSubmit={handleSubmit}
            >

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />


                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={form.price}
                    onChange={handleChange}
                    required
                />


                <input
                    type="text"
                    name="description"
                    placeholder="Product Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />


                <button type="submit">

                    {editId
                        ? "Update Product"
                        : "Add Product"}

                </button>

            </form>


            {/* PRODUCTS */}

            <h2>Products</h2>


            <div className="products">

                {products.map((product) => (

                    <div
                        className="product-card"
                        key={product._id}
                    >

                        <h3>
                            {product.name}
                        </h3>


                        <h4>
                            ₹{product.price}
                        </h4>


                        <p>
                            {product.description}
                        </p>


                        <button
                            onClick={() =>
                                editProduct(product)
                            }
                        >
                            Edit
                        </button>


                        <button
                            className="delete"
                            onClick={() =>
                                deleteProduct(product._id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default Home;
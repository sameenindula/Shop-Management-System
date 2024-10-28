import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProductType from "../type/ProductType";
import CategoryType from "../type/categoryType";

function Product() {

    const {isAuthenticated,jwtToken}=useAuth();
    const [product, setProduct] = useState<ProductType[]>([]);
    const [ProductName, setProductName] = useState<string>("");
    const [price, setPrice] = useState<number>(0.0);
    const [description, setDescription] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(0);
    const [category, setCategories] = useState<CategoryType[]>([]);
    const [productEditing,setProductEditing] = useState<ProductType | null>(null);
    const [productDeleting,setPRoductDeleting]=useState<number>();


    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };
    
    


    // Loading Categories from the backend
    async function loadCategories() {
        try {
            const response = await axios.get("http://localhost:8080/category",config);
            setCategories(response.data);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    }

    function editProduct(product:ProductType){
        setProductEditing(product);
        setProductName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setCategoryId(product.category?.id);

    }

    async function hadeleSubmit(){
        const data={
            name:ProductName,
            price:price,
            description:description,
            categoryId:categoryId
        }
        try {
            await axios.post("http://localhost:8080/products",data,config);
            loadProduct();
            setProductName("");
            setPrice(0);
            setDescription("");
            setCategoryId(0);
        } catch (error:any) {
            console.log(error);
            
        }
    }

    // Handling form inputs
    function handleProductName(event: any) {
        setProductName(event.target.value);
    }

    function handlePrice(event: any) {
        setPrice(event.target.value);
    }

    function handleDescription(event: any) {
        setDescription(event.target.value);
    }

    function handleCategoryId(event: any) {
        setCategoryId(event.target.value);
    }

    // Loading Products from the backend
    async function loadProduct() {
        const response = await axios.get("http://localhost:8080/products",config);
        setProduct(response.data);
    }

    async function deleteProduct(productId:number){
        try {
            await axios.delete(`http://localhost:8080/products/${productId}`,config);

            loadProduct();

        } catch (error) {
            console.log(error)
            
        }
    }

    

    async function updateProduct(){
        const data = {
            name: ProductName,
            price: price,
            description: description,
            categoryId: categoryId
        }; 
        try {
            await axios.put("http://localhost:8080/products/" + productEditing?.id, data,config);
            setProductEditing(null);
            loadProduct(); // Call it only once here
            setProductName("");
            setPrice(0);
            setDescription("");
            setCategoryId(0);
        } catch (error) {
            console.log(error);
        }
    }
    

        useEffect(function () {

            if (isAuthenticated) {
                loadProduct();
                loadCategories();
            }
        }, [isAuthenticated])
        
        

    return (
        <div className="container mx-auto py-5">
            <h1 className="text-5xl font-bold mb-8 text-center text-gray-700">Product</h1>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white shadow-lg">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Product ID</th>
                            <th className="py-3 px-6 text-left">Product Name</th>
                            <th className="py-3 px-6 text-left">Product Price</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {product.map((product) => (
                            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{product.id}</td>
                                <td className="py-3 px-6 text-left">{product.name}</td>
                                <td className="py-3 px-6 text-left">{product.price}</td>
                                <td className="py-3 px-6 text-left">
                                    <button onClick={()=>editProduct(product)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button onClick={()=>deleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Product Form */}
                <form className="max-w-md mx-auto bg-white p-6 rounded shadow-lg mt-6">
                    <div>
                        <label className="text-xl block mb-2">Product Name</label>
                        <input value={ProductName} type="text" onChange={handleProductName} className="border border-gray-300 p-2 rounded w-full h-[50px] mb-4" required/>
                    </div>
                    <div>
                        <label className="text-xl block mb-2">Price</label>
                        <input
                            value={price}
                            type="number"
                            onChange={handlePrice}
                            className="border border-gray-300 p-2 rounded w-full h-[50px] mb-4"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xl block mb-2">Description</label>
                        <input
                            value={description}
                            type="text"
                            onChange={handleDescription}
                            className="border border-gray-300 p-2 rounded w-full h-[50px] mb-4"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xl block mb-2">Category</label>
                        <select
                            value={categoryId}
                            onChange={handleCategoryId}
                            className="border border-gray-300 p-2 rounded w-full h-[50px] mb-4"
                            required
                        >
                            <option value="">Please select a category</option>
                            {category.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {productEditing ?(
                            <>
                                <button onClick={updateProduct} type="button" className="bg-green-500 hover:bg-green-600 text-white font-bold  px-6 rounded h-[50px]"> Update Product</button>

                            </>
                        ):(
                            <>
                                <button onClick={hadeleSubmit} type="button" className="bg-green-500 hover:bg-green-600 text-white font-bold  px-6 rounded h-[50px]"> Create Product</button>

                            </>
                        )}

                    </div>
                </form>
            </div>
        </div>
    );
}

export default Product;

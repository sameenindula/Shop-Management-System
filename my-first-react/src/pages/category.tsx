import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CategoryType from "../type/categoryType";


function Category() {
const [categories, setCategories] = useState<CategoryType[]>([]);
const [categoryName, setCategoryName] = useState<string>("");
const {isAuthenticated,jwtToken}=useAuth();

const config = {
    headers: {
        Authorization: `Bearer ${jwtToken}`
    }
};
useEffect(function () {

    if (isAuthenticated) {

        loadCategories();
    }
}, [isAuthenticated])





async function loadCategories() {
    try {
    const response = await axios.get("http://localhost:8080/category",config);
    setCategories(response.data);
    } catch (error) {
    console.error("Error loading categories:", error);
    }
}

function handleCategoryName(event: any) {
    setCategoryName(event.target.value);
}

async function handleSubmit(event: any) {
    event.preventDefault();  // Prevent form reload
    const data = {
    name: categoryName,
};

try {
    const response = await axios.post("http://localhost:8080/category", data,config);
    console.log(response);
    loadCategories();  // Refresh category list after creation
    } catch (error) {
    console.error("Error creating category:", error);
    }
}

return (
    <div className="container mx-auto p-6 bg-cover bg-center">
    <h1 className="text-5xl font-bold mb-4 text-center">Category</h1>


    <div className="flex justify-center items-center ">
    <div className="bg-gray-50 shadow-lg rounded-lg p-6 w-1/2 text-center mb-4">
        {categories &&
        categories.map((category: CategoryType) => {
            return (
                <div key={category.id} className="border-b border-gray-100 shadow-sm p-2">
                    {category.name}
                </div>);
        })}
    </div>
    </div>

    <div className="flex justify-center items-center ">
    <div className="bg-white shadow-2xl rounded-lg p-6 w-1/2 text-center mb-4">
        <h2 className="text-2xl font-semibold mb-8 flex justify-center">Create category</h2>

        <form onSubmit={handleSubmit} className="flex justify-center">
            <label className="text-xl">
                Category Name
            </label>
            <input type="text" onChange={handleCategoryName} value={categoryName} className="border border-gray-300 p-2 rounded w-[350px] h-[50px] mb-4" required/>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold  px-6 rounded h-[50px]"> Create Category</button>
        </form>
    </div>
    </div>
    
    </div>
    );
}

export default Category;

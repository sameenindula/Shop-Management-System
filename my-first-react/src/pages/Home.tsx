import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const [username, setUsername] = useState<string>("");
    const { logout } = useAuth();

    function handleInputChange(event: any) {
        setUsername(event.target.value);
    }

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 md:p-10"
            style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080?text=Supermarket)' }} // Replace with actual supermarket image URL
        >
            <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-xl">
                <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-6">Welcome, {username}</h1>

                <div className="flex flex-col space-y-4">
                    {/* Links styled as buttons */}
                    <Link to="/contactus" className="custom-button">Contact Us</Link>
                    <Link to="/product" className="custom-button">Product</Link>
                    <Link to="/category" className="custom-button">Category</Link>
                    <Link to="/order" className="custom-button">Order</Link>

                    {/* Logout button with similar styling */}
                    <button onClick={logout} className="custom-button">Logout</button>
                </div>
            </div>
        </div>
    );
}

// Tailwind CSS for button styling
const buttonStyle = `custom-button py-3 px-6 rounded-lg font-medium text-gray-900 bg-white shadow-lg shadow-black/30 
    hover:shadow-xl hover:bg-gray-100 transform transition-all duration-300 ease-in-out text-center 
    focus:outline-none focus:ring-2 focus:ring-gray-400`;

export default Home;

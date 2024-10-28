import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import OrderType from "../../type/OrderType";

function Order() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const { isAuthenticated, jwtToken } = useAuth();

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            loadOrders();
        }
    }, [isAuthenticated]);

    async function loadOrders() {
        try {
            const response = await axios.get("http://localhost:8080/orders", config);
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-6xl font-bold mb-10 text-center text-blue-700 p-4 rounded-lg bg-gradient-to-r from-blue-200 to-purple-3 00 shadow-lg">
                Orders
            </h1>
            <div className="flex justify-end mb-6">
                <Link
                    to="/orders/CreateOrder"
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Create Order
                </Link>
            </div>
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
                <thead className="bg-gray-900 text-white uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-4 px-6 text-left">Order ID</th>
                        <th className="py-4 px-6 text-left">Order Date and Time</th>
                        <th className="py-4 px-6 text-left">Total Amount</th>
                        <th className="py-4 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-800 text-sm font-light">
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300 ease-in-out">
                            <td className="py-4 px-6 text-left">{order.id}</td>
                            <td className="py-4 px-6 text-left">{new Date(order.orderDateTime).toLocaleString()}</td>
                            <td className="py-4 px-6 text-left">{order.totalPrice.toFixed(2)}</td>
                            <td className="py-4 px-6 text-left flex space-x-2">
                                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-purple-500 hover:to-blue-500 transition duration-300 transform hover:scale-105 shadow-md">
                                    Edit
                                </button>
                                <button className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-full hover:from-red-700 hover:to-red-500 transition duration-300 transform hover:scale-105 shadow-md">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Order;

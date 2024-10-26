import axios from "axios";
import { useEffect, useState } from "react";
import OrderType from "../../type/OrderType";


function Order() {

    const [orders,setOrders]= useState<OrderType[]>([]);

    async function loadOrders(){
        try {
            const response= await axios.get("http://localhost:8080/orders")
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        loadOrders();
    },[])
    return (
        <div className="container mx-auto py-5">
            <h1 className="text-5xl font-bold mb-8 text-center text-gray-700">Order</h1>
            <div>
                <link to="/orders/Createrder" rel="stylesheet" href="" />
                <table className="min-w-full border border-gray-300 bg-white shadow-lg">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Order ID</th>
                            <th className="py-3 px-6 text-left">Order Date and Time</th>
                            <th className="py-3 px-6 text-left">Total Amount</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{order.id}</td>
                                <td className="py-3 px-6 text-left">{order.orderDateTime.toLocaleString()}</td>
                                <td className="py-3 px-6 text-left">{order.totalPrice}</td>
                                <td className="py-3 px-6 text-left">
                                    <button  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button  className="bg-red-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Order;

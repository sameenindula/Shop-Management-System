import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProductType from "../../type/ProductType";

function CreateOrder() {
    const {isAuthenticated,jwtToken}=useAuth();

    const [products, setProducts] = useState<ProductType[]>([]);
    const [orderProducts, setOrderProducts] = useState<ProductType[]>([]);
    const [total, setTotal] = useState<number>(0);
    const orderRef = useRef<HTMLDivElement | null>(null); // Ref for the order container


    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    };

    useEffect(function () {

        if (isAuthenticated) {
            loadProducts();
        }
    }, [isAuthenticated])


    // Load products from the API
    async function loadProducts() {
        try {
            const response = await axios.get("http://localhost:8080/products",config);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    // Add product to the order and update the total
    function addProductToOrder(product: ProductType) {
        const updatedOrder = [...orderProducts, product];
        setOrderProducts(updatedOrder);
        setTotal(prevTotal => parseFloat((prevTotal + product.price).toFixed(2)));

        // Scroll to the bottom of the order list
        if (orderRef.current) {
            orderRef.current.scrollTop = orderRef.current.scrollHeight;
        }
    }
    const navigate=useNavigate();

    async function saveOrder(){
        var productIds:any=[];

        orderProducts.map(function(product){
            productIds.push(product.id);
        })
        try {
            await axios.post("http://localhost:8080/orders",{productIds:productIds},config);

            navigate("/order");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            {/* Sidebar for Products List */}
            <div className="w-[350px] border-r border-gray-300 p-6 bg-white shadow-md">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">Products</h2>

                {/* Scrollable box for product list */}
                <div className="h-[500px] overflow-y-auto border border-gray-200 rounded-lg shadow-inner bg-gray-50 p-4">
                    <div className="space-y-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => addProductToOrder(product)}
                                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg shadow-sm p-4 cursor-pointer transition duration-300 transform hover:scale-105"
                            >
                                <div className="text-lg font-semibold text-gray-900 mb-1">{product.name}</div>
                                <div className="text-gray-500 text-sm mb-2">{product.category?.name}</div>
                                <div className="text-lg font-semibold text-blue-600 text-right">${product.price.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* New Order Section */}
            <div className="p-8 flex-1 bg-white shadow-md">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">New Order</h2>
                
                <p className="text-gray-600 mb-6">Select products from the left to add them to your new order.</p>

                {/* Scrollable box for the order list */}
                <div className="border border-gray-200 rounded-lg shadow-inner bg-gray-50">
                    <div
                        ref={orderRef}
                        className="h-[500px] overflow-y-auto p-0"
                    >
                        <table className="w-full text-left text-gray-700 border-separate border-spacing-0">
                            <thead className="bg-gray-200 sticky top-0 z-10">
                                <tr className="text-gray-500">
                                    <th className="py-3 px-4">ID</th>
                                    <th className="py-3 px-4">Description</th>
                                    <th className="py-3 px-4 text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderProducts.map((product, index) => (
                                    <tr key={`${product.id}-${index}`} className="hover:bg-gray-50 transition duration-300">
                                        <td className="border-b py-3 px-4">{product.id}</td>
                                        <td className="border-b py-3 px-4">{product.name}</td>
                                        <td className="border-b py-3 px-4 text-right">${product.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Fixed Total Row */}
                    <div className="p-4 border-t border-gray-300 bg-white">
                        <table className="w-full">
                            <tbody>
                                <tr>
                                    <td colSpan={2} className="text-right py-2 font-semibold text-gray-700">
                                        Total
                                    </td>
                                    <td className="py-2 text-blue-600 font-bold text-right">
                                        ${total.toFixed(2)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button  onClick={saveOrder} className="bg-red-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-red-600">Place Order</button>

            </div>
        </div>
    );
}

export default CreateOrder;

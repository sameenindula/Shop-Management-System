package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.service.OrderService;
import com.example.demo.service.ProductService;



@RestController
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();

        return ResponseEntity.status(200).body(orders);
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderDTO) {
        Order order = new Order();
        order.setTotalPrice(0.0);
        
        //get product Ids from order dto to productIds array
        List<Long> productIds = orderDTO.getProductIds();

        List<Product> orderedProducts = new ArrayList<>();

        productIds.forEach(productId -> {
            //get product by the product Id
            Product product = productService.getProductById(productId);

            //add this product to order
            if(product != null) {

                orderedProducts.add(product);

                //set order's total price
                order.setTotalPrice(order.getTotalPrice() + product.getPrice());
            }
        });
        
        order.setOrderedProducts(orderedProducts);
        
        //save the order in DB
        orderService.createOrder(order);

        return ResponseEntity.status(201).body(order);

    }
}
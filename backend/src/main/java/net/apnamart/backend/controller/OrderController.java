package net.apnamart.backend.controller;

import net.apnamart.backend.model.OrderDto;
import net.apnamart.backend.service.Impl.OrderServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderServiceImpl;

    @PostMapping("/place/{id}")
    public ResponseEntity<OrderDto> placeOrder(@PathVariable Long id, @RequestBody OrderDto orderDto) {
        OrderDto placedOrder = orderServiceImpl.placeOrder(id, orderDto);
        return ResponseEntity.ok(placedOrder);
    }
}


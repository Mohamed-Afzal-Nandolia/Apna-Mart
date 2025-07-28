package net.apnamart.backend.controller;

import net.apnamart.backend.model.ItemDto;
import net.apnamart.backend.model.OrderDto;
import net.apnamart.backend.model.StripeResponse;
import net.apnamart.backend.service.Impl.OrderServiceImpl;
import net.apnamart.backend.service.Impl.StripeServiceImpl;
import net.apnamart.backend.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderServiceImpl orderServiceImpl;

    @Autowired
    private StripeServiceImpl stripeServiceImpl;

    @PostMapping("/place/{id}")
    public ResponseEntity<OrderDto> placeOrder(@PathVariable Long id, @RequestBody OrderDto orderDto) {
        OrderDto placedOrder = orderServiceImpl.placeOrder(id, orderDto);
        return ResponseEntity.ok(placedOrder);
    }
    @PostMapping("/checkout")
    public ResponseEntity<StripeResponse> checkoutProducts(@RequestBody ItemDto itemDto){
        StripeResponse stripeResponse = stripeServiceImpl.checkout(itemDto);
        return ResponseEntity.status(HttpStatus.OK).body(stripeResponse);
    }
}


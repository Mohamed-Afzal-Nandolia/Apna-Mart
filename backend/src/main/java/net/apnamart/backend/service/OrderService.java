package net.apnamart.backend.service;

import net.apnamart.backend.model.OrderDto;

public interface OrderService {
    public OrderDto placeOrder(OrderDto orderDto);
}

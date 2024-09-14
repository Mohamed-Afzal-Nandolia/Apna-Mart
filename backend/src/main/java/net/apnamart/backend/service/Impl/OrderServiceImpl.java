package net.apnamart.backend.service.Impl;

import net.apnamart.backend.entity.Item;
import net.apnamart.backend.entity.Order;
import net.apnamart.backend.entity.OrderItem;
import net.apnamart.backend.entity.User;
import net.apnamart.backend.exception.ResourceNotFoundException;
import net.apnamart.backend.model.OrderDto;
import net.apnamart.backend.model.OrderItemDto;
import net.apnamart.backend.repository.ItemRepository;
import net.apnamart.backend.repository.OrderRepository;
import net.apnamart.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemRepository itemRepository;

    public OrderDto placeOrder(Long id, OrderDto orderDto) {
        ModelMapper modelMapper = new ModelMapper();
        // Fetch user
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Create Order entity
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("Pending");

        // Set OrderItems
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDto orderItemDto : orderDto.getOrderItems()) {
            Item item = itemRepository.findById(orderItemDto.getItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setItem(item);
            orderItem.setQuantity(orderItemDto.getQuantity());
            orderItem.setPriceAtPurchase(item.getI_price());
            orderItem.setOrder(order);

            orderItems.add(orderItem);
        }


        order.setOrderItems(orderItems);
        order.setTotalPrice(orderItems.stream().mapToLong(oi -> oi.getPriceAtPurchase() * oi.getQuantity()).sum());

        // Save order
        Order savedOrder = orderRepository.save(order);

        // Manually map savedOrder to OrderDto to include itemId in the response
        OrderDto savedOrderDto = new OrderDto();
        savedOrderDto.setOrder_id(savedOrder.getOrder_id());
        savedOrderDto.setUserId(savedOrder.getUser().getU_id());
        savedOrderDto.setOrderDate(savedOrder.getOrderDate());
        savedOrderDto.setTotalPrice(savedOrder.getTotalPrice());
        savedOrderDto.setOrderStatus(savedOrder.getOrderStatus());

        // Map OrderItems to OrderItemDtos, including itemId
        List<OrderItemDto> orderItemDtos = new ArrayList<>();
        for (OrderItem orderItem : savedOrder.getOrderItems()) {
            OrderItemDto orderItemDto = new OrderItemDto();
            orderItemDto.setOrder_item_id(orderItem.getOrder_item_id());
            orderItemDto.setItemId(orderItem.getItem().getI_id()); // Set itemId explicitly
            orderItemDto.setQuantity(orderItem.getQuantity());
            orderItemDto.setPriceAtPurchase(orderItem.getPriceAtPurchase());

            orderItemDtos.add(orderItemDto);
        }

        savedOrderDto.setOrderItems(orderItemDtos);

        return savedOrderDto;
    }
}

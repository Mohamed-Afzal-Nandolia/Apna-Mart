package net.apnamart.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long order_id;

    private Long userId; // or UserDto if you have one

    private List<OrderItemDto> orderItems;

    private LocalDateTime orderDate;

    private String orderStatus; //pending, delivered, cancelled

    private Long totalPrice;

}

package net.apnamart.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {
    private Long order_item_id;

    private Long itemId; // or ItemDto if you have one

    private Long quantity;

    private Long priceAtPurchase;

}

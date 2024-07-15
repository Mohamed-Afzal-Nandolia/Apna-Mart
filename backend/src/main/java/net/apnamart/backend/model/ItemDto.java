package net.apnamart.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ItemDto {

    private Long i_id;

    private String i_name;

    private Long i_price;

    private Byte[] i_image;

    private Long i_quantity;

    private String i_description;

    private Boolean i_availability;
}

package net.apnamart.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity

public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long i_id;

    @Column(name = "i_name")
    private String i_name;

    @Column(name = "i_price")
    private Long i_price;

    @Lob//@Lob: This annotation specifies that the i_image field should be handled as a Large Object, which is suitable for storing large binary data like images.
    @Column(name = "i_image")
    private Byte[] i_image;

    @Column(name = "i_quantity")
    private Long i_quantity;

    @Column(name = "i_description")
    private String i_description;

    @Column(name = "i_availability")
    private Boolean i_availability;

}

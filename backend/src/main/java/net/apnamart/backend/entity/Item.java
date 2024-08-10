package net.apnamart.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long i_id;

    @Column(name = "i_name")
    private String i_name;

    @Column(name = "i_price")
    private Long i_price;

    @Column(name = "i_image")
    private String i_image_path;

    @Column(name = "i_type")
    private String i_type;

    @Column(name = "i_quantity")
    private Long i_quantity;

    @Column(name = "i_description")
    private String i_description;

    @Column(name = "i_availability")
    private Boolean i_availability;
}

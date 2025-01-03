package net.apnamart.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "create_category")
public class CreateCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long c_id;

    @Column(name = "c_name")
    private String c_name;

    @Column(name = "c_s_name")
    private String c_s_name;

}

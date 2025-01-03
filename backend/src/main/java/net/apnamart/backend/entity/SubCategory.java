package net.apnamart.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "sub_category")
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sc_id;

    @Column(name = "sc_name")
    private String sc_name;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CreateCategory category;
}

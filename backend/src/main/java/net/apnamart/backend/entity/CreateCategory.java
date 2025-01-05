package net.apnamart.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "i_category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubCategory> subCategories = new ArrayList<>();

    @OneToMany(mappedBy = "i_category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Item> items;

//    @Override
//    public String toString() {
//        return "Category{id=" + c_id + ", name='" + c_name + "'}";
//    }


}
package net.apnamart.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long u_id;

    @Column(name = "u_name", unique = true)
    private String u_name;

    @Column(name = "u_email", nullable = false, unique = true)
    private String u_email;

    @Column(name = "u_pass")
    private String u_pass;

    @Column(name = "u_address")
    private String u_address;

}
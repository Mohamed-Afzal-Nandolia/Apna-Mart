package net.apnamart.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.modelmapper.internal.bytebuddy.dynamic.loading.InjectionClassLoader;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long a_id;

    @Column(name = "a_name", unique = true)
    private String a_name;

    @Column(name = "a_email", nullable = false, unique = true)
    private String a_email;

    @Column(name = "a_pass")
    private String a_pass;

    @Column(name = "a_amount")
    private Integer amount;

}

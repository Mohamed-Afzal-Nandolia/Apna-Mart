package net.apnamart.backend.repository;


import net.apnamart.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query("SELECT o FROM Admin o WHERE o.a_email = ?1")
    Admin findByEmail(String email);

    Optional<Admin> findById(Long a_id);

    @Query("SELECT a FROM Admin a WHERE a.a_name = ?1")
    Admin findByA_name(String a_name);

}

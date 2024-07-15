package net.apnamart.backend.repository;


import net.apnamart.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query("SELECT o FROM Admin o WHERE o.a_email = ?1")
    Admin findByEmail(String email);
}

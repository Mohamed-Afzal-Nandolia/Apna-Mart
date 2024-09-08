package net.apnamart.backend.repository;

import net.apnamart.backend.entity.Admin;
import net.apnamart.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT o FROM User o WHERE o.u_email = ?1")
    User findByEmail(String email);

    Optional<User> findById(Long u_id);

    @Query("SELECT a FROM User a WHERE a.u_name = ?1")
    User findByU_name(String u_name);
}

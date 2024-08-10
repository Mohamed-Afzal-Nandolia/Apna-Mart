package net.apnamart.backend.repository;

import net.apnamart.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {


//    Optional<Item> findByI_name(String name);
}

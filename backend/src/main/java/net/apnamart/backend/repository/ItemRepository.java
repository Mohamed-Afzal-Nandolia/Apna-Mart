package net.apnamart.backend.repository;

import net.apnamart.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    // Custom query for category
    @Query("SELECT i FROM Item i WHERE i.i_category.c_id = ?1")
    List<Item> findItemsByCategoryId(Long categoryId);

    // Custom query for subcategory
    @Query("SELECT i FROM Item i WHERE i.i_subcategory.sc_id = ?1")
    List<Item> findItemsBySubcategoryId(Long subcategoryId);

    @Query("SELECT i FROM Item i WHERE i.i_category.c_id = :categoryId AND i.i_subcategory.sc_id = :subcategoryId")
    List<Item> findByCategoryIdAndSubcategoryId(Long categoryId, Long subcategoryId);


}

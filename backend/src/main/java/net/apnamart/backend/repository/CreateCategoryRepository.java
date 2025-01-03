package net.apnamart.backend.repository;

import net.apnamart.backend.entity.CreateCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreateCategoryRepository extends JpaRepository<CreateCategory, Long> {
}

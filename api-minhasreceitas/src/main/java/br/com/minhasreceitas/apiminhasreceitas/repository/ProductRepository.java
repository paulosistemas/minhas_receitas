package br.com.minhasreceitas.apiminhasreceitas.repository;

import br.com.minhasreceitas.apiminhasreceitas.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Integer> {

  @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) ORDER BY p.name")
  Page<Product> findByNameIgnoreCaseOrderByNameAsc(@Param("name") String name, Pageable pageable);
}
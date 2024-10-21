package br.com.minhasreceitas.apiminhasreceitas.repository;

import br.com.minhasreceitas.apiminhasreceitas.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

  boolean existsByNameIgnoreCaseAndUser_Id(String name, Integer id);

  @Query("SELECT p FROM Product p WHERE p.id = :id AND p.user.id = :userId")
  Product findByIdAndUserId(@Param("id") Integer id, @Param("userId") Integer userId);

  @Query("SELECT p FROM Product p WHERE p.user.id = :userId ORDER BY p.name")
  List<Product> findAllByUserId(@Param("userId") Integer userId);

  @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%')) AND p.user.id = :userId ORDER BY p.name")
  Page<Product> findByNameIgnoreCaseOrderByNameAsc(@Param("name") String name, @Param("userId") Integer userId, Pageable pageable);

}
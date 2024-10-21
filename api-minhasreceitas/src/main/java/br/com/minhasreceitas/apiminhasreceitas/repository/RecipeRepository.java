package br.com.minhasreceitas.apiminhasreceitas.repository;

import br.com.minhasreceitas.apiminhasreceitas.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Integer> {

    boolean existsByNameIgnoreCaseAndUser_Id(String name, Integer id);

    @Query("SELECT r FROM Recipe r WHERE r.id = :id AND r.user.id = :userId")
    Recipe findByIdAndUserId(@Param("id") Integer id, @Param("userId") Integer userId);

    @Query("SELECT r FROM Recipe r WHERE r.category.id = :categoryId AND r.user.id = :userId ORDER BY r.name")
    List<Recipe> findAllByCategoryIdAndUserId(@Param("categoryId") Integer categoryId, @Param("userId") Integer userId);

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :name, '%')) AND r.category.id = :categoryId AND r.user.id = :userId ORDER BY r.name")
    Page<Recipe> findByNameIgnoreCaseOrderByNameAsc(
            @Param("categoryId") Integer categoryId,
            @Param("name") String name,
            @Param("userId") Integer userId,
            Pageable pageable
    );
}
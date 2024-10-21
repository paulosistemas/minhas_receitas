package br.com.minhasreceitas.apiminhasreceitas.repository;

import br.com.minhasreceitas.apiminhasreceitas.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {

  boolean existsByProduct_Id(Integer id);
}
package br.com.minhasreceitas.apiminhasreceitas.repository;

import br.com.minhasreceitas.apiminhasreceitas.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
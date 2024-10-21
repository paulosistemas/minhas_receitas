package br.com.minhasreceitas.apiminhasreceitas.service;

import br.com.minhasreceitas.apiminhasreceitas.exception.AlreadyRegisteredException;
import br.com.minhasreceitas.apiminhasreceitas.exception.NotFoundException;
import br.com.minhasreceitas.apiminhasreceitas.model.*;
import br.com.minhasreceitas.apiminhasreceitas.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserService userService;

    @Transactional
    public Recipe save(Recipe recipe) {
        if (recipeRepository.existsByNameIgnoreCaseAndUser_Id(recipe.getName(), getLoggedUserId())) {
            throw new AlreadyRegisteredException("Receita já cadastrada");
        }
        Category category = categoryRepository.findById(recipe.getCategory().getId())
                .orElseThrow(() -> new NotFoundException("Categoria não encontrada"));
        recipe.setUser(userService.getLoggedUser());
        recipe.setCategory(category);
        recipe.setIngredients(saveIngredients(recipe.getIngredients()));
        return recipeRepository.save(recipe);
    }

    private List<Ingredient> saveIngredients(List<Ingredient> ingredients) {
        List<Ingredient> ingredientList = new ArrayList<>();
        for (Ingredient ingredient : ingredients) {
            Ingredient objIngredient = new Ingredient();
            Product product = productRepository.findByIdAndUserId(ingredient.getProduct().getId(), getLoggedUserId());
            if (product == null) {
                throw new NotFoundException("Produto não encontrado");
            }
            objIngredient.setProduct(product);
            if(ingredient.getUnit() != null) {
                Unit unit = unitRepository.findById(ingredient.getUnit().getId())
                        .orElseThrow(() -> new NotFoundException("Unidade não encontrada"));
                objIngredient.setUnit(unit);
            }
            if(ingredient.getAmount() != null) {
                objIngredient.setAmount(ingredient.getAmount());
            }
            ingredientList.add(ingredientRepository.save(objIngredient));
        }
        return ingredientList;
    }

    public Recipe update(Integer id, Recipe recipe) {
        Recipe r = getOne(id);
        r.setName(recipe.getName());
        r.setCategory(recipe.getCategory());
        r.setHint(recipe.getHint());
        r.setPreparationMode(recipe.getPreparationMode());
        r.setImage(recipe.getImage());
        r.getIngredients().clear();
        r.getIngredients().addAll(saveIngredients(recipe.getIngredients()));
        return recipeRepository.save(r);
    }

    public Recipe getOne(Integer id) {
        Recipe recipe = recipeRepository.findByIdAndUserId(id, getLoggedUserId());
        if (recipe == null) {
            throw new NotFoundException("Receita não encontrada");
        }
        return recipe;
    }

    public List<Recipe> getAll(Integer categoryID) {
        return recipeRepository.findAllByCategoryIdAndUserId(categoryID, getLoggedUserId());
    }

    public void delete(Integer id) {
        getOne(id);
        recipeRepository.deleteById(id);
    }

    public Page<Recipe> searchRecipe(Integer categoryId, String name, Pageable pageable) {
        return recipeRepository.findByNameIgnoreCaseOrderByNameAsc(categoryId, name, getLoggedUserId(), pageable);
    }

    private Integer getLoggedUserId() {
        return userService.getLoggedUser().getId();
    }
}

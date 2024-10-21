package br.com.minhasreceitas.apiminhasreceitas.controller;

import br.com.minhasreceitas.apiminhasreceitas.dto.RecipeDTO;
import br.com.minhasreceitas.apiminhasreceitas.dto.RecipeSimpleDTO;
import br.com.minhasreceitas.apiminhasreceitas.model.Recipe;
import br.com.minhasreceitas.apiminhasreceitas.service.RecipeService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("recipes")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/create")
    public ResponseEntity<RecipeDTO> createRecipe(@RequestBody @Valid RecipeSimpleDTO recipeSimpleDTO) {
        Recipe recipe = recipeService.save(modelMapper.map(recipeSimpleDTO, Recipe.class));
        return new ResponseEntity<>(modelMapper.map(recipe, RecipeDTO.class), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    ResponseEntity<RecipeDTO> updateRecipe(@PathVariable Integer id, @RequestBody @Valid RecipeSimpleDTO recipeSimpleDTO) {
        return new ResponseEntity<>(modelMapper.map(recipeService.update(id, modelMapper.map(recipeSimpleDTO, Recipe.class)), RecipeDTO.class), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDTO> getRecipe(@PathVariable Integer id) {
        return new ResponseEntity<>(modelMapper.map(recipeService.getOne(id), RecipeDTO.class), HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<RecipeDTO>> getAllRecipes(@PathVariable Integer id) {
        List<Recipe> recipes = recipeService.getAll(id);
        return ResponseEntity.ok(recipes
                .stream()
                .map((recipe) -> modelMapper.map(recipe, RecipeDTO.class))
                .collect(Collectors.toList()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Integer id) {
        recipeService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search/category/{id}")
    public Page<RecipeDTO> search(
            @PathVariable Integer id,
            @RequestParam String name,
            @RequestParam Integer page,
            @RequestParam Integer size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Recipe> recipePage = recipeService.searchRecipe(id, name, pageable);
        return recipePage.map(recipeDTO -> modelMapper.map(recipeDTO, RecipeDTO.class));
    }
}

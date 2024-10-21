package br.com.minhasreceitas.apiminhasreceitas.dto;

import br.com.minhasreceitas.apiminhasreceitas.model.Category;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecipeDTO {
    private Integer id;
    private String name;
    private String hint;
    private String image;
    private String preparationMode;
    private Category category;
    private List<IngredientDTO> ingredients;
}

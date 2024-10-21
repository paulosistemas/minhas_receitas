package br.com.minhasreceitas.apiminhasreceitas.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class RecipeSimpleDTO {
    private Integer id;
    private String name;
    private String hint;
    private String image;
    private String preparationMode;
    private CategorySimpleDTO category;
    private List<IngredientSimpleDTO> ingredients;
}

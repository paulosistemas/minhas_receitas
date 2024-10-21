package br.com.minhasreceitas.apiminhasreceitas.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientDTO {
    private Integer id;
    private String amount;
    private ProductDTO product;
    private UnitDTO unit;
}

package br.com.minhasreceitas.apiminhasreceitas.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientSimpleDTO {
    private Integer id;
    private String amount;
    private ProductSimpleDTO product;
    private UnitSimpleDTO unit;
}

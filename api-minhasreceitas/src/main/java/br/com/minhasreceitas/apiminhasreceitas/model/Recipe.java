package br.com.minhasreceitas.apiminhasreceitas.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "recipe")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 100, unique = true, nullable = false)
    private String name;

    @Column(name = "hint", length = 200)
    private String hint;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "preparation_mode", columnDefinition = "TEXT", nullable = false)
    private String preparationMode;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "recipe_id")
    private List<Ingredient> ingredients;
}

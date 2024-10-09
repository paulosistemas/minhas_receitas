package br.com.minhasreceitas.apiminhasreceitas.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "recipe")
@Data
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "hint")
    private String hint;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "preparation_mode", columnDefinition = "TEXT", nullable = false)
    private String preparationMode;


}

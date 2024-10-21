package br.com.minhasreceitas.apiminhasreceitas.service;

import br.com.minhasreceitas.apiminhasreceitas.exception.CannotBeDeletedException;
import br.com.minhasreceitas.apiminhasreceitas.exception.NotFoundException;
import br.com.minhasreceitas.apiminhasreceitas.exception.AlreadyRegisteredException;
import br.com.minhasreceitas.apiminhasreceitas.model.Product;
import br.com.minhasreceitas.apiminhasreceitas.repository.IngredientRepository;
import br.com.minhasreceitas.apiminhasreceitas.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private IngredientRepository ingredientRepository;

    @Autowired
    private UserService userService;

    public Product create(Product product) {
        if (productRepository.existsByNameIgnoreCaseAndUser_Id(product.getName(), getLoggedUserId())) {
            throw new AlreadyRegisteredException("Produto já cadastrado");
        }
        product.setUser(userService.getLoggedUser());
        return productRepository.save(product);
    }

    public Product getOne(Integer id) {
        Product product = productRepository.findByIdAndUserId(id, userService.getLoggedUser().getId());
        if (product == null) {
            throw new NotFoundException("Produto não encontrado");
        }
        return product;
    }

    public List<Product> getAll() {
        return productRepository.findAllByUserId(getLoggedUserId());
    }

    public Product update(Integer id, Product product) {
        Product p = getOne(id);
        p.setName(product.getName());
        return productRepository.save(p);
    }

    public void delete(Integer id) {
        getOne(id);
        validateDelete(id);
        productRepository.deleteById(id);
    }

    public Page<Product> searchProduct(String name, Pageable pageable) {
        return productRepository.findByNameIgnoreCaseOrderByNameAsc(name, getLoggedUserId(), pageable);
    }

    private void validateDelete(Integer id) {
        if (ingredientRepository.existsByProduct_Id(id)) {
            throw new CannotBeDeletedException("O Produto não pode ser removido, pois está associado a um ou mais Ingredientes");
        }
    }

    private Integer getLoggedUserId() {
        return userService.getLoggedUser().getId();
    }
}

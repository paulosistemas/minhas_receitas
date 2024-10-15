package br.com.minhasreceitas.apiminhasreceitas.service;

import br.com.minhasreceitas.apiminhasreceitas.exception.NotFoundException;
import br.com.minhasreceitas.apiminhasreceitas.model.Product;
import br.com.minhasreceitas.apiminhasreceitas.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public Product getOne(Integer id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Produto não encontrado"));
    }

    public Product update(Integer id, Product product) {
        Product p = getOne(id);
        p.setName(product.getName());
        return productRepository.save(p);
    }

    public void delete(Integer id) {
        getOne(id);
        productRepository.deleteById(id);
    }

    public Page<Product> searchProduct(String name, Pageable pageable) {
        return productRepository.findByNameIgnoreCaseOrderByNameAsc(name, pageable);
    }
}

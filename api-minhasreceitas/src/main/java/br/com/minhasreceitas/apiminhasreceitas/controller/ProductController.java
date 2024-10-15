package br.com.minhasreceitas.apiminhasreceitas.controller;

import br.com.minhasreceitas.apiminhasreceitas.model.Product;
import br.com.minhasreceitas.apiminhasreceitas.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@RequestBody @Valid Product product) {
        return new ResponseEntity<>(productService.create(product), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody @Valid Product product) {
        return new ResponseEntity<>(productService.update(id, product), HttpStatus.OK);
    }

    @GetMapping("/search")
    public Page<Product> search(@RequestParam String name, @RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.searchProduct(name, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable int id) {
        Product product = productService.getOne(id);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.delete(id);
        return ResponseEntity.ok().build();
    }
}

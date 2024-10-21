package br.com.minhasreceitas.apiminhasreceitas.controller;

import br.com.minhasreceitas.apiminhasreceitas.dto.ProductDTO;
import br.com.minhasreceitas.apiminhasreceitas.model.Product;
import br.com.minhasreceitas.apiminhasreceitas.service.ProductService;
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
@RequestMapping("products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping("/create")
    public ResponseEntity<ProductDTO> createProduct(@RequestBody @Valid Product product) {
        Product object = productService.create(product);
        ProductDTO productDTO = modelMapper.map(object, ProductDTO.class);
        return new ResponseEntity<>(productDTO, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Integer id, @RequestBody @Valid Product product) {
        return new ResponseEntity<>(modelMapper.map(productService.update(id, product), ProductDTO.class), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Integer id) {
        Product product = productService.getOne(id);
        return ResponseEntity.ok(modelMapper.map(product, ProductDTO.class));
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productService.getAll();
        return ResponseEntity.ok(products
                .stream()
                .map((product) -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public Page<ProductDTO> search(@RequestParam String name, @RequestParam Integer page, @RequestParam Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productService.searchProduct(name, pageable);
        return productPage.map(productDTO -> modelMapper.map(productDTO, ProductDTO.class));
    }
}

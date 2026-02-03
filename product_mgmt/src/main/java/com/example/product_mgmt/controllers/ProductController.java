package com.example.product_mgmt.controllers;

import com.example.product_mgmt.models.ProductModel;
import com.example.product_mgmt.services.ProductService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    private final ProductService service;

    public  ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping("/products")
    public List<ProductModel> products() {
        return service.getProduct();
    }

    @PostMapping("/products")
    public ProductModel productsCreate(@Valid @RequestBody ProductModel productModel) {
        return service.addProduct(productModel);
    }

    @PatchMapping("/products/{id}")
    public ProductModel productUpdate(@Valid @PathVariable String id, @RequestBody ProductModel productModel) {
        productModel.setId(id);
        return service.updateProduct(productModel);
    }

    @DeleteMapping("/products/{id}")
    public String productDelete(@PathVariable String id) {
        service.deleteProduct(id);
        return "Product deleted successfully";
    }
}

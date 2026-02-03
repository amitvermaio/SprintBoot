package com.example.product_mgmt.services;

import com.example.product_mgmt.models.ProductModel;
import com.example.product_mgmt.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<ProductModel> getProduct() {
        return repository.findAll();
    }

    public ProductModel addProduct(ProductModel product) {
        return repository.save(product);
    }

    public ProductModel updateProduct(ProductModel product) {
        ProductModel existingProduct = repository.findById(product.getId())
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());

        return repository.save(existingProduct);
    }

    public void deleteProduct(String id) {
        ProductModel product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
        repository.delete(product);
    }
}

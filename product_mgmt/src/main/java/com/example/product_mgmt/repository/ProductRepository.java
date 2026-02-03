package com.example.product_mgmt.repository;

import com.example.product_mgmt.models.ProductModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<ProductModel, String> {

}

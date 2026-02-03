package com.example.product_mgmt.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "products")

public class ProductModel {
    @Id
    private String id;
    @NotBlank(message = "Name cannot be Null")
    private String name;
    @NotNull(message = "Price is required")
    @Positive(message = "Price must be greater than zero")
    private Double price;
}

package net.apnamart.backend.controller;

import lombok.AllArgsConstructor;
import net.apnamart.backend.model.CreateCategoryDto;
import net.apnamart.backend.model.UserDto;
import net.apnamart.backend.service.CreateCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/category/")
public class CreateCategoryController {
    CreateCategoryService createCategoryService;

    @PostMapping("create-category")
    public ResponseEntity<CreateCategoryDto> createCategory(@RequestBody CreateCategoryDto createCategoryDto) {
        CreateCategoryDto category = createCategoryService.createCategory(createCategoryDto);
        return ResponseEntity.ok(category);
    }

    @GetMapping
    public ResponseEntity<List<CreateCategoryDto>> getAllCategories(){
        List<CreateCategoryDto> allCategories = createCategoryService.getAllCategories();
        return ResponseEntity.ok(allCategories);
    }
}

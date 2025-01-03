package net.apnamart.backend.service;

import net.apnamart.backend.model.CreateCategoryDto;

import java.util.List;

public interface CreateCategoryService {
    public CreateCategoryDto createCategory(CreateCategoryDto createCategoryDto);

    public List<CreateCategoryDto> getAllCategories();

    public CreateCategoryDto addSubCategory(CreateCategoryDto createCategoryDto);
}

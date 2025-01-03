package net.apnamart.backend.service;

import net.apnamart.backend.model.CreateCategoryDto;
import net.apnamart.backend.model.SubCategoryDto;

import java.util.List;

public interface CreateCategoryService {
    public CreateCategoryDto createCategory(CreateCategoryDto createCategoryDto);

    public List<CreateCategoryDto> getAllCategories();

    public CreateCategoryDto addSubCategory(CreateCategoryDto createCategoryDto);

    public SubCategoryDto addSubCategory(Long categoryId, SubCategoryDto subCategoryDto);

    public void deleteCategory(Long id);
}

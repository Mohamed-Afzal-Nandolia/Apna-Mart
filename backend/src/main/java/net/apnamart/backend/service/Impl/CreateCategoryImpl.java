package net.apnamart.backend.service.Impl;

import lombok.AllArgsConstructor;
import net.apnamart.backend.entity.CreateCategory;
import net.apnamart.backend.entity.SubCategory;
import net.apnamart.backend.exception.ResourceNotFoundException;
import net.apnamart.backend.model.CreateCategoryDto;
import net.apnamart.backend.model.SubCategoryDto;
import net.apnamart.backend.repository.CreateCategoryRepository;
import net.apnamart.backend.service.CreateCategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CreateCategoryImpl implements CreateCategoryService {
    CreateCategoryRepository categoryRepository;

    @Override
    public CreateCategoryDto createCategory(CreateCategoryDto createCategoryDto) {
        ModelMapper modelMapper = new ModelMapper();
        CreateCategory createCategory = modelMapper.map(createCategoryDto, CreateCategory.class);
        CreateCategory saveCategory = categoryRepository.save(createCategory);
        return modelMapper.map(saveCategory, CreateCategoryDto.class);
    }

    @Override
    public List<CreateCategoryDto> getAllCategories() {
        ModelMapper modelMapper = new ModelMapper();
        List<CreateCategory> allCategoriesAndSubCategories = categoryRepository.findAll();
        return allCategoriesAndSubCategories.stream().map((category) -> modelMapper.map(category, CreateCategoryDto.class)).collect(Collectors.toList());
    }

    @Override
    public CreateCategoryDto addSubCategory(CreateCategoryDto createCategoryDto) {
        return null;
    }

    @Override
    public SubCategoryDto addSubCategory(Long categoryId, SubCategoryDto subCategoryDto) {
        CreateCategory category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + categoryId));

        SubCategory subCategory = SubCategory.builder()
                .sc_name(subCategoryDto.getSc_name())
                .category(category)
                .build();

        category.getSubCategories().add(subCategory);
        categoryRepository.save(category);

        return SubCategoryDto.builder()
                .sc_id(subCategory.getSc_id())
                .sc_name(subCategory.getSc_name())
                .build();
    }

    @Override
    public void deleteCategory(Long categoryId) {
        CreateCategory category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));
        categoryRepository.deleteById(categoryId);
    }

}

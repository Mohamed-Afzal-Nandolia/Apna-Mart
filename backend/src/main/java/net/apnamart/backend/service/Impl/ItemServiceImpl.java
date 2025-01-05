package net.apnamart.backend.service.Impl;

import lombok.AllArgsConstructor;
import net.apnamart.backend.entity.CreateCategory;
import net.apnamart.backend.entity.Item;
import net.apnamart.backend.entity.SubCategory;
import net.apnamart.backend.exception.ResourceNotFoundException;
import net.apnamart.backend.model.ItemDto;
import net.apnamart.backend.repository.CreateCategoryRepository;
import net.apnamart.backend.repository.ItemRepository;
import net.apnamart.backend.repository.SubCategoryRepository;
import net.apnamart.backend.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService{

    private ItemRepository itemRepository;
    private CreateCategoryRepository categoryRepository;
    private SubCategoryRepository subCategoryRepository;
    private final String FOLDER_PATH = "D:/GitHub/All Repositories/Apna-Mart/backend/src/main/resources/static/images";

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        // Ensure the folder exists
        File folder = new File(FOLDER_PATH);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String ImgName = UUID.randomUUID().toString()+".jpg";

        // Save the file to the folder
        Path filePath = Paths.get(FOLDER_PATH, ImgName);
        Files.write(filePath, file.getBytes());

        // Return the file path (relative to your app's root directory or as needed)
        //return filePath.toString();
        return "http://localhost:8085/images/"+ImgName;
    }

    @Override
    public ItemDto createItem(ItemDto itemDto) {
        ModelMapper modelMapper = new ModelMapper();
        Item item = modelMapper.map(itemDto, Item.class);

        // Fetch and set category
        CreateCategory category = categoryRepository.findById(Long.valueOf(itemDto.getI_category()))
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        item.setI_category(category);

        // Fetch and set subcategory
        SubCategory subCategory = subCategoryRepository.findById(Long.valueOf(itemDto.getI_subcategory()))
                .orElseThrow(() -> new ResourceNotFoundException("Subcategory not found"));
        item.setI_category(category);
        item.setI_subcategory(subCategory);

        // Save the image path and other item details
        Item savedItem = itemRepository.save(item);
        return modelMapper.map(savedItem, ItemDto.class);
    }

//    @Override
//    public ItemDto createItem(ItemDto itemDto) {
//        ModelMapper modelMapper = new ModelMapper();
//        Item item = modelMapper.map(itemDto, Item.class);
//        item.setI_id(itemDto.getI_id());// Set the u_id explicitly
//
//        Item savedItem = itemRepository.save(item);
//        return modelMapper.map(savedItem, ItemDto.class);
//    }

    @Override
    public ItemDto updateItem(Long id, ItemDto itemDto) {
        ModelMapper modelMapper = new ModelMapper();
        Item item = itemRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post Does not exist with id : " + id));

        item.setI_name(itemDto.getI_name());
        item.setI_price(itemDto.getI_price());
        item.setI_image_path(itemDto.getI_image_path());
        item.setI_type(itemDto.getI_type());
        item.setI_quantity(itemDto.getI_quantity());
        item.setI_description(itemDto.getI_description());
        item.setI_availability(itemDto.getI_availability());

        Item savedItem = itemRepository.save(item);
        return modelMapper.map(savedItem, ItemDto.class);
    }

    @Override
    public void deleteItem(Long id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post Does not exist with id : " + id));
        itemRepository.deleteById(id);
    }

    @Override
    public ItemDto getItemById(Long id) {
        ModelMapper modelMapper = new ModelMapper();
        Item item = itemRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post Does not exist with id : " + id));
        return modelMapper.map(item, ItemDto.class);
    }

    @Override
    public List<ItemDto> getAllItems() {
        ModelMapper modelMapper = new ModelMapper();
        List<Item> allItems = itemRepository.findAll();
        List<ItemDto> itemDtoList = allItems.stream().map((item) -> modelMapper.map(item, ItemDto.class)).collect(Collectors.toList());
        Collections.reverse(itemDtoList);
        return itemDtoList;
    }

    @Override
    public Boolean stockAvailable(ItemDto itemDto) {
        return itemDto.getI_quantity() != 0;
    }

    public List<ItemDto> getItemsByCategory(Long categoryId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Item> itemsByCategoryId = itemRepository.findItemsByCategoryId(categoryId);
        List<ItemDto> itemDtoList = itemsByCategoryId.stream().map((item) -> modelMapper.map(item, ItemDto.class)).collect(Collectors.toList());
        return itemDtoList;
    }

    public List<ItemDto> getItemsBySubcategory(Long subcategoryId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Item> itemsBySubcategoryId = itemRepository.findItemsBySubcategoryId(subcategoryId);
        List<ItemDto> itemDtoList = itemsBySubcategoryId.stream().map((item) -> modelMapper.map(item, ItemDto.class)).collect(Collectors.toList());
        return itemDtoList;
    }

    public List<ItemDto> getItemsByCategoryAndSubcategory(Long categoryId, Long subcategoryId) {
        // Assuming you have a repository that supports this query
        ModelMapper modelMapper = new ModelMapper();
        List<Item> byCategoryIdAndSubcategoryId = itemRepository.findByCategoryIdAndSubcategoryId(categoryId, subcategoryId);
        List<ItemDto> itemDtoList = byCategoryIdAndSubcategoryId.stream().map((item) -> modelMapper.map(item, ItemDto.class)).collect(Collectors.toList());
        return itemDtoList;
    }


}

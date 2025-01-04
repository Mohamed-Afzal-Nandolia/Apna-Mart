package net.apnamart.backend.controller;

import lombok.AllArgsConstructor;
import net.apnamart.backend.entity.Item;
import net.apnamart.backend.model.ItemDto;
import net.apnamart.backend.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/item/")
public class ItemController {

    private ItemService itemService;

    // POST - create item
    @PostMapping(value = "create-item", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<ItemDto> createItem(
            @RequestPart("item") ItemDto itemDto,
            @RequestPart("file") MultipartFile file) throws IOException {

        // Upload the image and get the file path
        String imagePath = itemService.uploadImage(file);

        // Set the image path and type in the ItemDto
        itemDto.setI_image_path(imagePath);
        itemDto.setI_type(file.getContentType()); // Setting the content type as the item type

        // Create the item
        ItemDto item = itemService.createItem(itemDto);

        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }


    // PUT - update item
    @PutMapping("{id}")
    public ResponseEntity<ItemDto> updateItem(@PathVariable Long id, @RequestBody ItemDto itemDto){
        ItemDto item = itemService.updateItem(id, itemDto);
        return ResponseEntity.ok(item);
    }

    // GET - get item by id
    @GetMapping("{id}")
    public ResponseEntity<ItemDto> getItemById(@PathVariable Long id){
        ItemDto item = itemService.getItemById(id);
        return ResponseEntity.ok(item);
    }

    // GET - get all items
    @GetMapping("all-items")
    public ResponseEntity<List<ItemDto>> getAllItem(){
        List<ItemDto> allItems = itemService.getAllItems();
        return ResponseEntity.ok(allItems);
    }

    // DELETE - delete item
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteItem(@PathVariable Long id){
        itemService.deleteItem(id);
        return ResponseEntity.ok("Item deleted Successfully");
    }

    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<List<ItemDto>> getItemsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(itemService.getItemsByCategory(categoryId));
    }

    @GetMapping("/by-subcategory/{subcategoryId}")
    public ResponseEntity<List<ItemDto>> getItemsBySubcategory(@PathVariable Long subcategoryId) {
        return ResponseEntity.ok(itemService.getItemsBySubcategory(subcategoryId));
    }

    @GetMapping("/filter-items")
    public ResponseEntity<List<ItemDto>> getItemsByCategoryAndSubcategory(
            @RequestParam(value = "category", required = false) Long categoryId,
            @RequestParam(value = "subcategory", required = false) Long subcategoryId) {

        // If both category and subcategory are provided, filter based on both
        if (categoryId != null && subcategoryId != null) {
            return ResponseEntity.ok(itemService.getItemsByCategoryAndSubcategory(categoryId, subcategoryId));
        }

        // If only category is provided, filter based on category
        if (categoryId != null) {
            return ResponseEntity.ok(itemService.getItemsByCategory(categoryId));
        }

        // If only subcategory is provided, filter based on subcategory
        if (subcategoryId != null) {
            return ResponseEntity.ok(itemService.getItemsBySubcategory(subcategoryId));
        }

        // If neither category nor subcategory is provided, return all items
        return ResponseEntity.ok(itemService.getAllItems());
    }

}

package net.apnamart.backend.controller;

import lombok.AllArgsConstructor;
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

    /*
    //Dont need this now as i have merge this in to create-item method
    @PostMapping("/uploadImage")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return itemService.uploadImage(file);
    }
    */
}

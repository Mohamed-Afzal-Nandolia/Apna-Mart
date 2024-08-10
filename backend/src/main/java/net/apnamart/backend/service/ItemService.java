package net.apnamart.backend.service;

import net.apnamart.backend.model.ItemDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {

    public ItemDto createItem(ItemDto itemDto);

    ItemDto updateItem(Long id, ItemDto itemDto);

    public void deleteItem(Long id);

    public ItemDto getItemById(Long id);

    public List<ItemDto> getAllItems();

    public Boolean stockAvailable(ItemDto itemDto);

//    public String uploadImageToFileSystem(MultipartFile file) throws IOException;
//
//    public byte[] downloadImageFromFileSystem(String fileName) throws IOException;

    // New method for image upload
    public String uploadImage(MultipartFile file) throws IOException;


}

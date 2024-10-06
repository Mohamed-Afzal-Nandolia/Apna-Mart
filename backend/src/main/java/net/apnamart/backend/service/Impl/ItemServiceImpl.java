package net.apnamart.backend.service.Impl;

import lombok.AllArgsConstructor;
import net.apnamart.backend.entity.Item;
import net.apnamart.backend.exception.ResourceNotFoundException;
import net.apnamart.backend.model.ItemDto;
import net.apnamart.backend.repository.ItemRepository;
import net.apnamart.backend.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService{

    private ItemRepository itemRepository;

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
        return allItems.stream().map((item) -> modelMapper.map(item, ItemDto.class)).collect(Collectors.toList());
    }

    @Override
    public Boolean stockAvailable(ItemDto itemDto) {
        return itemDto.getI_quantity() != 0;
    }

//    @Override
//    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
//        String filePath = FOLDER_PATH + file.getOriginalFilename();
//
//        Item item = itemRepository.save(Item.builder()
//                .i_name(file.getOriginalFilename())
//                .i_type(file.getContentType())
//                .i_image_path(filePath)
//                .build());
//
//        file.transferTo(new File(filePath));
//
//        if(item != null){
//            return "file uploaded Successfully : " + filePath;
//        }
//        return null;
//    }
//
//    @Override
//    public byte[] downloadImageFromFileSystem(String name) throws IOException {
//        Optional<Item> imageData = itemRepository.findByI_name(name);
//        String filePath = imageData.get().getI_image_path();
//        byte[] images = Files.readAllBytes(new File(filePath).toPath());
//        return images;
//    }

}

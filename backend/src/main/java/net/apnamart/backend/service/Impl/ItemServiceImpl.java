package net.apnamart.backend.service.Impl;

import lombok.AllArgsConstructor;
import net.apnamart.backend.entity.Item;
import net.apnamart.backend.exception.ResourceNotFoundException;
import net.apnamart.backend.model.ItemDto;
import net.apnamart.backend.repository.ItemRepository;
import net.apnamart.backend.service.ItemService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService{

    private ItemRepository itemRepository;

    @Override
    public ItemDto createItem(ItemDto itemDto) {
        ModelMapper modelMapper = new ModelMapper();
        Item item = modelMapper.map(itemDto, Item.class);
        item.setI_id(itemDto.getI_id());// Set the u_id explicitly

        Item savedItem = itemRepository.save(item);
        return modelMapper.map(savedItem, ItemDto.class);
    }

    @Override
    public ItemDto updateItem(Long id, ItemDto itemDto) {
        ModelMapper modelMapper = new ModelMapper();
        Item item = itemRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post Does not exist with id : " + id));

        item.setI_name(itemDto.getI_name());
        item.setI_price(itemDto.getI_price());
        item.setI_image(itemDto.getI_image());
        item.setI_quantity(itemDto.getI_quantity());
        item.setI_description(itemDto.getI_description());
        item.setI_availability(itemDto.getI_availability());

        Item savedItem = itemRepository.save(item);
        return modelMapper.map(savedItem, ItemDto.class);
    }

    @Override
    public void deleteItem(Long id) {
        ModelMapper modelMapper = new ModelMapper();
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
        if(itemDto.getI_quantity() != 0){
            return true;
        }
        return false;
    }

}

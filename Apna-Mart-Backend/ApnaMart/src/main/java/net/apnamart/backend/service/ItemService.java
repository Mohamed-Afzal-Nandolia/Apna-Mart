package net.apnamart.backend.service;

import net.apnamart.backend.model.ItemDto;

import java.util.List;

public interface ItemService {

    public ItemDto createItem(ItemDto itemDto);

    ItemDto updateItem(Long id, ItemDto itemDto);

    public void deleteItem(Long id);

    public ItemDto getItemById(Long id);

    public List<ItemDto> getAllItems();

    public Boolean stockAvailable(ItemDto itemDto);

}

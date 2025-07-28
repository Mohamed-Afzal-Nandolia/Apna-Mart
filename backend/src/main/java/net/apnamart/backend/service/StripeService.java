package net.apnamart.backend.service;

import net.apnamart.backend.model.ItemDto;
import net.apnamart.backend.model.StripeResponse;
import net.apnamart.backend.service.Impl.StripeServiceImpl;

public interface StripeService {
    public StripeResponse checkout(ItemDto itemDto);
}

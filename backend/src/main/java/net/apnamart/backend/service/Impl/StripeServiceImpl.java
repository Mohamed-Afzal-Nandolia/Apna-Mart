package net.apnamart.backend.service.Impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.extern.slf4j.Slf4j;
import net.apnamart.backend.model.ItemDto;
import net.apnamart.backend.model.StripeResponse;
import net.apnamart.backend.service.StripeService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.secretKey}")
    private String secretKey;

    @Value("${spring.frontend.url}")
    String frontendUrl;

    //stripe -API
    //-> productName, amount, quantity, currency
    //-> return sessionId and url

    public StripeResponse checkout(ItemDto itemDto){
        Stripe.apiKey = secretKey;

        SessionCreateParams.LineItem.PriceData.ProductData productData = SessionCreateParams.LineItem.PriceData.ProductData.builder()
                .setName(itemDto.getI_name()).build();

        SessionCreateParams.LineItem.PriceData priceData = SessionCreateParams.LineItem.PriceData.builder()
                .setCurrency("INR")
                .setUnitAmount(itemDto.getI_price() * 100)
                .setProductData(productData)
                .build();

        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(itemDto.getI_quantity())
                .setPriceData(priceData)
                .build();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(frontendUrl + "/success")
                .setCancelUrl(frontendUrl + "/cancel")
                .addLineItem(lineItem)
                .build();

        Session session = null;

        try{
            session = Session.create(params);
        } catch (StripeException e) {
            log.info("Error Occurred in session creation for Stripe: " + e);
            return StripeResponse.builder()
                    .status("Success")
                    .message("Payment Session Created")
                    .sessionId(session.getId())
                    .sessionUrl(session.getUrl())
                    .build();
        }

        return StripeResponse.builder()
                .status("Success")
                .message("Payment Session Created")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }
}

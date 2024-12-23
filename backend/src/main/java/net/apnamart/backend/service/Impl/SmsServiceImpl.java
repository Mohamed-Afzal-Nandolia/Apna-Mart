package net.apnamart.backend.service.Impl;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import jakarta.annotation.PostConstruct;
import net.apnamart.backend.service.SmsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class SmsServiceImpl implements SmsService {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String twilioPhoneNumber;

    @PostConstruct
    public void initializeTwilio() {
        Twilio.init(accountSid, authToken);
    }


    public String sendSms(String toPhoneNumber, String messageBody) {
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(toPhoneNumber),  // To phone number
                new com.twilio.type.PhoneNumber(twilioPhoneNumber), // From Twilio number
                messageBody
        ).create();

        return message.getSid();  // Return the message SID for tracking
    }
}

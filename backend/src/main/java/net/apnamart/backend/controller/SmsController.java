package net.apnamart.backend.controller;

import lombok.Getter;
import net.apnamart.backend.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api/sms")
public class SmsController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/send")
    public ResponseEntity<String> sendSms(@RequestBody SmsRequest smsRequest) {
        try {
            smsService.sendSms(smsRequest.getPhoneNumber(), smsRequest.getMessage());
            return ResponseEntity.ok("SMS sent successfully to " + smsRequest.getPhoneNumber());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to send SMS: " + e.getMessage());
        }
    }
}

@Getter
class SmsRequest {
    // Getters and Setters
    private String phoneNumber;
    private String message;

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

package net.apnamart.backend.service;

public interface SmsService {
    public String sendSms(String toPhoneNumber, String messageBody);
}

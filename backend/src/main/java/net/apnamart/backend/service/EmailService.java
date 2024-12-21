package net.apnamart.backend.service;

public interface EmailService {
    public void sendEmail(String to, String subject, String body);
}

package net.apnamart.backend.controller;

import net.apnamart.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/test-email")
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public String sendTestEmail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
            return "Email sent successfully to " + emailRequest.getTo();
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }

    static class EmailRequest {
        private String to;
        private String subject;
        private String body;

        // Getters and setters
        public String getTo() {
            return to;
        }

        public void setTo(String to) {
            this.to = to;
        }

        public String getSubject() {
            return subject;
        }

        public void setSubject(String subject) {
            this.subject = subject;
        }

        public String getBody() {
            return body;
        }

        public void setBody(String body) {
            this.body = body;
        }
    }
}

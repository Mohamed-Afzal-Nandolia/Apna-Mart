package net.apnamart.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import jakarta.mail.internet.MimeMessage;

@CrossOrigin(origins = "${FRONTEND_URL}")
@RestController
@RequestMapping("/api/test-email")
public class EmailTestController {

    @Autowired
    private JavaMailSender mailSender;  // Using JavaMailSender directly

    @PostMapping
    public String sendTestEmail(@RequestBody EmailRequest emailRequest) {
        try {
            // Create a new email message
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(emailRequest.getTo());
            helper.setSubject(emailRequest.getSubject());
            helper.setText(emailRequest.getBody(), true);  // Set 'true' to enable HTML

            mailSender.send(message);
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

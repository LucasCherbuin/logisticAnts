package com.maven.service.mailer;

public interface MailServiceInterface {
    void sendEmail(String to, String subject, String body);
}

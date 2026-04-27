package com.maven.service;


public interface MailService {

    void sendEmail(String to, String subject, String body);
    
}

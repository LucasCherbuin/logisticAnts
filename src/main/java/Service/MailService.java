package main.Service;


public interface MailService {

    void sendEmail(String to, String subject, String body);
    
}

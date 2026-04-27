package com.maven.Service;

import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

<<<<<<< HEAD:src/main/java/com/maven/Service/MailServiceValidate.java
public class MailServiceValidate implements MailService {
=======
@Service
public class MailService implements MailServiceInterface {
>>>>>>> 5a82615 (correction back end):src/main/java/com/maven/Service/mailer/MailService.java

    private static final String SUCCESS_MESSAGE = "Vous allez recevoir un email de confirmation.";

    @Override
<<<<<<< HEAD:src/main/java/com/maven/Service/MailServiceValidate.java
    public void sendEmail(String senderEmail, String to, String subject) {

        String body = "Votre email de confirmation"; 

=======
    public void sendEmail(String to, String subject, String body) {
        System.out.print(subject);
>>>>>>> 5a82615 (correction back end):src/main/java/com/maven/Service/mailer/MailService.java
        Properties smtpProperties = new Properties();
        smtpProperties.put("mail.smtp.auth", "true");
        smtpProperties.put("mail.smtp.starttls.enable", "true");
        smtpProperties.put("mail.smtp.host", System.getenv("MAILER_HOST"));
        smtpProperties.put("mail.smtp.port", "587");

        try {
<<<<<<< HEAD:src/main/java/com/maven/Service/MailServiceValidate.java
            Message message = new MimeMessage(Session.getDefaultInstance(smtpProperties));
            message.setFrom(new InternetAddress(senderEmail));
=======
            Session session = Session.getInstance(smtpProperties,
                new Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(
                            System.getenv("MAILER_USERNAME"),
                            System.getenv("MAILER_PASSWORD")
                        );
                    }
                }
            );
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(System.getenv("MAILER_USERNAME")));
>>>>>>> 5a82615 (correction back end):src/main/java/com/maven/Service/mailer/MailService.java
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(subject);
            message.setText(body);
            Transport.send(message);
            System.out.println(SUCCESS_MESSAGE);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
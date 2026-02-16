package com.maven.Service;

<<<<<<< HEAD
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
=======
import java.util.Properties;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

>>>>>>> PageVisiteur

public class MailServiceValidate implements MailService {

    private static final String SUCCESS_MESSAGE =
            "Vous allez recevoir un email de confirmation.";

    @Override
<<<<<<< HEAD
    public void sendEmail(String senderEmail, String to, String subject) {

        String body = "Votre email de confirmation"; 
=======
    public void sendEmail(String to, String subject, String body) {
>>>>>>> PageVisiteur

        Properties smtpProperties = new Properties();
        smtpProperties.put("mail.smtp.auth", "true");
        smtpProperties.put("mail.smtp.starttls.enable", "true");
        smtpProperties.put("mail.smtp.host", System.getenv("MAILER_HOST"));
        smtpProperties.put("mail.smtp.port", "587");

        try {
<<<<<<< HEAD
            Message message = new MimeMessage(Session.getDefaultInstance(smtpProperties));
            message.setFrom(new InternetAddress(senderEmail));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
=======
            Message message = new MimeMessage(
                    Session.getDefaultInstance(smtpProperties)
            );

            message.setFrom(new InternetAddress("MAILER_HOST"));
            message.addRecipient(
                    Message.RecipientType.TO,
                    new InternetAddress(to)
            );
>>>>>>> PageVisiteur
            message.setSubject(subject);
            message.setText(body);

            Transport.send(message);
            System.out.println(SUCCESS_MESSAGE);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
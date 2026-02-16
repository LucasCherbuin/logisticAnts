package com.maven.Service;

import java.util.Properties;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;


public class MailServiceValidate implements MailService {

    private static final String SUCCESS_MESSAGE =
            "Vous allez recevoir un email de confirmation.";

    @Override
    public void sendEmail(String to, String subject, String body) {

        Properties smtpProperties = new Properties();
        smtpProperties.put("MAILER_HOST", System.getenv("MAILER_HOST"));

        try {
            Message message = new MimeMessage(
                    Session.getDefaultInstance(smtpProperties)
            );

            message.setFrom(new InternetAddress("MAILER_HOST"));
            message.addRecipient(
                    Message.RecipientType.TO,
                    new InternetAddress(to)
            );
            message.setSubject(subject);
            message.setText(body);

            Transport.send(message);
            System.out.println(SUCCESS_MESSAGE);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

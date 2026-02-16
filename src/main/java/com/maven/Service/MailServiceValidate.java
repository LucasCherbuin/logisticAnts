package com.maven.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

public class MailServiceValidate implements MailService {

    private static final String SUCCESS_MESSAGE =
            "Vous allez recevoir un email de confirmation.";

    @Override
    public void sendEmail(String to, String subject, String body) {

        Properties smtpProperties = new Properties();
        smtpProperties.put("mail.smtp.auth", "true");
        smtpProperties.put("mail.smtp.starttls.enable", "true");
        smtpProperties.put("mail.smtp.host", System.getenv("MAILER_HOST"));
        smtpProperties.put("mail.smtp.port", "587");

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
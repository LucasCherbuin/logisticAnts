package com.maven.service.mailer;

import org.springframework.stereotype.Service;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class MailService implements MailServiceInterface {

    private static final String SUCCESS_MESSAGE = "Vous allez recevoir un email de confirmation.";

    @Override
    public void sendEmail(String to, String subject, String body) {
        System.out.print(subject);
        Properties smtpProperties = new Properties();
        smtpProperties.put("mail.smtp.auth", "true");
        smtpProperties.put("mail.smtp.starttls.enable", "true");
        smtpProperties.put("mail.smtp.host", System.getenv("MAILER_HOST"));
        smtpProperties.put("mail.smtp.port", System.getenv("MAILER_PORT"));

        try {
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
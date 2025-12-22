package main.service;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailServiceValidate implements MailService {

    private static final String SUCCESS_MESSAGE =
            "Vous allez recevoir un email de confirmation.";

    @Override
    public void sendEmail() {

        Properties smtpProperties = new Properties();
        smtpProperties.put("MAILER_HOST", System.getenv("MAILER_HOST"));

        try {
            Message message = new MimeMessage(
                    Session.getDefaultInstance(smtpProperties)
            );

            message.setFrom(new InternetAddress(senderEmail));
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

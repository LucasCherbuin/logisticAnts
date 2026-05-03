package com.maven.controller;

import com.maven.service.mailer.MailService;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.*;

class MailControllerTest {

    @Test
    void testSendMail() {

        MailService mailService = mock(MailService.class);

        MailController controller = new MailController(mailService);

        MailRequest request = new MailRequest();
        request.setTo("test@mail.com");
        request.setSubject("Test");
        request.setBody("Hello");

        controller.sendMail(request);

        verify(mailService).sendEmail(
            "test@mail.com",
            "Test",
            "Hello"
        );
    }
}
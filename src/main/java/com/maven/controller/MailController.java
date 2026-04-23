package com.maven.controller;

import com.maven.service.mailer.*;
import com.maven.dto.MailRequest;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/mail")
public class MailController {

    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/send")
    public String sendMail(@RequestBody MailRequest request) {

        mailService.sendEmail(
            request.getTo(),
            request.getSubject(),
            request.getBody()
        );

        return "mail send";
    }
}
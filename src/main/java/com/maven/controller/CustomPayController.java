package com.maven.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.maven.service.payment.PayPalService;
import com.maven.service.payment.DataTransService;
import com.maven.dto.PaymentRequest;
import com.maven.dto.PaymentResponse;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
public class CustomPayController {

    @Value("${transaction.success-url}")
    private String successUrl;

    @Value("${transaction.cancel-url}")
    private String cancelUrl;

    private final PayPalService payPalService;
    private final DataTransService dataTransService;

    @CrossOrigin
    @PostMapping(path = "/pay")
    public String pay(@org.springframework.web.bind.annotation.RequestBody JSONObject inputBody)
            throws NoSuchAlgorithmException, InvalidKeyException {
        try {
            String amount        = inputBody.get("amount").toString();
            String currency      = inputBody.get("currency").toString();
            String paymentMethod = inputBody.get("paymentMethod").toString();

            return switch (paymentMethod.toUpperCase()) {

                case "PAYPAL" -> {
                    PaymentRequest req = buildPaymentRequest(amount, currency, paymentMethod, inputBody);
                    PaymentResponse resp = payPalService.createPayment(req);
                    yield resp.toJson();
                }

                case "TWINT" -> {
                    PaymentRequest req = buildPaymentRequest(amount, currency, paymentMethod, inputBody);
                    PaymentResponse resp = dataTransService.initiatePayment(req);
                    yield resp.toJson();
                }

                case "MASTERCARD", "VISA", "AMERICAN EXPRESS" -> {
                    PaymentRequest req = buildPaymentRequest(amount, currency, paymentMethod, inputBody);
                    PaymentResponse resp = dataTransService.initiatePayment(req);
                    yield resp.toJson();
                }
                case "FACTURE" -> {
                    PaymentRequest req = buildPaymentRequest(amount, currency, paymentMethod, inputBody);
                    yield "{\"status\":\"success\",\"paymentMethod\":\"FACTURE\",\"commandeId\":\"" + req.getCommandeId() + "\"}";
                }

                default -> throw new IllegalArgumentException("Méthode de paiement non supportée : " + paymentMethod);
            };

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Payment processing failed: " + e.getMessage() + "\"}";
        }
    }

    private PaymentRequest buildPaymentRequest(String amount, String currency,
                                               String method, JSONObject body) {
        PaymentRequest req = new PaymentRequest();
        req.setAmount(Double.parseDouble(amount));
        req.setCurrency(currency);
        req.setPaymentMethod(method);
        req.setCommandeId(body.getOrDefault("commandeId",
            "CMD-" + System.currentTimeMillis()).toString());
        req.setReturnUrl(body.getOrDefault("returnUrl", successUrl).toString());
        req.setCancelUrl(body.getOrDefault("cancelUrl", cancelUrl).toString());
        return req;
    }
}
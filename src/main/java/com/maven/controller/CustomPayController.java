package com.maven.controller;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.maven.service.payment.PayPalService;
import com.maven.service.payment.DataTransService ;
import com.maven.dto.PaymentRequest;
import com.maven.dto.PaymentResponse;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
@RequiredArgsConstructor
public class CustomPayController {

    private static final OkHttpClient httpClient = new OkHttpClient();
    private static final String CARD_GATEWAY_URL = "https://api.examplepaymentgateway.com/payments";
    private static final String CARD_API_KEY = "CARD_API_KEY";

    @Value("${transaction.success-url}")
    private String successUrl;

    @Value("${transaction.cancel-url}")
    private String cancelUrl;

    private final PayPalService payPalService;
    private final DataTransService  dataTransService;

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

                default -> {
                    JSONObject payload = new JSONObject();
                    payload.put("amount", amount);
                    payload.put("currency", currency);
                    payload.put("paymentMethod", paymentMethod);

                    RequestBody body = RequestBody.create(
                        MediaType.parse("application/json"),
                        payload.toJSONString()
                    );

                    Request httpRequest = new Request.Builder()
                        .url(CARD_GATEWAY_URL)
                        .post(body)
                        .addHeader("Authorization", "Bearer " + CARD_API_KEY)
                        .build();

                    try (Response httpResponse = httpClient.newCall(httpRequest).execute()) {
                        if (!httpResponse.isSuccessful()) {
                            throw new RuntimeException("Gateway error: " + httpResponse.code());
                        }
                        yield httpResponse.body().string();
                    }
                }
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
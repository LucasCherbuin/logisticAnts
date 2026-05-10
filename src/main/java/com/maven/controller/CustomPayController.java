package com.maven.controller;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;  
import okhttp3.Response;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.maven.service.payment.PayPalService;
import com.maven.service.payment.TwintService;
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

    private final PayPalService payPalService;
    private final TwintService twintService;

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
                    PaymentResponse resp = twintService.initiatePayment(req);
                    yield resp.toJson();
                }

                default -> {
                    JSONObject payload = new JSONObject();
                    payload.put("amount", amount);
                    payload.put("currency", currency);
                    payload.put("paymentMethod", paymentMethod);

                    // ✅ OkHttp 4.x : MediaType en premier
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
        req.setReturnUrl(body.getOrDefault("returnUrl",
            "https://yoursite.com/success").toString());
        req.setCancelUrl(body.getOrDefault("cancelUrl",
            "https://yoursite.com/cancel").toString());
        return req;
    }
}
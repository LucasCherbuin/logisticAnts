package dev.draft.payments_hub_custom_pay_tutorial;

import okhttp3.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.json.simple.JSONObject;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@RestController
public class CustomPayController {

    private static final OkHttpClient httpClient = new OkHttpClient();

    @CrossOrigin
    @PostMapping(path = "/pay")
    public static String pay(@org.springframework.web.bind.annotation.RequestBody JSONObject inputBody) throws NoSuchAlgorithmException, InvalidKeyException {
        try {
            // Extract payment details from inputBody
            String amount = inputBody.get("amount").toString();
            String currency = inputBody.get("currency").toString();
            String paymentMethod = inputBody.get("paymentMethod").toString();

            // Create JSON payload for the payment request
            JSONObject paymentPayload = new JSONObject();
            paymentPayload.put("amount", amount);
            paymentPayload.put("currency", currency);
            paymentPayload.put("paymentMethod", paymentMethod);

            // Build the HTTP request
            RequestBody body = RequestBody.create(
                    paymentPayload.toJSONString(),
                    MediaType.parse("application/json")
            );

            Request request = new Request.Builder()
                    .url("https://api.examplepaymentgateway.com/payments")
                    .post(body)
                    .addHeader("Content-Type", "application/json")
                    .addHeader("Authorization", "Bearer YOUR_API_KEY")
                    .build();

            // Execute the request
            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    throw new RuntimeException("Unexpected code " + response);
                }

                // Return the response body as a string
                return response.body().string();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\":\"Payment processing failed.\"}";
        }
    }
}
package com.maven.service.payment;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import com.maven.dto.PaymentRequest;
import com.maven.dto.PaymentResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.Base64;

@Service
public class DataTransService {

    @Value("${datatrans.merchant-id}")
    private String merchantId;

    @Value("${datatrans.api-key}")
    private String apiKey;

    @Value("${datatrans.base-url}")
    private String baseUrl;

    private final WebClient webClient = WebClient.create();

        public PaymentResponse initiatePayment(PaymentRequest req) {
        String datatransMethod = switch (req.getPaymentMethod().toUpperCase()) {
            case "MASTERCARD" -> "ECA";
            case "VISA" -> "VIS";
            case "AMERICAN EXPRESS" -> "AMX";
            default -> "TWI";
        };

        Map<String, Object> body = new HashMap<>();
        body.put("currency", req.getCurrency());
        body.put("refno", req.getCommandeId());
        body.put("amount", (int)(req.getAmount() * 100));
        body.put("paymentMethods", List.of(datatransMethod));
        body.put("redirect", Map.of(
            "successUrl", req.getReturnUrl(),
            "cancelUrl",  req.getCancelUrl(),
            "errorUrl",   req.getCancelUrl()
        ));

        String credentials = Base64.getEncoder()
            .encodeToString((merchantId + ":" + apiKey).getBytes());

        Map response = webClient.post()
            .uri(baseUrl + "/transactions")
            .header("Authorization", "Basic " + credentials)
            .header("Content-Type", "application/json")
            .bodyValue(body)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        String transactionId = (String) response.get("transactionId");
        String paymentUrl = "https://pay.sandbox.datatrans.com/v1/start/" + transactionId;
        return new PaymentResponse(transactionId, "PENDING", paymentUrl);
    }
}

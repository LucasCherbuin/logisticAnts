package com.maven.controller;

import com.maven.dto.PaymentRequest;
import com.maven.dto.PaymentResponse;
import com.maven.service.payment.PayPalService;
import com.maven.service.payment.DataTransService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(CustomPayController.class)
class CustomPayControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PayPalService payPalService;

    @MockBean
    private DataTransService dataTransService;

    @Test
    void testPayWithPayPal() throws Exception {
        PaymentResponse mockResponse = new PaymentResponse(
            "PAY-123", "PENDING", "https://paypal.com/approve?token=abc"
        );
        when(payPalService.createPayment(any(PaymentRequest.class)))
            .thenReturn(mockResponse);

        String requestBody = """
            {
                "paymentMethod": "PAYPAL",
                "amount": 49.90,
                "currency": "CHF",
                "commandeId": "CMD-001",
                "returnUrl": ${},
                "cancelUrl": "https://yoursite.com/cancel"
            }
            """;

        mockMvc.perform(post("/pay")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.transactionId").value("PAY-123"))
            .andExpect(jsonPath("$.status").value("PENDING"))
            .andExpect(jsonPath("$.redirectUrl").value("https://paypal.com/approve?token=abc"));
    }

    @Test
    void testPayWithDataTrans() throws Exception {
        PaymentResponse mockResponse = new PaymentResponse(
            "TWI-456", "PENDING", "https://datatrans.com/pay/TWI-456"
        );
        when(dataTransService.initiatePayment(any(PaymentRequest.class)))
            .thenReturn(mockResponse);

        String requestBody = """
            {
                "paymentMethod": "TWINT",
                "amount": 25.00,
                "currency": "CHF",
                "commandeId": "CMD-002",
                "returnUrl": "https://yoursite.com/success",
                "cancelUrl": "https://yoursite.com/cancel"
            }
            """;

        mockMvc.perform(post("/pay")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.transactionId").value("TWI-456"))
            .andExpect(jsonPath("$.status").value("PENDING"))
            .andExpect(jsonPath("$.redirectUrl").value("https://datatrans.com/pay/TWI-456"));
    }


    @Test
    void testPayWithUnknownMethod() throws Exception {
        String requestBody = """
            {
                "paymentMethod": "BITCOIN",
                "amount": 10.00,
                "currency": "CHF"
            }
            """;

        mockMvc.perform(post("/pay")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isOk())
            .andExpect(content().string(org.hamcrest.Matchers.containsString("error")));
    }
}

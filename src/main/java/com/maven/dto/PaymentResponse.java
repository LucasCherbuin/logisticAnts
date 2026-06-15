package com.maven.dto;

public class PaymentResponse {

    private String transactionId;
    private String status;
    private String redirectUrl; 

    public PaymentResponse(String transactionId, String status) {
        this.transactionId = transactionId;
        this.status = status;
        this.redirectUrl = null;
    }


    public PaymentResponse(String transactionId, String status, String redirectUrl) {
        this.transactionId = transactionId;
        this.status = status;
        this.redirectUrl = redirectUrl;
    }

    public String getTransactionId() { return transactionId; }
    public String getStatus() { return status; }
    public String getRedirectUrl() { return redirectUrl; }


    public String toJson() {
        return "{\"transactionId\":\"" + transactionId + "\","
             + "\"status\":\"" + status + "\","
             + "\"redirectUrl\":\"" + (redirectUrl != null ? redirectUrl : "") + "\"}";
    }
}
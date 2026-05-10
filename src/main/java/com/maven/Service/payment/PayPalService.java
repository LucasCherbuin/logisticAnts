package com.maven.service.payment;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

// PayPal SDK
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;

// Vos modèles
import com.maven.dto.PaymentRequest;
import com.maven.dto.PaymentResponse;

// Java
import java.util.HashMap;
import java.util.List;
import java.util.Map;



@Service
public class PayPalService {

    @Value("${paypal.client-id}")
    private String clientId;

    @Value("${paypal.client-secret}")
    private String clientSecret;

    @Value("${paypal.mode}")
    private String mode;

    private APIContext getApiContext() {
        Map<String, String> config = new HashMap<>();
        config.put("mode", mode);
        return new APIContext(clientId, clientSecret, mode);
    }

    public PaymentResponse createPayment(PaymentRequest req) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(req.getCurrency());
        amount.setTotal(String.format("%.2f", req.getAmount()));

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription("Order " + req.getCommandeId());

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setReturnUrl(req.getReturnUrl());
        redirectUrls.setCancelUrl(req.getCancelUrl());

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(List.of(transaction));
        payment.setRedirectUrls(redirectUrls);

        Payment created = payment.create(getApiContext());

        // Extraire l'URL d'approbation PayPal
        String approvalUrl = created.getLinks().stream()
            .filter(l -> "approval_url".equals(l.getRel()))
            .findFirst()
            .map(Links::getHref)
            .orElseThrow();

        return new PaymentResponse(created.getId(), "PENDING", approvalUrl);
    }

    public PaymentResponse executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);

        PaymentExecution execution = new PaymentExecution();
        execution.setPayerId(payerId);

        Payment executed = payment.execute(getApiContext(), execution);
        return new PaymentResponse(paymentId, executed.getState().toUpperCase(), null);
    }
}
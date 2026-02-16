package com.maven.Service;

import okhttp3.*;
import okhttp3.MediaType;
import okhttp3.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.stereotype.Service;
import org.json.simple.JSONObject;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

@Service
public class PaiementService {

    private static final OkHttpClient client = new OkHttpClient();
    private static final String SUCCESS_MESSAGE = "Payment request processed";

    @CrossOrigin
    @PostMapping("/create-payment-intent")
    public String createPaymentIntent(JSONObject inputBody)
            throws NoSuchAlgorithmException, InvalidKeyException {

        String cardNumber = inputBody.get("carteBancaire").toString();
        String CVV = inputBody.get("CVV").toString();
        String dateExpiration = inputBody.get("dateExpiration").toString();
        String montant = inputBody.get("montant").toString();

        String cardEntrymethod = "x";
        String industryType = "x";
        boolean capture = true;

        String epild = "XXXX-XXXXXX-X-X";
        String epiKey = "XXXXXXXXXXXXXXXXXX"; 
        String baseUrl = "https://api.europeanpaymentsinitiative.eu/v1/payments";
        String endpoint = "/payement";

        JSONObject jsonBody = new JSONObject();
        jsonBody.put("account", cardNumber);
        jsonBody.put("currency", "CHF");
        jsonBody.put("amount", montant);
        jsonBody.put("cvv", CVV);
        jsonBody.put("expiryDate", dateExpiration);
        jsonBody.put("transactionId", Math.random() * 1000000);
        jsonBody.put("orderNumber", String.valueOf(Math.random()));
        jsonBody.put("batchId", Math.random());
        jsonBody.put("cardEntryMethod", cardEntrymethod);
        jsonBody.put("industryType", industryType);
        jsonBody.put("capture", capture);

       // Création signature
        String signature = createSignature(endpoint, jsonBody.toString(), epiKey); 

        // Create MediaType and RequestBody
        MediaType JSON = MediaType.get("application/json; charset=utf-8");
        RequestBody body = RequestBody.create(jsonBody.toString(), JSON);

        Request request = new Request.Builder()
                .url(baseUrl + endpoint)
                .addHeader("Content-Type", "application/json")
                .addHeader("epild", epild)
                .addHeader("signature", signature)
                .post(body)
                .build();


        // Exécution
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful())
                throw new IOException("Unexpected code " + response);

            return SUCCESS_MESSAGE;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public static String createSignature(String endpoint, String payload, String epiKey)
            throws NoSuchAlgorithmException, InvalidKeyException {
        String algorithm = "HmacSHA256";
        SecretKeySpec secretKeySpec = new SecretKeySpec(epiKey.getBytes(), algorithm);
        Mac mac = Mac.getInstance(algorithm);
        mac.init(secretKeySpec);
        String data = endpoint + payload;
        return bytesToHex(mac.doFinal(data.getBytes()));
    }

    private static final char[] HEX_ARRAY = "0123456789ABCDEF".toCharArray();
    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = HEX_ARRAY[v >>> 4];
            hexChars[j * 2 + 1] = HEX_ARRAY[v & 0x0F];
        }
        return new String(hexChars);
    }
}
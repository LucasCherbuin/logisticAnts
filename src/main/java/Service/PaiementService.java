package dev.draft.payement_hub_service.main.Service;

import okhttp3.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.webbind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestService;
import org.apache.tomcat.util.json.JSONParser;
import org.json.simple.JSONObject;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.KeyStore.SecretKeyEntry;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

@RestController
public class PaiementService {
    
    private static final OkHttpClient client = new OkHttpClient();

    @CrossOrigin
    @PostMapping("/create-payment-intent")
    public String createPaymentIntent() throws NoSuchAlgorithmException, InvalidKeyException {
        // Récupération des données banquaires 
       string cardNumber = inputBody.get("carteBancaire").toString();
       string CVV = inputBody.get("CVV").toString();
       string dateExpiration = inputBody.get("dateExpiration").toString();
       string montant = inputBody.get("montant").toString();

       // définir un autre moyen de payement

       string cardEntrymethod = "x";
       string industryType = "x";
       boolean capture = true;

       String epild = "XXXX-XXXXXX-X-X";
       String epiKey = "XXXXXXXXXXXXXXXXXX"; 
       String baseUrl = "https://api.europeanpaymentsinitiative.eu/v1/payments";
       String endpoint = "/payement";

       // definir le corps de la requête
       String contentType = "application/json";
       Double transctionId = Math.random() * 1000000;
       String orderNumber = String.valueOf(Math.random());
       Double batchId = Math.random();

       JSONObject jsonBody = new JSONObject();

       bodyJSON.put("account", cardNumber);
       bodyJSON.put("currency", "CHF" );
       bodyJSON.put("amount", montant);
       bodyJSON.put("cvv", CVV);
       bodyJSON.put("expiryDate", dateExpiration);
       bodyJSON.put("transactionId", transctionId);
       bodyJSON.put("orderNumber", orderNumber);
       bodyJSON.put("batchId", batchId);
       bodyJSON.put("cardEntryMethod", cardEntrymethod);
       bodyJSON.put("industryType", industryType);
       bodyJSON.put("capture", capture);
    

    // creation signature 
    String signature = createSignature(endpoint, jsonBody.toString(), epiKey);

    // preparement de la requête
    RequestBody requestBody = RequestBody.create(
        jsonBody.toString(),
        MediaType.parse("application/json; charset=utf-8")
    );


    // création de la requête
    Request request = new Request.Builder()
        .url(baseUrl + endpoint)
        .addHeader("Content-Type", contentType)
        .addHeader("epild", epild)
        .addHeader("signature", signature)
        .post(RequestBody.create(jsonBody.toString(), MediaType.parse("application/json")))
        .build();

    // exécution de la requête
    try (Response response = client.newCall(request).execute()) {
        if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

        JSONParser jsonParser = new JSONParser();
        JSONObject responseBody = (JSONObject) jsonParser.parse(response.body().string());

        return ((JSONObject) responseBodyJSON.get("data")).get("status").toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

// Implémentation de la création de la signature 
    public static String createSignature(String endpoint, String payload, String epiKey) throws NoSuchAlgorithmException, InvalidKeyException {
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
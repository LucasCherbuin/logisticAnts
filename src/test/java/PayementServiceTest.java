import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.json.simple.JSONObject;


import org.springframework.test.web.servlet.MockMvc;

import Service.PaiementService;


import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(PaiementService.class)
class PayementServiceTest {

    @Autowired
    private MockMvc mockMvc;


    @MockBean
    private PaiementService paiementService;

   
    @Test
    void testCreatePaymentIntent() throws Exception {
        String mockResponse = "{ \"status\": \"success\", \"paymentId\": \"12345\" }";

        JSONObject requestJson = new JSONObject(); // create an empty JSON object
        // optionally fill with data if your method needs it
        requestJson.put("amount", 1000); // example

        when(paiementService.createPaymentIntent(requestJson)).thenReturn(mockResponse);

        mockMvc.perform(get("/create-payment-intent"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.status").value("success"))
            .andExpect(jsonPath("$.paymentId").value("12345"));
    }
}


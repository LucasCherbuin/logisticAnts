package com.maven.seeder;

import com.maven.model.Commande;
import com.maven.repository.CommandeRepository;
import org.springframework.stereotype.Component;

@Component
public class PaymentMethodSeeder {

    private final CommandeRepository commandeRepository;

    public PaymentMethodSeeder(CommandeRepository commandeRepository) {
        this.commandeRepository = commandeRepository;
    }

    public void seedPayementMethod() {
        String[] payements = {"Facture", "Twint", "Mastercard", "Visa", "Americain_express"};
        for (String payement : payements) {
            Commande commande = new Commande();
            commande.setPayement(payement);
            commandeRepository.save(commande);
        }
        System.out.println("PaymentMethods seeded successfully!");
    }
}
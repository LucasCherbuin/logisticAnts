package com.maven.seeder;

import com.maven.db.Database;
import com.maven.model.Commande;
import org.hibernate.Session;

public class PaymentMethodSeeder {

    public static void seedPayementMethods() {
        try (Session session = Database.openSession()) {
            session.beginTransaction();

            String[] payements = {"Facture", "Twint", "Mastercard", "Visa", "Americain_express"};

            for (String payement : payements) {
                Commande commande = new Commande();
                commande.setPayement(payement);
                session.persist(commande);
            }

            session.getTransaction().commit();
            System.out.println("PaymentMehthodes seeded successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
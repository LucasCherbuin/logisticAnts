package com.maven.model;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


public class TableCreation {

    public static void main(String[] args) {

        Configuration cfg = new Configuration();
        cfg.configure("hibernate.cfg.xml");

        cfg.addAnnotatedClass(ArticleCommande.class);
        cfg.addAnnotatedClass(Commande.class);
        cfg.addAnnotatedClass(Fournisseur.class);
        cfg.addAnnotatedClass(Image.class);
        cfg.addAnnotatedClass(Produit.class);
        cfg.addAnnotatedClass(Role.class);
        cfg.addAnnotatedClass(User.class);

        SessionFactory factory = cfg.buildSessionFactory();
        factory.close();

        System.out.println("Tables created successfully!");
    }
}

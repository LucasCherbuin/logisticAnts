package com.maven.seeder;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final RoleSeeder roleSeeder;
    private final UserSeeder userSeeder;
    private final PaymentMethodSeeder payementMethodSeeder;
    private final ArticleCommandeSeeder articleCommandeSeeder;
    private final CommandeSeeder commandeSeeder;
    private final ProduitSeeder produitSeeder;

    public DatabaseSeeder(RoleSeeder roleSeeder, UserSeeder userSeeder, PaymentMethodSeeder payementMethodSeeder, ArticleCommandeSeeder articleCommandeSeeder, CommandeSeeder commandeSeeder, ProduitSeeder produitSeeder) {
        this.roleSeeder = roleSeeder;
        this.userSeeder = userSeeder;
        this.payementMethodSeeder = payementMethodSeeder;
        this.articleCommandeSeeder = articleCommandeSeeder;
        this.commandeSeeder = commandeSeeder;
        this.produitSeeder = produitSeeder;
    }

    @Override
    public void run(String... args) throws Exception {
        roleSeeder.seedRoles();
        userSeeder.seedUsers();
        payementMethodSeeder.seedPayementMethod();
        articleCommandeSeeder.seedArticleCommandes();
        commandeSeeder.seedCommandes();
        produitSeeder.seedProduits();
        System.out.println("Seeding done");
    }
}
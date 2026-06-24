package com.maven.seeder;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private final RoleSeeder roleSeeder;
    private final UserSeeder userSeeder;

    private final ArticleCommandeSeeder articleCommandeSeeder;
    private final CommandeSeeder commandeSeeder;
    private final ProduitSeeder produitSeeder;

    private final PrixSeeder prixSeeder;



    public DatabaseSeeder
        (RoleSeeder roleSeeder, 
         UserSeeder userSeeder,  
         ArticleCommandeSeeder articleCommandeSeeder,
         CommandeSeeder commandeSeeder, 
         ProduitSeeder produitSeeder, 
         ProduitPhareSeeder produitPhareSeeder,
         PrixSeeder prixSeeder
) 
        {
            this.roleSeeder = roleSeeder;
            this.userSeeder = userSeeder;
            this.articleCommandeSeeder = articleCommandeSeeder;
            this.commandeSeeder = commandeSeeder;
            this.produitSeeder = produitSeeder;
            this.prixSeeder = prixSeeder;
    }

    @Override
    public void run(String... args) throws Exception {
        roleSeeder.seedRoles();
        userSeeder.seedUsers();
        articleCommandeSeeder.seedArticleCommandes();
        commandeSeeder.seedCommandes();
        produitSeeder.seedProduits();
        prixSeeder.seedprix();
        System.out.println("Seeding done");
    }
}
package com.maven.seeder;

import com.maven.model.Role;

import com.maven.repository.RoleRepository;
import com.maven.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component 
public class DatabaseSeeder implements CommandLineRunner {
    private final RoleSeeder roleSeeder;
    private final UserSeeder userSeeder;

    private final RoleSeeder roleSeeder;
    private final UserSeeder userSeeder;

    private final ArticleCommandeSeeder articleCommandeSeeder;
    private final CommandeSeeder commandeSeeder;
    private final ProduitSeeder produitSeeder;
    private final FournisseurSeeder fournisseurSeeder;

    public DatabaseSeeder
        (RoleSeeder roleSeeder, 
         UserSeeder userSeeder,  
         ArticleCommandeSeeder articleCommandeSeeder,
         CommandeSeeder commandeSeeder, 
         ProduitSeeder produitSeeder,
         FournisseurSeeder fournisseurSeeder
    ) 
        {
            this.roleSeeder = roleSeeder;
            this.userSeeder = userSeeder;
            this.articleCommandeSeeder = articleCommandeSeeder;
            this.commandeSeeder = commandeSeeder;
            this.produitSeeder = produitSeeder;
            this.fournisseurSeeder = fournisseurSeeder;
    }

    @Override
    public void run(String... args) throws Exception {
        roleSeeder.seedRoles();
        userSeeder.seedUsers();
        articleCommandeSeeder.seedArticleCommandes();
        commandeSeeder.seedCommandes();
        produitSeeder.seedProduits();
        fournisseurSeeder.seedFournisseur();
        System.out.println("Seeding done");
    }
}

package com.maven.seeder;
import com.maven.modelNosql.ProduitPhare;
import com.maven.repositoryNosql.ProduitPhareRepository;
import org.springframework.stereotype.Component;
import java.util.List;
@Component
public class ProduitPhareSeeder {
    private final ProduitPhareRepository produitPhareRepository;
    public ProduitPhareSeeder(ProduitPhareRepository produitPhareRepository) {
        this.produitPhareRepository = produitPhareRepository;
    }
    public void seedProduitPhares() {
        if (produitPhareRepository.count() > 0) {
            System.out.println("ProduitPhares déjà présents, skip");
            return;
        }
        List<ProduitPhare> data = List.of(
            new ProduitPhare(null, 1, 10),
            new ProduitPhare(null, 2, 5)
        );
        produitPhareRepository.saveAll(data);
        System.out.println("ProduitPhares seedés");
    }
}
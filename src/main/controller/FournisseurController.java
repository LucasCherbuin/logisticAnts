package maven.controller;

import maven.model.Fournisseur;
import maven.repository.FournisseurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

public class FournisseurController {
    @Autowired

    private FournisseurRepository fournisseurRepository;

    @GetMapping("/Fournisseurs")


    public List<Fournisseur> getAllFournisseurs() {

        return fournisseurRepository.findAll(); // Placeholder return
    }

    @GetMapping("/Fournisseurs/{id}")

    public Fournisseur getFournisseurById(int id) {

        // Implementation to retrieve a specific Fournisseur by ID

        return fournisseurRepository.findById(id).orElse(null);
    }

    @putMapping("/Fournisseurs/{id}/create")

    public void createFournisseur(Fournisseur fournisseur) {

        // Implementation to create a new fournisseur
        fournisseurRepository.save(fournisseur);  

    } 

    @putMapping("/Fournisseurs/{id}/update")


    public void updateFournisseur(Fournisseur fournisseur) {
        // Implementation to update an existing Fournisseur
        fournisseurRepository.save(fournisseur);

    }

    @putMapping("/Fournisseurs/{id}/delete")
    public void deleteFournisseur(int id) {
        // Implementation to delete a Fournisseur by ID

        fournisseurRepository.deleteById(id);

    }

}
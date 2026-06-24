package com.maven.seeder;
import com.maven.modelNosql.Prix;
import com.maven.repositoryNosql.PrixRepository;
import org.springframework.stereotype.Component;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
@Component
public class PrixSeeder {
    private final PrixRepository prixRepository;
    public PrixSeeder(PrixRepository prixRepository) {
        this.prixRepository = prixRepository;
    }
    public void seedprix() {
        if (prixRepository.count() > 0) {
            System.out.println("Prix déjà présents, skip");
            return;
        }
        Calendar cal = Calendar.getInstance();
        Date today = cal.getTime();
        cal.add(Calendar.DATE, -1);
        Date yesterday = cal.getTime();
        cal.add(Calendar.DATE, -1);
        Date twoDaysAgo = cal.getTime();
        cal.add(Calendar.DATE, -1);
        Date threeDaysAgo = cal.getTime();
        cal.add(Calendar.DATE, -1);
        Date fourDaysAgo = cal.getTime();
        List<Prix> data = List.of(
            new Prix(null, 250, 50, 200, today),
            new Prix(null, 180, 30, 150, yesterday),
            new Prix(null, 320, 0, 320, twoDaysAgo),
            new Prix(null, 95, 20, 75, threeDaysAgo),
            new Prix(null, 410, 10, 400, fourDaysAgo)
        );
        prixRepository.saveAll(data);
        System.out.println("Prix seedés");
    }
}
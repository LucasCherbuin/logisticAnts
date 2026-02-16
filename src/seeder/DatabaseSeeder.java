import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;


public class DatabaseSeeder implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        RoleSeerder.seedRoles();
        UserSeeder.seedUsers();
        System.out.println("seeding done");
    }
    
}

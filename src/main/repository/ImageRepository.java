package maven.repository;

import maven.model.Image;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    List<Image> findByUrlContaining(String url);

}

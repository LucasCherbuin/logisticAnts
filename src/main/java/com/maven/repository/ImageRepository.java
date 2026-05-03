package com.maven.repository;

import com.maven.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByUrlContaining(String url);
}
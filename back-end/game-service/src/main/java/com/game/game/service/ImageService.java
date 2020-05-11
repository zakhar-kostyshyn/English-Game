package com.game.game.service;

import com.game.game.model.Image;
import com.game.game.repository.ImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    //  create and save new Image from input map
    //  update table
    public void loadImageFromResource(Map<String, List<MultipartFile>> images) {

        log.info(String.valueOf(images.keySet()));

        //  iterate through map first and list second and create Image obj for every MultiPartFile obj
        images.forEach((k, v) -> {
            v.forEach(i -> {
                //  create new Image in DB only if it doesn't exist
                if (!imageRepository.existsByName(i.getName()))
                    try {
                        imageRepository.save(Image.builder()
                                .image(i.getBytes())
                                .name(i.getName())
                                .theme(k)
                                .build());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
            });
        });

    }

    //  get Images by theme
    public List<Image> getImagesByTheme (String theme) {
        return imageRepository.findAllByTheme(theme)
                    .orElseThrow(() -> new RuntimeException("no theme by : " + theme));
    }

    //  get Image by name
    public Image getImageByName (String name) {
        return imageRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("no name"));
    }

}

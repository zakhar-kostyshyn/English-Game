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
    public void loadImageFromResource(Map<String, Set<MultipartFile>> mapImages) {

        log.info("Input Map : " + mapImages);

        //  iterate through Map with String and Set and then trough Set with MultipartFile
        mapImages.forEach((key, value) ->
                value.forEach(file -> {
                    Image newImage = null;
                    try {
                        //  create Image
                        newImage = Image.builder()
                                .name(file.getName())
                                .theme(key.trim())
                                .image(file.getBytes())
                                .build();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }



                    //  save Image if it no exist
                    if (!imageRepository.existsByName(newImage.getName())) {
                        log.info("new Image created and save ");
                        imageRepository.save(newImage);
                    }
                }));
    }

    //  get Images by theme
    public List<Image> getImagesByTheme (String theme) {
        return imageRepository.findAllByTheme(theme)
                    .orElseThrow(() -> new RuntimeException("no theme"));
    }

    //  get Image by name
    public Image getImageByName (String name) {
        return imageRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("no theme"));
    }
}

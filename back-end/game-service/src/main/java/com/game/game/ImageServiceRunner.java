package com.game.game;

import com.game.game.service.ImageService;
import com.game.game.web.ImageController;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

// call service
// we should create CommandLineRunner which allow to run piece of code exactly after  SpringApplication run
@Component
@Getter
@Slf4j
public class ImageServiceRunner implements CommandLineRunner {

    @Autowired
    private ImageService imageService;

    //  method which get all files from folder image in resources
    public void getAllImages() {
        File[] files;
        try {
            files = ResourceUtils.getFile("classpath:images").listFiles();
            Map<String, List<MultipartFile>> stringImagesMap = this.createMapFromImagesFolder(Objects.requireNonNull(files));
            imageService.loadImageFromResource(stringImagesMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //  create and return map where key is String name of theme and values is List of Multioart images
    public Map<String, List<MultipartFile>> createMapFromImagesFolder (File [] files) {
        Map<String, List<MultipartFile>> map = new HashMap<>();

        //  iterate through all directories
        for (File directory : files) {

            List<MultipartFile> list = new ArrayList<>();
            log.info("Directory: " + directory.getName());

            //  iterate through all files
            for (File file : Objects.requireNonNull(directory.listFiles())) {
                log.info("File: " + file.getName());

                Path path = Paths.get(file.getPath());
                String name = file.getName();
                String originalFileName = file.getName();
                String contentType = "image/png";
                byte[] content = null;

                try {
                    content = Files.readAllBytes(path);
                } catch (IOException e) {
                    e.printStackTrace();
                }

                MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);

                //  add file to list with all MultipartFile obj
                list.add(result);
            }

            //  add list with all MultipartFile obj to the images Map
            map.put(directory.getName(), list);
        }


        return map;


    }

    @Override
    public void run(String... args) throws Exception {
        this.getAllImages();
    }

}

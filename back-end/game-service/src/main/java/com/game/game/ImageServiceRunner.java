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

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ImageServiceRunner.class);

    @Autowired
    private ImageService imageService;

    //  create Map<String, Set<MultipartFile>> where String - name of folder (ex. Animals) and Set - MultipartFile for images in this folder
    private Map<String, Set<MultipartFile>> images = new HashMap<>();

    //  create for comfortable work in showFiles() method
    private Set<MultipartFile> tempSet = new HashSet<>();


    //  method which get all files from folder image in resources
    public void getAllImages() {

        log.info("My theory works great");
        File[] files = null;
        try {
            files = ResourceUtils.getFile("classpath:images").listFiles();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        assert files != null;
        this.showFiles(files);
    }

    //  method which recursively iterate through all images in folder images
    //  populate images Map
    //  in the end method call service method in GameService and give created Map
    public void showFiles (File [] files) {
        for (File file : files) {
            if (file.isDirectory()) {

                log.info("Directory: " + file.getName());

                tempSet.clear();
                showFiles(Objects.requireNonNull(file.listFiles()));
                images.put(file.getName(), tempSet);

            } else {

                log.info("File: " + file.getName());

                Path path = Paths.get(file.getPath());
                String name = file.getName();
                String originalFileName = file.getName();
                String contentType = "image/png";
                byte [] content = null;

                try {
                    content = Files.readAllBytes(path);
                    log.info("content length : " + content.length);
                } catch (IOException e) {
                    e.printStackTrace();
                }

                MultipartFile result = new MockMultipartFile(name, originalFileName, contentType, content);
                log.info("MultipartFile : " + result);

                tempSet.add(result);
            }
        }

        if (!images.isEmpty()) {
            log.info("Map : " + images);
            imageService.loadImageFromResource(images);
        }
    }

    @Override
    public void run(String... args) throws Exception {
        this.getAllImages();
    }

}

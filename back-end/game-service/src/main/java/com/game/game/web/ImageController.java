package com.game.game.web;

import com.game.game.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@Slf4j
public class ImageController {

    @Autowired
    private ImageService imageService;

    //  get Images by theme
    @GetMapping("/game/image/theme/{theme}")
    public ResponseEntity<?> getImagesByTheme(@Valid @PathVariable String theme) {
        log.info("/game/image/theme/{" + theme + "} run");
        return ResponseEntity.ok(imageService.getImagesByTheme(theme));
    }

    //  get Images by name
    @GetMapping("/game/image/name/{name}")
    public ResponseEntity<?> getImagesByName(@Valid @PathVariable String name) {
        log.info("/game/image/name/{" + name + "} run");
        return ResponseEntity.ok(imageService.getImageByName(name));
    }

}

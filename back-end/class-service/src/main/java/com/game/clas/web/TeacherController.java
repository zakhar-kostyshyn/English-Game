package com.game.clas.web;

import com.game.clas.DAO.CreateNewClazz;
import com.game.clas.DAO.CreateNewCondition;
import com.game.clas.DAO.CreateNewTask;
import com.game.clas.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    //  create class
    @PostMapping("/class/create/{name}")
    public ResponseEntity<?> createClass(@Valid @RequestBody CreateNewClazz createNewClazz) {
        return ResponseEntity.ok(teacherService.createClazz(createNewClazz));
    }

    //  create task in input class and input data
    @PostMapping("/class/create/task")
    public ResponseEntity<?> createTask(@Valid @RequestBody CreateNewTask createNewTask) {
        return ResponseEntity.ok(teacherService.createTask(createNewTask));
    }

    //  create conditions for input task
    @PostMapping("/class/create/condition")
    public ResponseEntity<?> createTask(@Valid @RequestBody CreateNewCondition createNewCondition) {
        return ResponseEntity.ok(teacherService.createCondition(createNewCondition));
    }

    //  get all classes for teacher
    @GetMapping("/class/class/{owner}")
    public ResponseEntity<?> getAllClasses(@Valid @PathVariable String owner) {
        return ResponseEntity.ok(teacherService.getAllClazzes(owner));
    }

    //  get all tasks for class
    @GetMapping("/class/class/{classId}")
    public ResponseEntity<?> getAllTasks(@Valid @PathVariable String classId) {
        return ResponseEntity.ok(teacherService.getAllClazzesTask(classId));
    }

    //  get all conditions for task
    @GetMapping("/class/class/{taskId}")
    public ResponseEntity<?> getAllConditions(@Valid @PathVariable String taskId) {
        return ResponseEntity.ok(teacherService.getAllTasksConditions(taskId));
    }

}

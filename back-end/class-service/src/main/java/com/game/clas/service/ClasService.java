package com.game.clas.service;

import com.game.clas.DAO.ConnectStudent;
import com.game.clas.DAO.CreateNewClazz;
import com.game.clas.DAO.CreateNewCondition;
import com.game.clas.DAO.CreateNewTask;
import com.game.clas.model.*;
import com.game.clas.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Slf4j
public class ClasService {

    @Autowired
    private ClazzRepository clazzRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ConditionRepository conditionRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private StudentRepository studentRepository;

    //  create class service
    public Clazz createClazz (CreateNewClazz createNewClazz) {

        String newCode = Integer.toString( 100000 + (int)(Math.random() * 200000));

        Clazz newClazz = Clazz.builder()
                .code(newCode)
                .name(createNewClazz.getName())
                .owner(createNewClazz.getOwner())
                .build();

        clazzRepository.save(newClazz);

        Teacher existTeacher = teacherRepository.findByName(createNewClazz.getOwner())
                .orElseThrow(() -> new RuntimeException("there is no teacher with entered name"));
        existTeacher.getClazzes().add(newClazz);

        log.info("new Class created : " + newClazz);
        log.info("new Class add to the set in : " + existTeacher.getClazzes() + " in teacher : " + existTeacher.getName());

        return newClazz;
    }

    //  create task in input class and input data
    public Task createTask (CreateNewTask createNewTask) {

        Task newTask = Task.builder()
                .name(createNewTask.getName())
                .end_date(createNewTask.getEnd_date())
                .game(createNewTask.getGame())
                .build();

        taskRepository.save(newTask);

        Clazz existClass = clazzRepository.findById(Long.parseLong(createNewTask.getClazz()))
                .orElseThrow(() -> new RuntimeException("there is no class with entered name"));
        existClass.getTasks().add(newTask);

        clazzRepository.save(existClass);

        log.info("new Task created : " + newTask + " in Class : " + existClass.getName());

        return newTask;
    }

    //  create conditions for input task
    public Set<Condition> createCondition (CreateNewCondition createNewCondition) {

        Condition newCondition = Condition.builder()
                .cond(createNewCondition.getCondition())
                .name(createNewCondition.getName())
                .build();

        conditionRepository.save(newCondition);

        Task existTask = taskRepository.findById(Long.parseLong(createNewCondition.getTask()))
                .orElseThrow(() -> new RuntimeException("there is no task with entered name"));
        existTask.getCondition().add(newCondition);
        taskRepository.save(existTask);

        log.info("new Condition created : " + newCondition + " in Task : " + existTask.getName());

        return existTask.getCondition();
    }

    //  get all classes by owner
    public Set<Clazz> getAllClazzes (String owner) {

        Teacher existTeacher = teacherRepository.findByName(owner)
                .orElseThrow(() -> new RuntimeException("there is no teacher with entered name"));
        Set<Clazz> clazzSet = existTeacher.getClazzes();

        log.info("all Classes : " + clazzSet + " with owner : " + owner);

        return clazzSet;
    }

    //  get all task by class id
    public Set<Task> getAllClazzesTask(String clazzId) {

        Clazz existClazz = clazzRepository.findById(Long.parseLong(clazzId))
                .orElseThrow(() -> new RuntimeException("there is no class with entered name"));

        Set<Task> existAllTask = existClazz.getTasks();

        log.info("all Tasks : " + existAllTask + " in Class : " + existClazz.getName());

        return existAllTask;
    }

    //  get all conditions by task id
    public Set<Condition> getAllTasksConditions(String taskId) {

        Task existTask = taskRepository.findById(Long.parseLong(taskId))
                .orElseThrow(() -> new RuntimeException("there is no task with entered name"));

        Set<Condition> existAllConditions = existTask.getCondition();

        log.info("all Condition : " + existAllConditions + " in Task : " + existTask.getName());

        return existAllConditions;
    }

    // TODO teacher create a list of students

    //  get all students by teacher
    public Set<Student> getAllStudent (String owner) {

        Teacher existTeacher = teacherRepository.findByName(owner)
                .orElseThrow(() -> new RuntimeException("there is no teacher with entered name"));

        Set<Student> studentSet = existTeacher.getStudents();

        log.info("all Students : " + studentSet + " with owner : " + owner);

        return studentSet;
    }

    //  get all classes for student name
    public Set<Clazz> getAllClassFromStudent (String student) {

        Student existStudent = studentRepository.findByName(student)
                .orElseThrow(() -> new RuntimeException("there is no student with entered name"));

        Set<Clazz> clazzSet = existStudent.getClazzes();

        log.info("all Classes : " + clazzSet + " with student : " + student);

        return clazzSet;
    }

    //  get all students by class name
    public Set<Student> getAllStudentFromClass (String clazz) {

        Clazz existClazz = clazzRepository.findByName(clazz)
                .orElseThrow(() -> new RuntimeException("there is no class with entered name"));

        Set<Student> studentSet = existClazz.getStudents();

        log.info("all Students : " + studentSet + " in class : " + clazz);

        return studentSet;
    }

    //  connect Student to Class by code
    public Clazz connectStudentToClass (ConnectStudent connectStudent) {

        Student existStudent = studentRepository.findByName(connectStudent.getName())
                .orElseThrow(() -> new RuntimeException("there is no student with entered name"));

        Clazz existClazz = clazzRepository.findByCode(connectStudent.getCode())
                .orElseThrow(() -> new RuntimeException("there is no class with entered code"));

        existClazz.getStudents().add(existStudent);

        log.info("add Student : " + existStudent + " to class : " + existClazz);

        return existClazz;
    }
}

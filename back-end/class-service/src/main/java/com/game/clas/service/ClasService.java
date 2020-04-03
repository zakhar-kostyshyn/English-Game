package com.game.clas.service;

import com.game.clas.DAO.CreateNewClazz;
import com.game.clas.DAO.CreateNewCondition;
import com.game.clas.DAO.CreateNewTask;
import com.game.clas.model.Clazz;
import com.game.clas.model.Condition;
import com.game.clas.model.Task;
import com.game.clas.repository.ClazzRepository;
import com.game.clas.repository.ConditionRepository;
import com.game.clas.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Slf4j
public class TeacherService {

    @Autowired
    private ClazzRepository clazzRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ConditionRepository conditionRepository;

    //  create class service
    public Clazz createClazz (CreateNewClazz createNewClazz) {

        String newCode = Integer.toString( 100000 + (int)(Math.random() * 200000));

        Clazz newClazz = Clazz.builder()
                .code(newCode)
                .name(createNewClazz.getName())
                .owner(createNewClazz.getOwner())
                .build();

        clazzRepository.save(newClazz);

        log.info("new Class created : " + newClazz);

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

        Clazz existClass = clazzRepository.findById(Long.parseLong(createNewTask.getClazz())).get();
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

        Task existTask = taskRepository.findById(Long.parseLong(createNewCondition.getTask())).get();
        existTask.getCondition().add(newCondition);
        taskRepository.save(existTask);

        log.info("new Condition created : " + newCondition + " in Task : " + existTask.getName());

        return existTask.getCondition();
    }

    //  get all classes by owner
    public Set<Clazz> getAllClazzes (String owner) {

        Set<Clazz> clazzSet = clazzRepository.findAllByOwner(owner);

        log.info("all Classes : " + clazzSet + " with owner : " + owner);

        return clazzSet;
    }

    //  get all task by class id
    public Set<Task> getAllClazzesTask(String clazzId) {

        Clazz existClazz = clazzRepository.findById(Long.parseLong(clazzId)).get();
        Set<Task> existAllTask = existClazz.getTasks();

        log.info("all Tasks : " + existAllTask + " in Class : " + existClazz.getName());

        return existAllTask;
    }

    //  get all conditions by task id
    public Set<Condition> getAllTasksConditions(String taskId) {

        Task existTask = taskRepository.findById(Long.parseLong(taskId)).get();
        Set<Condition> existAllConditions = existTask.getCondition();

        log.info("all Condition : " + existAllConditions + " in Task : " + existTask.getName());

        return existAllConditions;
    }

}

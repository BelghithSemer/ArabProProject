package com.Backend.ArabPro.controllers;
import com.Backend.ArabPro.Service.TaskService;
import com.Backend.ArabPro.models.Task;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService serv;

    @PostMapping("/add")
    public Task add(@RequestBody Task task ){
        return serv.Create(task);
    }
    @PutMapping("/update")
    public Task Update(@RequestBody Task task){

        return serv.Update(task);
    }

    @GetMapping("/show/{id}")
    public Task Get(@PathVariable Long id){

        return serv.Retrieve(id);
    }

    @GetMapping("/show")
    public List<Task> getAll(){

        return serv.Retrieve();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        serv.Delete(id);
    }
}

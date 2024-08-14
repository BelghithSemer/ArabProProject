package com.Backend.ArabPro.controllers;


import com.Backend.ArabPro.Service.ProjectService;
import com.Backend.ArabPro.models.Project;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/project")
public class ProjectController {

    private final ProjectService serv;

    @PostMapping("/add")
    public Project add(@RequestBody Project biblio ){
        return serv.Create(biblio);
    }
    @PutMapping("/update")
    public Project Update(@RequestBody Project biblio){

        return serv.Update(biblio);
    }

    @GetMapping("/show/{id}")
    public Project Get(@PathVariable Long id){

        return serv.Retrieve(id);
    }

    @GetMapping("/show")
    public List<Project> getAll(){

        return serv.Retrieve();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        serv.Delete(id);
    }
}

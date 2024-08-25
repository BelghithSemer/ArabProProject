package com.Backend.ArabPro.controllers;


import com.Backend.ArabPro.Service.UserService;

import com.Backend.ArabPro.models.User;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    private final UserService serv;
    @PostMapping("/add")
    public User add(@RequestBody User user ){
        return serv.Create(user);
    }
    @PutMapping("/update")
    public User Update(@RequestBody User user){
        return serv.Update(user);
    }

    @GetMapping("/show/{id}")
    public User Get(@PathVariable Long id){
        return serv.Retrieve(id);
    }

    @GetMapping("/show")
    public List<User> getAll(){
        return serv.Retrieve();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        serv.Delete(id);
    }
}

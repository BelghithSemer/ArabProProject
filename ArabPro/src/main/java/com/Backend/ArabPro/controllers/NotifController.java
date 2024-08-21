package com.Backend.ArabPro.controllers;


import com.Backend.ArabPro.Service.NotifService;
import com.Backend.ArabPro.models.Notif;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/notif")
public class NotifController {

    private final NotifService serv;

    @PostMapping("/add")
    public Notif add(@RequestBody Notif notif ){
        return serv.Create(notif);
    }
    @PutMapping("/update")
    public Notif Update(@RequestBody Notif notif){
        return serv.Update(notif);
    }

    @GetMapping("/show/{id}")
    public Notif Get(@PathVariable Long id){
        return serv.Retrieve(id);
    }

    @GetMapping("/show")
    public List<Notif> getAll(){
        return serv.Retrieve();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        serv.Delete(id);
    }
}

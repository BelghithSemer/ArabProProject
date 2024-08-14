package com.Backend.ArabPro.controllers;

import com.Backend.ArabPro.Service.DemandService;

import com.Backend.ArabPro.models.Demand;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/demands")
public class DemandController {


    private final DemandService demandService;

    @PostMapping("/submit")
    public Demand submitDemand(@RequestBody Demand demand) {
        return demandService.submitDemand(demand);
    }

    @PutMapping("/{id}/partial-validate")
    public Demand validatePartially(@PathVariable Long id, @RequestParam String chef) {
        return demandService.validatePartially(id, chef);
    }

    @PutMapping("/{id}/full-validate")
    public Demand validateFully(@PathVariable Long id, @RequestParam String admin) {
        return demandService.validateFully(id, admin);
    }

    @PutMapping("/{id}/reject")
    public Demand reject(@PathVariable Long id, @RequestParam String admin) {
        return demandService.reject(id, admin);
    }


    @PostMapping("/add")
    public Demand add(@RequestBody Demand demand ){
        return demandService.Create(demand);
    }
    @PutMapping("/update")
    public Demand Update(@RequestBody Demand demand){

        return demandService.Update(demand);
    }

    @GetMapping("/show/{id}")
    public Demand Get(@PathVariable Long id){

        return demandService.Retrieve(id);
    }

    @GetMapping("/show")
    public List<Demand> getAll(){

        return demandService.Retrieve();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        demandService.Delete(id);
    }
}

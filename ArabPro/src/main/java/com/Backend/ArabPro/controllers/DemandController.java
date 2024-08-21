package com.Backend.ArabPro.controllers;

import com.Backend.ArabPro.Service.DemandService;

import com.Backend.ArabPro.Service.UserService;
import com.Backend.ArabPro.models.Demand;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/demands")
public class DemandController {


    private final DemandService demandService;
    private final UserService userService;
    private JavaMailSender javaMailSender;
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
    public String delete(@PathVariable Long id){

        demandService.Delete(id);
        return "Request Deleted";
    }


    @PostMapping("/sendmail")
    private void sendConfirmationEmail(@RequestBody Demand dem ) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        String mail = userService.Retrieve(dem.getIdDemandeur()).getEmail();
        try {
            helper.setTo(mail);
            helper.setSubject("Reponse du Demande");
            helper.setText("Dear Employee,\n\nYour request has been successfully submitted.\n\nBest regards,\nThe HR Team");

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace(); // Handle exception appropriately
        }
    }
}

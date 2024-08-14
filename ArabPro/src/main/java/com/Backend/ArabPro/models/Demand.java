package com.Backend.ArabPro.models;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

//add notation eli mawjoudin fi class user

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Demand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String typeDemande;
    private String description;
    private DemandState state;

    private Long idDemandeur;
    private Long idChef;
    private Long idAdmin;


    private Date dateCreation;
    private Date dateValidationPartielle;
    private Date dateValidationFinale;


}

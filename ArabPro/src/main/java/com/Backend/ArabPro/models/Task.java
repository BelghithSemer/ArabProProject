package com.Backend.ArabPro.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String priority;
    private String Libelle;
    private String Description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;


    @ManyToOne
    private User employee;

    @ManyToOne
    private Project project;



}

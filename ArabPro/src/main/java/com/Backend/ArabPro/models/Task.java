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
    private String libelle;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskStatus status;


    @ManyToOne
    @JoinColumn(name = "employee_id")
    private User employee;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;



}

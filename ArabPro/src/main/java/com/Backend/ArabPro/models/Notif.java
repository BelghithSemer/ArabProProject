package com.Backend.ArabPro.models;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Notif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String content;

    private String type;

    @ManyToOne
    private Demand request;




}

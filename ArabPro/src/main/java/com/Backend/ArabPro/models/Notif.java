package com.Backend.ArabPro.models;


import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Notif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String content;
    private String type;

    private Date date;


    @ManyToOne
    private Demand request;


    @ManyToOne
    private Task task;






}

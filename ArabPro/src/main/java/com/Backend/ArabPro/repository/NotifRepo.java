package com.Backend.ArabPro.repository;


import com.Backend.ArabPro.models.Notif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotifRepo extends JpaRepository<Notif, Long> {
}

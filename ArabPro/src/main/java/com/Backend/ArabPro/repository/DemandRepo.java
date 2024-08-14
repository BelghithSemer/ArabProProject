package com.Backend.ArabPro.repository;

import com.Backend.ArabPro.models.Demand;
import com.Backend.ArabPro.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandRepo extends JpaRepository<Demand, Long> {
}

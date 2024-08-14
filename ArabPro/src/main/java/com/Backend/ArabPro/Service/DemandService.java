package com.Backend.ArabPro.Service;
import com.Backend.ArabPro.models.Demand;
import com.Backend.ArabPro.models.DemandState;
import com.Backend.ArabPro.repository.DemandRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class DemandService implements IService<Demand>{

    private final DemandRepo repo;

    public Demand submitDemand(Demand demand) {
        // Logique pour soumettre la demande
        demand.setState(DemandState.SOUMISE);
        demand.setDateCreation(new Date());
        return demand;
    }

    public Demand validatePartially(Long demandId, String chef) {
        // Logique pour valider partiellement la demande par le chef
        Demand demand = getDemandById(demandId);
        demand.setState(DemandState.PARTIELLEMENT_VALIDEE);
        //demand.setChef(chef);
        demand.setDateValidationPartielle(new Date());
        return demand;
    }

    public Demand validateFully(Long demandId, String admin) {
        // Logique pour valider complètement la demande par l'administrateur
        Demand demand = getDemandById(demandId);
        demand.setState(DemandState.VALIDEE);
        //demand.setAdmin(admin);
        demand.setDateValidationFinale(new Date());
        return demand;
    }

    public Demand reject(Long demandId, String admin) {
        // Logique pour rejeter la demande par l'administrateur
        Demand demand = getDemandById(demandId);
        demand.setState(DemandState.REFUSEE);
        //demand.setAdmin(admin);
        return demand;
    }

    public Demand getDemandById(Long demandId) {
        // Logique pour récupérer la demande par ID
        // Implémentation de la récupération des données depuis la base de données, etc.
        // Retourner la demande correspondante
        return null;
    }

    @Override
    public Demand Create(Demand demand) {
        return repo.save(demand);
    }

    @Override
    public Demand Update(Demand demand) {
        return repo.save(demand);
    }

    @Override
    public Demand Retrieve(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Demand> Retrieve() {
        return repo.findAll();
    }

    @Override
    public void Delete(Long id) {
        repo.deleteById(id);
    }
}

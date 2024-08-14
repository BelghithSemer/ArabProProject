package com.Backend.ArabPro.Service;


import com.Backend.ArabPro.models.Project;
import com.Backend.ArabPro.repository.ProjectRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectService implements IService<Project>{

    private final ProjectRepo repo;
    @Override
    public Project Create(Project project) {
        return repo.save(project);
    }

    @Override
    public Project Update(Project project) {
        return repo.save(project);
    }

    @Override
    public Project Retrieve(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Project> Retrieve() {
        return repo.findAll();
    }

    @Override
    public void Delete(Long id) {
        repo.deleteById(id);
    }
}

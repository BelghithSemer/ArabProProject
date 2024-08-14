package com.Backend.ArabPro.Service;

import com.Backend.ArabPro.models.Task;
import com.Backend.ArabPro.repository.TaskRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TaskService implements IService<Task>{

    private final TaskRepo repo;

    @Override
    public Task Create(Task task) {
        return repo.save(task);
    }

    @Override
    public Task Update(Task task) {
        return repo.save(task);
    }

    @Override
    public Task Retrieve(Long id) {
        return repo.findById(id).orElse(null);
    }

    @Override
    public List<Task> Retrieve() {
        return repo.findAll();
    }

    @Override
    public void Delete(Long id) {
        repo.deleteById(id);
    }
}

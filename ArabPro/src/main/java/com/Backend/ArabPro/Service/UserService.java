package com.Backend.ArabPro.Service;

import com.Backend.ArabPro.models.User;
import com.Backend.ArabPro.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService implements IService<User>{

    private final UserRepository repo;
    @Override
    public User Create(User user) {
        return null;
    }

    @Override
    public User Update(User user) {
        return null;
    }

    @Override
    public User Retrieve(Long id) {
        return repo.getById(id);
    }

    @Override
    public List<User> Retrieve() {
        return null;
    }

    @Override
    public void Delete(Long id) {

    }
}

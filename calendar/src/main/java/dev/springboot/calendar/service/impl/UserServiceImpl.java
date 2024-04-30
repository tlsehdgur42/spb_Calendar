package dev.springboot.calendar.service.impl;

import dev.springboot.calendar.models.User;
import dev.springboot.calendar.repository.UserRepository;
import dev.springboot.calendar.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void userRegister(User user) {
        userRepository.save(user);
    }
}

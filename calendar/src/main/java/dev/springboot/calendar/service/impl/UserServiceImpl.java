package dev.springboot.calendar.service.impl;

import dev.springboot.calendar.models.User;
import dev.springboot.calendar.repository.UserRepository;
import dev.springboot.calendar.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void userRegister(User user) {
        userRepository.save(user);
    }
}

package com.shifthappens.showgo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.exceptions.InvalidPasswordException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.repositories.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    
    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/users")
    private List<User> findAll() {
        List<User> users = new ArrayList<User>();
        userRepo.findAll().forEach(user -> users.add(user));
        return users;
    }

    @PostMapping("/users")
    public User signUp(@RequestBody User user) {
        System.out.println("*****IM SIGNING SOMEONE UP*******");
        if (!isValidUsername(user.getUsername())) {
            throw new InvalidUsernameException();
        }
        if (!isValidPassword(user.getPassword())) {
            throw new InvalidPasswordException();
        }
        return userRepo.save(user);

    }

    @DeleteMapping("/user/{username}")
    public void deleteUser(@PathVariable String username) {
        userRepo.delete(userRepo.findByUsername(username));
    }

    @GetMapping("/user/{username}")
    public User findUser(@PathVariable String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new InvalidUsernameException();
        }
        return user;
    }

    private boolean isValidPassword(String password) {
        return password.length() >= 6;
    }

    private boolean isValidUsername(String username) {
        return (!username.contains(" ") && 
                userRepo.findByUsername(username) == null);
    }

}
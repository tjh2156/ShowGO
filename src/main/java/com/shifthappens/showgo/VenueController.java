package com.shifthappens.showgo;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidPasswordException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.exceptions.InvalidVenueCreationException;
import com.shifthappens.showgo.repositories.UserRepository;
import com.shifthappens.showgo.repositories.VenueRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VenueController {
    
    private final VenueRepository venueRepo;
    private final UserRepository userRepo;

    public VenueController(VenueRepository venueRepo, UserRepository userRepo) {
        this.venueRepo = venueRepo;
        this.userRepo = userRepo;
    }

    //find all venues
    @GetMapping("/venues")
    private List<Venue> findAll() {
        List<Venue> venues = new ArrayList<Venue>();
        venueRepo.findAll().forEach(venue -> venues.add(venue));
        return venues;
    }

    //sign up as a venue
    @PostMapping("/venues")
    public Venue signUp(@RequestBody Venue venue) {
        if (!isValidUsername(venue.getUsername())) {
            throw new InvalidUsernameException();
        }
        if (!isValidPassword(venue.getPassword())) {
            throw new InvalidPasswordException();
        }
        return venueRepo.save(venue);

    }
    //edit a venue's information through the settings page
    @PostMapping("/venues/settings")
    public Venue editSettings(@RequestBody Venue venue) {
        if (venueRepo.findByUsername(venue.getUsername()) == null) {
            throw new InvalidUsernameException();
        }
        if (!isValidPassword(venue.getPassword())) {
            throw new InvalidPasswordException();
        }
        return venueRepo.save(venue);
    }

    //delete a venue from the repository
    @DeleteMapping("/venues/{username}")
    public void deleteVenue(@PathVariable String username) {
        venueRepo.delete(venueRepo.findByUsername(username));
    }

    //find a sigular venue by its username
    @GetMapping("/venues/{username}")
    public Venue findVenue(@PathVariable String username) {
        Venue venue = venueRepo.findByUsername(username);
        if (venue == null) {
            throw new InvalidUsernameException();
        }
        return venue;
    }

    //checks if an inputted string fits password requirements
    protected boolean isValidPassword(String password) {
        if (password.length() >= 8) {
            Pattern letter = Pattern.compile("[A-Z]");
            Pattern special = Pattern.compile ("[!@#$&*()_+=|<>?{}\\[\\]~-]");
            Matcher hasLetter = letter.matcher(password);
            Matcher hasSpecial = special.matcher(password);

            return hasLetter.find() && hasSpecial.find();
        }
        else {
            return false;
        }
    }

    //checks if an inputted string fits username requirements
    protected boolean isValidUsername(String username) {
        return (username != null &&
                !username.isBlank() &&
                !username.contains(" ") && 
                userRepo.findByUsername(username) == null && 
                venueRepo.findByUsername(username) == null &&
                username.length() <= 20) ;
    }
    //Used to check whether a venue is valid, throws InvalidVenueCreationException if not
    protected void checkParams(Venue venue) {
        if (venue.getName().equals("")) {
            throw new InvalidVenueCreationException("Invalid name");
        }
        if (venue.getDescription() != null && venue.getDescription().length() > 1000 || venue.getDescription().equals("")) {
            throw new InvalidVenueCreationException("Invalid description length");
        }
        if (venue.getLocation() != null && venue.getLocation().length() > 100) {
            throw new InvalidVenueCreationException("Invalid location");
        }
    }

}

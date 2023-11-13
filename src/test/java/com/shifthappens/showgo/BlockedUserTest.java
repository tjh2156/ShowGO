package com.shifthappens.showgo;

import com.shifthappens.showgo.entities.BlockedUser;
import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.repositories.BlockedUserRepository;
import com.shifthappens.showgo.repositories.UserRepository;
import com.shifthappens.showgo.repositories.VenueRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BlockedUserTest {
    Venue Venue1= new Venue("test1", "test1", "testpassword");
    Venue Venue2= new Venue("test2", "test2", "testpassword");

    User User1= new User("test11", "test11", "testpassword");
    User User2= new User("test22", "test22", "testpassword");

    BlockedUser BlockedUser1= new BlockedUser(User1, Venue1);
    BlockedUser BlockedUser2= new BlockedUser(User1, Venue2);
    BlockedUser BlockedUser3= new BlockedUser(User2, Venue2);

    @Autowired
    private VenueRepository VenueRepository;
    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private BlockedUserRepository BlockedUserRepository;
    
    @Before
    public void setUp() throws Exception {

        this.VenueRepository.save(Venue1);
        this.VenueRepository.save(Venue2);

        this.UserRepository.save(User1);
        this.UserRepository.save(User2);

        this.BlockedUserRepository.save(BlockedUser1);
        this.BlockedUserRepository.save(BlockedUser2);
        this.BlockedUserRepository.save(BlockedUser3);

        assertNotNull(BlockedUser1.getUser());
        assertNotNull(BlockedUser2.getUser());
        assertNotNull(BlockedUser3.getUser());
    }
    @Test
    public void testFetchData(){
        /*Test data retrieval*/
        List<BlockedUser> BlockedUsersA = BlockedUserRepository.findByUserUsername(User1.getUsername());
        assertNotNull(BlockedUsersA);
        assertEquals(2, BlockedUsersA.size());

        List<BlockedUser> BlockedUsersB = BlockedUserRepository.findByVenueUsername(Venue2.getUsername());
        assertNotNull(BlockedUsersB);
        assertEquals(2, BlockedUsersB.size());

        BlockedUser BlockedUserA = BlockedUserRepository.findByUserAndVenue(User1.getUsername(), Venue1.getUsername());
        assertNotNull(BlockedUserA);
        assertEquals(User1.getUsername(), BlockedUserA.getUser().getUsername());
        assertEquals(Venue1.getUsername(), BlockedUserA.getVenue().getUsername());

    }

    @After
    public void tearDown() throws Exception {
        BlockedUserRepository.delete(BlockedUser1);
        BlockedUserRepository.delete(BlockedUser2);
        BlockedUserRepository.delete(BlockedUser3);

        UserRepository.delete(User1);
        UserRepository.delete(User2);

        VenueRepository.delete(Venue1);
        VenueRepository.delete(Venue2);
    }
}
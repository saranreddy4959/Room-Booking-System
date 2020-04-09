package com.saran.roombooking.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saran.roombooking.data.UserRepository;
import com.saran.roombooking.model.AngularUser;
import com.saran.roombooking.model.entities.User;

@RestController
@RequestMapping("/api/users")
public class RestUsersController {
	
	@Autowired
	private UserRepository userRepository;
	
	
	@GetMapping()
	public List<AngularUser>  getAllUsers(){
		return userRepository.findAll().parallelStream().map(user -> new AngularUser(user)).collect(Collectors.toList());
		
	}
	
	@GetMapping("/{id}")
	public AngularUser getUser(@PathVariable Long id) {
		return new AngularUser(userRepository.findById(id).get());
	}
	
	
	@PutMapping()
	public AngularUser updateUser(@RequestBody AngularUser updatedUser) {
		User originalUser = userRepository.findById(updatedUser.getId()).get();
		originalUser.setName(updatedUser.getName());
		return new AngularUser(userRepository.save(originalUser));
	}
	
	@PostMapping()
	public AngularUser newUser(@RequestBody AngularUser user) {
		return new AngularUser(userRepository.save(user.asUser()));
	}
}

package com.saran.roombooking.rest;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saran.roombooking.data.RoomRepository;
import com.saran.roombooking.model.entities.Room;



@RestController
@RequestMapping("/api/rooms")
public class RestRoomsController {
	
	
	@Autowired
	private RoomRepository roomRepository;
	
	@GetMapping
	public List<Room> getAllRooms(){
		return roomRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Room getRoom(@PathVariable("id") Long id) {
		
		return roomRepository.findById(id).get();
	}
	
	@PostMapping()
	public Room newRoom(@RequestBody Room room) {
		return roomRepository.save(room);
	}
	
	@PutMapping()
	public Room updateRoom(@RequestBody Room updateRoom) {
		Room originalRoom = roomRepository.findById(updateRoom.getId()).get();
		originalRoom.setName(updateRoom.getName());
		originalRoom.setLocation(updateRoom.getLocation());
		originalRoom.setCapacities(updateRoom.getCapacities());
		return roomRepository.save(originalRoom);
	}
}

package com.saran.roombooking.rest;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saran.roombooking.data.BookingRepository;
import com.saran.roombooking.model.entities.Booking;

@RestController
@RequestMapping("/api/bookings")
public class RestBookingsController {
	
	@Autowired
	BookingRepository bookingRepository;
	
	
	@GetMapping("/{date}")
	public List<Booking> getBookingByDate(@PathVariable("date") String date){
		Date sqlDate = Date.valueOf(date);
		return bookingRepository.findAllByDate(sqlDate);
	}
	
	@DeleteMapping("/{id}")
	public void deleteBooking(@PathVariable("id") Long id) {
		bookingRepository.deleteById(id);
	}

}

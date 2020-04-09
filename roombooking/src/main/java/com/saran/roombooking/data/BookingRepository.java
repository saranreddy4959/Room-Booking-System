package com.saran.roombooking.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saran.roombooking.model.entities.Booking;

import java.sql.Date;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByDate(Date date);
}

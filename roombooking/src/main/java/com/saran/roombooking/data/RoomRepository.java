package com.saran.roombooking.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saran.roombooking.model.entities.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}

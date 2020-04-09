package com.saran.roombooking.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.saran.roombooking.model.entities.User;

public interface UserRepository extends JpaRepository<User,Long> {
}

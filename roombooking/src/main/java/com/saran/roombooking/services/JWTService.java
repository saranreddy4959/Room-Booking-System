package com.saran.roombooking.services;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import javax.annotation.PostConstruct;
import org.springframework.stereotype.Service;

@Service
public class JWTService {
	
	private RSAPrivateKey rsaPrivateKey;
	private RSAPublicKey  rsaPublicKey;
	private long expirationTime = 1800000;
	
	@PostConstruct
	private void initkeys() throws NoSuchAlgorithmException {
		//this will give us rsa 256 algorithm
		KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
		//we are going to generate a private public key which has a size of 2048
		generator.initialize(2048);
		//Generating the key pair
		KeyPair keyPair = generator.generateKeyPair();
		rsaPrivateKey = (RSAPrivateKey)keyPair.getPrivate();
		rsaPublicKey = (RSAPublicKey)keyPair.getPublic();
		
	}
	
	public String generateToken(String name, String role) {
		return JWT.create()
				.withClaim("user", name)
				.withClaim("role", role)
				.withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
				.sign(Algorithm.RSA256(rsaPublicKey,rsaPrivateKey));
	}
	
	public String validateToken(String token) throws JWTVerificationException {
		
		String encodedPayload = JWT.require(Algorithm.RSA256(rsaPublicKey,rsaPrivateKey))
							.build()
							.verify(token)
							.getPayload();
		
		return new String(Base64.getDecoder().decode(encodedPayload));
	}

}

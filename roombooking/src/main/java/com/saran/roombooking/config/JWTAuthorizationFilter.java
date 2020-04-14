package com.saran.roombooking.config;

import static org.hamcrest.CoreMatchers.nullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.saran.roombooking.services.JWTService;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
	
	
	public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}
	
	JWTService jwtService;
	
	
		@Override
		public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
			
			Cookie[] cookies = request.getCookies();
			if(cookies == null || cookies.length == 0) {
				chain.doFilter(request, response);
				return;
			}
			
			Cookie tokenCookie = null;
			for(Cookie cookie: cookies) {
				if(cookie.getName().equals("token")) {
					tokenCookie = cookie;
				}
			}
			
			if(tokenCookie == null) {
			//if(header == null || !header.startsWith("Bearer")) {
				chain.doFilter(request, response);
				return;
			}
			
			
			
			if(jwtService == null) {
			ServletContext servletContext = request.getServletContext();
			WebApplicationContext wac = WebApplicationContextUtils.getWebApplicationContext(servletContext);
			jwtService = wac.getBean(JWTService.class);
			}
			
			UsernamePasswordAuthenticationToken authentication = getAuthentication(tokenCookie.getValue());
			SecurityContextHolder.getContext().setAuthentication(authentication);
			chain.doFilter(request, response);
	}
		
		private UsernamePasswordAuthenticationToken getAuthentication(String jwtToken) {
			//String jwtToken = header.substring(7);
			try {
				String payload = jwtService.validateToken(jwtToken);
				JsonParser parser = JsonParserFactory.getJsonParser();
				Map<String, Object> payLoadMap = parser.parseMap(payload);
				String user = payLoadMap.get("user").toString();
				String role = payLoadMap.get("role").toString();
				
				List<GrantedAuthority> roles = new ArrayList<>();
				GrantedAuthority grantedAuthority = new GrantedAuthority() {
					

					@Override
					public String getAuthority() {
						// TODO Auto-generated method stub
						return "ROLE_"+role;
					}
				};
				
				roles.add(grantedAuthority);
				return new UsernamePasswordAuthenticationToken(user, null, roles);
			}
			catch(Exception e) {
				//token is not valid
				return null;
			}
			
		
		}

}

# Room-Booking-System

Designed a full stack application by creating a REST API in Java (using Spring Boot) and configure it to work with an 
Angular front end. This application displays the scheduled meeting which are booked by the user on a particular date.
It also displays the user who has booked the room including the room layout and number of participants.Also, implemented
security and authentication using JWT tokens by setting up a jwt cookie, sending a cookie from angular, using the cookie for
authentication, securing the cookie and getting the user's role. The user may be an admin or the user who had made the booking 
of meeting room. Admin has complete access of the application and can make the respective changes. User can only view his
particular appointment and the rooms which are available.

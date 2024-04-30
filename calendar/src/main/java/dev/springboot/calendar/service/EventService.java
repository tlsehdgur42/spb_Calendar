package dev.springboot.calendar.service;


import dev.springboot.calendar.models.Event;

public interface EventService {
     void eventRegister(Event event);

     void eventUpdate(Event event);

     void deleteEvent(int eventId);
     void updateEvent(int eventId, Event updatedEvent);
     void confirmNotification(int notificationId);

}

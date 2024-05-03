package dev.springboot.calendar.service.impl;

import dev.springboot.calendar.models.Event;
import dev.springboot.calendar.models.EventParticipant;
import dev.springboot.calendar.repository.EventParticipantRepository;
import dev.springboot.calendar.repository.EventRepository;
import dev.springboot.calendar.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final EventParticipantRepository eventParticipantRepository;

    // 캘린더 등록
    @Override
    public void eventRegister(Event event) {
        eventRepository.save(event);
    }

    // 캘린더 수정
    @Override
    public void eventUpdate(Event event)  {
        eventRepository.save(event);
    }

    // 캘린더 삭제
    @Override
    public void deleteEvent(int eventId) {
        System.out.println(eventId);
        eventRepository.deleteById(eventId);
    }


    @Override
    public void updateEvent(int eventId, Event updatedEvent) {
        // 주어진 이벤트 ID에 해당하는 이벤트를 찾습니다.
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("이벤트 ID를 찾을 수 없습니다. " + eventId));

        // 업데이트된 이벤트의 속성으로 이벤트를 업데이트합니다.
        event.setTitle(updatedEvent.getTitle());
        event.setDate(updatedEvent.getDate());
        event.setStartingHour(updatedEvent.getStartingHour());
        event.setEndingHour(updatedEvent.getEndingHour());
//        event.setPeople(updatedEvent.getPeople());
        event.setLocation(updatedEvent.getLocation());
        event.setSummary(updatedEvent.getSummary());

        // 업데이트된 이벤트를 저장합니다.
        eventRepository.save(event);
    }

    @Override
    public void confirmNotification(int notificationId) {
        // 주어진 알림 ID에 해당하는 알림을 확인 처리합니다.
        EventParticipant notification = eventParticipantRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("이벤트 ID를 찾을 수 없습니다. " + notificationId));
        notification.setConfirmed(true);
        eventParticipantRepository.save(notification);
    }
}
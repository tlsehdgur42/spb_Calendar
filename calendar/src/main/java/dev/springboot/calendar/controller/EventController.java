package dev.springboot.calendar.controller;

import dev.springboot.calendar.models.Event;
import dev.springboot.calendar.models.EventParticipant;
import dev.springboot.calendar.models.User;
import dev.springboot.calendar.repository.EventParticipantRepository;
import dev.springboot.calendar.repository.EventRepository;
import dev.springboot.calendar.repository.UserRepository;
import dev.springboot.calendar.service.EventService;
import dev.springboot.calendar.service.UserService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class EventController {

    private final UserService userService;
    private final EventService eventService;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventParticipantRepository eventParticipantRepository;

    // HttpServletRequest를 Model에 추가하는 메서드
    @ModelAttribute("request")
    public HttpServletRequest getRequest(HttpServletRequest request) {
        return request;
    }

    // HttpSession을 Model에 추가하는 메서드
    @ModelAttribute("session")
    public HttpSession getSession(HttpSession session) {
        return session;
    }

    // ServletContext를 Model에 추가하는 메서드
    @ModelAttribute("servletContext")
    public ServletContext getServletContext(ServletContext servletContext) {
        return servletContext;
    }

    // HttpServletResponse를 Model에 추가하는 메서드
    @ModelAttribute("response")
    public HttpServletResponse getResponse(HttpServletResponse response) {
        return response;
    }

    // 이벤트 페이지를 보여주는 메서드
    @GetMapping("/event")
    public String event(Model model){
        Event event = new Event();
        model.addAttribute("event", event); // 모델에 이벤트 추가
        return "calendar"; // calendar.html 템플릿 반환
    }

    // 이벤트 목록을 가져오는 메서드
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEvents(@RequestParam(defaultValue = "0") int page,
                                                 @RequestParam(defaultValue = "10") int pageSize,
                                                 HttpSession session) {

        User user = (User) session.getAttribute("user"); // 세션에서 사용자 정보 가져오기
        String userId = (user != null) ? String.valueOf(user.getId()) : null; // 사용자 ID 가져오기

        Pageable pageable = PageRequest.of(page, pageSize); // 페이지 및 페이지 크기 지정
        Page<EventParticipant> eventParticipantPage;
        Page<Event> eventPage;

        if (userId != null) { // 사용자 ID가 null이 아닌 경우
            eventParticipantPage = eventParticipantRepository.findByUserId(userId, pageable); // 사용자의 이벤트 참가 목록 가져오기
            eventPage = eventRepository.findByCreatorId(Integer.parseInt(userId), pageable); // 사용자가 생성한 이벤트 가져오기
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 권한 없음 오류 반환
        }

        List<EventParticipant> eventParticipants = eventParticipantPage.getContent(); // 페이지의 이벤트 참가자 목록 가져오기
        List<Event> events = new ArrayList<>();

        for (EventParticipant eventParticipant : eventParticipants) { // 각 이벤트 참가자에 대해 반복
            events.add(eventParticipant.getEvent()); // 이벤트 참가자의 이벤트를 이벤트 목록에 추가
        }

        List<Event> creatorEvents = eventPage.getContent(); // 페이지의 이벤트 생성자 목록 가져오기
        events.addAll(creatorEvents); // 이벤트 목록에 이벤트 생성자 목록 추가

        return ResponseEntity.ok(events); // 이벤트 목록 반환
    }

    // 이벤트를 삭제하는 메서드
    @DeleteMapping("/deleteEvent")
    public ResponseEntity<String> deleteEvent(@RequestParam("id") int eventId, HttpSession session) {
        User user = (User) session.getAttribute("user"); // 세션에서 사용자 정보 가져오기
        Optional<Event> event = eventRepository.findById(eventId); // 이벤트 ID로 이벤트 찾기
        int userId = user.getId(); // 사용자 ID 가져오기
        int creatorId = event.get().getCreator().getId(); // 이벤트 생성자 ID 가져오기
        if (userId == creatorId){ // 사용자가 이벤트 생성자인 경우
            eventService.deleteEvent(eventId); // 이벤트 삭제 처리
            return ResponseEntity.ok("Event deleted successfully"); // 성공 메시지 반환
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting event. Only creator can delete"); // 오류 메시지 반환
        }
    }

    // 이벤트 추가하는 메서드
    @PostMapping("/addEvent")
    public String addEvent(@ModelAttribute("event") Event event, @RequestParam("people") String people, Model model, HttpSession session) {
        User user = (User) session.getAttribute("user"); // 세션에서 사용자 정보 가져오기
        String result = null; // 결과 변수 초기화
        System.out.println(event); // 이벤트 정보 출력
        event.setCreator(user); // 이벤트의 생성자 설정
        String[] peopleArray = people.split(","); // 참가자들을 쉼표로 분리하여 배열로 저장

        List<User> allUsers = userRepository.findAll(); // 모든 사용자 검색

        model.addAttribute("allUsers", allUsers); // 모델에 모든 사용자 추가
        //eventService.eventRegister(event);
        Event savedEvent = eventRepository.save(event); // 이벤트 저장 및 반환

        // 각 사용자에 대해 반복
        for (String username : peopleArray) {
            User participant = userRepository.findByUsername(username.trim()); // 사용자 이름으로 사용자 찾기
            if (participant != null) { // 사용자가 존재하는 경우
                // 이벤트 참가자 엔티티 생성 및 이벤트 및 참가자 설정
                EventParticipant eventParticipant = new EventParticipant();
                eventParticipant.setEvent(savedEvent); // 이벤트 설정
                eventParticipant.setUser(participant); // 참가자 설정
                eventParticipant.setConfirmed(false); // 확인 여부 설정

                // 이벤트 참가자 저장
                eventParticipantRepository.save(eventParticipant);
            }
        }
        model.addAttribute("event", event); // 모델에 이벤트 추가
        //Event newEvent = new Event();
        //model.addAttribute("event", newEvent);

        result = "calendar"; // calendar.html 템플릿 반환
        return result; // 결과 반환
    }


    // 이벤트를 업데이트하는 메서드
    @PutMapping("/updateEvent")
    public ResponseEntity<String> updateEvent(@RequestParam("id") int eventId, @RequestBody Event updatedEvent, HttpSession session) {
        User user = (User) session.getAttribute("user"); // 세션에서 사용자 정보 가져오기
        Optional<Event> event = eventRepository.findById(eventId); // 이벤트 ID로 이벤트 찾기
        int userId = user.getId(); // 사용자 ID 가져오기
        int creatorId = event.get().getCreator().getId(); // 이벤트 생성자 ID 가져오기
        if (userId == creatorId){ // 사용자가 이벤트 생성자인 경우
            eventService.updateEvent(eventId, updatedEvent); // 이벤트 업데이트 처리
            return ResponseEntity.ok("Event updated successfully"); // 성공 메시지 반환
        }
        else {
            System.out.println("ERROR");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating event. Only creator can update"); // 오류 메시지 반환
        }
    }
}

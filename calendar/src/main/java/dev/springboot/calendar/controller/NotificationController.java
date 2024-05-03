package dev.springboot.calendar.controller;

import dev.springboot.calendar.models.EventParticipant;
import dev.springboot.calendar.models.User;
import dev.springboot.calendar.repository.EventParticipantRepository;
import dev.springboot.calendar.service.EventService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
@CrossOrigin("*")
public class NotificationController {

    private final EventService eventService;
    private final EventParticipantRepository eventParticipantRepository;

//    @ModelAttribute("request")
//    public HttpServletRequest getRequest(HttpServletRequest request) {
//        return request;
//    }
//
//    @ModelAttribute("session")
//    public HttpSession getSession(HttpSession session) {
//        return session;
//    }
//
//    @ModelAttribute("servletContext")
//    public ServletContext getServletContext(ServletContext servletContext) {
//        return servletContext;
//    }
//
//    @ModelAttribute("response")
//    public HttpServletResponse getResponse(HttpServletResponse response) {
//        return response;
//    }


    // 알림 목록을 가져오는 메서드
    @GetMapping
    public ResponseEntity<List<EventParticipant>> getNotifications(@RequestParam(defaultValue = "0") int page,
                                                                   @RequestParam(defaultValue = "10") int pageSize,
                                                                   HttpSession session){
        User user = (User) session.getAttribute("user"); // 세션에서 사용자 정보 가져오기
        Pageable pageable = PageRequest.of(page, pageSize); // 페이지 및 페이지 크기 지정
        Page<EventParticipant> eventsPage;

        eventsPage = eventParticipantRepository.findByUserIdAndConfirmed(user.getId(), false, pageable); // 사용자의 확인되지 않은 알림 가져오기
        List<EventParticipant> events = eventsPage.getContent(); // 현재 페이지의 내용 가져오기

        return ResponseEntity.ok(events); // 알림 목록 반환
    }

    // 알림을 삭제하는 메서드
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<String> deleteNotification(@PathVariable("notificationId") int notificationId, HttpSession session) {
        User user = (User) session.getAttribute("user"); // 세션에서 사용자 정보 가져오기
        Optional<EventParticipant> notification = eventParticipantRepository.findById(notificationId); // 알림 ID로 알림 찾기
        eventParticipantRepository.deleteById(notificationId); // 알림 삭제
        return ResponseEntity.ok("Event rejected successfully"); // 성공 메시지 반환
    }

    // 알림을 확인하는 메서드
    @PutMapping("/{notificationId}")
    public ResponseEntity<String> confirmNotification(@PathVariable("notificationId") int notificationId, HttpSession session) {
        User user = (User) session.getAttribute("user"); // 세션에서 사용자 정보 가져오기
        Optional<EventParticipant> notification = eventParticipantRepository.findById(notificationId); // 알림 ID로 알림 찾기
        eventService.confirmNotification(notificationId); // 알림 확인 처리
        return ResponseEntity.ok("Event confirmed successfully"); // 성공 메시지 반환
    }
}


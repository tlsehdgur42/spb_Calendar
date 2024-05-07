package dev.springboot.calendar.controller;


import dev.springboot.calendar.models.Event;
import dev.springboot.calendar.models.User;
import dev.springboot.calendar.repository.UserRepository;
import dev.springboot.calendar.service.UserService;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MainController {

    private final UserService userService;
    private final UserRepository userRepository;

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

    // 회원가입 화면을 보여주는 메서드
//    @GetMapping("/register")
//    public String register(Model model){
//        User user = new User();
//        model.addAttribute("user", user); // 모델에 사용자 객체 추가
//        List<User> allUsers = userRepository.findAll(); // 모든 사용자를 검색하여 가져옴
//        model.addAttribute("allUsers", allUsers); // 모델에 모든 사용자 추가
//        return "register"; // register.html 템플릿 반환
//    }


    // 사용자 회원가입을 처리하는 메서드
//    @PostMapping("/registerUser")
//    public String registerUser(@ModelAttribute("user") User user, Model model, HttpSession session) {
//        String result = null; // 결과를 저장할 변수 초기화
//        System.out.println(user); // 사용자 정보 출력
//        if (user.getPassword().equals(user.getCpassword())) { // 비밀번호 확인
//            try {
//                userService.userRegister(user); // 사용자 등록 서비스 호출
//                session.setAttribute("user", user); // 세션에 사용자 정보 추가
//                Event event = new Event();
//                model.addAttribute("event", event); // 모델에 이벤트 추가
//                List<User> allUsers = userRepository.findAll(); // 모든 사용자 검색
//                model.addAttribute("allUsers", allUsers); // 모델에 모든 사용자 추가
//                result = "calendar"; // calendar.html 템플릿 반환
//            } catch (Exception e) {
//                result = "error"; // 오류 발생 시 error.html 템플릿 반환
//            }
//        }
//        return result; // 결과 반환
//    }

    // api 회원가입
    @PostMapping("signup")
    public ResponseEntity<User> registerUser(@RequestBody User user, HttpSession session) {
        System.out.println(user); // 사용자 정보 출력
        if (!user.getPassword().equals(user.getCpassword())) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        userService.userRegister(user); // db에 저장
        session.setAttribute("user", user); // 세션에 사용자 정보 추가
        System.out.println(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }


    // 사용자 로그인 화면을 보여주는 메서드
//    @GetMapping("/")
//    public String login(Model model){
//        User user = new User();
//        model.addAttribute("user", user); // 모델에 사용자 객체 추가
//        return "index"; // index.html 템플릿 반환
//    }



    // 캘린더 화면을 보여주는 메서드
//    @GetMapping("/calendar")
//    public String showCalendar(Model model, HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//        User user = (User) session.getAttribute("user"); // 세션에서 사용자 정보 가져오기
//        model.addAttribute("currentUserUsername", user.getUsername()); // 현재 사용자의 이름을 모델에 추가
//
//        if (user == null) { // 사용자가 로그인하지 않은 경우
//            return "redirect:/"; // 로그인 페이지로 리다이렉트
//        }
//        Event event = new Event();
//        model.addAttribute("event", event); // 모델에 이벤트 추가
//        List<User> allUsers = userRepository.findAll(); // 모든 사용자 검색
//        model.addAttribute("allUsers", allUsers); // 모델에 모든 사용자 추가
//        return "calendar"; // calendar.html 템플릿 반환
//    }



    // 사용자 로그인을 처리하는 메서드
//    @PostMapping("/userLogin")
//    public String loginUser(@ModelAttribute("user") User user, Model model, HttpSession session, HttpServletRequest request) {
//        String userName = user.getUsername();
//
//        User userData = userRepository.findByUsername(userName); // 사용자 이름으로 사용자 데이터 검색
//        if (userData != null && user.getPassword().equals(userData.getPassword())) { // 사용자가 존재하고 비밀번호가 일치하는 경우
//            session.setAttribute("user", userData); // 세션에 사용자 정보 추가
//            Event event = new Event();
//            model.addAttribute("event", event); // 모델에 이벤트 추가
//            model.addAttribute("request", request); // 모델에 요청 추가
//
//            List<User> allUsers = userRepository.findAll(); // 모든 사용자 검색
//            model.addAttribute("allUsers", allUsers); // 모델에 모든 사용자 추가
//            model.addAttribute("currentUserUsername", userName); // 현재 사용자의 이름을 모델에 추가
//            return "calendar"; // calendar.html 템플릿 반환
//        } else {
//            return "error"; // 오류 발생 시 error.html 템플릿 반환
//        }
//    }


    // api 로그인
    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user, HttpSession session, HttpServletResponse response) {
        // 사용자 인증 로직
        User userData = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없음" + user.getUsername()));
        if (userData != null && user.getPassword().equals(userData.getPassword())) {
            session.setAttribute("user", userData);

            String sessionId = session.getId();
            // 세션 ID를 쿠키에 담아 클라이언트에게 전달
            Cookie cookie = new Cookie("sessionId", sessionId);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.status(HttpStatus.OK).body(userData);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    // api 로그아웃
    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, HttpServletResponse response) {
        // 사용자 세션 무효화
        request.getSession().invalidate();
        return ResponseEntity.ok().build();
    }

}
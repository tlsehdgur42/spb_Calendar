//package dev.springboot.calendar.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//import java.util.List;
//
//public class CorsConfig {
//
//    /* CORS 구성을 설정하는 메서드 */
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration(); // CORS 설정 객체 생성
//        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // 허용할 오리진(도메인) 설정
//        configuration.setAllowedMethods(Arrays.asList("GET","POST", "OPTIONS", "PATCH", "DELETE")); // 허용할 HTTP 메서드 설정
//        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization")); // 허용할 HTTP 헤더 설정
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); // URL 기반의 CORS 설정을 관리하는 객체 생성
//        source.registerCorsConfiguration("/**", configuration); // 모든 URL 패턴에 대해 CORS 설정을 등록
//        return source; // CORS 설정 객체 반환
//    }
//}

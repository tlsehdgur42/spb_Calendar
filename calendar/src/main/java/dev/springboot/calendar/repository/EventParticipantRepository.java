package dev.springboot.calendar.repository;

import dev.springboot.calendar.models.EventParticipant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventParticipantRepository extends JpaRepository<EventParticipant, Integer> {

    // 이벤트 ID와 사용자 ID로 이벤트 참가자를 찾는 메서드
    EventParticipant findByEventIdAndUserId(int eventId, int userId);

    // 사용자 ID와 확인 여부에 따라 페이지네이션된 이벤트 참가자 목록을 반환하는 메서드
    Page<EventParticipant> findByUserIdAndConfirmed(int userId, boolean confirmed, Pageable pageable);

    // 사용자 ID를 기반으로 페이지네이션된 이벤트 참가자 목록을 반환하는 메서드
    Page<EventParticipant> findByUserId(String userId, Pageable pageable);

}



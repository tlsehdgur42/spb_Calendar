package dev.springboot.calendar.repository;

import dev.springboot.calendar.models.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

    // 제목으로 이벤트를 검색하는 메서드
    Event findByTitle(String title);

    // 특정 사용자의 참가 이벤트 목록을 페이지네이션하여 반환하는 메서드
    Page<Event> findByParticipantsId(String userId, Pageable pageable);

    // 특정 사용자의 이벤트 참가 혹은 생성 이벤트 목록을 페이지네이션하여 반환하는 메서드
    Page<Event> findByCreatorIdOrParticipantsId(String userId, String userId1, Pageable pageable);

    // 특정 사용자가 생성한 이벤트 목록을 페이지네이션하여 반환하는 메서드
    Page<Event> findByCreatorId(int parseInt, Pageable pageable);

}

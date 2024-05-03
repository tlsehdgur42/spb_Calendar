package dev.springboot.calendar.models;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "event_participants")
public class EventParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean confirmed;

    public EventParticipant(Event event, User user, boolean b) {
        this.event = event;
        this.user = user;
        this.confirmed = b;
    }

}

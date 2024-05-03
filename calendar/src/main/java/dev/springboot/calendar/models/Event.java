package dev.springboot.calendar.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "events")
@Builder
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String date;
    private String startingHour;
    private String endingHour;
//    private String people;
    private String location;
    private String summary;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    /*@JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "event_participants",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> participants;*/

    @JsonIgnore
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private Set<EventParticipant> participants;

}
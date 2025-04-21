package com.filipinoexplorers.capstone.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "story_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoryQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String story;

    @Column(columnDefinition = "TEXT")
    private String question;

    private String choiceA;
    private String choiceB;
    private String choiceC;
    private String choiceD;

    private String correctAnswer;
}

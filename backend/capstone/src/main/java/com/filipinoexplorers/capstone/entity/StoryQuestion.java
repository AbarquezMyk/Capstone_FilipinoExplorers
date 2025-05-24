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
    private String story;
    private String question;

    @Column(name = "choice_a")
    private String choiceA;

    @Column(name = "choice_b")
    private String choiceB;

    @Column(name = "choice_c")
    private String choiceC;

    @Column(name = "choice_d")
    private String choiceD;

    @Column(name = "correct_answer")
    private String correctAnswer;
}

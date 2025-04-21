package com.filipinoexplorers.capstone.repository;

import com.filipinoexplorers.capstone.entity.StoryQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryQuestionRepository extends JpaRepository<StoryQuestion, Long> {
}

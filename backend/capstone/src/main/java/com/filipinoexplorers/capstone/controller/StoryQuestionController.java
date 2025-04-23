package com.filipinoexplorers.capstone.controller;

import com.filipinoexplorers.capstone.entity.StoryQuestion;
import com.filipinoexplorers.capstone.repository.StoryQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paaralan-quest")
@RequiredArgsConstructor
public class StoryQuestionController {

    private final StoryQuestionRepository repository;

    @GetMapping("/questions")
    public List<StoryQuestion> getAllQuestions() {
        return repository.findAll();
    }
}

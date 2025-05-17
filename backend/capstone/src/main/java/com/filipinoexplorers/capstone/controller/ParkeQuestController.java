package com.filipinoexplorers.capstone.controller;

import com.filipinoexplorers.capstone.dto.ParkeQuestDTO;
import com.filipinoexplorers.capstone.entity.ParkeQuestChoice;
import com.filipinoexplorers.capstone.entity.ParkeQuestQuestion;
import com.filipinoexplorers.capstone.repository.ParkeQuestChoiceRepository;
import com.filipinoexplorers.capstone.repository.ParkeQuestQuestionRepository;
import com.filipinoexplorers.capstone.service.ParkeQuestService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/parkequest")
@CrossOrigin
public class ParkeQuestController {
    private final ParkeQuestService service;
    @Autowired
private ParkeQuestQuestionRepository parkeQuestQuestionRepository;

@Autowired
private ParkeQuestChoiceRepository parkeQuestChoiceRepository;


    public ParkeQuestController(ParkeQuestService service) {
        this.service = service;
    }

    @GetMapping
    public List<ParkeQuestQuestion> getAll() {
        return service.getAll();
    }

    @PostMapping
public ResponseEntity<ParkeQuestQuestion> save(@RequestBody ParkeQuestDTO dto) {
    ParkeQuestQuestion question = new ParkeQuestQuestion();
    question.setStory(dto.getStory());
    question.setQuestion(dto.getQuestion());
    question.setCorrectAnswer(dto.getCorrectAnswer());
    question.setHint(dto.getHint()); // ✅ add this line


    List<ParkeQuestChoice> choiceList = dto.getChoices().stream().map(choiceText -> {
        ParkeQuestChoice choice = new ParkeQuestChoice();
        choice.setChoice(choiceText);
        choice.setQuestion(question); // important
        return choice;
    }).collect(Collectors.toList());

    question.setChoices(choiceList);
   return ResponseEntity.ok(parkeQuestQuestionRepository.save(question)); // ✅ correct

}

}

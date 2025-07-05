package com.filipinoexplorers.capstone.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/paaralan-quest")
@CrossOrigin(origins = "http://localhost:5173")
public class StoryQuestionController {

    @GetMapping("/questions")
    public ResponseEntity<List<Map<String, Object>>> getAllQuestions() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = getClass().getResourceAsStream("/StoryQuestionDB.json");

            if (inputStream == null) {
                return ResponseEntity.notFound().build();
            }

            List<Map<String, Object>> questions = mapper.readValue(inputStream, new TypeReference<>() {});
            return ResponseEntity.ok(questions);

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

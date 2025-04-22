package com.filipinoexplorers.capstone.controller;

import com.filipinoexplorers.capstone.entity.GuessTheWordEntity; //puzzles
import com.filipinoexplorers.capstone.service.GuessTheWordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // For development only

public class GuessTheWordController {
    @Autowired
    private GuessTheWordService guessServ; //puzzleService;
    
    @GetMapping("/word-puzzles")
    public List<GuessTheWordEntity> getAllPuzzles() {
        guessServ.initializeSamplePuzzles(); // Initialize sample data if needed
        return guessServ.getAllPuzzles();
    }
    
    @GetMapping("/word-puzzles/{id}")
    public ResponseEntity<GuessTheWordEntity> getPuzzleById(@PathVariable Long id) {
        Optional<GuessTheWordEntity> puzzle = guessServ.getPuzzleById(id);
        return puzzle.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/check-answer")
    public ResponseEntity<Map<String, Object>> checkAnswer(
            @RequestBody Map<String, Object> request) {
        
        Long puzzleId = Long.parseLong(request.get("puzzleId").toString());
        String answer = (String) request.get("answer");
        
        boolean isCorrect = guessServ.checkAnswer(puzzleId, answer);
        
        Map<String, Object> response = new HashMap<>();
        response.put("correct", isCorrect);
        
        if (isCorrect) {
            response.put("message", "Tama!");
            
            // Return next puzzle if available
            Optional<GuessTheWordEntity> nextPuzzle = guessServ.getNextPuzzle(puzzleId);
            if (nextPuzzle.isPresent()) {
                response.put("nextPuzzle", nextPuzzle.get());
            } else {
                response.put("gameComplete", true);
            }
        } else {
            response.put("message", "Mali. Subukan muli!");
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/hint/{puzzleId}")
    public ResponseEntity<Map<String, String>> getHint(@PathVariable Long puzzleId) {
        String hint = guessServ.getHint(puzzleId);
        
        Map<String, String> response = new HashMap<>();
        response.put("hint", hint);
        
        return ResponseEntity.ok(response);
    }
    
}

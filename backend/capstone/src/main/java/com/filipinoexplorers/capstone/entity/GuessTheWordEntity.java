package com.filipinoexplorers.capstone.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "word_puzzles")

public class GuessTheWordEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String word;
    private String clue;
    private String shuffledLetters;
    private String hint;
    
    // Default constructor
    public GuessTheWordEntity() {}
    
    // Constructor with parameters
    public GuessTheWordEntity(String word, String clue, String shuffledLetters, String hint) {
        this.word = word;
        this.clue = clue;
        this.shuffledLetters = shuffledLetters;
        this.hint = hint;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getWord() {
        return word;
    }
    
    public void setWord(String word) {
        this.word = word;
    }
    
    public String getClue() {
        return clue;
    }
    
    public void setClue(String clue) {
        this.clue = clue;
    }
    
    public String getShuffledLetters() {
        return shuffledLetters;
    }
    
    public void setShuffledLetters(String shuffledLetters) {
        this.shuffledLetters = shuffledLetters;
    }
    
    public String getHint() {
        return hint;
    }
    
    public void setHint(String hint) {
        this.hint = hint;
    }
}

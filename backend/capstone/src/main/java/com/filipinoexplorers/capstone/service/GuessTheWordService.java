package com.filipinoexplorers.capstone.service;

import com.filipinoexplorers.capstone.entity.GuessTheWordEntity;
import com.filipinoexplorers.capstone.repository.GuessTheWordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service

public class GuessTheWordService {
    @Autowired
    private GuessTheWordRepository guessRepo; //puzzleRepository;
    
    public List<GuessTheWordEntity> getAllPuzzles() {
        return guessRepo.findAll();
    }
    
    public Optional<GuessTheWordEntity> getPuzzleById(Long id) {
        return guessRepo.findById(id);
    }
    
    public GuessTheWordEntity savePuzzle(GuessTheWordEntity puzzle) {
        // Generate shuffled letters if not provided
        if (puzzle.getShuffledLetters() == null || puzzle.getShuffledLetters().isEmpty()) {
            puzzle.setShuffledLetters(shuffleWord(puzzle.getWord()));
        }
        return guessRepo.save(puzzle);
    }
    
    public boolean checkAnswer(Long puzzleId, String answer) {
        Optional<GuessTheWordEntity> puzzleOpt = guessRepo.findById(puzzleId);
        if (puzzleOpt.isPresent()) {
            return puzzleOpt.get().getWord().equalsIgnoreCase(answer);
        }
        return false;
    }
    
    public String getHint(Long puzzleId) {
        Optional<GuessTheWordEntity> puzzle = guessRepo.findById(puzzleId);
        return puzzle.map(GuessTheWordEntity::getHint).orElse("No hint available");
    }
    
    public Optional<GuessTheWordEntity> getNextPuzzle(Long currentPuzzleId) {
        List<GuessTheWordEntity> allPuzzles = getAllPuzzles();
        
        for (int i = 0; i < allPuzzles.size(); i++) {
            if (allPuzzles.get(i).getId().equals(currentPuzzleId)) {
                if (i + 1 < allPuzzles.size()) {
                    return Optional.of(allPuzzles.get(i + 1));
                }
                break;
            }
        }
        
        return Optional.empty();
    }
    
    // Shuffle a word and ensure all letters are included
    private String shuffleWord(String word) {
        List<Character> characters = new ArrayList<>();
        for (char c : word.toCharArray()) {
            characters.add(c);
        }
        
        Collections.shuffle(characters);
        StringBuilder shuffled = new StringBuilder();
        for (char c : characters) {
            shuffled.append(c);
        }
        
        return shuffled.toString();
    }
    
    // Add sample puzzles for testing
    public void initializeSamplePuzzles() {
        if (guessRepo.count() == 0) {
            List<GuessTheWordEntity> samplePuzzles = new ArrayList<>();
            
            samplePuzzles.add(new GuessTheWordEntity(
                "BAYANIHAN", 
                "Isang taong handang magsakripisyo para sa kapwa at bayan.", 
                "BAHNNYAAI", 
                "Ito ay isang katangian ng mga Pilipino na nagpapakita ng pagtutulungan."
            ));
            
            samplePuzzles.add(new GuessTheWordEntity(
                "KALIKASAN", 
                "Lahat ng bagay sa mundo na hindi gawa ng tao.", 
                "KASANLAKI", 
                "Dapat nating pangalagaan at protektahan ito."
            ));
            
            samplePuzzles.add(new GuessTheWordEntity(
                "MATIYAGA", 
                "Katangian ng taong di agad sumusuko.", 
                "MAAYATGI", 
                "Mahalaga ito sa pag-aaral at pagtatrabaho."
            ));
            
            samplePuzzles.add(new GuessTheWordEntity(
                "HALAMAN", 
                "Buhay na bagay na lumalaki ngunit hindi nakakalakad.", 
                "ANLAHMA", 
                "Ito ay gumagawa ng sarili nitong pagkain."
            ));
            
            samplePuzzles.add(new GuessTheWordEntity(
                "WATAWAT", 
                "Simbolo ng bansa.", 
                "TATWAWA", 
                "Mayroong tatlong kulay: pula, asul, at puti."
            ));
            
            guessRepo.saveAll(samplePuzzles);
        }
    }

}
//f1LiPin0123_ExPl0reRs!!

package com.filipinoexplorers.capstone.service;

import com.filipinoexplorers.capstone.entity.ParkeQuestChoice;
import com.filipinoexplorers.capstone.entity.ParkeQuestQuestion;
import com.filipinoexplorers.capstone.repository.ParkeQuestChoiceRepository;
import com.filipinoexplorers.capstone.repository.ParkeQuestQuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParkeQuestService {

    private final ParkeQuestQuestionRepository parkeQuestQuestionRepository;
    private final ParkeQuestChoiceRepository parkeQuestChoiceRepository;

    public ParkeQuestService(ParkeQuestQuestionRepository parkeQuestQuestionRepository,
                             ParkeQuestChoiceRepository parkeQuestChoiceRepository) {
        this.parkeQuestQuestionRepository = parkeQuestQuestionRepository;
        this.parkeQuestChoiceRepository = parkeQuestChoiceRepository;
    }

    public List<ParkeQuestQuestion> getAll() {
        return parkeQuestQuestionRepository.findAll();
    }

    public ParkeQuestQuestion save(ParkeQuestQuestion question) {
        return parkeQuestQuestionRepository.save(question);
    }

    public ParkeQuestQuestion update(Long id, ParkeQuestQuestion updated) {
        ParkeQuestQuestion existing = parkeQuestQuestionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        existing.setStory(updated.getStory());
        existing.setQuestion(updated.getQuestion());
        existing.setCorrectAnswer(updated.getCorrectAnswer());
        existing.setHint(updated.getHint());

        // Remove old choices first
        parkeQuestChoiceRepository.deleteAll(existing.getChoices());

        // Add new choices
        for (ParkeQuestChoice choice : updated.getChoices()) {
            choice.setQuestion(existing); // link back to parent
        }
        existing.setChoices(updated.getChoices());

        return parkeQuestQuestionRepository.save(existing);
    }

    public void deleteById(Long id) {
        parkeQuestQuestionRepository.deleteById(id);
    }
}

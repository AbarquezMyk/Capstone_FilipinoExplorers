package com.filipinoexplorers.capstone.service;

import com.filipinoexplorers.capstone.entity.ParkeQuestQuestion;
import com.filipinoexplorers.capstone.repository.ParkeQuestQuestionRepository;
import com.filipinoexplorers.capstone.repository.ParkeQuestChoiceRepository;

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
}

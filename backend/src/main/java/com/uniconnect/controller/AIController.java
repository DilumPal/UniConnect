package com.uniconnect.controller;

import com.uniconnect.entity.Job;
import com.uniconnect.entity.ResearchProject;
import com.uniconnect.entity.User;
import com.uniconnect.repository.JobRepository;
import com.uniconnect.repository.ResearchProjectRepository;
import com.uniconnect.repository.UserRepository;
import com.uniconnect.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ResearchProjectRepository researchProjectRepository;

    public AIController(AIService aiService, UserRepository userRepository, JobRepository jobRepository, ResearchProjectRepository researchProjectRepository) {
        this.aiService = aiService;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.researchProjectRepository = researchProjectRepository;
    }

    private User getAuthenticatedUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName()).orElseThrow();
    }

    @GetMapping("/recommend-jobs")
    public ResponseEntity<?> recommendJobs(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (!"STUDENT".equals(user.getRole().name())) {
            return ResponseEntity.status(403).body("Only students can get job recommendations.");
        }

        List<Job> activeJobs = jobRepository.findByIsActiveTrueOrderByCreatedAtDesc();
        if (activeJobs.isEmpty()) {
            return ResponseEntity.ok(Map.of("recommendation", "No active jobs available to recommend right now."));
        }

        // Create a summary of jobs
        String jobsSummary = activeJobs.stream()
                .limit(10) // Limit to top 10 recent jobs to avoid prompt overload
                .map(j -> String.format("Job ID: %d, Title: %s, Type: %s, Location: %s, Description: %s", 
                        j.getId(), j.getTitle(), j.getJobType(), j.getLocation(), j.getDescription()))
                .collect(Collectors.joining("\n"));

        String prompt = "You are an AI career advisor. The student '" + user.getFullName() + "' is looking for opportunities. "
                + "Here are some available jobs:\n" + jobsSummary + "\n\n"
                + "Please recommend the top 2 jobs for a university student. Format your response beautifully in Markdown. Explain why they are a good fit.";

        String aiResponse = aiService.generateContent(prompt);
        return ResponseEntity.ok(Map.of("recommendation", aiResponse));
    }

    @PostMapping("/generate-cover-letter")
    public ResponseEntity<?> generateCoverLetter(@RequestBody Map<String, Long> payload, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        Long jobId = payload.get("jobId");
        
        Job job = jobRepository.findById(jobId).orElse(null);
        if (job == null) return ResponseEntity.badRequest().body("Job not found.");

        String prompt = "Write a professional, concise cover letter for '" + user.getFullName() + "' applying for the position of '" 
                + job.getTitle() + "' at '" + job.getCompany().getFullName() + "'. The job description is: " + job.getDescription() 
                + ". Keep it under 150 words.";

        String aiResponse = aiService.generateContent(prompt);
        return ResponseEntity.ok(Map.of("coverLetter", aiResponse));
    }

    @PostMapping("/summarize-research")
    public ResponseEntity<?> summarizeResearch(@RequestBody Map<String, String> payload) {
        String abstractText = payload.get("text");
        if (abstractText == null || abstractText.isEmpty()) {
            return ResponseEntity.badRequest().body("No text provided.");
        }

        String prompt = "Provide a TL;DR (Too Long; Didn't Read) summary for the following academic research abstract in simple terms that an undergraduate student would understand:\n\n" + abstractText;

        String aiResponse = aiService.generateContent(prompt);
        return ResponseEntity.ok(Map.of("summary", aiResponse));
    }
}

package com.uniconnect.controller;

import com.uniconnect.entity.ResearchProject;
import com.uniconnect.entity.User;
import com.uniconnect.repository.ResearchProjectRepository;
import com.uniconnect.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/research")
public class ResearchController {

    private final ResearchProjectRepository researchProjectRepository;
    private final UserRepository userRepository;

    public ResearchController(ResearchProjectRepository researchProjectRepository, UserRepository userRepository) {
        this.researchProjectRepository = researchProjectRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName()).orElseThrow();
    }

    // Get all research projects
    @GetMapping
    public ResponseEntity<List<ResearchProject>> getAllProjects() {
        return ResponseEntity.ok(researchProjectRepository.findAllByOrderByCreatedAtDesc());
    }

    // Post a new research project (Only for researchers)
    @PostMapping
    public ResponseEntity<?> postProject(@RequestBody ResearchProject project, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (!"RESEARCHER".equals(user.getRole().name())) {
            return ResponseEntity.status(403).body("Only researchers can post projects.");
        }
        
        project.setResearcher(user);
        return ResponseEntity.ok(researchProjectRepository.save(project));
    }

    // Get projects posted by the logged-in researcher
    @GetMapping("/my-projects")
    public ResponseEntity<?> getMyProjects(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (!"RESEARCHER".equals(user.getRole().name())) {
            return ResponseEntity.status(403).body("Access denied.");
        }
        return ResponseEntity.ok(researchProjectRepository.findByResearcherIdOrderByCreatedAtDesc(user.getId()));
    }
}

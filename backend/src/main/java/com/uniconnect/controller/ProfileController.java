package com.uniconnect.controller;

import com.uniconnect.entity.CompanyProfile;
import com.uniconnect.entity.ResearchProfile;
import com.uniconnect.entity.StudentProfile;
import com.uniconnect.entity.User;
import com.uniconnect.repository.CompanyProfileRepository;
import com.uniconnect.repository.ResearchProfileRepository;
import com.uniconnect.repository.StudentProfileRepository;
import com.uniconnect.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final CompanyProfileRepository companyProfileRepository;
    private final ResearchProfileRepository researchProfileRepository;

    public ProfileController(UserRepository userRepository,
                             StudentProfileRepository studentProfileRepository,
                             CompanyProfileRepository companyProfileRepository,
                             ResearchProfileRepository researchProfileRepository) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.companyProfileRepository = companyProfileRepository;
        this.researchProfileRepository = researchProfileRepository;
    }

    private User getAuthenticatedUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName()).orElseThrow();
    }

    // --- STUDENT PROFILE ---
    @GetMapping("/student")
    public ResponseEntity<?> getStudentProfile(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return studentProfileRepository.findByUserId(user.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/student")
    public ResponseEntity<?> updateStudentProfile(@RequestBody StudentProfile profile, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        
        StudentProfile existing = studentProfileRepository.findByUserId(user.getId()).orElse(new StudentProfile());
        existing.setUser(user);
        existing.setUniversity(profile.getUniversity());
        existing.setCourse(profile.getCourse());
        existing.setDegreeLevel(profile.getDegreeLevel());
        existing.setSkills(profile.getSkills());
        existing.setResearchInterests(profile.getResearchInterests());
        existing.setCareerInterests(profile.getCareerInterests());
        existing.setBio(profile.getBio());
        
        return ResponseEntity.ok(studentProfileRepository.save(existing));
    }

    // --- COMPANY PROFILE ---
    @GetMapping("/company")
    public ResponseEntity<?> getCompanyProfile(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return companyProfileRepository.findByUserId(user.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/company")
    public ResponseEntity<?> updateCompanyProfile(@RequestBody CompanyProfile profile, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        
        CompanyProfile existing = companyProfileRepository.findByUserId(user.getId()).orElse(new CompanyProfile());
        existing.setUser(user);
        existing.setCompanyName(profile.getCompanyName());
        existing.setIndustry(profile.getIndustry());
        existing.setDescription(profile.getDescription());
        existing.setWebsiteUrl(profile.getWebsiteUrl());
        existing.setLocation(profile.getLocation());
        
        return ResponseEntity.ok(companyProfileRepository.save(existing));
    }

    // --- RESEARCH PROFILE ---
    @GetMapping("/research")
    public ResponseEntity<?> getResearchProfile(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        return researchProfileRepository.findByUserId(user.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/research")
    public ResponseEntity<?> updateResearchProfile(@RequestBody ResearchProfile profile, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        
        ResearchProfile existing = researchProfileRepository.findByUserId(user.getId()).orElse(new ResearchProfile());
        existing.setUser(user);
        existing.setDepartment(profile.getDepartment());
        existing.setTitle(profile.getTitle());
        existing.setFieldOfStudy(profile.getFieldOfStudy());
        existing.setBio(profile.getBio());
        existing.setPublicationsUrls(profile.getPublicationsUrls());
        
        return ResponseEntity.ok(researchProfileRepository.save(existing));
    }
}

package com.uniconnect.controller;

import com.uniconnect.entity.Application;
import com.uniconnect.entity.Job;
import com.uniconnect.entity.User;
import com.uniconnect.repository.ApplicationRepository;
import com.uniconnect.repository.JobRepository;
import com.uniconnect.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public JobController(JobRepository jobRepository, ApplicationRepository applicationRepository, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    private User getAuthenticatedUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName()).orElseThrow();
    }

    // Get all active jobs (For students to browse)
    @GetMapping
    public ResponseEntity<List<Job>> getAllActiveJobs() {
        return ResponseEntity.ok(jobRepository.findByIsActiveTrueOrderByCreatedAtDesc());
    }

    // Post a new job (Only for companies)
    @PostMapping
    public ResponseEntity<?> postJob(@RequestBody Job job, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (!"COMPANY".equals(user.getRole().name())) {
            return ResponseEntity.status(403).body("Only companies can post jobs.");
        }
        
        job.setCompany(user);
        return ResponseEntity.ok(jobRepository.save(job));
    }

    // Get jobs posted by the logged-in company
    @GetMapping("/my-postings")
    public ResponseEntity<?> getCompanyJobs(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (!"COMPANY".equals(user.getRole().name())) {
            return ResponseEntity.status(403).body("Access denied.");
        }
        return ResponseEntity.ok(jobRepository.findByCompanyIdOrderByCreatedAtDesc(user.getId()));
    }

    // Apply for a job (Only for students)
    @PostMapping("/{jobId}/apply")
    public ResponseEntity<?> applyForJob(@PathVariable Long jobId, @RequestBody Application application, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (!"STUDENT".equals(user.getRole().name())) {
            return ResponseEntity.status(403).body("Only students can apply for jobs.");
        }

        Job job = jobRepository.findById(jobId).orElse(null);
        if (job == null || !job.isActive()) {
            return ResponseEntity.badRequest().body("Job not found or inactive.");
        }

        application.setJob(job);
        application.setStudent(user);
        
        return ResponseEntity.ok(applicationRepository.save(application));
    }

    // Get applications for a specific job (For companies)
    @GetMapping("/{jobId}/applications")
    public ResponseEntity<?> getJobApplications(@PathVariable Long jobId, Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        Job job = jobRepository.findById(jobId).orElse(null);
        
        if (job == null) return ResponseEntity.notFound().build();
        if (!job.getCompany().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("You can only view applications for your own jobs.");
        }

        return ResponseEntity.ok(applicationRepository.findByJobIdOrderByAppliedAtDesc(jobId));
    }

    // Get applications submitted by the logged-in student
    @GetMapping("/my-applications")
    public ResponseEntity<?> getStudentApplications(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (!"STUDENT".equals(user.getRole().name())) {
            return ResponseEntity.status(403).body("Access denied.");
        }
        return ResponseEntity.ok(applicationRepository.findByStudentIdOrderByAppliedAtDesc(user.getId()));
    }
}

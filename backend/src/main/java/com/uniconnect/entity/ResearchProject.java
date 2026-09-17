package com.uniconnect.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "research_projects")
public class ResearchProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The researcher who posted this project
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "researcher_user_id", nullable = false)
    private User researcher;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String fieldOfStudy; // e.g., Computer Science, Biology
    private String status; // e.g., ONGOING, COMPLETED, RECRUITING

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getResearcher() { return researcher; }
    public void setResearcher(User researcher) { this.researcher = researcher; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getFieldOfStudy() { return fieldOfStudy; }
    public void setFieldOfStudy(String fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

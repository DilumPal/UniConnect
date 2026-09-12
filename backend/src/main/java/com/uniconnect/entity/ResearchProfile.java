package com.uniconnect.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "research_profiles")
public class ResearchProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String department;
    private String title; // e.g., Professor, PostDoc, PhD Candidate
    
    @ElementCollection
    private List<String> fieldOfStudy;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    @ElementCollection
    private List<String> publicationsUrls;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<String> getFieldOfStudy() { return fieldOfStudy; }
    public void setFieldOfStudy(List<String> fieldOfStudy) { this.fieldOfStudy = fieldOfStudy; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public List<String> getPublicationsUrls() { return publicationsUrls; }
    public void setPublicationsUrls(List<String> publicationsUrls) { this.publicationsUrls = publicationsUrls; }
}

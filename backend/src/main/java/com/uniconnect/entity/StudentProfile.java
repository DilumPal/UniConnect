package com.uniconnect.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "student_profiles")
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String university;
    private String course;
    private String degreeLevel;
    
    @ElementCollection
    private List<String> skills;
    
    @ElementCollection
    private List<String> researchInterests;
    
    @ElementCollection
    private List<String> careerInterests;

    private String cvUrl; // Stored in Supabase S3
    
    @Column(columnDefinition = "TEXT")
    private String bio;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getUniversity() { return university; }
    public void setUniversity(String university) { this.university = university; }
    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }
    public String getDegreeLevel() { return degreeLevel; }
    public void setDegreeLevel(String degreeLevel) { this.degreeLevel = degreeLevel; }
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    public List<String> getResearchInterests() { return researchInterests; }
    public void setResearchInterests(List<String> researchInterests) { this.researchInterests = researchInterests; }
    public List<String> getCareerInterests() { return careerInterests; }
    public void setCareerInterests(List<String> careerInterests) { this.careerInterests = careerInterests; }
    public String getCvUrl() { return cvUrl; }
    public void setCvUrl(String cvUrl) { this.cvUrl = cvUrl; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
}

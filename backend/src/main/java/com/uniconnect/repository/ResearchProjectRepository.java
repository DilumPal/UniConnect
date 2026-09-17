package com.uniconnect.repository;

import com.uniconnect.entity.ResearchProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResearchProjectRepository extends JpaRepository<ResearchProject, Long> {
    List<ResearchProject> findAllByOrderByCreatedAtDesc();
    List<ResearchProject> findByResearcherIdOrderByCreatedAtDesc(Long researcherId);
}

package com.uniconnect.repository;

import com.uniconnect.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByIsActiveTrueOrderByCreatedAtDesc();
    List<Job> findByCompanyIdOrderByCreatedAtDesc(Long companyId);
}

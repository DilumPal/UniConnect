package com.uniconnect.repository;

import com.uniconnect.entity.ResearchProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResearchProfileRepository extends JpaRepository<ResearchProfile, Long> {
    Optional<ResearchProfile> findByUserId(Long userId);
}

package com.endava.projectassignment2.scheduler;


import java.time.Duration;
import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.endava.projectassignment2.repository.UserRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Slf4j
@Component
@RequiredArgsConstructor
public class ResetFieldScheduler {

    private final UserRepository userRepository;
    
    @PostConstruct
    public void scheduleTask() {
        Mono.delay(Duration.ofMillis(getInitialDelay()))
            .thenMany(Flux.interval(Duration.ofDays(1)))
            .flatMap(i -> resetDailyUserData()) 
            .subscribeOn(Schedulers.boundedElastic()) 
            .subscribe();
    }
    
    private Mono<Void> resetDailyUserData() {
        return resetWrongAttempts()
            .then(resetTokens())
            .then();
    }
    
    private Mono<Integer> resetWrongAttempts() {
        return userRepository.resetWrongAttempts()
                .doOnNext(count -> log.info("Reset wrong attempts for {} users", count));
    }

    private Mono<Integer> resetTokens() {
        return userRepository.resetAllTokens()
                .doOnNext(count -> log.info("Reset tokens for {} users", count));
    }
    
    private long getInitialDelay() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime nextMidnight = now.toLocalDate().plusDays(1).atStartOfDay();
        return Duration.between(now, nextMidnight).toMillis();
    }

}


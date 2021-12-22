package com.amplicode.ldapdemo.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthoritiesController {
    private static final String PATTERN = "Grants checker: %s Your grants are %s";

    @GetMapping("/greeting")
    public String greeting(@AuthenticationPrincipal UserDetails principal) {
        return String.format(PATTERN, principal.getUsername(), principal.getAuthorities());
    }
}

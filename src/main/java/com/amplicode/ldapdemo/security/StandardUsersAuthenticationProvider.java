package com.amplicode.ldapdemo.security;

import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class StandardUsersAuthenticationProvider extends DaoAuthenticationProvider {

    public StandardUsersAuthenticationProvider(UserDetailsService userDetailsService) {
        String idForEncode = "noop";
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put(idForEncode, NoOpPasswordEncoder.getInstance());
        setPasswordEncoder(new DelegatingPasswordEncoder(idForEncode, encoders));
        setUserDetailsService(userDetailsService);
    }
}

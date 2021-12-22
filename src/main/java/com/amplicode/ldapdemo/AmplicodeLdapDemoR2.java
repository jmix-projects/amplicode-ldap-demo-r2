package com.amplicode.ldapdemo;


import com.amplicode.ldapdemo.user.management.Role;
import com.amplicode.ldapdemo.user.management.User;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.Collections;

@RequiredArgsConstructor
@SpringBootApplication
@ConfigurationPropertiesScan
public class AmplicodeLdapDemoR2 implements CommandLineRunner {

    final UserDetailsManager manager;
    final TransactionTemplate tt;
    final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(AmplicodeLdapDemoR2.class, args);
    }

    @Override
    public void run(String... args) {
        tt.executeWithoutResult(status -> {
            if (!manager.userExists("admin")) {
                User user = new User();
                user.setUsername("admin");
                user.setPassword(passwordEncoder.encode("admin"));
                Role role = new Role();
                role.setAuthority("ADMIN");
                user.setRoles(Collections.singleton(role));
                manager.createUser(user);
            }
        });
    }
}

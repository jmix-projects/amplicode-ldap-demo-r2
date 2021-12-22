package com.sample;


import com.sample.properties.DemoConfigProperties;
import com.sample.user.management.Role;
import com.sample.user.management.User;
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
@ConfigurationPropertiesScan
@SpringBootApplication
public class AmplicodeLdapDemoR2 implements CommandLineRunner {

    private static final String LDAP_MANAGER_ROLE = "LDAP_MANAGER";

    final UserDetailsManager manager;
    final TransactionTemplate tt;
    final PasswordEncoder passwordEncoder;
    final DemoConfigProperties demoConfigProperties;

    public static void main(String[] args) {
        SpringApplication.run(AmplicodeLdapDemoR2.class, args);
    }

    @Override
    public void run(String... args) {
        tt.executeWithoutResult(status -> {
            String ldapManagerUsername = demoConfigProperties.getLdapManagerUsername();
            String ldapManagerPassword = demoConfigProperties.getLdapManagerPassword();
            if (!manager.userExists(ldapManagerUsername)) {
                User user = new User();
                user.setUsername(ldapManagerUsername);
                user.setPassword(passwordEncoder.encode(ldapManagerPassword));
                Role role = new Role();
                role.setAuthority(LDAP_MANAGER_ROLE);
                user.setRoles(Collections.singleton(role));
                manager.createUser(user);
            }
        });
    }
}

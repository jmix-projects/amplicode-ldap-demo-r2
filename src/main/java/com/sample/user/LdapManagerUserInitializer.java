package com.sample.user;

import com.amplicode.ldap.security.LdapAuthorities;
import com.sample.properties.DemoConfigProperties;
import com.sample.user.management.Role;
import com.sample.user.management.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.Collections;

@RequiredArgsConstructor
@Component
public class LdapManagerUserInitializer {
    private final TransactionTemplate transactionTemplate;
    private final UserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;
    private final DemoConfigProperties demoConfigProperties;

    public void initialize() {
        transactionTemplate.executeWithoutResult(s -> {
            String ldapManagerUsername = demoConfigProperties.getLdapManagerUsername();
            String ldapManagerPassword = demoConfigProperties.getLdapManagerPassword();
            if (!userDetailsManager.userExists(ldapManagerUsername)) {
                User user = new User();
                user.setUsername(ldapManagerUsername);
                user.setPassword(passwordEncoder.encode(ldapManagerPassword));
                Role role = new Role();
                role.setAuthority(LdapAuthorities.ROLE_LDAP_MANAGER);
                user.setRoles(Collections.singleton(role));
                userDetailsManager.createUser(user);
            }
        });
    }
}

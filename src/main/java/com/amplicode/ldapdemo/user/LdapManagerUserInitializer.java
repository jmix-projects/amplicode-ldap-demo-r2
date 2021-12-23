package com.amplicode.ldapdemo.user;

import com.amplicode.ldapdemo.AppProperties;
import com.amplicode.ldapdemo.user.management.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

@RequiredArgsConstructor
@Component
public class LdapManagerUserInitializer {
    private final TransactionTemplate transactionTemplate;
    private final UserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;
    private final AppProperties appProperties;

    public void initialize() {
        transactionTemplate.executeWithoutResult(s -> {
            String ldapManagerUsername = appProperties.getLdapManagerUsername();
            String ldapManagerPassword = appProperties.getLdapManagerPassword();
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

package com.amplicode.ldapdemo.user;

import com.amplicode.ldap.security.LdapAuthorities;
import com.amplicode.ldapdemo.AppProperties;
import com.amplicode.ldapdemo.security.Authorities;
import com.amplicode.ldapdemo.user.management.Role;
import com.amplicode.ldapdemo.user.management.User;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.Set;

@Component
public class AdminUserInitializer {
    private static final String NOOP_PREFIX = "{noop}";

    private final TransactionTemplate transactionTemplate;
    private final UserDetailsManager userDetailsManager;
    private final AppProperties appProperties;

    public AdminUserInitializer(TransactionTemplate transactionTemplate, UserDetailsManager userDetailsManager,
                                AppProperties appProperties) {
        this.transactionTemplate = transactionTemplate;
        this.userDetailsManager = userDetailsManager;
        this.appProperties = appProperties;
    }

    public void initialize() {
        transactionTemplate.executeWithoutResult(s -> {
            String adminUsername = appProperties.getUsers().getAdmin().getUsername();
            String adminPassword = appProperties.getUsers().getAdmin().getPassword();
            if (!adminPassword.startsWith(NOOP_PREFIX)) {
                adminPassword = NOOP_PREFIX + adminPassword;
            }
            if (!userDetailsManager.userExists(adminUsername)) {
                User user = new User();
                user.setUsername(adminUsername);
                user.setPassword(adminPassword);
                Role ldapManagerRole = new Role();
                ldapManagerRole.setAuthority(LdapAuthorities.ROLE_LDAP_MANAGER);
                Role adminRole = new Role();
                adminRole.setAuthority(Authorities.ADMIN);
                Set<Role> roles = new LinkedHashSet<>();
                Collections.addAll(roles, adminRole, ldapManagerRole);
                user.setRoles(roles);
                userDetailsManager.createUser(user);
            }
        });
    }
}

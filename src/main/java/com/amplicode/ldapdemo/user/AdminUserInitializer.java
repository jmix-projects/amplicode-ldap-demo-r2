package com.amplicode.ldapdemo.user;

import com.amplicode.ldap.security.LdapAuthorities;
import com.amplicode.ldapdemo.AppProperties;
import com.amplicode.ldapdemo.user.management.Role;
import com.amplicode.ldapdemo.user.management.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.util.StringUtils;

import java.util.Collections;

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
            String ldapManagerUsername = appProperties.getUsers().getAdmin().getUsername();
            String ldapManagerPassword = appProperties.getUsers().getAdmin().getPassword();
            if (!ldapManagerPassword.startsWith(NOOP_PREFIX)) {
                ldapManagerPassword = NOOP_PREFIX + ldapManagerPassword;
            }
            if (!userDetailsManager.userExists(ldapManagerUsername)) {
                User user = new User();
                user.setUsername(ldapManagerUsername);
                user.setPassword(ldapManagerPassword);
                Role role = new Role();
                role.setAuthority(LdapAuthorities.ROLE_LDAP_MANAGER);
                user.setRoles(Collections.singleton(role));
                userDetailsManager.createUser(user);
            }
        });
    }
}

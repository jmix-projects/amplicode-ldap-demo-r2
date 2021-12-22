package com.sample;

import com.sample.user.LdapManagerUserInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class AmplicodeLdapDemoR2 {

    public static void main(String[] args) {
        SpringApplication.run(AmplicodeLdapDemoR2.class, args);
    }

    @EventListener(ContextRefreshedEvent.class)
    public void initAdmin(ContextRefreshedEvent event) {
        ApplicationContext context = event.getApplicationContext();
        context.getBean(LdapManagerUserInitializer.class).initialize();
    }
}

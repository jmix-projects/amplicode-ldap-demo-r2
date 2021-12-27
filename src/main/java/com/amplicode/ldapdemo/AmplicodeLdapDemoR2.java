package com.amplicode.ldapdemo;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
@ConfigurationPropertiesScan
public class AmplicodeLdapDemoR2 {

    public static void main(String[] args) {
        SpringApplication.run(AmplicodeLdapDemoR2.class, args);
    }

    @EventListener(ContextRefreshedEvent.class)
    public void onContextRefresh(ContextRefreshedEvent event) {
        DataInitializer dataInitializer = event.getApplicationContext().getBean(DataInitializer.class);
        dataInitializer.initAdminUser();
        dataInitializer.initMatchingRules();
    }
}

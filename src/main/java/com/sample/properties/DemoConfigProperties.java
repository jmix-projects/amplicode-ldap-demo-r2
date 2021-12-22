package com.sample.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Setter
@Getter
@ConfigurationProperties(prefix = "app")
public class DemoConfigProperties {
    private String ldapManagerUsername;
    private String ldapManagerPassword;
}

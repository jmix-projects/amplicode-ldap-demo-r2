package com.amplicode.ldapdemo.controller;

import io.leangen.graphql.annotations.GraphQLNonNull;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import static com.amplicode.ldapdemo.security.Authorities.DEVELOPERS;
import static com.amplicode.ldapdemo.security.Authorities.MANAGERS;

@GraphQLApi
@Service
public class RolesVerificationGraphQLController {

    @Secured(MANAGERS)
    @GraphQLQuery(name = "verifyManagersRole")
    public Boolean verifyManagersRole() {
        return true;
    }

    @Secured(DEVELOPERS)
    @GraphQLQuery(name = "verifyDevelopersRole")
    public Boolean verifyDevelopersRole() {
        return true;
    }

    @GraphQLQuery(name = "whoAmI")
    @GraphQLNonNull
    public String whoAmI() {
        UserDetails principal = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("Invoked by " + principal.getUsername() + " with authorities " + principal.getAuthorities());
        return principal.getUsername();
    }
}

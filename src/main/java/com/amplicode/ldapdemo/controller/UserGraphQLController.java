package com.amplicode.ldapdemo.controller;

import com.amplicode.ldapdemo.dto.UserDto;
import com.amplicode.ldapdemo.user.management.Role;
import com.amplicode.ldapdemo.user.management.User;
import com.amplicode.ldapdemo.user.management.UserRepository;
import io.leangen.graphql.annotations.GraphQLArgument;
import io.leangen.graphql.annotations.GraphQLMutation;
import io.leangen.graphql.annotations.GraphQLNonNull;
import io.leangen.graphql.annotations.GraphQLQuery;
import io.leangen.graphql.spqr.spring.annotations.GraphQLApi;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@GraphQLApi
@RequiredArgsConstructor
public class UserGraphQLController {

    private final UserRepository repository;

    @GraphQLQuery(name = "users")
    @Transactional(readOnly = true)
    public List<UserDto> findUsers() {
        return repository.findAll()
                .stream()
                .map(this::userToDto)
                .collect(Collectors.toList());
    }

    @GraphQLMutation(name = "deleteUser")
    @Transactional
    public void deleteUser(@GraphQLArgument(name = "id") @GraphQLNonNull Long id) {
        repository.deleteById(id);
    }

    private UserDto userToDto(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setRoles(mapRoles(user.getRoles()));
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());

        return userDto;
    }

    private List<String> mapRoles(Set<Role> roles) {
        return roles.stream()
                .map(Role::getAuthority)
                .collect(Collectors.toList());
    }
}

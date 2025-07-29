package com.javaee.ch16.framework.springsecurity;//package com.javaee.ch16.framework.springsecurity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.javaee.ch16.domain.entity.Dept;
import com.javaee.ch16.domain.entity.Role;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author harry yao
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties("password")
public class UserDetailsImpl implements UserDetails {
    private Long id;
    private String username;
    private String password;
    private Boolean enableState;
    private String name;
    private Dept dept;
    private Role role;
    private Long deptId;
    private String redirectUrl;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        if (role != null && role.getRoleCode() != null) {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleCode()));
        }
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enableState;
    }

    public String getRedirectUrl() {
        if (this.role == null || this.role.getRoleCode() == null) return "/index";
        switch (this.role.getRoleCode()) {
            case "ADMIN":
            case "SUPER_ADMIN": return "/admin/index";
            case "READER": return "/reader/index";
            default: return "/index";
        }
    }
}

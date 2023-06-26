package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * This class handles response after change password success.
 *
 * @author manhnv
 */
public class CC0030001Res extends AbstractJson {
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("username")
    private String username;

    @JsonProperty("role")
    private String role;

    @JsonProperty("departmentId")
    private Integer departmentId;

    @JsonProperty("email")
    private String email;

    public CC0030001Res(final UserDto user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.role = user.getRole();
        this.email = user.getEmail();
        this.departmentId = user.getDepartmentId();
    }

}
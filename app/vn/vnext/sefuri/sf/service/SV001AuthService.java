package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.service.impl.SV001AuthServiceImpl;

/**
 * Service include function for login and authenticate.
 *
 * @author haipt
 */
@ImplementedBy(SV001AuthServiceImpl.class)
public interface SV001AuthService {

    /**
     * Do Login for user<br>
     * If authenticate valid, user data will be kept and can be get through CC00103
     *
     * @param email    User email
     * @param password User password
     * @return Token code for login user
     */
    String sv00101CheckLogin(String email, String password);

    /**
     * Check authenticate with token string<br>
     * If authenticate valid, user data will be kept and can be get through CC00103
     *
     * @param token User token
     * @return User authenticated successfully or not
     */
    boolean sv00102AuthenticateUser(String token);

    /**
     * Get current user data
     *
     * @return Current user data
     */
    UserDto getCurrentUser();
}

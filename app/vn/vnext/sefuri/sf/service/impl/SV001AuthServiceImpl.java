package vn.vnext.sefuri.sf.service.impl;

import com.auth0.jwt.JWTSigner;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWTVerifyException;
import com.google.inject.Inject;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.LoggerFactory;
import play.mvc.Http;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.UserDao;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.service.SV001AuthService;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Map;

/**
 * SV001 implement
 *
 * @author haipt
 */
public class SV001AuthServiceImpl implements SV001AuthService, Constants {
    /* inject UserDao */
    @Inject
    private UserDao userDao;

    /* jwt verifier */
    private JWTVerifier verifier;
    /* jwt signer */
    private JWTSigner signer;

    /**
     * Default constructor
     */
    public SV001AuthServiceImpl() {
        // create new verifier and signer using secret key
        verifier = new JWTVerifier(SECRET_KEY);
        signer = new JWTSigner(SECRET_KEY);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserDto getCurrentUser() {
        // get data from session data
        Object user = Http.Context.current().args.get(SESSION_USER);
        if (user != null)
            return (UserDto) user;

        // return null if user data not exists in session
        return null;
    }

    /**
     * save current user data to session data
     *
     * @param currentUser current user data
     */
    private void setCurrentUser(final UserDto currentUser) {
        Http.Context.current().args.put(SESSION_USER, currentUser);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String sv00101CheckLogin(final String email, String password) {
        // find user by email/password
        UserDto loginUser = new UserDto();
        loginUser.setEmail(email);
        loginUser.setPassword(password);

        // check database
        UserDto user = userDao.checkLogin(loginUser);
        if (user == null) {
            // user not found, return
            return null;
        }

        // login success, save currentUser
        setCurrentUser(user);
        // create and return new token
        Claim claim = new Claim(user);
        String sign = signer.sign(claim.getClaims());

        return sign;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean sv00102AuthenticateUser(final String token) {
        try {
            // verify claim
            Claim claim = new Claim(verifier.verify(token));
            // verify user
            UserDto user = userDao.find(claim.id);
            if (user != null) {
                setCurrentUser(user);

                return true;
            }
        } catch (NoSuchAlgorithmException | InvalidKeyException | IllegalStateException | IOException |
                SignatureException | JWTVerifyException e) {
            // verify claim fail
            LoggerFactory.getLogger(this.getClass()).error("SV001AuthService#sv00102AuthenticateUser", e.getMessage());
        }

        return false;
    }

    /**
     * Claim class for wrapping data inside jwt token
     */
    private class Claim {

        /* user id */
        private int id;
        /* user role */
        private String role;
        /* current time */
        private Long timestamp;

        /**
         * Constructor with user data object
         *
         * @param user
         */
        public Claim(UserDto user) {
            // init data
            this.id = user.getId();
            this.role = user.getRole();
            this.timestamp = System.currentTimeMillis();
        }

        /**
         * Constructor with data map object
         *
         * @param data
         */
        public Claim(Map<String, Object> data) {
            id = NumberUtils.toInt(data.get("id").toString(), 0);
            role = data.get("role").toString();
            timestamp = NumberUtils.toLong(data.get("timestamp").toString(), 0);
        }

        /**
         * get claim data map
         *
         * @return
         */
        public Map<String, Object> getClaims() {
            HashMap<String, Object> claims = new HashMap<>();
            claims.put("id", id);
            claims.put("role", role);
            claims.put("timestamp", timestamp);
            return claims;
        }
    }
}

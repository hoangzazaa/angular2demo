package vn.vnext.sefuri.sf.service.impl;

import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.api.libs.Codecs;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.DepartmentDao;
import vn.vnext.sefuri.sf.dao.UserDao;
import vn.vnext.sefuri.sf.dao.UserPasswordRecoverDao;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.dto.UserPasswordRecoverDto;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.helper.SfrExceptionCode;
import vn.vnext.sefuri.sf.helper.SfrMailService;
import vn.vnext.sefuri.sf.helper.UrlHelper;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.GenerateUtil;
import vn.vnext.sefuri.sf.util.MessagesUtil;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * SV002 implement
 *
 * @author sonnb
 */
public class SV002UserServiceImpl implements SV002UserService, Constants {

    private static final Logger logger = LoggerFactory.getLogger(SV002UserServiceImpl.class);

    /* inject UserDao */
    @Inject
    private UserDao userDao;
    /* inject DepartmentDao */
    @Inject
    private DepartmentDao departmentDao;

    /* inject UserPasswordRecoverDao */
    @Inject
    private UserPasswordRecoverDao userPasswordRecoverDao;


    /*
     * generate a secret token key, used to authenticate when reset user's password
     */
    private String createRecoverKeyForEmail(final String email) {
        return Codecs.sha1(Codecs.sha1(email) + System.currentTimeMillis() + RandomUtils.nextInt(0, Integer
                .MAX_VALUE) + KEY_SECRET_FOOD);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void sv00201CreateRecoverKey(final String email) throws SfrException {
        // get user by email from database
        UserDto user = getUserByEmail(email);

        logger.info("email : {}, username : {}", user.getEmail(), user.getUsername());

        // try to create a new dto instance
        UserPasswordRecoverDto passwordRecoverDto = createNewUserPasswordRecoverInstance(user);

        logger.info("token_key : {}, expired_date : {}", passwordRecoverDto.getTokenKey(), passwordRecoverDto.getExpiredDate());

        // try to send email with token-key to user's email
        sendTokenKeyToEmail(passwordRecoverDto.getTokenKey(), user.getEmail(), user.getUsername());
    }

    private UserDto getUserByEmail(final String email) throws SfrException {
        UserDto user = userDao.getUserByEmail(email);

        // throws `CC002Exception` exception with specified code whether user with the email is not exists
        if (user == null)
            throw new SfrException(SfrExceptionCode.ERR_CC00201_INVALID_EMAIL);

        return user;
    }

    private void sendTokenKeyToEmail(final String tokenKey, final String email, final String username) {
        try {
            // read subject from properties file
            String subject = MessagesUtil.get("template/mail_template.properties",
                    "CC00201_RECOVER_PASSWORD_MAIL_SUBJECT");

            logger.info("mail.subject : {}", subject);

            // read mail's message from properties file
            String body = MessagesUtil.get("template/mail_template.properties",
                    "CC00201_RECOVER_PASSWORD_MAIL_BODY_TEMPLATE", username, UrlHelper.getResetPasswordUrl(tokenKey));

            logger.info("mail.body : {}", body);

            // try to send email
            SfrMailService.send(Collections.singletonList(email), null, subject, body);
        } catch (Exception e) {
            logger.error("sendTokenKeyToEmail error", e);
            throw new SfrException(SfrExceptionCode.ERR_CC002_EMAIL_SEND_FAILED);
        }
    }

    /*
     * generate a UserPasswordRecoverDto instance for given user, with a new token key and expiry date
     */
    private synchronized UserPasswordRecoverDto createNewUserPasswordRecoverInstance(final UserDto user) {
        String tokenKey = createRecoverKeyForEmail(user.getEmail());

        // 生成されたトークンが保存されたトークンと一致する場合は再生成
        while (userPasswordRecoverDao.getByTokenKey(tokenKey) != null) {
            tokenKey = createRecoverKeyForEmail(user.getEmail());
        }

        UserPasswordRecoverDto passwordRecoverDto = new UserPasswordRecoverDto();
        passwordRecoverDto.setCreatedUser(user.getId());
        passwordRecoverDto.setCreatedDate(DateUtil.getSysDate());
        passwordRecoverDto.setTokenKey(tokenKey);
        passwordRecoverDto.setUserId(user.getId());
        passwordRecoverDto.setExpiredDate(passwordRecoverDto.getCreatedDate().plusSeconds(EXPIRED_TIME_IN_SECOND));
        passwordRecoverDto.setUsedFlag(Constants.DELETE_ENABLE);

        // commit new user password recover token and return token key
        return userPasswordRecoverDao.create(passwordRecoverDto);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void sv00202ResetUserPassword(final String tokenKey, final String password) throws SfrException {
        UserPasswordRecoverDto recoverDto = userPasswordRecoverDao.getByTokenKey(tokenKey);
        if (!hasValidToken(recoverDto))
            throw new SfrException(SfrExceptionCode.ERR_CC00202_INVALID_TOKEN);

        // reset user password by UserPasswordRecoverDto.userId
        UserDto user = userDao.find(recoverDto.getUserId());
        if (user == null)
            // This user is inactive or was deleted!
            throw new SfrException(SfrExceptionCode.ERR_USER_NOT_EXIST);

        // update old password by new password
        user.setPassword(GenerateUtil.encode(password));
        userDao.update(user);

        // update status of token key
        updateTokenKeyStatus(recoverDto);

        // send notify to reset password to email address
        sendResetNotifyEmail(user.getEmail());
    }

    private void sendResetNotifyEmail(final String email) throws SfrException {
        try {

            // read subject from properties file and set
            String subject = MessagesUtil.get("template/mail_template.properties",
                    "CC00202_NOTIFY_MAIL_SUBJECT");

            // read mail's message from properties file and set
            String body = MessagesUtil.get("template/mail_template.properties",
                    "CC00202_NOTIFY_MAIL_BODY", UrlHelper.getLoginUrl());

            // try to send mail
            SfrMailService.send(Arrays.asList(email), null, subject, body);

        } catch (Exception e) {
            throw new SfrException(SfrExceptionCode.ERR_CC002_EMAIL_SEND_FAILED);
        }
    }

    private void updateTokenKeyStatus(final UserPasswordRecoverDto recoverDto) {
        // prepare data to set used recoverDto
        recoverDto.setUpdatedUser(recoverDto.getCreatedUser());
        recoverDto.setUpdatedDate(DateUtil.getSysDate());
        recoverDto.setUsedFlag(Constants.DELETE_DISABLE);
        recoverDto.setActivatedDate(DateTime.now());

        // set used recoverDto
        userPasswordRecoverDao.update(recoverDto);
    }

    private boolean hasValidToken(final UserPasswordRecoverDto recoverDto) {
        return recoverDto != null && Constants.DELETE_ENABLE == recoverDto.getUsedFlag() && recoverDto.getExpiredDate
                ().isAfterNow();
    }

    @Override
    public void sv00203ChangePassword(final UserDto user) throws SfrException {
        userDao.update(user);
    }

    @Override
    public UserDto sv00204GetUserById(Integer userId) {
        if (userId != null) {
            return userDao.find(userId);
        }
        return null;
    }

    @Override
    public List<UserDto> sv00205GetUsersByDepartmentId(Integer departmentId) {
        return userDao.findUsersByDepartmentId(departmentId);
    }

    @Override
    public UserDto sv00104getUserByUserCode(String userCode) {
        if (StringUtils.isEmpty(userCode)) {
            return null;
        } else {
            return userDao.findUserByUserCode(userCode);
        }
    }

    @Override
    public List<Object[]> sv00207GetSalesUsingCustomerIds(List<Integer> customerIds) {
        return userDao.getSalesUsingCustomerIds(customerIds);
    }

    @Override
    public List<UserDto> sv00208GetUsersByDepartmentIds(List<Integer> departmentIds) {
        List<UserDto> userList = new ArrayList<>();
        for (Integer departmentId : departmentIds) {
            List<UserDto> usersByDepartmentId = userDao.findUsersByDepartmentId(departmentId);
            userList.addAll(usersByDepartmentId);
        }
        return userList;
    }
}

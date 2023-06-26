package vn.vnext.sefuri.sf.service;

import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.service.impl.SV002UserServiceImpl;

/**
 * Service include functions to deal with user.
 *
 * @author sonnb
 */
@ImplementedBy(SV002UserServiceImpl.class)
public interface SV002UserService {

    /**
     * create/renew recovery password token key for given email
     *
     * @param email User email to check
     * @return Token that created
     * @throws `SfrException` with meaningful exception code
     */
    void sv00201CreateRecoverKey(String email) throws SfrException;

    /**
     * reset user's password
     *
     * @param tokenKey Token that provided by user
     * @param password New password that provided by user
     * @return user's email
     * @throws `SfrException` with meaningful exception code
     */
    void sv00202ResetUserPassword(String tokenKey, String password) throws SfrException;

    /**
     * Method use to change password.
     *
     * @param user the current user
     * @throws Exception
     */
    void sv00203ChangePassword(UserDto user) throws Exception;

    /**
     * Get user basic data by userId
     *
     * @param userId
     * @return
     */
    UserDto sv00204GetUserById(Integer userId);

    /**
     * Get user data by departmentId
     *
     * @param departmentId
     * @return List<UserDto>
     */
    List<UserDto> sv00205GetUsersByDepartmentId(Integer departmentId);

    /**
     * Get user by user_code
     *
     * @return Current user data
     */
    UserDto sv00104getUserByUserCode(String userCode);

    /**
     * 得意先 ID をもとに、担当営業と得意先を取得する
     *
     * @param customerIds 得意先 ID のリスト
     * @return 結果リスト
     * <pre>
     * Object[] の各要素は
     * index    name            型               意味
     * ------------------------------------------------------------------------
     * 0        UserDto         UserDto         担当営業
     * 1        CustomerDto     CustomerDto     得意先
     * </pre>
     */
    List<Object[]> sv00207GetSalesUsingCustomerIds(List<Integer> customerIds);

    List<UserDto> sv00208GetUsersByDepartmentIds(List<Integer> departmentIds);
}

/**
 * Created by Teddy on 10/09/2016.
 */

package vn.vnext.sefuri.sf.dao;

import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dao.impl.UserDaoImpl;
import vn.vnext.sefuri.sf.dto.UserDto;

@ImplementedBy(UserDaoImpl.class)
public interface UserDao extends GenericDao<UserDto> {

    UserDto checkLogin(UserDto user);

    UserDto getUserByEmail(String email);

    UserDto findUserById(Integer userId);

    UserDto findUserByUserCode(String userCode);

    List<UserDto> findUsersByDepartmentId(Integer departmentId);

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
    List<Object[]> getSalesUsingCustomerIds(List<Integer> customerIds);
}

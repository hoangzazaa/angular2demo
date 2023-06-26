package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.CustomerGoalDaoImpl;
import vn.vnext.sefuri.sf.dto.CustomerGoalDto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 2/13/2017.
 */
@ImplementedBy(CustomerGoalDaoImpl.class)
public interface CustomerGoalDao extends GenericDao<CustomerGoalDto> {
    List<CustomerGoalDto> getCustomerGoalInYear(Integer depId, Integer year);

    List<CustomerGoalDto> getCustomerGoalByYearAndDepartmentId(Integer departmentId, Integer year);

    BigDecimal getCustomerGoalByPicIDAndYearAndMonth(Integer picId, Integer year, Integer month);

    BigDecimal getCustomerGoalByPicIDAndYear(Integer picId, Integer year);

    BigDecimal getCustomerGoalByPicIDAndYearForNewCustomer(Integer picId, Integer year);
}

package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.CustomerGoalItemDaoImpl;
import vn.vnext.sefuri.sf.dto.CustomerGoalItemDto;

import java.util.List;

/**
 * Created by TungNT on 2/13/2017.
 */
@ImplementedBy(CustomerGoalItemDaoImpl.class)
public interface CustomerGoalItemDao extends GenericDao<CustomerGoalItemDto> {

    List<CustomerGoalItemDto> getCustomerGoalItems(Integer customerGoalId);

    List<CustomerGoalItemDto> getCustomerGoalItems(String customerCode, int year);
}

package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.CustomerDaoImpl;
import vn.vnext.sefuri.sf.dto.CustomerDto;

import java.util.Collection;
import java.util.List;

/**
 * Created by hoangtd on 1/6/2017.
 */
@ImplementedBy(CustomerDaoImpl.class)
public interface CustomerDao extends GenericDao<CustomerDto> {

    /**
     * Find customer by customer id
     *
     * @param customerId
     * @return
     */
    CustomerDto findCustomerById(Integer customerId);


    List<CustomerDto> findCustomer01ByDepartmentId(int departmentId);

    List<CustomerDto> findCustomerByDepartmentId(int departmentId);

    List<CustomerDto> findCustomerByIds(Collection<Integer> customerIds);

    CustomerDto findCustomerByCode(String customerCode);
}

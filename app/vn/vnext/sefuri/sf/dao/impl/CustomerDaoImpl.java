package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.CustomerDao;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.UserDto;

import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by hoangtd on 1/6/2017.
 */
public class CustomerDaoImpl extends GenericDaoImpl<CustomerDto> implements CustomerDao {
    public CustomerDaoImpl() {
        super(CustomerDto.class);
    }

    @Override
    public CustomerDto findCustomerById(Integer customerId) {
        TypedQuery<CustomerDto> query = JPA.em().createQuery("SELECT customer FROM CustomerDto customer WHERE  customer.id=:customerId", CustomerDto.class)
                .setParameter("customerId", customerId);

        return getSingleResultOrNull(query);
    }

    @Override
    public List<CustomerDto> findCustomer01ByDepartmentId(int departmentId) {
        // create query
        String queryStr = "" +
                "SELECT c, u FROM CustomerDto c LEFT JOIN UserDto u ON u.userCode = c.picCode WHERE u.departmentId = :departmentId";
        // execute query
        Query query = JPA.em().createQuery(queryStr).setParameter("departmentId", departmentId);
        List<Object[]> resultList = query.getResultList();
        // parse result
        List<CustomerDto> dtoList = resultList.stream().map(objects -> {
            CustomerDto customer = (CustomerDto) objects[0];

            UserDto user = (UserDto) objects[1];
            customer.setPicUser(user);

            return customer;
        }).collect(Collectors.toList());

        return dtoList;
    }

    @Override
    public List<CustomerDto> findCustomerByDepartmentId(int departmentId) {
        String query = new StringBuilder()
                .append("SELECT customer ")
                .append("FROM CustomerDto customer ")
                .append("  INNER JOIN UserDto saler ON customer.picCode = saler.userCode ")
                .append("WHERE saler.departmentId = :departmentId")
                .toString();
        return JPA.em()
                .createQuery(query, CustomerDto.class)
                .setParameter("departmentId", departmentId)
                .getResultList();
    }

    @Override
    public List<CustomerDto> findCustomerByIds(Collection<Integer> customerIds) {
        String query =
                "SELECT customer " +
                        "FROM CustomerDto customer " +
                        "WHERE customer.id IN :customerIds";
        return JPA.em()
                .createQuery(query, CustomerDto.class)
                .setParameter("customerIds", customerIds)
                .getResultList();
    }

    @Override
    public CustomerDto findCustomerByCode(String customerCode) {

        String query = "SELECT c FROM CustomerDto c WHERE c.customerCode = :code";

        TypedQuery<CustomerDto> cQuery = JPA.em().createQuery(query, CustomerDto.class).setParameter("code", customerCode);

        return getSingleResultOrNull(cQuery);
    }

}
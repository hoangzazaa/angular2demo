package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.CustomerGoalItemDao;
import vn.vnext.sefuri.sf.dto.CustomerGoalItemDto;

import java.util.List;

/**
 * Created by TungNT on 2/13/2017.
 */
public class CustomerGoalItemDaoImpl extends GenericDaoImpl<CustomerGoalItemDto> implements CustomerGoalItemDao {
    public CustomerGoalItemDaoImpl() {
        super(CustomerGoalItemDto.class);
    }

    @Override
    public List<CustomerGoalItemDto> getCustomerGoalItems(Integer customerGoalId) {
        return JPA.em().createQuery("SELECT cus FROM CustomerGoalItemDto cus WHERE cus" +
                ".customerGoalId=:customerGoalId", CustomerGoalItemDto.class)
                .setParameter("customerGoalId", customerGoalId)
                .getResultList();
    }

    @Override
    public List<CustomerGoalItemDto> getCustomerGoalItems(String customerCode, int year) {
        return JPA.em().createQuery("SELECT cgi FROM CustomerGoalItemDto cgi" +
                "  JOIN CustomerGoalDto cg ON cg.id = cgi.customerGoalId" +
                "  JOIN CustomerDto c ON c.id = cg.customerId" +
                " WHERE cg.year = :year" +
                "   AND c.customerCode = :code", CustomerGoalItemDto.class)
                .setParameter("year", year)
                .setParameter("code", customerCode)
                .getResultList();
    }
}

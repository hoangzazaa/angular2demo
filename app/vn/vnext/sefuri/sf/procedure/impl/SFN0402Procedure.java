package vn.vnext.sefuri.sf.procedure.impl;

import org.apache.commons.lang3.math.NumberUtils;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import vn.vnext.sefuri.sf.procedure.dto.SFN040201Dto;

import javax.inject.Inject;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Teddy on 7/21/2017.
 */
public class SFN0402Procedure {

    @Inject
    private JPAApi jpaApi;

    public List<SFN040201Dto> sfn040201GetCustomerRevenue(String customerCode, int year) {

        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SFN040201");
        query.registerStoredProcedureParameter("customerCode", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("fYear", int.class, ParameterMode.IN);
        query.setParameter("customerCode", customerCode);
        query.setParameter("fYear", year);
        query.execute();

        List<Object[]> resultList = query.getResultList();
        List<SFN040201Dto> dtoList = resultList.stream().map(objects -> {
            SFN040201Dto dto = new SFN040201Dto();

            // type
            dto.setType(NumberUtils.toInt(String.valueOf(objects[0])));
            // month
            dto.setMonth(NumberUtils.toInt(String.valueOf(objects[1])));
            // amount
            dto.setAmount((BigDecimal) objects[2]);

            return dto;
        }).collect(Collectors.toList());

        return dtoList;
    }
}

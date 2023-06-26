package vn.vnext.sefuri.sf.procedure.impl;

import org.apache.commons.lang3.math.NumberUtils;
import org.joda.time.DateTime;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import vn.vnext.sefuri.sf.procedure.dto.SFN050602Dto;
import vn.vnext.sefuri.sf.util.DateUtil;

import javax.inject.Inject;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by Teddy on 7/21/2017.
 */
public class SFN0506Procedure {

    @Inject
    private JPAApi jpaApi;

    public int sfn050601CountInvoice(int departmentId, int userId, DateTime startDate, DateTime endDate, int dateType, int method) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SFN050601");
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("dateType", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("method", int.class, ParameterMode.IN);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("startDate", DateUtil.formatDate(startDate));
        query.setParameter("endDate", DateUtil.formatDate(endDate));
        query.setParameter("dateType", dateType);
        query.setParameter("method", method);
        query.execute();

        int countResult = NumberUtils.toInt(String.valueOf(query.getSingleResult()));
        return countResult;
    }

    public List<SFN050602Dto> sfn050602GetInvoices(int departmentId, int userId, DateTime startDate, DateTime endDate, int dateType, int method) {

        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SFN050602");
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("dateType", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("method", int.class, ParameterMode.IN);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("startDate", DateUtil.formatDate(startDate));
        query.setParameter("endDate", DateUtil.formatDate(endDate));
        query.setParameter("dateType", dateType);
        query.setParameter("method", method);
        query.execute();

        List<Object[]> resultList = query.getResultList();
        List<SFN050602Dto> dtoList = resultList.stream().map(objects -> {
            SFN050602Dto dto = new SFN050602Dto();

            // 請求ID
            dto.setCode(Objects.toString(objects[0], null));
            // 得意先
            dto.setCustomerCode(Objects.toString(objects[1], null));
            dto.setCustomerName(Objects.toString(objects[2], null));
            // 請求額
            dto.setAmount((BigDecimal) objects[3]);
            // 請求締め日
            dto.setBillingDate(DateUtil.getDateTime(objects[4], null));
            // 入金期日
            dto.setDueDate(DateUtil.getDateTime(objects[5], null));
            // 方法
            dto.setMethod(Objects.toString(objects[6], null));
            // 入金日
            dto.setPaymentDate(DateUtil.getDateTime(objects[7], null));

            return dto;
        }).collect(Collectors.toList());

        return dtoList;
    }
}

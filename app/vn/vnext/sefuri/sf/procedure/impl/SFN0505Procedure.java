package vn.vnext.sefuri.sf.procedure.impl;

import org.apache.commons.lang3.math.NumberUtils;
import org.joda.time.DateTime;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import vn.vnext.sefuri.sf.procedure.dto.SFN050502Dto;
import vn.vnext.sefuri.sf.util.DateUtil;

import javax.inject.Inject;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Created by Teddy on 7/21/2017.
 */
public class SFN0505Procedure {

    @Inject
    private JPAApi jpaApi;

    public int sfn050501CountShipping(int departmentId, int userId, DateTime startDate, DateTime endDate) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SFN050501");
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("startDate", DateUtil.formatDate(startDate));
        query.setParameter("endDate", DateUtil.formatDate(endDate));
        query.execute();

        int countResult = NumberUtils.toInt(String.valueOf(query.getSingleResult()));
        return countResult;
    }

    public List<SFN050502Dto> sfn050502GetShippings(int departmentId, int userId, DateTime startDate, DateTime endDate) {

        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SFN050502");
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("startDate", DateUtil.formatDate(startDate));
        query.setParameter("endDate", DateUtil.formatDate(endDate));
        query.execute();

        List<Object[]> resultList = query.getResultList();
        List<SFN050502Dto> dtoList = resultList.stream().map(objects -> {
            SFN050502Dto dto = new SFN050502Dto();

            // planId
            dto.setPlanId(NumberUtils.toInt(String.valueOf(objects[0])));
            // 出荷予定日
            if (objects[1] != null) {
                dto.setPlanDate(new DateTime(objects[1]));
            }
            // 得意先名
            dto.setCustomerCode(Objects.toString(objects[2], null));
            dto.setCustomerName(Objects.toString(objects[3], null));
            // 案件ID
            dto.setDealCode(Objects.toString(objects[4], null));
            // 品名
            dto.setProductCode(Objects.toString(objects[5], null));
            dto.setProductName(Objects.toString(objects[6], null));
            if (objects[7] != null) {
                dto.setProductType(NumberUtils.toInt(String.valueOf(objects[7])));
            }
            if (objects[8] != null) {
                dto.setProductShapeId(NumberUtils.toInt(String.valueOf(objects[8])));
            }
            // 出荷予定数
            dto.setPlanQuantity(NumberUtils.toInt(String.valueOf(objects[9])));
            // 出荷実績数
            dto.setActualQuantity(NumberUtils.toInt(String.valueOf(objects[10])));
            // 制限
            dto.setRestriction(NumberUtils.toInt(String.valueOf(objects[11])));

            dto.setCartonShippingType(NumberUtils.toInt(String.valueOf(objects[12])));

            return dto;
        }).collect(Collectors.toList());

        return dtoList;
    }
}

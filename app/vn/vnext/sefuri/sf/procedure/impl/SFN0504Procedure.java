package vn.vnext.sefuri.sf.procedure.impl;

import org.apache.commons.lang3.math.NumberUtils;
import org.joda.time.DateTime;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import vn.vnext.sefuri.sf.procedure.dto.SFN050402Dto;

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
public class SFN0504Procedure {

    @Inject
    private JPAApi jpaApi;

    public int sfn050401CountStock(int departmentId, int userId, int dayLimit, int stockType) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SFN050401");
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("dayLimit", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("stockType", int.class, ParameterMode.IN);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("dayLimit", dayLimit);
        query.setParameter("stockType", stockType);
        query.execute();

        int countResult = NumberUtils.toInt(String.valueOf(query.getSingleResult()));
        return countResult;
    }

    public List<SFN050402Dto> sfn050402GetStocks(int departmentId, int userId, int dayLimit, int stockType) {

        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SFN050402");
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("dayLimit", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("stockType", int.class, ParameterMode.IN);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("dayLimit", dayLimit);
        query.setParameter("stockType", stockType);
        query.execute();

        List<Object[]> resultList = query.getResultList();
        List<SFN050402Dto> dtoList = resultList.stream().map(objects -> {
            SFN050402Dto dto = new SFN050402Dto();

            // stock id
            dto.setId(NumberUtils.toInt(String.valueOf(objects[0])));
            // stock type
            dto.setType(NumberUtils.toInt(String.valueOf(objects[1])));
            // customer
            dto.setCustomerName(Objects.toString(objects[2], null));
            dto.setCustomerCode(Objects.toString(objects[3], null));
            // deal
            dto.setDealCode(Objects.toString(objects[4], null));
            // product
            dto.setProductCode(Objects.toString(objects[5], null));
            dto.setProductName(Objects.toString(objects[6], null));
            if (objects[7] != null) {
                dto.setProductType(NumberUtils.toInt(String.valueOf(objects[7])));
            }
            if (objects[8] != null) {
                dto.setProductShapeId(NumberUtils.toInt(String.valueOf(objects[8])));
            }
            // quantity
            int quantity = NumberUtils.toInt(String.valueOf(objects[9]));
            dto.setQuantity(quantity);
            // unitPrice
            BigDecimal unitPrice = (BigDecimal) objects[10];
            dto.setUnitPrice(unitPrice);
            // total
            if (unitPrice != null) {
                BigDecimal total = unitPrice.multiply(BigDecimal.valueOf(quantity));
                dto.setTotal(total);
            }
            // storage
            if (objects[11] != null) {
                dto.setManufactureDate(new DateTime(objects[11]));
            }
            dto.setStorageDays(NumberUtils.toInt(String.valueOf(objects[12])));

            dto.setCartonShippingType(NumberUtils.toInt(String.valueOf(objects[13])));

            return dto;
        }).collect(Collectors.toList());

        return dtoList;
    }
}

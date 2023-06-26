package vn.vnext.sefuri.sf.dao.impl;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import play.db.jpa.JPA;
import play.db.jpa.JPAApi;
import vn.vnext.sefuri.sf.dao.ProcedureDao;
import vn.vnext.sefuri.sf.dto.dao.*;
import vn.vnext.sefuri.sf.util.LogUtil;

import javax.inject.Inject;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implement of ProcedureDao
 */
public class ProcedureDaoImpl implements ProcedureDao {

    private static final Logger logger = LogUtil.getLogger(ProcedureDaoImpl.class);

    @Inject
    private JPAApi jpaApi;

    @Override
    public List<Procedure001Dto> callProc001(int startYear, int startMonth, int departmentId) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_001");
        query.registerStoredProcedureParameter("startYear", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startMonth", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.setParameter("startYear", startYear);
        query.setParameter("startMonth", startMonth);
        query.setParameter("departmentId", departmentId);
        query.execute();

        try {
            List<Object[]> resultList = query.getResultList();
            List<Procedure001Dto> dtoList = resultList.stream().map(objects -> {
                Procedure001Dto dto = new Procedure001Dto();
                dto.setYear(NumberUtils.toInt(String.valueOf(objects[0])));
                dto.setMonth(NumberUtils.toInt(String.valueOf(objects[1])));
                dto.setCustomerId(NumberUtils.toInt(String.valueOf(objects[2])));
                dto.setRevenue1((BigDecimal) objects[3]);
                dto.setRevenue2((BigDecimal) objects[4]);
                dto.setRevenue3((BigDecimal) objects[5]);
                return dto;
            }).collect(Collectors.toList());
            return dtoList;
        } catch (IllegalStateException ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Procedure002Dto> callProc002(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_002");
        query.registerStoredProcedureParameter("fYear", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("sMonth", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("eMonth", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("customerType", int.class, ParameterMode.IN);
        query.setParameter("fYear", financialYear);
        query.setParameter("sMonth", startFinancialMonth);
        query.setParameter("eMonth", endFinancialMonth);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("customerType", customerType);
        query.execute();

        try {
            List<Object[]> resultList = query.getResultList();
            List<Procedure002Dto> dtoList = resultList.stream().map(objects -> {
                Procedure002Dto dto = new Procedure002Dto();
                dto.setAgentId(NumberUtils.toInt(String.valueOf(objects[0])));
                dto.setMonth(NumberUtils.toInt(String.valueOf(objects[1])));
                dto.setProductType(NumberUtils.toInt(String.valueOf(objects[2])));
                dto.setRevenue((BigDecimal) objects[3]);
                return dto;
            }).collect(Collectors.toList());
            return dtoList;
        } catch (IllegalStateException ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Procedure003Dto> callProc003(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType,
                                             int summaryType, int dateUnit) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_003");
        query.registerStoredProcedureParameter("fYear", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("sMonth", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("eMonth", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("customerType", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("summaryType", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("dateUnit", int.class, ParameterMode.IN);
        query.setParameter("fYear", financialYear);
        query.setParameter("sMonth", startFinancialMonth);
        query.setParameter("eMonth", endFinancialMonth);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("customerType", customerType);
        query.setParameter("summaryType", summaryType);
        query.setParameter("dateUnit", dateUnit);
        query.execute();

        try {
            List<Object[]> resultList = query.getResultList();
            List<Procedure003Dto> dtoList = resultList.stream().map(objects -> {
                Procedure003Dto dto = new Procedure003Dto();
                dto.setAgentId(NumberUtils.toInt(String.valueOf(objects[0])));
                dto.setDate(NumberUtils.toInt(String.valueOf(objects[1])));
                dto.setProductType(NumberUtils.toInt(String.valueOf(objects[2])));
                dto.setTotal((BigDecimal) objects[3]);
                return dto;
            }).collect(Collectors.toList());
            return dtoList;
        } catch (IllegalStateException ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Procedure004Dto> callProc004(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_004");
        query.registerStoredProcedureParameter("fYear", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("sfMonth", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("efMonth", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("departmentId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("customerType", int.class, ParameterMode.IN);
        query.setParameter("fYear", financialYear);
        query.setParameter("sfMonth", startFinancialMonth);
        query.setParameter("efMonth", endFinancialMonth);
        query.setParameter("departmentId", departmentId);
        query.setParameter("userId", userId);
        query.setParameter("customerType", customerType);
        query.execute();

        try {
            List<Object[]> resultList = query.getResultList();
            List<Procedure004Dto> dtoList = resultList.stream().map(objects -> {
                Procedure004Dto dto = new Procedure004Dto();
                dto.setMonth(NumberUtils.toInt(String.valueOf(objects[0])));
                dto.setGoal((BigDecimal) objects[1]);
                return dto;
            }).collect(Collectors.toList());
            return dtoList;
        } catch (IllegalStateException ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Integer> callProc005(int year, int month, int userId, int customerType, int summaryType) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_005");
        query.registerStoredProcedureParameter("iYear", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("iMonth", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("userId", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("customerType", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("summaryType", Integer.class, ParameterMode.IN);
        query.setParameter("iYear", year);
        query.setParameter("iMonth", month);
        query.setParameter("userId", userId);
        query.setParameter("customerType", customerType);
        query.setParameter("summaryType", summaryType);
        query.execute();

        try {
            List<Object[]> resultList = query.getResultList();
            List<Integer> dealIds = new ArrayList<>();
            for (Object[] obj : resultList) {
                dealIds.add(Integer.valueOf(obj[0].toString()));
            }
            return dealIds;
        } catch (IllegalStateException ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public Procedure006Dto callProc006(int financialYear, int financialMonth, int listLimit) {

        StoredProcedureQuery query = jpaApi.em().createStoredProcedureQuery("PROC_006");
        query.registerStoredProcedureParameter("fYear", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("fMonth", Integer.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("listLimit", Integer.class, ParameterMode.IN);
        query.setParameter("fYear", financialYear);
        query.setParameter("fMonth", financialMonth);
        query.setParameter("listLimit", listLimit);
        query.execute();

        // get result
        Procedure006Dto resultDto = new Procedure006Dto();
        resultDto.setProcedure00601DtoList(Collections.EMPTY_LIST);
        resultDto.setProcedure00601DtoList(Collections.EMPTY_LIST);
        // get first result set
        try {
            List<Object[]> resultList = query.getResultList();
            List<Procedure006Dto.Procedure00601Dto> procedure00601DtoList = resultList.stream().map(objects -> {
                Procedure006Dto.Procedure00601Dto dto = new Procedure006Dto.Procedure00601Dto();

                dto.setYear(NumberUtils.toInt(String.valueOf(objects[0])));
                dto.setMonth(NumberUtils.toInt(String.valueOf(objects[1])));
                dto.setCustomerId(NumberUtils.toInt(String.valueOf(objects[2])));
                dto.setOldAmount1((BigDecimal) objects[3]);
                dto.setOldAmount2((BigDecimal) objects[4]);
                dto.setOldAmount3((BigDecimal) objects[5]);
                dto.setNewAmount1((BigDecimal) objects[6]);
                dto.setNewAmount2((BigDecimal) objects[7]);
                dto.setNewAmount3((BigDecimal) objects[8]);
                dto.setNote(objects[9] != null ? String.valueOf(objects[9]) : "");

                return dto;
            }).collect(Collectors.toList());
            resultDto.setProcedure00601DtoList(procedure00601DtoList);
        } catch (IllegalStateException ex) {
            logger.error("proc_006 error", ex);
        }

        // get second result set
        try {
            if (query.hasMoreResults()) {
                List<Object[]> resultList = query.getResultList();
                List<Procedure006Dto.Procedure00602Dto> procedure00602DtoList = resultList.stream().map(objects -> {
                    Procedure006Dto.Procedure00602Dto dto = new Procedure006Dto.Procedure00602Dto();

                    dto.setYear(NumberUtils.toInt(String.valueOf(objects[0])));
                    dto.setMonth(NumberUtils.toInt(String.valueOf(objects[1])));
                    dto.setOldAmount1((BigDecimal) objects[3]);
                    dto.setOldAmount2((BigDecimal) objects[4]);
                    dto.setOldAmount3((BigDecimal) objects[5]);
                    dto.setNewAmount1((BigDecimal) objects[6]);
                    dto.setNewAmount2((BigDecimal) objects[7]);
                    dto.setNewAmount3((BigDecimal) objects[8]);

                    return dto;
                }).collect(Collectors.toList());
                resultDto.setProcedure00602DtoList(procedure00602DtoList);
            }
        } catch (IllegalStateException ex) {
            logger.error("proc_006 error", ex);
        }

        return resultDto;
    }

    @Override
    public BigDecimal getRevenueByPicID(Integer picId, String startDate, String endDate) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SF0010001");
        query.registerStoredProcedureParameter("picId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("picId", picId);
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);
        query.execute();

        Object result = query.getSingleResult();
        if (result == null) {
            return BigDecimal.ZERO;
        }
        return new BigDecimal(String.valueOf(result));
    }

    @Override
    public BigDecimal getNewCustomerReceipts(Integer picId, String startDate, String endDate) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SF0010002");
        query.registerStoredProcedureParameter("picId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("picId", picId);
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);
        query.execute();

        Object result = query.getSingleResult();
        if (result == null) {
            return BigDecimal.ZERO;
        }
        BigDecimal re = new BigDecimal(String.valueOf(result));
        re = re.setScale(0, RoundingMode.HALF_UP);
        return re;
    }

    @Override
    public BigDecimal getDepartmentAllReceipts(String startTime, String endTime) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SF0010003All");
        System.out.println("call SF0010003All ");
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("startDate", startTime);
        query.setParameter("endDate", endTime);
        query.execute();

        Object result = query.getSingleResult();
        if (result == null)
            return BigDecimal.ZERO;
        return new BigDecimal(String.valueOf(result));
    }

    @Override
    public BigDecimal getDepartmentReceipts(Integer departmentId, String startTime, String endTime) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SF0010003");
        query.registerStoredProcedureParameter("department", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("department", departmentId);
        query.setParameter("startDate", startTime);
        query.setParameter("endDate", endTime);
        query.execute();

        Object result = query.getSingleResult();
        if (result == null)
            return BigDecimal.ZERO;
        return new BigDecimal(String.valueOf(result));
    }

    @Override
    public BigDecimal getDepartmentReceiptsWithNewCustomer(Integer departmentId, String startTime, String endTime) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SF0010004");
        query.registerStoredProcedureParameter("department", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("department", departmentId);
        query.setParameter("startDate", startTime);
        query.setParameter("endDate", endTime);
        query.execute();

        Object result = query.getSingleResult();
        if (result == null) {
            return BigDecimal.ZERO;
        }
        BigDecimal re = new BigDecimal(String.valueOf(result));
        re = re.setScale(0, RoundingMode.HALF_UP);
        return re;
    }

    @Override
    public BigDecimal findDigitalDeal(Integer departmentId, Integer picId, String startTime, String endTime) {
        StoredProcedureQuery query = null;
        if (departmentId != null && departmentId > 0) {
            // using department filter
            query = JPA.em()
                    .createStoredProcedureQuery("PROC_SF0010008");
            query.registerStoredProcedureParameter("department", Integer.class, ParameterMode.IN);
            query.setParameter("department", departmentId);
        }
        if (picId != null && picId > 0) {
            // using Pic filter
            query = JPA.em()
                    .createStoredProcedureQuery("PROC_SF0010007");
            query.registerStoredProcedureParameter("picId", Integer.class, ParameterMode.IN);
            query.setParameter("picId", picId);
        }
        if((picId == null || picId == 0) && (departmentId == null || departmentId == 0)){
            // for all department
            query = JPA.em()
                    .createStoredProcedureQuery("PROC_SF0010009");
        }
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("startDate", startTime);
        query.setParameter("endDate", endTime);
        query.execute();

        Object result = query.getSingleResult();
        if (result == null) {
            return BigDecimal.ZERO;
        }
        BigDecimal re = new BigDecimal(String.valueOf(result));
        re = re.setScale(0, RoundingMode.HALF_UP);
        return re;
    }
}

package vn.vnext.sefuri.sf.dao.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.TypedQuery;

import com.google.common.base.Strings;
import com.google.inject.Inject;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dao.DealDao;
import vn.vnext.sefuri.sf.dao.DepartmentDao;
import vn.vnext.sefuri.sf.dao.UserDao;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.OrderDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SF00205.request.SF00205Filter;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;

/**
 * @author hoangtd
 */
public class DealDaoImpl extends GenericDaoImpl<DealDto> implements DealDao, Constants {
    @Inject
    private SV001AuthService sv001AuthService;

    @Inject
    private DepartmentDao departmentDao;

    @Inject
    private UserDao userDao;

    public DealDaoImpl() {
        super(DealDto.class);
    }

    /**
     * {@inheritDoc}
     */
    public DealDto findDealInfoByDealCode(String dealCode) {
        String query = "SELECT deal FROM DealDto deal WHERE deal.dealCode =:dealCode AND deal.deleteFlag =:deleteFlag";
        List<DealDto> dealDtos = JPA.em().createQuery(query, DealDto.class)
                .setParameter("deleteFlag", DELETE_DISABLE)
                .setParameter("dealCode", dealCode)
                .getResultList();
        return CollectionUtil.isNotEmpty(dealDtos) ? dealDtos.get(0) : null;
    }

    @Override
    public DealDto findDealAndOrderByDealId(int dealId) {
        String query = "SELECT deal, o "
                +   "FROM DealDto deal "
                +     "INNER JOIN OrderDto o ON deal.id = o.dealId "
                +   "WHERE deal.id = :id AND deal.deleteFlag = :deleteFlag";
        List<Object[]> result = JPA.em().createQuery(query, Object[].class)
                .setParameter("deleteFlag", DELETE_DISABLE)
                .setParameter("id", dealId)
                .getResultList();

        // 案件と注文の対応付け
        if (!result.isEmpty()) {
            Object[] tuples = result.get(0);
            DealDto dto = (DealDto)tuples[0];
            dto.setOrder((OrderDto)tuples[1]);
            return dto;
        } else {
            return null;
        }
    }

    @Override
    public void deleteDealInfo(String dealCode) {
        JPA.em().createQuery("UPDATE DealDto deal SET deal.deleteFlag =:deleteFlag WHERE deal.dealCode =:dealCode")
                .setParameter("deleteFlag", Constants.DELETE_ENABLE)
                .setParameter("dealCode", dealCode)
                .executeUpdate();
    }

    @Override
    public DealDto findDealByDealCodeAndProductCode(String dealCode, String productCode) {
        List<DealDto> dealDtos = JPA.em().createQuery("SELECT deal " +
                "FROM DealDto deal " +
                "INNER JOIN DealProductDto dealProduct ON deal.id = dealProduct.dealId " +
                "INNER JOIN ProductDto product ON product.id = dealProduct.productId " +
                "AND deal.dealCode = :dealCode " +
                "AND product.productCode = :productCode " +
                "AND deal.deleteFlag =:deleteFlag", DealDto.class)
                .setParameter("deleteFlag", DELETE_DISABLE)
                .setParameter("productCode", productCode)
                .setParameter("dealCode", dealCode)
                .getResultList();
        if (CollectionUtil.isNotEmpty(dealDtos)) {
            return dealDtos.get(0);
        }
        return null;
    }

    @Override
    public List<DealDto> findDealByProductId(Integer productId) {
        List<DealDto> dealDtos = JPA.em().createQuery("SELECT deal " +
                "FROM DealDto deal " +
                "INNER JOIN DealProductDto dealProduct ON deal.id = dealProduct.dealId " +
                "INNER JOIN ProductDto product ON product.id = dealProduct.productId " +
                "AND product.id = :productId " +
                "AND deal.deleteFlag =:deleteFlag", DealDto.class)
                .setParameter("deleteFlag", DELETE_DISABLE)
                .setParameter("productId", productId)
                .getResultList();
        return dealDtos;
    }

    @Override
    public List<DealDto> getDeals(Integer start, Integer offset) {
        return JPA.em().createQuery("SELECT p FROM DealDto p WHERE p.deleteFlag=:deleteFlag ", DealDto.class)
                .setParameter("deleteFlag", Constants.DELETE_DISABLE)
                .setFirstResult(start).setMaxResults(offset).getResultList();
    }

    @Override
    public List<DealDto> loadMoreData(Integer limit, Integer offset) {
        return JPA.em().createQuery("SELECT p FROM DealDto p WHERE p.templateFlag=:template AND p.deleteFlag=:deleteFlag ", DealDto.class)
                .setParameter("template", Constants.TEMPLATE)
                .setParameter("deleteFlag", Constants.DELETE_DISABLE)
                .setFirstResult(offset).setMaxResults(limit).getResultList();
    }

    @Override
    public long getTotal() {

        final String query = "SELECT COUNT(p) FROM DealDto p WHERE p.templateFlag=:template AND p.deleteFlag=:deleteFlag";
        List<Long> count = JPA.em().createQuery(query, Long.class)
                .setParameter("template", Constants.TEMPLATE)
                .setParameter("deleteFlag", Constants.DELETE_DISABLE)
                .getResultList();

        if (CollectionUtil.isNotEmpty(count)) {
            return count.get(0);
        }
        return 0L;
    }

    @Override
    public List<DealDto> getAllBookmarkDeals(int userId, int startPosition, int maxResult) {
        String query = "SELECT deal FROM DealDto deal " +
                "INNER JOIN MyboxItemDto mybox ON mybox.dealId=deal.id " +
                "WHERE mybox.userId=:userId AND deal.deleteFlag=:deleteFlag ORDER BY deal.id DESC";
        return JPA.em().createQuery(query, DealDto.class)
                .setParameter("deleteFlag", Constants.DELETE_DISABLE)
                .setParameter("userId", userId)
                .setFirstResult(startPosition)
                .setMaxResults(maxResult)
                .getResultList();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<DealDto> filterExistingDealsInList(List<Integer> dealIds) {
        if (CollectionUtil.isEmpty(dealIds)) {
            return new ArrayList<>();
        }

        String query = "SELECT DISTINCT deal FROM DealDto deal WHERE deal.id IN :listIds AND deal.deleteFlag <> :deletedFlg ORDER BY deal.updatedDate DESC";
        return JPA.em().createQuery(query, DealDto.class)
                .setParameter("listIds", dealIds)
                .setParameter("deletedFlg", 1)
                .getResultList();

    }

    @Override
    public DealDto findDealInfoByDealCodeAndStatus(String dealCode, Integer dealStatus) {
        String query = "SELECT deal FROM DealDto deal WHERE deal.dealCode =:dealCode " +
                "AND deal.deleteFlag =:deleteFlag " +
                "AND deal.dealStatus <:dealStatus " +
                "AND deal.templateFlag <> 1";
        List<DealDto> dealDtos = JPA.em().createQuery(query, DealDto.class)
                .setParameter("deleteFlag", DELETE_DISABLE)
                .setParameter("dealCode", dealCode)
                .setParameter("dealStatus", dealStatus)
                .getResultList();
        return CollectionUtil.isNotEmpty(dealDtos) ? dealDtos.get(0) : null;
    }

    private static final List<Integer> SF00202_ACCEPTED_DEAL_STATUS =
            Arrays.asList(
                    Enums.DealStatus.ORDER_CONFIRMATION.getStatus(),
                    Enums.DealStatus.WAITING_FOR_SHIPMENT.getStatus(),
                    // http://fridaynight.vnext.vn/issues/2963
                    Enums.DealStatus.WAITING_FOR_PARTIAL_SHIPMENT.getStatus(),
                    Enums.DealStatus.SHIPPED.getStatus()
            );

    private static final String GET_ALL_DEAL_LAZY_QUERY =
            "SELECT d " +
            "FROM DealDto d, UserDto u " +
            "WHERE d.salesId = u.id " +
            "AND d.templateFlag <> 1 " +                                   // deal, not template
            "  AND d.deleteFlag <> 1 " +                                   // not deleted
            "  AND (d.dealStatus IN :accepted" +                            // in SF00202_ACCEPTED_DEAL_STATUS list
            "  OR d.closedFlag = 1) " +
            "  AND d.sourceDealId IS NULL " +
            "  AND (u.id = :userId OR u.departmentId = :departmentId) " +  // interdepartmental
            "ORDER BY d.updatedDate DESC";

    /** @deprecated Unused. */
    @Deprecated
    private static final String COUNT_ALL_DEAL_LAZY_QUERY =
            "SELECT COUNT(d.id)" +
            "FROM DealDto d, UserDto u " +
            "WHERE d.salesId = u.id " +
            "AND d.templateFlag <> 1 " +                                   // deal, not template
            "  AND d.deleteFlag <> 1 " +                                   // not deleted
            "  AND (d.dealStatus IN :accepted" +                            // in SF00202_ACCEPTED_DEAL_STATUS list
            "  OR d.closedFlag = 1) " +
            "  AND d.sourceDealId IS NULL " +
            "  AND (u.id = :userId OR u.departmentId = :departmentId) ";   // interdepartmental
    private static final String COUNT_ALL_DEAL_LAZY_QUERY_CLONE =
            "SELECT d " +
                    " FROM DealDto d, UserDto u " +
                    " WHERE d.salesId = u.id " +
                    " AND d.templateFlag <> 1 " +                                   // deal, not template
                    "  AND d.deleteFlag <> 1 " +                                   // not deleted
                    "  AND (d.dealStatus IN :accepted" +                            // in SF00202_ACCEPTED_DEAL_STATUS list
                    "  OR d.closedFlag = 1) " +
                    "  AND d.sourceDealId IS NULL " +
                    "  AND (u.id = :userId OR u.departmentId = :departmentId) ";   // interdepartmental

    @Override
    public List<DealDto> getAllDealLazy(final Integer index, final Integer limit, final Integer userId, final Integer departmentId) {
        return JPA.em().createQuery(GET_ALL_DEAL_LAZY_QUERY, DealDto.class)
                .setParameter("userId", userId)
                .setParameter("departmentId", departmentId)
                .setParameter("accepted", SF00202_ACCEPTED_DEAL_STATUS)
                .setFirstResult(index)
                .setMaxResults(limit)
                .getResultList();
    }

    @Override
    public Long countDeals(Integer userId, Integer departmentId) {
//        return JPA.em().createQuery(COUNT_ALL_DEAL_LAZY_QUERY, Long.class)
//                .setParameter("userId", userId)
//                .setParameter("departmentId", departmentId)
//                .setParameter("accepted", SF00202_ACCEPTED_DEAL_STATUS)
//                .getSingleResult();

        TypedQuery<DealDto> typedQuery = JPA.em().createQuery(COUNT_ALL_DEAL_LAZY_QUERY_CLONE, DealDto.class)
                .setParameter("userId", userId)
                .setParameter("departmentId", departmentId)
                .setParameter("accepted", SF00202_ACCEPTED_DEAL_STATUS);

        List<DealDto> retList = typedQuery.getResultList();
        if (CollectionUtil.isEmpty(retList)) return 0L;

        boolean isHitSearchOn;
        boolean isCompletedDesign;
        boolean isSupporter = false;
        Integer loginUserDepartmentId = null;

        UserDto loginUser = sv001AuthService.getCurrentUser();
        DepartmentDto loginUserDepartment = departmentDao.find(loginUser.getDepartmentId());
        if (loginUserDepartment != null) {
            loginUserDepartmentId = loginUserDepartment.getId();
            if (Enums.DepartType.SUPPORT.getType().equals(loginUserDepartment.getType())) {
                isSupporter = true;
            }
        }

        long count = 0;
        for (DealDto dto : retList) {
            // check deal is hit search on or off
            isHitSearchOn = (dto.getDealLockFlag() != null && dto.getDealLockFlag() == Enums.Status
                    .DELETE_FLAG_ON.getStatus());

            // check deal is completed design or not
            isCompletedDesign = (Enums.DealStatus.DESIGN_COMPLETE.getStatus() == dto.getDealStatus());

            boolean isSameDepartment = false;
            UserDto owner = userDao.find(dto.getSalesId());
            if (owner != null && owner.getDepartmentId() != null) {
                DepartmentDto currentDepartment = departmentDao.find(owner.getDepartmentId());
                if (currentDepartment != null && currentDepartment.getId().equals(loginUserDepartmentId)) {
                    isSameDepartment = true;
                }
            }

            boolean canViewToEdit = false; // identify deal can display or not
            if (isSameDepartment || isSupporter) { // cung phong ban hoac la phong support
                canViewToEdit = true;
            } else {
                if (isHitSearchOn) { // hit search is on
                    if (isCompletedDesign) {
                        continue;
                    }
                } else { // hit search is off
                    canViewToEdit = true;
                }
            }

            if (!canViewToEdit)
                continue;

            count++;
        }

        return count;
    }

    @Override
    public List<Object[]> getDeal(Integer departmentId, Integer picId, String endDate, String startDate) {

        List<String> summaryDepartmentCodes = Arrays.asList(
            "EE01",
            "EE02",
            "EE03",
            "EE04",
            "EE05",
            "EE06",
            "EE07",
            "EE08",
            "EE09",
            "EE10",
            "EE11",
            "EE12",
            "EE13",
            "EE18",
            "EE92",
            "EE94",
            "EE95",
            "EE98"
        );



        String query =
            "SELECT " +
            "   re.invoiceSalesDate, " +
            "   COALESCE(d.dealCode, ''), " +
            "   re.productName, " +
            "   re.productType, " +
            "   re.salesAmount, " +
            "   re.salesNumber, " +
            "   re.salesUnitPrice " +
            " FROM " +
            "   RevenueDto re " +
            " LEFT JOIN OrderItemDto oi ON oi.orderCode = re.orderCode " +
            " LEFT JOIN OrderDto o ON o.id = oi.orderId " +
            " LEFT JOIN DealDto d ON d.id = o.dealId " +
            " INNER JOIN CustomerDto c ON re.dennoCustomerCode = c.customerCode " +
            " INNER JOIN UserDto u ON c.picCode = u.userCode " +
            " INNER JOIN DepartmentDto dep ON u.departmentId = dep.id " +
            " WHERE " +
            "   (DATE(re.invoiceSalesDate) BETWEEN DATE(:startDate) AND DATE(:endDate)) " +
            " AND dep.departmentCode IN ( '" +
            String.join("', '", summaryDepartmentCodes) +
            "')";
        if (departmentId > 0) {
            if (picId > 0) {
                query += " AND u.id = " + picId;
            } else {
                query += " AND u.departmentId = " + departmentId;
            }
        }
        query += "ORDER BY re.invoiceSalesDate DESC, re.salesSeq DESC, re.salesSeq2 DESC";
        return JPA.em().createQuery(query, Object[].class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();
    }

    @Override
    public List<DealDto> getAllDealsInProcess(Integer userId, Integer departmentId, Integer offset, Integer limit) {
        String query =
                "SELECT d FROM DealDto d INNER JOIN UserDto u ON d.salesId = u.id WHERE d.templateFlag <> 1" +
                        " AND d.deleteFlag <> 1 AND d.closedFlag <> 1 AND u.id =:userId" +
                        " AND u.departmentId =:departmentId AND d.dealStatus NOT IN (:dealStatus)" +
                        " ORDER BY d.updatedDate DESC";
        return JPA.em().createQuery(query, DealDto.class)
                .setParameter("userId", userId)
                .setParameter("departmentId", departmentId)
                .setParameter("dealStatus", Arrays.asList(Enums.DealStatus.SHIPPED.getStatus(),
                        Enums.DealStatus.WAITING_FOR_PARTIAL_SHIPMENT.getStatus()))
                .setFirstResult(offset).setMaxResults(limit)
                .getResultList();
    }

    @Override
    public long countDealInProcess(final Integer userId, final Integer departmentId) {
//        String query =
//                "SELECT count(d) FROM DealDto d INNER JOIN UserDto u ON d.salesId = u.id WHERE d.templateFlag <> 1" +
//                        " AND d.deleteFlag <> 1 AND d.closedFlag <> 1 AND u.id =:userId" +
//                        " AND u.departmentId =:departmentId AND d.dealStatus NOT IN (:dealStatus)" +
//                        " ORDER BY d.updatedDate DESC";
//        return JPA.em().createQuery(query, Long.class)
//                .setParameter("userId", userId)
//                .setParameter("departmentId", departmentId)
//                .setParameter("dealStatus", Arrays.asList(EnumsPDF.DealStatus.SHIPPED.getStatus(),
//                        EnumsPDF.DealStatus.WAITING_FOR_PARTIAL_SHIPMENT.getStatus()))
//                .getSingleResult();

        String query =
                "SELECT d FROM DealDto d INNER JOIN UserDto u ON d.salesId = u.id WHERE d.templateFlag <> 1" +
                        " AND d.deleteFlag <> 1 AND d.closedFlag <> 1 AND u.id =:userId" +
                        " AND u.departmentId =:departmentId AND d.dealStatus NOT IN (:dealStatus)" +
                        " ORDER BY d.updatedDate DESC";
        TypedQuery<DealDto> typedQuery = JPA.em().createQuery(query, DealDto.class)
                .setParameter("userId", userId)
                .setParameter("departmentId", departmentId)
                .setParameter("dealStatus", Arrays.asList(Enums.DealStatus.SHIPPED.getStatus(),
                                                          Enums.DealStatus.WAITING_FOR_PARTIAL_SHIPMENT.getStatus()));

        List<DealDto> retList = typedQuery.getResultList();
        if (CollectionUtil.isEmpty(retList)) return 0L;

        boolean isHitSearchOn;
        boolean isCompletedDesign;
        boolean isSupporter = false;
        Integer loginUserDepartmentId = null;

        UserDto loginUser = sv001AuthService.getCurrentUser();
        DepartmentDto loginUserDepartment = departmentDao.find(loginUser.getDepartmentId());
        if (loginUserDepartment != null) {
            loginUserDepartmentId = loginUserDepartment.getId();
            if (Enums.DepartType.SUPPORT.getType().equals(loginUserDepartment.getType())) {
                isSupporter = true;
            }
        }

        long count = 0;
        for (DealDto dto : retList) {
            // check deal is hit search on or off
            isHitSearchOn = (dto.getDealLockFlag() != null && dto.getDealLockFlag() == Enums.Status
                    .DELETE_FLAG_ON.getStatus());

            // check deal is completed design or not
            isCompletedDesign = (Enums.DealStatus.DESIGN_COMPLETE.getStatus() == dto.getDealStatus());

            boolean isSameDepartment = false;
            UserDto owner = userDao.find(dto.getSalesId());
            if (owner != null && owner.getDepartmentId() != null) {
                DepartmentDto currentDepartment = departmentDao.find(owner.getDepartmentId());
                if (currentDepartment != null && currentDepartment.getId().equals(loginUserDepartmentId)) {
                    isSameDepartment = true;
                }
            }

            boolean canViewToEdit = false; // identify deal can display or not
            if (isSameDepartment || isSupporter) { // cung phong ban hoac la phong support
                canViewToEdit = true;
            } else {
                if (isHitSearchOn) { // hit search is on
                    if (isCompletedDesign) {
                        continue;
                    }
                } else { // hit search is off
                    canViewToEdit = true;
                }
            }

            if (!canViewToEdit)
                continue;

            count++;
        }

        return count;
    }

    @Override
    public List<DealDto> getDealFromTo(final SF00205Filter filter, final Integer offset, final Integer limit) {
        TypedQuery<DealDto> typedQuery = createTypedQuery(filter);
        typedQuery.setFirstResult(offset).setMaxResults(limit);
        return typedQuery.getResultList();
    }

    @Override
    public long countDealByFilter(final SF00205Filter filter) {
        TypedQuery<DealDto> typedQuery = createTypedQuery(filter);

        List<DealDto> retList = typedQuery.getResultList();
        if (CollectionUtil.isEmpty(retList)) return 0;

        boolean isHitSearchOn;
        boolean isCompletedDesign;
        boolean isSupporter = false;
        Integer loginUserDepartmentId = null;

        UserDto loginUser = sv001AuthService.getCurrentUser();
        DepartmentDto loginUserDepartment = departmentDao.find(loginUser.getDepartmentId());
        if (loginUserDepartment != null) {
            loginUserDepartmentId = loginUserDepartment.getId();
            if (Enums.DepartType.SUPPORT.getType().equals(loginUserDepartment.getType())) {
                isSupporter = true;
            }
        }

        int count = 0;
        for (DealDto dto : retList) {
            // check deal is hit search on or off
            isHitSearchOn = (dto.getDealLockFlag() != null && dto.getDealLockFlag() == Enums.Status
                    .DELETE_FLAG_ON.getStatus());

            // check deal is completed design or not
            isCompletedDesign = (Enums.DealStatus.DESIGN_COMPLETE.getStatus() == dto.getDealStatus());

            boolean isSameDepartment = false;
            UserDto owner = userDao.find(dto.getSalesId());
            if (owner != null && owner.getDepartmentId() != null) {
                DepartmentDto currentDepartment = departmentDao.find(owner.getDepartmentId());
                if (currentDepartment != null && currentDepartment.getId().equals(loginUserDepartmentId)) {
                    isSameDepartment = true;
                }
            }

            boolean canViewToEdit = false; // identify deal can display or not
            if (isSameDepartment || isSupporter) { // cung phong ban hoac la phong support
                canViewToEdit = true;
            } else {
                if (isHitSearchOn) { // hit search is on
                    if (isCompletedDesign) {
                        continue;
                    }
                } else { // hit search is off
                    canViewToEdit = true;
                }
            }

            if (!canViewToEdit)
                continue;

            count++;
        }

        return count;
    }

    @Override
    public DealDto getDealDtoByOrderId(Integer orderId) {
        return JPA.em().createQuery("SELECT d " +
                "FROM DealDto d INNER JOIN OrderDto o " +
                "ON d.id = o.dealId\n" +
                "WHERE o.id = :orderId", DealDto.class)
                .setParameter("orderId", orderId)
                .getSingleResult();
    }

    private TypedQuery<DealDto> createTypedQuery(final SF00205Filter filter) {
        String query = createSearchQuery(filter);
        TypedQuery<DealDto> typedQuery = JPA.em().createQuery(query, DealDto.class);

        //#2732
        // Only Deal status 1,2,3
        typedQuery.setParameter("dealStatus", Arrays.asList(Enums.DealStatus.IN_PROGRESS.getStatus(),
                                                            Enums.DealStatus.DESIGN_REQUEST_IN_PROGRESS.getStatus(),
                                                            Enums.DealStatus.DESIGN_COMPLETE.getStatus()));
        // 1.{納品日:Delivery date}, 2.{作成日Created date}
        if (filter.getFromDate() != null)
            typedQuery.setParameter("fromDate", DateUtil.getJodaDateTimeConverter().convertToDatabaseColumn(filter.getFromDate()));
        if (filter.getToDate() != null)
            typedQuery.setParameter("toDate", DateUtil.getJodaDateTimeConverter().convertToDatabaseColumn(filter.getToDate()));

        //-- DealCode vs DealName
        if (!Strings.isNullOrEmpty(filter.getDealCode()))
            typedQuery.setParameter("dealCode", filter.getDealCode());
        if (!Strings.isNullOrEmpty(filter.getDealName()))
            typedQuery.setParameter("dealName", Constants.PERCENT + Constants.EQUAL
                    + filter.getDealName().toLowerCase() + Constants.PERCENT);

        //-- CustomerCode vs CustomerName
        if (!Strings.isNullOrEmpty(filter.getCustomerCode())) {
            typedQuery.setParameter("customerCode", filter.getCustomerCode());
        }
        if (!Strings.isNullOrEmpty(filter.getCustomerName())) {
            typedQuery.setParameter("customerName", Constants.PERCENT + Constants.EQUAL
                    + filter.getCustomerName().toLowerCase() + Constants.PERCENT);
        }

        //-- department id & pic id
        //http://fridaynight.vnext.vn/issues/3240
        // show deal of all sales dept
        if (filter.getSelectedDepartmentId() != null && filter.getSelectedPicId() != null) {
            typedQuery.setParameter("type", Arrays.asList(Enums.DepartType.SALE.getType()));

            if (filter.getSelectedDepartmentId() > 0) {
                typedQuery.setParameter("departmentId", filter.getSelectedDepartmentId());
                if (filter.getSelectedPicId() > 0) {
                    typedQuery.setParameter("picId", filter.getSelectedPicId());
                }
            }
        }

        return typedQuery;
    }

    private String createSearchQuery(final SF00205Filter filter) {
        StringBuilder selectClause = new StringBuilder("SELECT d FROM DealDto d");
        StringBuilder joinClause = new StringBuilder();
        //Deal status 1,2,3,4,5 & deal already closed
        StringBuilder whereClause = new StringBuilder(" WHERE d.dealStatus IN (:dealStatus) AND d.templateFlag=0 AND d.deleteFlag=0 AND d.closedFlag<>1");
        StringBuilder orderByClause = new StringBuilder(" ORDER BY d.updatedDate DESC");

        // 1.{納品日:Delivery date}, 2.{作成日Created date}
        if (filter.getPeriodType() == 1) {
            if (filter.getFromDate() != null) {
                whereClause.append(" AND DATE(d.deliveryDate) >= :fromDate");
            }
            if (filter.getToDate() != null) {
                whereClause.append(" AND DATE(d.deliveryDate) <= :toDate");
            }
        } else {
            if (filter.getFromDate() != null) {
                whereClause.append(" AND DATE(d.createdDate) >= :fromDate");
            }
            if (filter.getToDate() != null) {
                whereClause.append(" AND DATE(d.createdDate) <= :toDate");
            }
        }

        final String escape = new StringBuilder(" ESCAPE '").append(Constants.EQUAL).append("'").toString();
        //-- DealCode vs DealName
        if (!Strings.isNullOrEmpty(filter.getDealCode())) {
            whereClause.append(" AND LOWER(d.dealCode) = :dealCode");
        }
        if (!Strings.isNullOrEmpty(filter.getDealName())) {
            whereClause.append(" AND LOWER(d.dealName) LIKE :dealName").append(escape);
        }

        //-- CustomerCode vs CustomerName
        if (!Strings.isNullOrEmpty(filter.getCustomerCode()) || !Strings.isNullOrEmpty(filter.getCustomerName())) {
            joinClause.append(" INNER JOIN CustomerDto c ON c.id = d.customerId");

            if (!Strings.isNullOrEmpty(filter.getCustomerCode())) {
                whereClause.append(" AND LOWER(c.customerCode) = :customerCode");
            }
            if (!Strings.isNullOrEmpty(filter.getCustomerName())) {
                whereClause.append(" AND LOWER(c.name) LIKE :customerName").append(escape);
            }
        }

        //-- department id & pic id
        if (filter.getSelectedDepartmentId() != null && filter.getSelectedPicId() != null) {
            joinClause.append(" INNER JOIN UserDto u ON u.id = d.salesId INNER JOIN DepartmentDto dp ON dp.id = u.departmentId");
            whereClause.append(" AND dp.type IN (:type) AND dp.mailGroupFlag = 0 ");

            if (filter.getSelectedDepartmentId() > 0) {
                whereClause.append(" AND dp.id = :departmentId");
                if (filter.getSelectedPicId() > 0) {
                    whereClause.append(" AND u.id = :picId");
                }
            }
        }

        //-- return query string
        return selectClause.append(joinClause).append(whereClause).append(orderByClause).toString();
    }

    //http://fridaynight.vnext.vn/issues/3240
    private static final String GET_ALL_DEAL_SALES =
            "SELECT d " +
                    "FROM DealDto d " +
                    " INNER JOIN UserDto u ON d.salesId = u.id " +
                    " INNER JOIN DepartmentDto de ON u.departmentId = de.id" +
                    " WHERE d.templateFlag <> 1 " +                                   // deal, not template
                    "  AND d.deleteFlag <> 1 " +                                   // not deleted
                    "  AND (d.dealStatus IN :accepted" +                            // in SF00202_ACCEPTED_DEAL_STATUS list
                    "  OR d.closedFlag = 1) " +
                    "  AND d.sourceDealId IS NULL " +
                    "  AND de.type =:type  " +  // interdepartmental
                    "ORDER BY d.updatedDate DESC";

    private static final String COUNT_ALL_DEAL_SALES =
            "SELECT COUNT(d.id)" +
                    "FROM DealDto d" +
                    " INNER JOIN UserDto u ON d.salesId = u.id " +
                    " INNER JOIN DepartmentDto de ON u.departmentId = de.id" +
                    " WHERE d.templateFlag <> 1 " +                                   // deal, not template
                    "  AND d.deleteFlag <> 1 " +                                   // not deleted
                    "  AND (d.dealStatus IN :accepted" +                            // in SF00202_ACCEPTED_DEAL_STATUS list
                    "  OR d.closedFlag = 1) " +
                    "  AND d.sourceDealId IS NULL " +
                    "  AND de.type =:type ";   // interdepartmental

    @Override
    public List<DealDto> getAllDealSales(final Integer index, final Integer limit) {
        return JPA.em().createQuery(GET_ALL_DEAL_SALES, DealDto.class)
                .setParameter("accepted", SF00202_ACCEPTED_DEAL_STATUS)
                .setParameter("type", Enums.DepartType.SALE.getType())
                .setFirstResult(index)
                .setMaxResults(limit)
                .getResultList();
    }

    @Override
    public Long countDealsSales() {
        return JPA.em().createQuery(COUNT_ALL_DEAL_SALES, Long.class)
                .setParameter("accepted", SF00202_ACCEPTED_DEAL_STATUS)
                .setParameter("type", Enums.DepartType.SALE.getType())
                .getSingleResult();
    }

    @Override
    public List<DealDto> getRepeatDealsAndOrders(int dealId) {
        String query
            = "SELECT deal, o "
            +   "FROM DealDto deal "
            +     "INNER JOIN OrderDto o ON deal.id = o.dealId "
            +   "WHERE deal.sourceDealId = :id AND deal.deleteFlag = :deleteFlag "
            +   "ORDER BY o.createdDate DESC";
        List<Object[]> result = JPA.em().createQuery(query, Object[].class)
                .setParameter("id", dealId)
                .setParameter("deleteFlag", DELETE_DISABLE)
                .getResultList();

        // 案件と注文の対応づけ
        List<DealDto> dealDtos = new ArrayList<>(result.size());
        for (Object[] tuples : result) {
            DealDto dto = (DealDto)tuples[0];
            dto.setOrder((OrderDto)tuples[1]);
            dealDtos.add(dto);
        }

        return dealDtos;
    }
}

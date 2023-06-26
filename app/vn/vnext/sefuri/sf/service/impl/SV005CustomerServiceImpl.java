package vn.vnext.sefuri.sf.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;

import com.google.inject.Inject;

import vn.vnext.sefuri.sf.dao.CustomerDao;
import vn.vnext.sefuri.sf.dao.CustomerGoalDao;
import vn.vnext.sefuri.sf.dao.CustomerGoalItemDao;
import vn.vnext.sefuri.sf.dao.DepartmentDao;
import vn.vnext.sefuri.sf.dao.RevenueDao;
import vn.vnext.sefuri.sf.dao.ShippingDestinationDao;
import vn.vnext.sefuri.sf.dao.ShippingDestinationImageDao;
import vn.vnext.sefuri.sf.dao.UserDao;
import vn.vnext.sefuri.sf.dao.impl.GenericDaoImpl;
import vn.vnext.sefuri.sf.dto.CustomerDataDto;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.CustomerGoalDto;
import vn.vnext.sefuri.sf.dto.CustomerGoalItemDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationImageDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.helper.SfrExceptionCode;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SV005CustomerServiceImpl extends GenericDaoImpl<CustomerDto> implements SV005CustomerService {

    @Inject
    private CustomerDao customerDao;

    @Inject
    private CustomerGoalItemDao customerGoalItemDao;

    @Inject
    private CustomerGoalDao customerGoalDao;

    @Inject
    private DepartmentDao departmentDao;

    @Inject
    private RevenueDao revenueDao;

    @Inject
    private UserDao userDao;

    @Inject
    private SV001AuthService authService;

    @Inject
    private ShippingDestinationDao shippingDestinationDao;

    @Inject
    private ShippingDestinationImageDao shippingDestinationImageDao;


    public SV005CustomerServiceImpl() {
        super(CustomerDto.class);
    }

    @Override
    public CustomerDto sv00501GetCustomerByCustomerId(Integer customerId) {
        return customerDao.findCustomerById(customerId);
    }

    @Override
    public CustomerGoalDto sv00502SaveCustomerGoal(CustomerGoalDto customerGoalDto) {
        customerGoalDto.setUpdatedUser(customerGoalDto.getUpdatedUser());
        customerGoalDto.setCreatedUser(customerGoalDto.getCreatedUser());
        return customerGoalDao.create(customerGoalDto);
    }

    @Override
    public boolean sv00503DeleteCustomerGoal(Integer customerGoalId) {
        List<CustomerGoalItemDto> customerGoalItemDtos = customerGoalItemDao.getCustomerGoalItems(customerGoalId);
        if (CollectionUtil.isNotEmpty(customerGoalItemDtos)) {
            // TODO: Should not use this code.
            for (CustomerGoalItemDto customerGoalItemDto : customerGoalItemDtos) {
                customerGoalItemDao.delete(customerGoalItemDto.getId());
            }
        }
        customerGoalDao.delete(customerGoalId);
        return true;
    }

    @Override
    public CustomerGoalDto sv00505UpdateCustomerGoal(CustomerGoalDto customerGoalDto) {
        return customerGoalDao.update(customerGoalDto);
    }

    @Override
    public CustomerGoalItemDto sv00506GetCustomerGoalItem(Integer id) {
        return customerGoalItemDao.find(id);
    }

    @Override
    public CustomerGoalItemDto sv00507UpdateCustomerGoalItem(CustomerGoalItemDto customerGoalItemDto) {
        return customerGoalItemDao.update(customerGoalItemDto);
    }

    @Override
    public CustomerGoalItemDto sv00508SaveCustomerGoalItem(CustomerGoalItemDto customerGoalItemDto) {
        return customerGoalItemDao.create(customerGoalItemDto);
    }

    @Override
    public List<CustomerGoalDto> sv00509GetCustomerGoalInYear(Integer depId, Integer year) {
        return customerGoalDao.getCustomerGoalInYear(depId, year);
    }

    @Override
    public List<CustomerGoalItemDto> sv00510GetCustomerGoalItems(Integer customerGoalId) {
        return customerGoalItemDao.getCustomerGoalItems(customerGoalId);
    }

    @Override
    public CustomerGoalDto sv00511GetCustomerGoalById(Integer id) {
        return customerGoalDao.find(id);
    }

    @Override
    public BigDecimal sv00512GetCustomerGoalByPicIDAndYearAndMonth(Integer year, Integer month, Integer picId) {
        return customerGoalDao.getCustomerGoalByPicIDAndYearAndMonth(picId, year, month);
    }

    @Override
    public BigDecimal sv00513GetCustomerGoalByPicIDAndYear(Integer year, Integer picId) {
        return customerGoalDao.getCustomerGoalByPicIDAndYear(picId, year);
    }


    @Override
    public void sv00514SetCustomerGoalAutomatically(Integer currentYear, Integer departmentId, Integer loginUserId) throws SfrException {
        // 1.0 Check data exist
        DepartmentDto departmentDto = departmentDao.find(departmentId);
        if (departmentDto.getType() == 0) {
            // ERROR: this is not sale department
            throw new SfrException(SfrExceptionCode.ERR_SV005_NOT_SALE_DEPARTMENT);
        }

        // 1.1 If data exist then return ERROR
        List<CustomerGoalDto> customerGoalDtos = customerGoalDao
                .getCustomerGoalByYearAndDepartmentId(departmentId, currentYear);
        if (customerGoalDtos.size() > 0) {
            // ERROR: data exist for at least one customer
            throw new SfrException(SfrExceptionCode.ERR_SV005_CUSTOMER_GOAL_DATA_EXIST);
        }

        // 1.2 Otherwise, create goal for all customer
        // 1.2.1 Get old data. CurrentMonth = 3

        DateTime endDateTime = new DateTime(currentYear, 2, 1, 0, 0);
        endDateTime = endDateTime.dayOfMonth().withMaximumValue();
        Integer lastDayOfMonth = endDateTime.getDayOfMonth();

        String startDate = String.format("%d-03-01 00:00:00", currentYear - 1);
        String endDate = String.format("%d-02-" + lastDayOfMonth + " 23:59:59", currentYear);

        List<Object[]> objects = revenueDao.getRevenuesByPicAndDepartmentInTime(startDate, endDate, departmentId);


        Map<Integer, List<CustomerDataDto>> revenueMap = new HashMap<>();

        for (Object[] object : objects) {
            CustomerDataDto customerDataDto = new CustomerDataDto();

            // Don't care about year
            customerDataDto.setYear(Integer.valueOf(object[0].toString()));

            customerDataDto.setMonth(Integer.valueOf(object[1].toString()));
            customerDataDto.setProductType(Integer.valueOf(object[2].toString()));
            customerDataDto.setCustomerId(Integer.valueOf(object[3].toString()));
            customerDataDto.setTotalMoney(new BigDecimal(object[4].toString()));
            customerDataDto.setNumberOfOrder(Integer.valueOf(object[5].toString()));

            // Key = customerId
            Integer mapKey = customerDataDto.getCustomerId();
            if (revenueMap.containsKey(mapKey)) {
                List<CustomerDataDto> customerDataDtos1 = revenueMap.get(mapKey);
                customerDataDtos1.add(customerDataDto);
            } else {
                List<CustomerDataDto> customerDataDtos1 = new ArrayList<>();
                customerDataDtos1.add(customerDataDto);
                revenueMap.put(mapKey, customerDataDtos1);
            }
        }

        // 2.0 Create New Goal
        DateTime now = DateUtil.getSysDate();
        for (Map.Entry<Integer, List<CustomerDataDto>> entry : revenueMap.entrySet()) {
            Integer key = entry.getKey();

            // 2.1 Create CustomerGoal
            CustomerGoalDto customerGoalDto = new CustomerGoalDto();
            customerGoalDto.setYear(currentYear);
            CustomerDto customerDto = customerDao.find(key);
            UserDto userDto = userDao.findUserByUserCode(customerDto.getPicCode());

            if (userDto != null) {
                customerGoalDto.setPicId(userDto.getId());
            }

            customerGoalDto.setCustomerId(key);
            customerGoalDto.setDepartmentId(departmentId);
            customerGoalDto.setCreatedDate(now);
            customerGoalDto.setUpdatedDate(now);
            customerGoalDto.setCreatedUser(loginUserId);
            customerGoalDto.setUpdatedUser(loginUserId);

            customerGoalDao.create(customerGoalDto);

            // 2.2 Create CustomerGoalItem
            boolean[][] monthCheck = new boolean[3][12];
            List<CustomerDataDto> customerDataDtos = revenueMap.get(key);
            for (CustomerDataDto cus : customerDataDtos) {
                CustomerGoalItemDto customerGoalItemDto = new CustomerGoalItemDto();
                customerGoalItemDto.setCustomerGoalId(customerGoalDto.getId());
                customerGoalItemDto.setType(cus.getProductType());
                customerGoalItemDto.setCustomerType(0);
                customerGoalItemDto.setMonth(cus.getMonth());
                customerGoalItemDto.setGoal(cus.getTotalMoney());
                customerGoalItemDto.setCreatedDate(now);
                customerGoalItemDto.setUpdatedDate(now);
                customerGoalItemDto.setCreatedUser(loginUserId);
                customerGoalItemDto.setUpdatedUser(loginUserId);

                customerGoalItemDao.create(customerGoalItemDto);

                // flag goal created
                monthCheck[cus.getProductType()][cus.getMonth() - 1] = true;
            }

            // 2.2.2 create missing CustomerGoalItem
            for (int iType = 0; iType <= 2; iType++) {
                for (int iMonth = 0; iMonth <= 11; iMonth++) {
                    if (!monthCheck[iType][iMonth]) {
                        CustomerGoalItemDto customerGoalItemDto = new CustomerGoalItemDto();
                        customerGoalItemDto.setCustomerGoalId(customerGoalDto.getId());
                        customerGoalItemDto.setType(iType);
                        customerGoalItemDto.setMonth(iMonth + 1);
                        customerGoalItemDto.setGoal(BigDecimal.ZERO);
                        customerGoalItemDto.setCustomerType(0);
                        customerGoalItemDto.setCreatedDate(now);
                        customerGoalItemDto.setUpdatedDate(now);
                        customerGoalItemDto.setCreatedUser(loginUserId);
                        customerGoalItemDto.setUpdatedUser(loginUserId);

                        customerGoalItemDao.create(customerGoalItemDto);
                    }
                }
            }
        }
    }

    @Override
    public List<CustomerDto> sv00515getCustomersByDepartment01(int departmentId) {
        return customerDao.findCustomer01ByDepartmentId(departmentId);
    }

    @Override
    public List<CustomerDto> sv00515getCustomersByDepartment(int departmentId) {
        return customerDao.findCustomerByDepartmentId(departmentId);
    }

    @Override
    public BigDecimal sv00516GetNewCustomerGoal(Integer picId, Integer financialYear) {
        return customerGoalDao.getCustomerGoalByPicIDAndYearForNewCustomer(picId, financialYear);
    }

    @Override
    public List<ShippingDestinationDto> sv00517GetShippingDestinationByCustomerId(Integer customerId) {
        if (customerId == null) {
            return Collections.emptyList();
        }
        return shippingDestinationDao.findShippingDestinationByCustomerId(customerId);
    }

    @Override
    public List<CustomerDto> getCustomerByIds(Collection<Integer> customerIds) {
        if (customerIds.isEmpty()) {
            return Collections.emptyList();
        } else {
            return customerDao.findCustomerByIds(customerIds);
        }
    }

    @Override
    public ShippingDestinationDto sv00518SaveNewShippingDestination(ShippingDestinationDto shippingDestinationDto) {

        DateTime now = DateUtil.getSysDate();
        Integer userId = authService.getCurrentUser().getId();
        // set updated/created info
        shippingDestinationDto.setCreatedUser(userId);
        shippingDestinationDto.setCreatedDate(now);
        shippingDestinationDto.setUpdatedUser(userId);
        shippingDestinationDto.setUpdatedDate(now);
        // persists and return
        return shippingDestinationDao.create(shippingDestinationDto);
    }

    @Override
    public ShippingDestinationDto sv00519GetShippingDestinationById(Integer id) {
        if (id == null) {
            return null;
        } else {
            return shippingDestinationDao.find(id);
        }
    }

    @Override
    public void sv00520RemoveShipingDestination(ShippingDestinationDto shippingDestinationDto) {
        shippingDestinationDao.delete(shippingDestinationDto.getId());
    }

    @Override
    public ShippingDestinationDto sv00521GetCustomerDefaultAddress(int customerId) {
        ShippingDestinationDto defaultShippingDestination = shippingDestinationDao.findDefaultShippingDestination(customerId);
        return defaultShippingDestination;
    }

    @Override
    public CustomerDto sv00522GetCustomerByCode(String customerCode) {
        if (StringUtils.isEmpty(customerCode)) {
            return null;
        } else {
            return customerDao.findCustomerByCode(customerCode);
        }
    }

    @Override
    public CustomerDto sv00523UpdateCustomer(CustomerDto customerDto) {
        return customerDao.update(customerDto);
    }

    @Override
    public List<CustomerGoalItemDto> sv00524GetCustomerGoalSummary(String customerCode, int year) {
        List<CustomerGoalItemDto> customerGoalItems = customerGoalItemDao.getCustomerGoalItems(customerCode, year);

        Map<Integer, CustomerGoalItemDto> summaryMap = new HashMap<>();
        for (CustomerGoalItemDto customerGoalItem : customerGoalItems) {
            Integer month = customerGoalItem.getMonth();
            BigDecimal goal = customerGoalItem.getGoal();

            CustomerGoalItemDto summaryItem = null;
            if (month == null || goal == null) {
                continue;
            } else {
                summaryItem = summaryMap.get(month);
            }
            if (summaryItem == null) {
                summaryItem = new CustomerGoalItemDto();
                summaryItem.setMonth(month);
                summaryItem.setGoal(BigDecimal.ZERO);

                summaryMap.put(month, summaryItem);
            }

            summaryItem.setGoal(summaryItem.getGoal().add(goal));
        }

        return new ArrayList<>(summaryMap.values());
    }

    @Override
    public ShippingDestinationDto sv00525GetShippingDestinationDetail(int customerId, int shippingDestinationId) {
        // 届け先詳細取得
        ShippingDestinationDto shippingDestinationDto = sv00519GetShippingDestinationById(shippingDestinationId);

        // 得意先があっているかどうか確認
        if (shippingDestinationDto == null || !Integer.valueOf(customerId).equals(shippingDestinationDto.getCustomerId())) {
            // エラー: 届け先が見つからない。または届け先の得意先 ID が異なる。
            return null;
        }

        // 画像情報
        List<ShippingDestinationImageDto> shippingDestinationImageDtoList
            = shippingDestinationImageDao.findShippingDestinationImageAndFileByShippingDestinationId(shippingDestinationId);
        shippingDestinationDto.setImageList(shippingDestinationImageDtoList);

        //
        return shippingDestinationDto;
    }

    @Override
    public void sv00526SaveShippingDestinationDetail(ShippingDestinationDto shippingDestinationDto) {
        Integer id = shippingDestinationDto.getId();

        // 届け先を保存
        shippingDestinationDao.update(shippingDestinationDto);

        // 画像情報
        List<ShippingDestinationImageDto> imageList
            = shippingDestinationDto.getImageList() != null
                ?  shippingDestinationDto.getImageList() : Collections.emptyList();

        // 不要な画像情報を消す
        Set<Integer> updateShippingDestinationImageIds
            = imageList.stream()
                .map(ShippingDestinationImageDto::getId)
                .filter(dto -> dto != null)
                .collect(Collectors.toSet());
        shippingDestinationImageDao.deleteByShippingDestinationIdExclude(id, updateShippingDestinationImageIds);

        // 画像情報の追加・更新
        imageList.forEach(shippingDestinationImageDto -> {
            shippingDestinationImageDto.setShippingDestinationId(id);
            if (shippingDestinationImageDto.getFileId() == null) {
                shippingDestinationImageDto.setFileId(shippingDestinationImageDto.getFile().getId());
            }
            if (shippingDestinationImageDto.getId() == null) {
                // 追加
                shippingDestinationImageDao.create(shippingDestinationImageDto);
            } else {
                // 更新
                shippingDestinationImageDao.update(shippingDestinationImageDto);
            }
        });
    }
}

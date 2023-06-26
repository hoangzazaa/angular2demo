package vn.vnext.sefuri.sf.service;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.CustomerGoalDto;
import vn.vnext.sefuri.sf.dto.CustomerGoalItemDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;
import vn.vnext.sefuri.sf.service.impl.SV005CustomerServiceImpl;

/**
 * Created by DungTQ on 1/4/2017.
 */

@ImplementedBy(SV005CustomerServiceImpl.class)
public interface SV005CustomerService {
    /**
     * 得意先 ID より得意先を取得する
     *
     * @param customerId 得意先 ID
     * @return 得意先 (null: みつからない)
     */
    CustomerDto sv00501GetCustomerByCustomerId(Integer customerId);

    CustomerGoalDto sv00502SaveCustomerGoal(CustomerGoalDto customerGoalDto);

    boolean sv00503DeleteCustomerGoal(Integer customerGoalId);

    /**
     * Update customer goal
     *
     * @param customerGoalDto
     * @return CustomerGoalDto
     */
    CustomerGoalDto sv00505UpdateCustomerGoal(CustomerGoalDto customerGoalDto);

    /**
     * Get customer goal item
     *
     * @param id
     * @return CustomerGoalItemDto
     */
    CustomerGoalItemDto sv00506GetCustomerGoalItem(Integer id);

    /**
     * Update customer goal item
     *
     * @param customerGoalItemDto
     * @return
     */
    CustomerGoalItemDto sv00507UpdateCustomerGoalItem(CustomerGoalItemDto customerGoalItemDto);

    /**
     * Save customer goal item
     *
     * @param customerGoalItemDto
     * @return
     */
    CustomerGoalItemDto sv00508SaveCustomerGoalItem(CustomerGoalItemDto customerGoalItemDto);

    List<CustomerGoalDto> sv00509GetCustomerGoalInYear(Integer depId, Integer year);

    List<CustomerGoalItemDto> sv00510GetCustomerGoalItems(Integer customerGoalId);

    /**
     * Get customer goal my id
     *
     * @param id
     * @return CustomerGoalDto
     */
    CustomerGoalDto sv00511GetCustomerGoalById(Integer id);

    BigDecimal sv00512GetCustomerGoalByPicIDAndYearAndMonth(Integer year, Integer month, Integer picId);

    BigDecimal sv00513GetCustomerGoalByPicIDAndYear(Integer year, Integer picId);

    void sv00514SetCustomerGoalAutomatically(Integer currentYear, Integer departmentId, Integer picId);


    /**
     * get customer by department.<br>
     *
     * @param departmentId
     * @return
     */
    List<CustomerDto> sv00515getCustomersByDepartment01(int departmentId);


    /**
     * get customer by department.<br>
     *
     * @param departmentId
     * @return
     */
    List<CustomerDto> sv00515getCustomersByDepartment(int departmentId);


    List<CustomerDto> getCustomerByIds(Collection<Integer> customerIds);

    List<ShippingDestinationDto> sv00517GetShippingDestinationByCustomerId(Integer customerId);

    BigDecimal sv00516GetNewCustomerGoal(Integer picId, Integer financialYear);

    ShippingDestinationDto sv00518SaveNewShippingDestination(ShippingDestinationDto shippingDestinationDto);

    /**
     * 届け先 ID より届け先を取得する
     *
     * @param id 届け先 ID
     * @return 届け先 (null: 見つからない)
     */
    ShippingDestinationDto sv00519GetShippingDestinationById(Integer id);

    void sv00520RemoveShipingDestination(ShippingDestinationDto shippingDestinationDto);

    ShippingDestinationDto sv00521GetCustomerDefaultAddress(int customerId);

    /**
     * 得意先コードより得意先を取得する
     *
     * @param customerCode 得意先コード
     * @return 得意先 (null: 見つからない)
     */
    CustomerDto sv00522GetCustomerByCode(String customerCode);

    CustomerDto sv00523UpdateCustomer(CustomerDto customerDto);

    List<CustomerGoalItemDto> sv00524GetCustomerGoalSummary(String customerCodee, int year);

    /**
     * 届け先詳細情報を取得する
     *
     * <p>{@link vn.vnext.sefuri.sf.service.SV005CustomerService.sv00519GetShippingDestinationById(Integer)} で得られる情報に加え、
     * 以下の情報が取得できる。
     * <ul>
     * <li>届け先担当者
     * <li>画像情報
     * </ul>
     *
     * @param customerId 得意先 ID
     * @param shippingDestinationId 届け先 ID
     * @return 届け先 (null: 見つからない/得意先 ID が異なる届け先)
     */
    ShippingDestinationDto sv00525GetShippingDestinationDetail(int customerId, int shippingDestinationId);

    /**
     * 届け先詳細情報を保存する
     *
     * <p>届け先担当者と画像情報も保存する
     *
     * @param shippingDestinationDto 届け先 (一部の要素は値が更新される可能性あり)
     */
    void sv00526SaveShippingDestinationDetail(ShippingDestinationDto shippingDestinationDto);

}

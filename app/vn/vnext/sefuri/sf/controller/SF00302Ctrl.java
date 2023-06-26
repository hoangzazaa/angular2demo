package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00302CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by VuPT on 10/25/2016.
 */
@ImplementedBy(SF00302CtrlImpl.class)
@RoleNeeded
public interface SF00302Ctrl {

    @Transactional
    Result sf0030201GetDealProduct(String dealCode, String productCode);

    @Transactional
    Result sf0030202CreateDealProduct();

    @Transactional
    Result sf0030203UpdateProduct();

    @Transactional
    Result sf0030204DuplicateProductForDeal(Integer copyType);

    @Transactional
    Result sf0030205DeleteDealProduct();

    @Transactional
    Result sf0030206CreateProductFile();

    @Transactional
    Result sf0030207UpdateProductFile();

    @Transactional
    Result sf0030208DeleteProductFile();

    @Transactional
    Result sf0030209UpdateProductOutput();

    @Transactional
    Result sf0030210UpdateProductCommonFee();

    @Transactional
    Result sf0030211UpdateOffer();

    @Transactional
    Result sf0030212UpdateProductInput();

    @Transactional
    Result sf0030213UpdateProductImposition();

    @Transactional
    Result sf0030214Download();

}

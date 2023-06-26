package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.service.impl.SV011WoodenServiceImpl;

/**
 * Created by TungNT on 1/4/2017.
 */
@ImplementedBy(SV011WoodenServiceImpl.class)
public interface SV011WoodenService {
    MstWoodenDto sv01102GetMstWoodenByCode(String woodenCode);
}

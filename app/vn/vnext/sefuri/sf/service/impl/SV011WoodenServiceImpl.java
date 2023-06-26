package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import vn.vnext.sefuri.sf.dao.WoodenDao;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.service.SV011WoodenService;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SV011WoodenServiceImpl implements SV011WoodenService {
    @Inject
    private WoodenDao woodenDao;

    @Override
    public MstWoodenDto sv01102GetMstWoodenByCode(String woodenCode) {
        return woodenDao.getWoodenByWoodenCode(woodenCode);
    }
}

package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.DealFileDaoImpl;
import vn.vnext.sefuri.sf.dto.DealFileDto;

import java.util.List;

/**
 * Created by sonnb on 11/29/16.
 */
@ImplementedBy(DealFileDaoImpl.class)
public interface DealFileDao extends GenericDao<DealFileDto> {
    /**
     * get DealFile by dealId
     *
     * @param dealId
     * @return List DealFileDto
     */
    List<DealFileDto> getDealFileByDealId(Integer dealId);

    DealFileDto getDealFile(Integer dealId, Integer fileId);
}

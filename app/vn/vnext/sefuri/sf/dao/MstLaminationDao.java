package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstLaminationDaoImpl;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;

import java.util.List;

/**
 * Created by VuPT on 5/11/2017.
 */
@ImplementedBy(MstLaminationDaoImpl.class)
public interface MstLaminationDao extends GenericDao<MstLaminationDto>{
    List<MstLaminationDto> findAll();
    MstLaminationDto getLaminationByPaperId(Integer paperId);
}

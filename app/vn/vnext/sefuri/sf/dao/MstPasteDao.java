package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstPasteDaoImpl;
import vn.vnext.sefuri.sf.dto.MstPasteDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(MstPasteDaoImpl.class)
public interface MstPasteDao extends GenericDao<MstPasteDto> {

    /**
     * find All MstPasteDto
     *
     * @return List MstPasteDto
     */
    List<MstPasteDto> findAll();
}

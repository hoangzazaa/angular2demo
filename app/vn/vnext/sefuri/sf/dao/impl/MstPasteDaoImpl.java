package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstPasteDao;
import vn.vnext.sefuri.sf.dto.MstPasteDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
public class MstPasteDaoImpl extends GenericDaoImpl<MstPasteDto> implements MstPasteDao {
    public MstPasteDaoImpl() {
        super(MstPasteDto.class);
    }

    public List<MstPasteDto> findAll() {
        return JPA.em().createQuery("SELECT mstPaste FROM MstPasteDto mstPaste", MstPasteDto.class)
                .getResultList();
    }
}

package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstShapeDao;
import vn.vnext.sefuri.sf.dto.MstShapeDto;

import java.util.List;

/**
 * Created by TungNT on 2/8/2017.
 */
public class MstShapeDaoImpl extends GenericDaoImpl<MstShapeDto> implements MstShapeDao {
    public MstShapeDaoImpl() {
        super(MstShapeDto.class);
    }

    @Override
    public List<MstShapeDto> getAllMstShape() {
        return JPA.em().createQuery("select shape From MstShapeDto shape ", MstShapeDto.class)
                .getResultList();
    }
}

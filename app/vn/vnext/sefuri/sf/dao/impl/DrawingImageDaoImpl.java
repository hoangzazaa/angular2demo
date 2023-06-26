package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.DrawingImageDao;
import vn.vnext.sefuri.sf.dto.DrawingImageDto;

import javax.persistence.Query;
import java.util.List;

/**
 * Created by TungNT on 2/8/2017.
 */
public class DrawingImageDaoImpl extends GenericDaoImpl<DrawingImageDto> implements DrawingImageDao {
    public DrawingImageDaoImpl() {
        super(DrawingImageDto.class);
    }

    @Override
    public List<DrawingImageDto> getListDrawingImageByProductId(Integer productId) {
        return JPA.em().createQuery("select draw From DrawingImageDto draw WHERE draw.productId=:productId",
                DrawingImageDto.class)
                .setParameter("productId", productId)
                .getResultList();
    }

    @Override
    public int deleteDrawingImageByProductId(Integer productId) {
        Query query = JPA.em().createQuery(
                "DELETE FROM DrawingImageDto drw WHERE drw.productId = :productId");
        return query.setParameter("productId", productId).executeUpdate();
    }
}

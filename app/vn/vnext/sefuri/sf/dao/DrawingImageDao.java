package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.DrawingImageDaoImpl;
import vn.vnext.sefuri.sf.dto.DrawingImageDto;

import java.util.List;

/**
 * Created by TungNT on 2/8/2017.
 */
@ImplementedBy(DrawingImageDaoImpl.class)
public interface DrawingImageDao extends GenericDao<DrawingImageDto> {
    List<DrawingImageDto> getListDrawingImageByProductId(Integer productId);

    int deleteDrawingImageByProductId(Integer productId);
}

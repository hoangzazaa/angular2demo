package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstPaperDaoImpl;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperPrc;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(MstPaperDaoImpl.class)
public interface MstPaperDao extends GenericDao<MstPaperDto> {

    /**
     * find All MstPaperDto
     *
     * @return List MstPaperDto
     */
    List<MstPaperDto> findAll();

    List<MstPaperDto> getCommonPaper();

    /**
     * 原紙一覧 (一般) を取得する
     *
     * @return 原紙一覧
     */
    List<MstPaperPrc> getListPaperNew_2903_Tab1();

    /**
     * 原紙一覧 (特殊) を取得する
     *
     * @return 原紙一覧
     */
    List<MstPaperPrc> getListPaperNew_2903_Tab2();

}

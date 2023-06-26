package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.MstPaperDao;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperPrc;

import javax.persistence.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by VuPT on 10/27/2016.
 */
public class MstPaperDaoImpl extends GenericDaoImpl<MstPaperDto> implements MstPaperDao {

    /** 原紙取り込みバッチユーザー ID */
    private static final Integer BATCH_USER_ID = 272;


    public MstPaperDaoImpl() {
        super(MstPaperDto.class);
    }

    public List<MstPaperDto> findAll() {
        return JPA.em().createQuery("SELECT mstPaper FROM MstPaperDto mstPaper", MstPaperDto.class)
                .getResultList();
    }

    public List<MstPaperDto> getCommonPaper() {
        return JPA.em().createQuery("SELECT mstPaper FROM MstPaperDto mstPaper " +
                "WHERE mstPaper.commonFlag = 1", MstPaperDto.class)
                .getResultList();
    }


    /** 原紙の列 (sfr_sf_mst_paper AS p) */
    private static final String paperColumnNames
        = "p.id, p.paper_name, p.weight, p.paper_material_code, p.paper_code, p.common_flag, "  // tuple[0] - tuple[5]
        + "p.material_name, p.paper_id, "                                                       // tuple[6], tuple[7]
        + "p.saga_norm_value, p.saga_head_value, "                                              // tuple[8], tuple[9]
        + "p.ono_norm_value, p.ono_head_value, "                                                // tuple[10], tuple[11]
        + "p.taku_norm_value, p.taku_head_value";                                               // tuple[12], tuple[13]
    /** 原紙照会条件 */
    private static final String paperCondition
        = "CONVERT(p.paper_material_code, unsigned) BETWEEN :startMaterialCode AND :endMaterialCode "
        +   "AND p.created_user = :batchUserId "
        +   "AND p.hidden_flag IS NULL";


    //http://fridaynight.vnext.vn/issues/2903
    @Override
    public List<MstPaperPrc> getListPaperNew_2903_Tab1() {
        // 原紙照会
        String sql = "SELECT " + paperColumnNames + " "
                    + "FROM sfr_sf_mst_paper p "
                    + "WHERE " + paperCondition + " "
                    +   "AND p.id IN (SELECT paper_id FROM sfr_sf_mst_sheet_size)";

        @SuppressWarnings("unchecked")
        List<Object[]> result = JPA.em()
                .createNativeQuery(sql)
                .setParameter("batchUserId", BATCH_USER_ID)
                .setParameter("startMaterialCode", Constants.GENERAL_PAPER_MATERIAL_CODE_START)
                .setParameter("endMaterialCode", Constants.GENERAL_PAPER_MATERIAL_CODE_END)
                .getResultList();

        // MstPaperPrc のリストに変換
        return result
                .stream()
                .map(MstPaperDaoImpl::toMstPaperPrc)
                .collect(Collectors.toList());
    }

    //http://fridaynight.vnext.vn/issues/2903
    @Override
    public List<MstPaperPrc> getListPaperNew_2903_Tab2() {
        // 原紙照会
        @SuppressWarnings("unchecked")
        List<Object[]> result = createSpecialPaperQuery(null).getResultList();

        // MstPaperPrc のリストに変換
        return result
                .stream()
                .map(MstPaperDaoImpl::toMstPaperPrc)
                .collect(Collectors.toList());
    }

    /**
     * 特殊原紙照会用 Query を生成する
     *
     * @param extra SQL に追加する SQL 分 (null: 追加 SQL なし)
     * @return Query
     */
    private static Query createSpecialPaperQuery(String extra) {
        // SQL 生成
        String sql = "SELECT " + paperColumnNames + ", "                                // tuple[0] - tuple[16]
                    +        "ss.id AS sheet_size_id, ss.width, ss.height, ss.name "    // tuple[14] - tuple[17]
                    + "FROM sfr_sf_mst_paper p INNER JOIN sfr_sf_mst_sheet_size ss on ss.paper_id = p.id "
                    + "WHERE " + paperCondition;

        if (extra != null) {
            sql = sql + ' ' + extra;
        }

        // Query 生成
        return JPA.em()
                .createNativeQuery(sql)
                .setParameter("batchUserId", BATCH_USER_ID)
                .setParameter("startMaterialCode", Constants.SPECIAL_PAPER_MATERIAL_CODE_START)
                .setParameter("endMaterialCode", Constants.SPECIAL_PAPER_MATERIAL_CODE_END);
    }


    /**
     * getListPaperNew_2903_Tab1(), getListPaperNew_2903_Tab2() で照会している内容を MstPaperPrc に変換
     *
     * @param tuple 照会結果
     * @return 変換後の MstPaperPrc
     */
    private static MstPaperPrc toMstPaperPrc(Object[] tuple) {
        MstPaperPrc mstPaperDto = new MstPaperPrc();

        // getListPaperNew_2903_Tab1(), getListPaperNew_2903_Tab2() 共通
        mstPaperDto.setId((Integer)tuple[0]);
        mstPaperDto.setPaperName((String)tuple[1]);
        mstPaperDto.setWeight((BigDecimal)tuple[2]);
        mstPaperDto.setPaperMaterialCode((String)tuple[3]);
        mstPaperDto.setPaperCode((String)tuple[4]);
        mstPaperDto.setCommonFlag((Integer)tuple[5]);
        mstPaperDto.setMaterialName((String)tuple[6]);
        mstPaperDto.setPaperId((Integer)tuple[7]);
        mstPaperDto.setSagaNormValue((BigDecimal)tuple[8]);
        mstPaperDto.setSagaHeadValue((BigDecimal)tuple[9]);
        mstPaperDto.setOnoNormValue((BigDecimal)tuple[10]);
        mstPaperDto.setOnoHeadValue((BigDecimal)tuple[11]);
        mstPaperDto.setTakuNormValue((BigDecimal)tuple[12]);
        mstPaperDto.setTakuHeadValue((BigDecimal)tuple[13]);

        // getListPaperNew_2903_Tab2() のみ
        if (tuple.length > 14) {
            mstPaperDto.setSheetSizeId((Integer)tuple[14]);
            mstPaperDto.setWidth((BigDecimal)tuple[15]);
            mstPaperDto.setHeight((BigDecimal)tuple[16]);
            mstPaperDto.setMaterialName((String)tuple[17]);
            mstPaperDto.setPaperName(mstPaperDto.getMaterialName());
        }

        return mstPaperDto;
    }
}

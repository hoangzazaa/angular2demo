package vn.vnext.sefuri.sf.module.export.helper;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

import javax.annotation.Nonnull;
import javax.inject.Inject;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums.ProductType;
import vn.vnext.sefuri.sf.common.enums.PaperName;
import vn.vnext.sefuri.sf.dao.MstPaperDao;
import vn.vnext.sefuri.sf.dao.MstSheetSizeDao;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.module.export.Paper;
import vn.vnext.sefuri.sf.util.NumberUtil;

/**
 * 原紙に関するヘルパー
 */
public class PaperHelper {

    /** サイズの x */
    private static final String X_MULTI = " × ";

    /** ロガー */
    private static final Logger logger = LoggerFactory.getLogger(PaperHelper.class);

    /** 原紙 DAO */
    @Inject
    private MstPaperDao mstPaperDao;

    /** シートサイズ DAO */
    @Inject
    private MstSheetSizeDao sheetSizeDao;




    /**
     * 商品が使用する原紙を取得する
     *
     * <p>よく使われる原紙 (モーダルで選択されていない原紙) の場合、戻り値の paperDto, sheetSizeDto は共に null になります。
     *
     * @param product 商品 (紙器)
     * @return 原紙情報
     */
    public Paper paper(@Nonnull ProductDto product) {
        // Assert
        if (ProductType.valueOf(product.getProductType()) != ProductType.PAPER) {
            throw new IllegalArgumentException("Product must be shiki.");
        }

        // 原紙とシートサイズの DTO
        boolean corruptionInfo = false;
        MstPaperDto paperDto = null;
        MstSheetSizeDto sheetSizeDto = null;

        // 原紙サイズ
        BigDecimal paperSizeW = NumberUtil.roundHalfUp(product.getPaperSizeW());
        BigDecimal paperSizeH = NumberUtil.roundHalfUp(product.getPaperSizeH());
        BigDecimal basisWeight = NumberUtil.roundHalfUp(product.getPaperWeight());

        paperSizeW = paperSizeW != null ? paperSizeW : BigDecimal.ZERO;
        paperSizeH = paperSizeH != null ? paperSizeH : BigDecimal.ZERO;
        basisWeight = basisWeight != null ? basisWeight : BigDecimal.ZERO;

        // 原紙名
        String paperDisplayName = "";
        if (!PaperName.isOthers(product.getPaperNameId())) {
            // よく使われる原紙の場合　... paperId, sheetSizeId は無視する
            PaperName paperName = PaperName.valueOf(product.getPaperNameId());
            if (paperName != null) {
                // sheetSizeId がある場合はそちらから解決
                if (product.getSheetSizeId() != null) {
                    sheetSizeDto = sheetSizeDao.find(product.getSheetSizeId());

                    // 念のため、原紙 ID とサイズを比較しておく
                    if (sheetSizeDto == null
                            || !Objects.equals(product.getPaperId(), sheetSizeDto.getPaperId())
                            || !Objects.equals(product.getPaperSizeW(), sheetSizeDto.getWidth())
                            || !Objects.equals(product.getPaperSizeH(), sheetSizeDto.getHeight())) {
                        sheetSizeDto = null;    // sheet_size_id が怪しいので使用しない
                    }
                }

                if (sheetSizeDto != null) {
                    // 原紙表示名 = シートサイズを使用する
                    paperDisplayName = sheetSizeDto.getName();
                } else {
                    // 原紙表示名 = (素材名)(坪量)g
                    paperDisplayName = paperName.getDiaplayName() + basisWeight + Constants.GRAM;
                }
                sheetSizeDto = null;
            } else {
                // 原紙名ID (paper_name_id) 不正 ... DB 不整合  原紙名は空欄とする
                corruptionInfo = true;
            }
        } else if (product.getPaperId() != null) {
            // モーダルにて原紙選択された場合
            paperDto = mstPaperDao.find(product.getPaperId());
            if (paperDto != null) {
                sheetSizeDto = resolveSheetSize(product);
                boolean exactMatch = sheetSizeDto != null && Objects.equals(sheetSizeDto.getId(), product.getSheetSizeId());

                if (!Objects.equals(product.getSpecialSizeFlag(), 1)) {
                    // 原紙サイズは DB のものが使用された場合
                    if (exactMatch) {
                        // シートサイズ ID のシートサイズが解決できた場合   (通常の場合)
                        // 原紙の表示名はシートのものを使用する    (シート名には 素材名 坪量 寸法 [<100連量>] の形式になっている)
                        paperDisplayName = StringUtils.defaultString(sheetSizeDto.getName());
                    } else {
                        // シートサイズ ID が解決できない場合
                        // 材料名と坪量、寸法より原紙名を生成する
                        paperDisplayName = paperDisplayName(paperDto, basisWeight, paperSizeW, paperSizeH);
                    }
                } else {
                    // 原紙サイズが手入力された場合
                    // 素材名と坪量、寸法より原紙名を生成する
                    paperDisplayName = paperDisplayName(paperDto, basisWeight, paperSizeW, paperSizeH);

                    // 特殊原紙の場合、シート名の情報がないと実際に使用する原紙が判別できないが、
                    // シート名に寸法が含まれているため手入力の場合には使用できない。
                    // やむをえず、素材名より原紙表示名を生成している
                }
            } else {
                // 原紙 ID が不正 ... DB 不整合  原紙名は空欄とする
                corruptionInfo = true;
            }
        } else {
            // 原紙 ID が設定されていない ... DB 不整合  原紙名は空欄とする
            corruptionInfo = true;
        }

        // 戻り値を返却する
        Paper paper = Paper.of(corruptionInfo, paperDto, sheetSizeDto, paperDisplayName, basisWeight, paperSizeW, paperSizeH);
        return paper;
    }

    /**
     * 商品よりシートサイズを解決する
     *
     * <p>紙器の製品入力画面にてモーダルで原紙を選んだ場合のみ有効
     */
    private MstSheetSizeDto resolveSheetSize(@Nonnull ProductDto product) {
        // Assertion
        Objects.requireNonNull(product.getPaperId());

        MstSheetSizeDto sheetSizeDto;

        // シートサイズ ID が存在する場合はそこから解決  (通常はここ)
        if (product.getSheetSizeId() != null) {
            sheetSizeDto = sheetSizeDao.find(product.getSheetSizeId());
            if (sheetSizeDto != null) {
                return sheetSizeDto;
            }
        }

        // paperId と原紙サイズを元に sheetSize を検索する  (サイズが手入力されたとき)
        List<MstSheetSizeDto> sheetSizeList;
        sheetSizeList = sheetSizeDao.findSheetSizeByPaperIdAndSize(product.getPaperId(), product.getPaperSizeH(), product.getPaperSizeW());
        if (!sheetSizeList.isEmpty()) {
            return sheetSizeList.get(0);        // 複数見つかった場合は最初の 1 件
        }

        // paperId を元に原紙サイズを取得して、最初に見つかったものを使用する。
        sheetSizeList = sheetSizeDao.getSheetSizeByPaperId(product.getPaperId());
        return !sheetSizeList.isEmpty() ? sheetSizeList.get(0) : null;
    }

    /**
     * 原紙、坪量、寸法より原紙表示名を生成する。
     *
     * @param paperDto 原紙情報
     * @param basisWeight 坪量 (g/㎡)
     * @param width 縦 (巾) (mm)
     * @param height 横 (mm)
     * @return 原紙表示名
     */
    private static String paperDisplayName(
            @Nonnull MstPaperDto paperDto,
            @Nonnull BigDecimal basisWeight,
            @Nonnull BigDecimal width,
            @Nonnull BigDecimal height) {
        // 表示書式は (素材名) (縦) x (横)
        return StringUtils.defaultString(paperDto.getMaterialName()) + width + X_MULTI + height;
    }

    /**
     * 特殊原紙かどうか判定する
     *
     * <p>一般原紙: sfr_sf_mst_paper で素材、坪量を選択、sfr_sf_mst_sheet_size でシートサイズを選択する。
     * <p>特殊原紙: sfr_sf_mst_paper と sfr_sf_mst_sheet_size で素材と坪量を選択する。シートサイズは一意に決まる。
     *
     * @param paper 原紙
     * @return true: 特殊原紙, false: 一般原紙/不正な素材コード
     */
    public boolean detectSpecialPaper(MstPaperDto paper) {
        // 素材コードからしか判定できない...
        int materialCode = 0;
        if (paper.getPaperMaterialCode() != null) {
            try {
                materialCode = Integer.parseInt(paper.getPaperMaterialCode());
            } catch (NumberFormatException e) {
                // Ignore  (materialCode = 0)
            }
        }

        return Constants.SPECIAL_PAPER_MATERIAL_CODE_START <= materialCode
                && materialCode <= Constants.SPECIAL_PAPER_MATERIAL_CODE_START;
    }

}

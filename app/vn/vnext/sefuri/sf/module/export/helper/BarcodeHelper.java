package vn.vnext.sefuri.sf.module.export.helper;


import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;

import vn.vnext.sefuri.sf.common.enums.BarcodeKubun;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.module.export.model.BarcodeField;

/**
 * バーコードに関するヘルパー
 */
public class BarcodeHelper {

    /**
     * 製品情報よりバーコードフィールド x 3を生成する
     *
     * @param product 製品情報
     * @return バーコードフィールドの配列 (3個)
     */
    public BarcodeField[] createBarcodeFields(@Nonnull ProductDto product) {
        final int fieldSize = 3;
        List<BarcodeField> fields = new ArrayList<>(fieldSize);
        BarcodeField field;

        // バーコード1
        field = createBarcodeField(BarcodeKubun.of(product.getSpecsBarcodeK1()), product.getSpecsBarcode1());
        if (field != BarcodeField.EMPTY) {
            fields.add(field);
        }
        // バーコード2
        field = createBarcodeField(BarcodeKubun.of(product.getSpecsBarcodeK2()), product.getSpecsBarcode2());
        if (field != BarcodeField.EMPTY) {
            fields.add(field);
        }
        // バーコード3
        field = createBarcodeField(BarcodeKubun.of(product.getSpecsBarcodeK3()), product.getSpecsBarcode3());
        if (field != BarcodeField.EMPTY) {
            fields.add(field);
        }

        // 不足分を EMPTY で埋める
        while (fields.size() < fieldSize) {
            fields.add(BarcodeField.EMPTY);
        }

        return fields.toArray(new BarcodeField[fieldSize]);
    }


    /**
     * バーコード区分と値からフィールドを生成する
     *
     * @param kubun バーコード区分
     * @param value 値
     * @return バーコードフィールド  (からの場合は BarcodeField.EMPTY を返す)
     */
    public static BarcodeField createBarcodeField(BarcodeKubun kubun, String value) {
        if (kubun != null) {
            return BarcodeField.valueOf(kubun.getDiaplayName(), StringUtils.defaultString(value));
        } else {
            return BarcodeField.EMPTY;
        }
    }
}

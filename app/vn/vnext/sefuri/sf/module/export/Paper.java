package vn.vnext.sefuri.sf.module.export;

import java.math.BigDecimal;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;

/**
 * 原紙情報
 */
public interface Paper {

    /**
     * 原紙情報にエラーが有るかどうか
     *
     * @return true: エラーあり, false: エラーなし
     */
    boolean isCorruptionInfo();

    /**
     * 原紙情報
     *
     * @return 原紙情報 (null: 原紙情報なし)
     */
    MstPaperDto getPaperDto();

    /**
     * シートサイズ情報
     *
     * @return シートサイズ情報 (null:　シートサイズ情報なし)
     */
    MstSheetSizeDto getSheetSizeDto();

    /**
     * 原紙表示名
     */
    String getDisplayName();

    /**
     * 原紙坪量 (g/㎡)
     *
     * <p>表示用に小数点以下四捨五入した値が返却される
     */
    BigDecimal getBasisWeight();

    /**
     * 原紙サイズ 縦 (巾) (mm)
     */
    BigDecimal getWidth();

    /**
     * 原紙サイズ 横 (流れ) (mm)
     */
    BigDecimal getHeight();


    /**
     * 連量 (kg)
     *
     * <p>1連 (=1,000枚) の紙の重量。
     * <p>製造仕様書に表示する連量は 100 連あたりの紙の重量 (当プロパティの 100 倍) なので注意。
     */
    default BigDecimal getReamWeight() {
        double width = getWidth().doubleValue();
        double height = getHeight().doubleValue();
        double basisWeight = getBasisWeight().doubleValue();

        return BigDecimal.valueOf(width / 1000 * height / 1000 * basisWeight / 1000);
    }


    /**
     * インスタンスを生成する
     *
     * @param corruptionInfo 原紙情報にエラーが有るかどうか (true: エラーあり, false: エラーなし)
     * @param paperDto 原紙 DTO
     * @param sheetSizeDto シートサイズ DTO
     * @param displayName 原紙表示名
     * @param basisWeight 坪量 (g/㎡)
     * @param width 縦 (mm)
     * @param height 横 (mm)
     * @return インスタンス
     */
    static Paper of(
            boolean corruptionInfo,
            MstPaperDto paperDto, MstSheetSizeDto sheetSizeDto,
            @Nonnull String displayName,
            @Nonnull BigDecimal basisWeight,
            @Nonnull BigDecimal width, @Nonnull BigDecimal height) {

        return new Paper() {
            @Override
            public boolean isCorruptionInfo() {
                return corruptionInfo;
            }

            @Override
            public MstPaperDto getPaperDto() {
                return paperDto;
            }

            @Override
            public MstSheetSizeDto getSheetSizeDto() {
                return sheetSizeDto;
            }

            @Override
            public String getDisplayName() {
                return displayName;
            }

            @Override
            public BigDecimal getBasisWeight() {
                return basisWeight;
            }

            @Override
            public BigDecimal getWidth() {
                return width;
            }

            @Override
            public BigDecimal getHeight() {
                return height;
            }

            @Override
            public String toString() {
                String corruption = isCorruptionInfo() ? "CORRUPTION, " : "";

                return "Paper["
                    + corruption
                    + "displayName=" + getDisplayName()
                    + ", basisWeight=" + getBasisWeight()
                    + ", width=" + getWidth()
                    + ", height=" + getHeight()
                    + ", reamWeight=" + getReamWeight()
                    + ']';
            }
        };
    }

}

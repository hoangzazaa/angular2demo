package vn.vnext.sefuri.sf.module.export;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import net.sf.jasperreports.engine.JRPrintPage;
import net.sf.jasperreports.engine.JasperPrint;

/**
 * Jasper に関するユーティリティ
 */
public abstract class JasperUtils {

    /**
     * 空白ページを削除する
     *
     * @param print 処理対象の JasperPrint オブジェクト (破壊的)
     */
    public static void removeBlankPage(JasperPrint print) {
        List<JRPrintPage> pages = print.getPages();

        // 空白ページ番号を抽出
        List<Integer> blankPages = new ArrayList<>(pages.size());
        for (int pageNumber = 0; pageNumber < pages.size(); ++pageNumber) {
            JRPrintPage page = pages.get(pageNumber);
            if (isBlankPage(page)) {
                blankPages.add(pageNumber);
            }
        }

        // 空白ページを削除
        Collections.reverse(blankPages);
        for (int pageNumber : blankPages) {
            print.removePage(pageNumber);
        }
    }

    /**
     * JRPrintPage が空白ページかどうか判定する
     *
     * @param page 判定対象ページ
     * @return true: 空白ページ, false: 要素あり
     */
    public static boolean isBlankPage(JRPrintPage page) {
        // 面積が 0 ではない要素が存在する => 空白ページではないと判定する
        return !page.getElements().stream().anyMatch(element -> element.getWidth() * element.getHeight() > 0);
    }

}

package vn.vnext.sefuri.sf.util;

import vn.vnext.sefuri.sf.common.Constants;

public class MailUtil {

    private static final String PLAIN_LINE_SEPARATOR = "\n";

    public static String toHTMLMail(String plainTextMail){
        return plainTextMail.replaceAll(Constants.PLAIN_TEXT_LINE_SEPARATOR, Constants.HTML_LINE_SEPARATOR);
    }

    public static String toPlainTextMail(String htmlMail){
        return htmlMail.replaceAll(Constants.HTML_LINE_SEPARATOR, Constants.PLAIN_TEXT_LINE_SEPARATOR);
    }

}

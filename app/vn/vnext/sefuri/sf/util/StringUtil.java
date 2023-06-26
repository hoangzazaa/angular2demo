package vn.vnext.sefuri.sf.util;

import org.apache.commons.lang3.StringUtils;
import vn.vnext.sefuri.sf.common.Constants;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Teddy on 8/4/2017.
 */
public class StringUtil {

    public static String escapeMysqlLikeQuery(String input) {
        // replace \
        String output = StringUtils.replace(input, "\\", "\\\\");
        // replace %
        output = StringUtils.replace(output, "%", "\\%");
        // replace _
        output = StringUtils.replace(output, "_", "\\_");

        return output;
    }

    public static String convertListToCSV(List<String> targetList){
        return String.join(Constants.COMMA, targetList);
    }

    public static List<String> convertCSVToList(String targetCSV){
        if(targetCSV == null) return null;
        String[] array = targetCSV.split(",");
        List<String> list = new ArrayList<>();
        list.addAll(Arrays.asList(array));
        return list;
    }
}

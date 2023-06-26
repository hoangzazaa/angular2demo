package vn.vnext.sefuri.sf.helper;

import vn.vnext.sefuri.sf.util.SettingUtil;

import java.text.MessageFormat;

/**
 * Created by DungTQ on 5/22/2017.
 */
public final class UrlHelper {
    private static final String SETTING_FILE = "mail";

    private static final String BASE_URL = "mail.url.base_url";
    private static final String REQUEST_DESIGN = "mail.url.request_design";
    private static final String DEAL = "mail.url.deal";
    private static final String RESET_PASSWORD = "mail.url.reset_password";
    private static final String LOGIN = "mail.url.login";

    public static final String getRequestDesignUrl(final String dealCode) {
        String template = SettingUtil.getString(SETTING_FILE, REQUEST_DESIGN);
        String params[] = {dealCode};
        return bindingParams(template, params);
    }

    public static final String getDealUrl(final String dealCode) {
        String template = SettingUtil.getString(SETTING_FILE, DEAL);
        String params[] = {dealCode};
        return bindingParams(template, params);
    }

    private static String bindingParams(String template, String[] params) {
        MessageFormat messageFormat = new MessageFormat(template);
        return messageFormat.format(params);
    }

    public static final String getResetPasswordUrl(final String token) {
        String template = SettingUtil.getString(SETTING_FILE, RESET_PASSWORD);
        String params[] = {token};
        return bindingParams(template, params);
    }

    public static final String getLoginUrl() {
        String urlLogin = SettingUtil.getString(SETTING_FILE, LOGIN);
        return urlLogin;
    }
}

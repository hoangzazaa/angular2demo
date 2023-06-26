package vn.vnext.sefuri.sf.util;

import com.google.common.base.Strings;
import vn.vnext.sefuri.sf.common.Constants;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.text.MessageFormat;
import java.util.Properties;

/**
 * Created by VuPT on 9/8/2016.
 */
public final class MessagesUtil implements Constants {
    public static String getPropertyValue(final String resourceFile, final String msgKey) {
        try {
            InputStream resourceAsStream = MessagesUtil.class.getResourceAsStream(SLASH + resourceFile);

            Properties properties = new Properties();
            properties.load(resourceAsStream);

            return properties.getProperty(msgKey);
        } catch (IOException e) {
            return BLANK;
        }
    }

    public static Properties getResource(final String resourceFile) {
        try {
            InputStream resourceAsStream = MessagesUtil.class.getResourceAsStream(SLASH + resourceFile);

            Properties properties = new Properties();
            properties.load(resourceAsStream);

            return properties;
        } catch (IOException e) {
            return null;
        }
    }

    /**
     * <p>
     * Resolve a message by a key and argument replacements.
     * </p>
     *
     * @param resourceFile as resource bundle.
     * @param key          the message to look up
     * @param params       optional message arguments
     * @return the resolved message
     * @see MessageFormat#format(String, Object...)
     **/
    public static String get(final String resourceFile, final String key, final Object... params) {
        if (Strings.isNullOrEmpty(resourceFile) || Strings.isNullOrEmpty(key))
            throw new IllegalArgumentException("Resource file and key must be not null");

        String msg = getPropertyValue(resourceFile, key.trim());
        try {
            if (!Strings.isNullOrEmpty(msg))
                msg = new String(msg.getBytes(Constants.ISO_8859_1), Constants.UTF_8);

            if (params != null && params.length > 0)
                return MessageFormat.format(msg, params);

            return msg;
        } catch (UnsupportedEncodingException e) {
            return null;
        }
    }

    public static String getPropertyUTF8(final String resourceFile, final String msgKey) {
        try {
            InputStream resourceAsStream = MessagesUtil.class.getResourceAsStream(SLASH + resourceFile);
            InputStreamReader inputStream = new InputStreamReader(resourceAsStream, Charset.forName("UTF-8"));

            Properties properties = new Properties();
            properties.load(inputStream);

            return properties.getProperty(msgKey);
        } catch (IOException e) {
            return BLANK;
        }
    }
}

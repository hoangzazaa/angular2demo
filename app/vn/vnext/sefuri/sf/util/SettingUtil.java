package vn.vnext.sefuri.sf.util;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigException;
import com.typesafe.config.ConfigFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;

/**
 * Created by Teddy on 3/31/2017.
 */
public class SettingUtil {

    private static final Logger logger = LoggerFactory.getLogger(SettingUtil.class);

    private static final String SETTING_DIR = "setting/";

    /**
     * get setting string value in setting file, by key.
     *
     * @param setting
     * @param key
     * @return null if cannot get value
     */
    public static String getString(final String setting, final String key) {
        return getString(setting, key, null);
    }

    /**
     * get setting string value in setting file, by key.
     *
     * @param setting
     * @param key
     * @param defaultValue
     * @return defaultValue if cannot get value
     */
    public static String getString(final String setting, final String key, final String defaultValue) {
        Config config = ConfigFactory.load(SETTING_DIR + setting);
        try {
            return config.getString(key);
        } catch (ConfigException ex) {
            logger.debug("read setting fail", ex);
            return defaultValue;
        }
    }

    /**
     * get setting int value in setting file, by key.
     *
     * @param setting
     * @param key
     * @return 0 if cannot get value
     */
    public static int getInt(final String setting, final String key) {
        return getInt(setting, key, 0);
    }

    /**
     * get setting int value in setting file, by key.
     *
     * @param setting
     * @param key
     * @param defaultValue
     * @return defaultValue if cannot get value
     */
    public static int getInt(final String setting, final String key, final int defaultValue) {
        Config config = ConfigFactory.load(SETTING_DIR + setting);
        try {
            return config.getInt(key);
        } catch (ConfigException ex) {
            logger.debug("read setting fail", ex);
            return defaultValue;
        }
    }

    /**
     * get setting boolean value in setting file, by key.
     *
     * @param setting
     * @param key
     * @return false if cannot get value
     */
    public static boolean getBool(final String setting, final String key) {
        return getBool(setting, key, false);
    }

    /**
     * get setting boolean value in setting file, by key.
     *
     * @param setting
     * @param key
     * @param defaultValue
     * @return defaultValue if cannot get value
     */
    public static boolean getBool(final String setting, final String key, final boolean defaultValue) {
        Config config = ConfigFactory.load(SETTING_DIR + setting);
        try {
            return config.getBoolean(key);
        } catch (ConfigException ex) {
            logger.debug("read setting fail", ex);
            return defaultValue;
        }
    }

    /**
     * get setting String list of values in setting file, by key.
     *
     * @param setting
     * @param key
     * @return EMPTY list if cannot get value
     */
    public static List<String> getStringList(final String setting, final String key) {
        return getStringList(setting, key, Collections.EMPTY_LIST);
    }

    /**
     * get setting String list of values in setting file, by key.
     *
     * @param setting
     * @param key
     * @param defaultValue
     * @return defaultValue if cannot get value
     */
    public static List<String> getStringList(final String setting, final String key, final List<String> defaultValue) {
        Config config = ConfigFactory.load(SETTING_DIR + setting);
        try {
            return config.getStringList(key);
        } catch (ConfigException ex) {
            logger.debug("read setting fail", ex);
            return defaultValue;
        }
    }
}

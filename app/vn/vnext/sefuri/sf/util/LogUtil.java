package vn.vnext.sefuri.sf.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Class util use to init logger.
 *
 * @author manhnv
 */
public final class LogUtil {
    /**
     * Method use to write log.
     *
     * @param clazz instance class
     * @param <T>   the generic class
     * @return {@link Logger} instance
     * @throws
     */
    public static <T> Logger getLogger(final Class<T> clazz) {
        if (clazz == null)
            throw new IllegalArgumentException("Generic class must be set!!!");

        return LoggerFactory.getLogger(clazz);
    }

    /**
     * IMPORTANT NOTE: Getting the correct logger without providing the class. It is an EXPENSIVE OPERATION,
     * so it should only be called from static initialization
     */
    public static Logger getLog() {
        StackTraceElement[] stackTraces = Thread.currentThread().getStackTrace();
        int i = 0;
        for (i = 0; i < stackTraces.length; i++)
            if (LogUtil.class.getName().equals(stackTraces[i].getClassName()))
                break;

        return LoggerFactory.getLogger(stackTraces[i + 1].getClassName());
    }

}

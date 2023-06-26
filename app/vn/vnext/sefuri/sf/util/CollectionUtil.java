package vn.vnext.sefuri.sf.util;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import javax.annotation.Nonnull;

/**
 * This class use to validate the collection.
 *
 * @author manhnv
 */
public final class CollectionUtil {

    /**
     * Identify the collection has no item.
     *
     * @param collection to check
     * @return true - the collection has no item; else - false.
     */
    public static boolean isEmpty(final Collection<?> collection) {
        return !isNotEmpty(collection);
    }

    /**
     * Identify the collection has item(s).
     *
     * @param collection to check
     * @return true - the collection has item(s); else - false.
     */
    public static boolean isNotEmpty(final Collection<?> collection) {
        return (collection != null && !collection.isEmpty());
    }

    /**
     * Identify the collection contains certain item.
     *
     * @param collection   provide collection
     * @param targetObject item to check
     * @return true - the collection contains certain item; else - false.
     */
    public static boolean contains(final Collection<?> collection, final Object targetObject) {
        return (isNotEmpty(collection) && collection.contains(targetObject));
    }

    /**
     * utility for safe for-each
     *
     * @param iterable input Iterable
     * @param <T>      type of iterable's items
     * @return empty Iterable if input is null, return input itself if input is safe for for-each loop
     */
    public static <T> Iterable<T> safe(Iterable<T> iterable) {
        return iterable == null ? Collections.<T>emptyList() : iterable;
    }

    /**
     * utility for safe listing
     *
     * @param list input List
     * @param <T>  type of iterable's items
     * @return empty Iterable if input is null, return input itself if input is safe for for-each loop
     */
    public static <T> List<T> safeList(List<T> list) {
        return list == null ? Collections.<T>emptyList() : list;
    }

    /**
     * 配列よりある関数によってインデックスされた map を生成する
     *
     * Enum の index を想定
     *
     * @param <T> 型
     * @param <K> キーの型
     * @param values T の配列
     * @param keyMapper キーを抽出する関数
     * @return キー → 値
     */
    public static <T, K> Map<K, T> toMap(@Nonnull T[] values, @Nonnull Function<? super T, ? extends K> keyMapper) {
        Map<K, T> map = new HashMap<>(values.length);

        for (T value : values) {
            map.put(keyMapper.apply(value), value);
        }

        return map;
    }

    /**
     * 配列よりある関数によってインデックスされた不変 map を生成する
     *
     * Enum の index を想定
     *
     * @param <T> 型
     * @param <K> キーの型
     * @param values T の配列
     * @param keyMapper キーを抽出する関数
     * @return キー → 値 (不変)
     */
    public static <T, K> Map<K, T> toUnmodifiableMap(@Nonnull T[] values, @Nonnull Function<? super T, ? extends K> keyMapper) {
        return Collections.unmodifiableMap(toMap(values, keyMapper));
    }

}

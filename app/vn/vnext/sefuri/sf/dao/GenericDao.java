package vn.vnext.sefuri.sf.dao;

import vn.vnext.sefuri.sf.dto.BaseDto;

import java.util.List;
import java.util.Map;

/**
 * Created by haipt on 9/12/2016.
 */
public interface GenericDao<T extends BaseDto> {
    long countAll(Map<String, Object> params);

    T create(T t);

    void delete(Object primaryKey);

    T find(Object primaryKey);

    T update(T t);

    void detach(T t);

    long getTotal();

    List<T> loadMoreData(Integer limit, Integer offset);

    void flush();
}

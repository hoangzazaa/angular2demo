package vn.vnext.sefuri.sf.dao.impl;

import org.joda.time.DateTime;
import play.db.jpa.JPA;
import play.mvc.Http;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.GenericDao;
import vn.vnext.sefuri.sf.dto.BaseDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;
import vn.vnext.sefuri.sf.util.LogUtil;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.util.List;
import java.util.Map;

/**
 * Created by haipt on 9/12/2016.
 */
public abstract class GenericDaoImpl<T extends BaseDto> implements GenericDao<T> {
    private T entity;
    private Class<T> clazz;

    public GenericDaoImpl(final Class<T> clazz) {
        this.clazz = clazz;
        try {
            this.entity = clazz.newInstance();
        } catch (Exception e) {
            throw new IllegalArgumentException("Instantiation exception");
        }
    }

    @Override
    public long countAll(final Map<String, Object> params) {
        EntityManager em = JPA.em();
        CriteriaBuilder qb = em.getCriteriaBuilder();
        CriteriaQuery<Long> cq = qb.createQuery(Long.class);
        cq.select(qb.count(cq.from(Object.class)));

        return em.createQuery(cq).getSingleResult();
    }

    @Override
    public T create(final T t) {
        DateTime dateTime = DateUtil.getSysDate();
        UserDto currentUser = getLogInUser();
        if (currentUser != null) { // set created user & updated user
            t.setCreatedUser(currentUser.getId());
            t.setUpdatedUser(currentUser.getId());
        }

        // set created date & updated date
        t.setCreatedDate(dateTime);
        t.setUpdatedDate(dateTime);

        JPA.em().persist(t);

        return t;
    }

    @Override
    public void delete(final Object primaryKey) {
        JPA.em().remove(JPA.em().getReference(clazz, primaryKey));
    }

    @Override
    public T find(final Object primaryKey) {
        return (T) JPA.em().find(clazz, primaryKey);
    }

    @Override
    public T update(final T t) {
        UserDto currentUser = getLogInUser();
        if (currentUser != null) // only update updated user
            t.setUpdatedUser(currentUser.getId());

        // only update updated date
        t.setUpdatedDate(DateUtil.getSysDate());

        return JPA.em().merge(t);
    }

    @Override
    public void detach(final T t) {
        JPA.em().detach(t);
    }

    @Override
    public long getTotal() {
        String query = "select count(p) from " + entity.getClass().getSimpleName() + " p";

        return JPA.em().createQuery(query, Long.class).getSingleResult();
    }

    @Override
    public List<T> loadMoreData(final Integer limit, final Integer offset) {
        String query = "select p from " + entity.getClass().getSimpleName() + " p";

        return JPA.em().createQuery(query).setFirstResult(offset).setMaxResults(limit).getResultList();
    }

    /**
     * Get the resultList, return its only element or null.
     *
     * @param query refer {@link TypedQuery}
     * @return the single element if query return more than one, else return null.
     */
    public T getSingleResultOrNull(final TypedQuery<T> query) {
        if (query == null) {
            final String errMsg = "TypedQuery cannot be null...";
            LogUtil.getLogger(GenericDaoImpl.class).error(errMsg);
            throw new IllegalArgumentException(errMsg);
        }

        query.setMaxResults(1);
        List<T> resultList = query.getResultList();
        if (CollectionUtil.isNotEmpty(resultList))
            return resultList.get(0);

        return null;
    }

    private UserDto getLogInUser() {
        // Get logged in user from session
        Object user = Http.Context.current().args.get(Constants.SESSION_USER);
        if (user != null)
            return (UserDto) user;

        return null;
    }

    @Override
    public void flush() {
        JPA.em().flush();
    }
}

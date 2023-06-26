package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.DepartmentSupportDao;
import vn.vnext.sefuri.sf.dto.DepartmentSupportDto;

import java.util.List;

public class DepartmentSupportDaoImpl extends GenericDaoImpl<DepartmentSupportDto> implements DepartmentSupportDao {

    public DepartmentSupportDaoImpl() {
        super(DepartmentSupportDto.class);
    }

    @Override
    public DepartmentSupportDto getDepartmentSupport(final Integer departmentId, final Integer emailType) {
        final String query = "SELECT ds FROM DepartmentSupportDto ds WHERE ds.departmentId = :departmentId" +
                " AND ds.emailType = :emailType";
        List<DepartmentSupportDto> departmentDtoList = JPA.em()
                .createQuery(query, DepartmentSupportDto.class)
                .setParameter("departmentId", departmentId)
                .setParameter("emailType", emailType)
                .getResultList();

        if (departmentDtoList.size() == 0) return null;

        return departmentDtoList.get(0);
    }
}

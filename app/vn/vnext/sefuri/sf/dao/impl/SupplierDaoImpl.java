package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.SupplierDao;
import vn.vnext.sefuri.sf.dto.SupplierDto;

import javax.persistence.TypedQuery;

public class SupplierDaoImpl extends GenericDaoImpl<SupplierDto> implements SupplierDao {

    public SupplierDaoImpl() {
        super(SupplierDto.class);
    }

    @Override
    public SupplierDto findSupplierByCode(String code) {

        String query = "SELECT s FROM SupplierDto s WHERE s.supplierCode = :code";

        TypedQuery<SupplierDto> cQuery = JPA.em().createQuery(query, SupplierDto.class).setParameter("code", code);

        return getSingleResultOrNull(cQuery);
    }
}

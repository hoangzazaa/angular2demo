package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.DealFileDao;
import vn.vnext.sefuri.sf.dto.DealFileDto;

import java.util.List;

/**
 * Created by sonnb on 11/29/16.
 */
public class DealFileDaoImpl extends GenericDaoImpl<DealFileDto> implements DealFileDao {
    public DealFileDaoImpl() {
        super(DealFileDto.class);
    }

    @Override
    public List<DealFileDto> getDealFileByDealId(Integer dealId) {
        String query =
                "SELECT DISTINCT df FROM DealFileDto df " +
                        "WHERE df.dealId=:dealId " +
                        "ORDER BY df.createdDate DESC";
        return JPA.em().createQuery(query, DealFileDto.class)
                .setParameter("dealId", dealId)
                .getResultList();
    }

    @Override
    public DealFileDto getDealFile(final Integer dealId, final Integer fileId) {
        String query = "SELECT DISTINCT df FROM DealFileDto df WHERE df.dealId=:dealId AND df.fileId=:fileId";
        return JPA.em().createQuery(query, DealFileDto.class)
                .setParameter("dealId", dealId)
                .setParameter("fileId", fileId)
                .setMaxResults(1).getSingleResult();
    }
}

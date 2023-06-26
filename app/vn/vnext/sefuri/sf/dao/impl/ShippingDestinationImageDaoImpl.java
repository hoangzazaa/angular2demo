package vn.vnext.sefuri.sf.dao.impl;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Query;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.ShippingDestinationImageDao;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.ShippingDestinationImageDto;

/**
 * 届け先画像情報テーブルに関する DAO 実装
 *
 * Table: sfr_sf_shipping_destination_file
 */
public class ShippingDestinationImageDaoImpl extends GenericDaoImpl<ShippingDestinationImageDto> implements ShippingDestinationImageDao {

    public ShippingDestinationImageDaoImpl() {
        super(ShippingDestinationImageDto.class);
    }

    @Override
    public List<ShippingDestinationImageDto> findShippingDestinationImageByShippingDestinationId(
            int shippingDestinationId) {
        List<ShippingDestinationImageDto> result = JPA.em()
                .createQuery("SELECT sdi FROM ShippingDestinationImageDto sdi"
                        + " WHERE sdi.shippingDestinationId = :shippingDestinationId "
                        + " ORDER BY sdi.displayOrder",
                        ShippingDestinationImageDto.class)
                .setParameter("shippingDestinationId", shippingDestinationId)
                .getResultList();

        return result;
    }

    @Override
    public List<ShippingDestinationImageDto> findShippingDestinationImageAndFileByShippingDestinationId(
            int shippingDestinationId) {
        List<Object[]> result = JPA.em()
                .createQuery("SELECT sdi, f "
                        + " FROM ShippingDestinationImageDto sdi "
                        +   " INNER JOIN FileDto f ON sdi.fileId = f.id "
                        + " WHERE sdi.shippingDestinationId = :shippingDestinationId "
                        + " ORDER BY sdi.displayOrder",
                        Object[].class)
                .setParameter("shippingDestinationId", shippingDestinationId)
                .getResultList();

        // setFile して返す
        return result.stream()
                .map(tuple -> {
                    ShippingDestinationImageDto dto = (ShippingDestinationImageDto)tuple[0];
                    FileDto fileDto = (FileDto)tuple[1];
                    dto.setFile(fileDto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteByShippingDestinationIdExclude(int shippingDestinationId,
            Collection<Integer> shippingDestinationImageIds) {
        // クエリ生成
        StringBuilder sql = new StringBuilder()
                .append("DELETE FROM ShippingDestinationImageDto ")
                .append(" WHERE shippingDestinationId = :shippingDestinationId ");
        if (!shippingDestinationImageIds.isEmpty()) {
            sql.append("    AND id NOT IN :shippingDestinationImageIds");
        }

        Query query = JPA.em().createQuery(sql.toString())
                .setParameter("shippingDestinationId", shippingDestinationId);
        if (!shippingDestinationImageIds.isEmpty()) {
            query.setParameter("shippingDestinationImageIds", shippingDestinationImageIds);
        }

        // 実行
        query.executeUpdate();
    }

}

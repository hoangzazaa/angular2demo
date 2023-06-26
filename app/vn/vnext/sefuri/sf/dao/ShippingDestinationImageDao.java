package vn.vnext.sefuri.sf.dao;

import java.util.Collection;
import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dao.impl.ShippingDestinationImageDaoImpl;
import vn.vnext.sefuri.sf.dto.ShippingDestinationImageDto;


/**
 * 届け先画像情報テーブルに関する DAO
 *
 * Table: sfr_sf_shipping_destination_file
 */
@ImplementedBy(ShippingDestinationImageDaoImpl.class)
public interface ShippingDestinationImageDao extends GenericDao<ShippingDestinationImageDto> {

    /**
     * 届け先 ID より届け先画像リストを取得する
     *
     * @param shippingDestinationId 届け先 ID
     * @return 届け先画像のリスト (表示順)
     */
    List<ShippingDestinationImageDto> findShippingDestinationImageByShippingDestinationId(int shippingDestinationId);

    /**
     * 届け先 ID より届け先画像リストを取得する。ファイル FileDto も同時に解決される。
     *
     * @param shippingDestinationId 届け先 ID
     * @return 届け先画像のリスト (表示順)
     */
    List<ShippingDestinationImageDto> findShippingDestinationImageAndFileByShippingDestinationId(int shippingDestinationId);

    /**
     * 届け先 ID より指定された届け先画像情報 ID 以外の画像情報を削除する
     *
     * @param shippingDestinationId 届け先 ID
     * @param shippingDestinationImageIds 届け先画像情報 ID のコレクション (空が指定された場合は shippingDestinationId の画像情報が全て削除される。)
     */
    void deleteByShippingDestinationIdExclude(int shippingDestinationId, Collection<Integer> shippingDestinationImageIds);

}

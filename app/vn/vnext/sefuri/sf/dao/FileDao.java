package vn.vnext.sefuri.sf.dao;

import java.util.Collection;
import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dao.impl.FileDaoImpl;
import vn.vnext.sefuri.sf.dto.FileDto;

/**
 * Created by manhnv on 1/5/2017.
 */
@ImplementedBy(FileDaoImpl.class)
public interface FileDao extends GenericDao<FileDto> {
    List<FileDto> getFileByModudleTypeAndProductId(Integer productId, Enums.ModuleType moduleType);

    FileDto getFileByFileCode(String fileCode);

    /**
     *　ファイル ID 複数からファイルを取得する
     *
     * @param ids ファイル ID のコレクション
     * @return ファイルのリスト (順不同)
     */
    List<FileDto> getFileByIds(Collection<Integer> ids);

}

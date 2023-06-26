package vn.vnext.sefuri.sf.dao.impl;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dao.FileDao;
import vn.vnext.sefuri.sf.dto.FileDto;

/**
 * Created by manhnv on 1/5/2017.
 */
public class FileDaoImpl extends GenericDaoImpl<FileDto> implements FileDao {
    public FileDaoImpl() {
        super(FileDto.class);
    }

    @Override
    public List<FileDto> getFileByModudleTypeAndProductId(Integer productId, Enums.ModuleType moduleType) {
        List<FileDto> fileDtos = JPA.em().createQuery("select fileDto " +
                "from FileDto fileDto " +
                "INNER JOIN ProductFileDto productFileDto ON productFileDto.fileId = fileDto.id " +
                "INNER JOIN ProductDto product ON product.id = productFileDto.productId " +
                "AND product.id = :productId " +
                "AND productFileDto.type = :productFileType", FileDto.class)
                .setParameter("productId", productId)
                .setParameter("productFileType", moduleType.getCode())
                .getResultList();

        return fileDtos;
    }

    @Override
    public FileDto getFileByFileCode(String fileCode) {
        List<FileDto> fileDtos = JPA.em().createQuery("select fileDto " +
                "from FileDto fileDto " +
                "where fileDto.fileCode = :fileCode", FileDto.class)
                .setParameter("fileCode", fileCode)
                .getResultList();
        if (fileDtos.size() > 0) {
            return fileDtos.get(0);
        }
        return null;
    }

    @Override
    public List<FileDto> getFileByIds(Collection<Integer> ids) {
        if (ids.isEmpty()) {
            return Collections.emptyList();
        }

        List<FileDto> fileDtos = JPA.em().createQuery("select fileDto " +
                "from FileDto fileDto " +
                "where fileDto.id IN :ids", FileDto.class)
                .setParameter("ids", ids)
                .getResultList();
        return fileDtos;
    }

}

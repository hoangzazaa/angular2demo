package vn.vnext.sefuri.sf.json.SF00302.model;

import vn.vnext.sefuri.sf.dto.ProductDto;

import java.util.List;

/**
 * Created by ASUS on 7/14/2017.
 */
public class DataModel {

    List<MstLaminationJson> mstLaminationJsons;

    List<MstPaperJson> mstPaperJsons;

    ProductDto productDto;

    public List<MstLaminationJson> getMstLaminationJsons() {
        return mstLaminationJsons;
    }

    public void setMstLaminationJsons(List<MstLaminationJson> mstLaminationJsons) {
        this.mstLaminationJsons = mstLaminationJsons;
    }

    public List<MstPaperJson> getMstPaperJsons() {
        return mstPaperJsons;
    }

    public void setMstPaperJsons(List<MstPaperJson> mstPaperJsons) {
        this.mstPaperJsons = mstPaperJsons;
    }

    public ProductDto getProductDto() {
        return productDto;
    }

    public void setProductDto(ProductDto productDto) {
        this.productDto = productDto;
    }
}

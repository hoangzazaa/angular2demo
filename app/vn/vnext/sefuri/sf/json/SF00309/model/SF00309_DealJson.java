package vn.vnext.sefuri.sf.json.SF00309.model;

import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.json.common.DealInfoJson;

public class SF00309_DealJson extends DealInfoJson {
    @Override
    public DealDto getModel() {
        return null;
    }

    @Override
    public void setModel(DealDto dto) {
        if (dto != null) {
            super.setData(dto);

            this.dealCode = dto.getDealCode();
            this.dealName = dto.getDealName();
            this.dealType = dto.getDealType();
            this.deliveryDate = dto.getDeliveryDate();
            this.dealStatus = dto.getDealStatus();
            this.estTotalDeal = dto.getEstTotalDeal();
            this.templateFlag = dto.getTemplateFlag();
            this.closedFlag = dto.getClosedFlag();
            this.salerId = dto.getSalesId();
            this.customerId = dto.getCustomerId();
        }
    }

}

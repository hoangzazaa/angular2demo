package vn.vnext.sefuri.sf.json.SFN0402.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.SFN0402.model.MailJson;
import vn.vnext.sefuri.sf.json.SFN0402.model.PartnerJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN040201Res extends AbstractJson {

    @JsonProperty("partner")
    private PartnerJson partnerJson;
    @JsonProperty("now")
    private DateTime now;
    @JsonProperty("productDisposalMail")
    private MailJson productDisposalMail;
    @JsonProperty("woodenReturnMail")
    private MailJson woodenReturnMail;
    @JsonProperty("woodenPendingMail")
    private MailJson woodenPendingMail;

    public PartnerJson getPartnerJson() {
        return partnerJson;
    }

    public void setPartnerJson(PartnerJson partnerJson) {
        this.partnerJson = partnerJson;
    }

    public DateTime getNow() {
        return now;
    }

    public void setNow(DateTime now) {
        this.now = now;
    }

    public MailJson getProductDisposalMail() {
        return productDisposalMail;
    }

    public void setProductDisposalMail(MailJson productDisposalMail) {
        this.productDisposalMail = productDisposalMail;
    }

    public MailJson getWoodenReturnMail() {
        return woodenReturnMail;
    }

    public void setWoodenReturnMail(MailJson woodenReturnMail) {
        this.woodenReturnMail = woodenReturnMail;
    }

    public MailJson getWoodenPendingMail() {
        return woodenPendingMail;
    }

    public void setWoodenPendingMail(MailJson woodenPendingMail) {
        this.woodenPendingMail = woodenPendingMail;
    }
}

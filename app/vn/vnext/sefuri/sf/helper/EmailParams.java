package vn.vnext.sefuri.sf.helper;

/**
 * Created by DungTQ on 3/15/2017.
 */
public class EmailParams {
    public enum QuotationEmailTemplateEnum {
        INVOICE_PIC(0), SALER_NAME(1), DEAL_NAME(2), INVOICE_DELIVERY_DATE(3), EST_DATE(5);
        public int value;

        QuotationEmailTemplateEnum(int _value) {
            this.value = _value;
        }
    }

    public enum DealEmailTemplateEnum {
        SALER_NAME(0), DEAL_CODE(1), DEAL_NAME(2), CUSTOMER_CODE(3), CUSTOMER_NAME(4), DELIVERY_DATE(5),DELIVERY_INFO_URL(6);
        public int value;

        DealEmailTemplateEnum(int _value) {
            this.value = _value;
        }
    }

    public enum DealEmailTemplateEnumSubject {
        DEAL_CODE(0);
        public int value;

        DealEmailTemplateEnumSubject(int _value) {
            this.value = _value;
        }
    }
}

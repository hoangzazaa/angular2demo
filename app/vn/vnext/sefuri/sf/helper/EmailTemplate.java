package vn.vnext.sefuri.sf.helper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.vnext.sefuri.sf.controller.impl.SF00301CtrlImpl;
import vn.vnext.sefuri.sf.util.MessagesUtil;

import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;

/**
 * Created by DungTQ on 3/14/2017.
 */
public class EmailTemplate {
    private static Logger logger = LoggerFactory.getLogger(EmailTemplate.class);
    public static final String QUOTATION_EMAIL_TEMPLATE = "QUOTATION";

    private static final String RESOURCE_FILE_NAME = "template/mail_template.properties";
    private static final String ISO_CHARSET_NAME = "ISO-8859-1";
    private static final String UTF8_CHARSET_NAME = "UTF-8";

    public static String getEmailTemplate(String mailType) throws UnsupportedEncodingException {
        if (QUOTATION_EMAIL_TEMPLATE.equals(mailType)) {
            String value = MessagesUtil.getPropertyValue("template/mail_template.properties", "QUOTATION_TEMPLATE");
            return new String(value.getBytes("ISO-8859-1"), "UTF-8");
        } else {
            String value = MessagesUtil.getPropertyValue("template/mail_template.properties", "ORDER_TEMPLATE");
            return new String(value.getBytes("ISO-8859-1"), "UTF-8");
        }
    }

    public static String getEmailTemplate(Type mailType, Object... params) {
        return MessagesUtil.get(RESOURCE_FILE_NAME, mailType.getMessageKey(), params);
    }

    public static String getEMailSubject(Type mailType, Object... params) {
        return MessagesUtil.get(RESOURCE_FILE_NAME, mailType.getSubjectKey(), params);
    }

    public static String parseEmail(String mailType, String[] params) throws UnsupportedEncodingException {
        String template = getEmailTemplate(mailType);
        MessageFormat messageFormat = new MessageFormat(template);
        return messageFormat.format(params);
    }

    public enum Type {
        ERROR(0, "ERROR_MESSAGE_BODY", "ERROR_MESSAGE_SUBJECT"),
        QUOTATION(1, "QUOTATION_TEMPLATE", ""),
        DESIGN(2, "DESIGN_REQUEST_BODY", "DESIGN_REQUEST_SUBJECT"),
        NORMAL_SAMPLE(3, "NORMAL_SAMPLE_REQUEST_BODY", "NORMAL_SAMPLE_REQUEST_SUBJECT"),
        PACKAGED_SAMPLE(4, "PACKAGED_SAMPLE_REQUEST_BODY", "PACKAGED_SAMPLE_REQUEST_SUBJECT"),
        LAYOUT(5, "LAYOUT_REQUEST_BODY", "LAYOUT_REQUEST_SUBJECT"),
        PASTE_UP(6, "PASTE_UP_REQUEST_BODY", "PASTE_UP_REQUEST_SUBJECT"),
        DUMMY(7, "DUMMY_REQUEST_BODY", "DUMMY_REQUEST_SUBJECT");


        Type(int requestType, String messageKey, String subjectKey){
            this.requestType = requestType;
            this.messageKey = messageKey;
            this.subjectKey = subjectKey;
        }

        private final int requestType;
        private final String messageKey;
        private final String subjectKey;

        public String getMessageKey(){
            return messageKey;
        }
        public String getSubjectKey(){
            return subjectKey;
        }
        public boolean isError(){
            return requestType < 1;
        }

        public static Type find(int requestType){
            for(Type type : Type.values()){
                if(type.requestType == requestType){
                    return type;
                }
            }
            return ERROR;
        }
    }
}

package vn.vnext.sefuri.sf.helper;

import com.google.common.base.Strings;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.LogUtil;
import vn.vnext.sefuri.sf.util.SettingUtil;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.mail.*;
import javax.mail.internet.*;
import javax.mail.util.ByteArrayDataSource;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import static vn.vnext.sefuri.sf.util.CollectionUtil.safe;

/**
 * Created by DungTQ on 3/14/2017.
 */
public class SfrMailService {
    private static final String SETTING_FILE = "mail";
    private static Properties properties = new Properties();
    private static Logger logger = LogUtil.getLog();
    private static String isAuth;
    private static String username;
    private static String password;
    private static Boolean filterEnable;
    private static List<String> whiteList;

    static {/*init properties*/
        properties.setProperty(EmailConfigConst.MAIL_SMTP_HOST,
                SettingUtil.getString(SETTING_FILE, EmailConfigConst.MAIL_SMTP_HOST));
        properties.setProperty(EmailConfigConst.MAIL_SMTP_PORT,
                SettingUtil.getString(SETTING_FILE, EmailConfigConst.MAIL_SMTP_PORT));
        properties.setProperty(EmailConfigConst.MAIL_SMTP_AUTHENTICATION,
                SettingUtil.getString(SETTING_FILE, EmailConfigConst.MAIL_SMTP_AUTHENTICATION));
        properties.setProperty(EmailConfigConst.MAIL_SMTP_USERNAME,
                SettingUtil.getString(SETTING_FILE, EmailConfigConst.MAIL_SMTP_USERNAME));
        properties.setProperty(EmailConfigConst.MAIL_SMTP_PASSWORD,
                SettingUtil.getString(SETTING_FILE, EmailConfigConst.MAIL_SMTP_PASSWORD));
        properties.setProperty(EmailConfigConst.MAIL_SMTP_SOCKET_FACTORY_CLASS,
                SettingUtil.getString(SETTING_FILE, EmailConfigConst.MAIL_SMTP_SOCKET_FACTORY_CLASS));
        properties.setProperty(EmailConfigConst.MAIL_SMTP_SOCKET_FACTORY_PORT,
                SettingUtil.getString(SETTING_FILE, EmailConfigConst.MAIL_SMTP_SOCKET_FACTORY_PORT));
    }

    static {/*check authentication & username & password*/
        isAuth = properties.getProperty(EmailConfigConst.MAIL_SMTP_AUTHENTICATION);
        username = properties.getProperty(EmailConfigConst.MAIL_SMTP_USERNAME);
        password = properties.getProperty(EmailConfigConst.MAIL_SMTP_PASSWORD);
    }

    public static boolean isFilterEnabled() {
        if (filterEnable == null) {
            filterEnable = SettingUtil.getBool(SETTING_FILE, EmailConfigConst.MAIL_FILTER_ENABLED, true);
        }
        return filterEnable;
    }

    public static List<String> getWhiteList() {
        if (whiteList == null) {
            whiteList = SettingUtil.getStringList(SETTING_FILE, EmailConfigConst.MAIL_FILTER_LIST);
        }
        return whiteList;
    }

    /**
     * Sends an email message with no attachments.
     *
     * @param recipients the recipients of the message.
     * @param subject    subject header field.
     * @param text       content of the message.
     * @throws MessagingException
     * @throws IOException
     * @throws SfrException
     */
    public static void send(List<String> recipients, List<String> cc, String subject, String text)
            throws MessagingException, IOException, SfrException {
        send(null, null, recipients, cc, subject, text, null, null, null);
    }

    /**
     * Sends an email message with no attachments.
     * @param senderName
     * @param senderEmail
     * @param recipients the recipients of the message.
     * @param subject    subject header field.
     * @param text       content of the message.
     * @throws MessagingException
     * @throws IOException
     * @throws SfrException
     */
    public static void send(String senderName, String senderEmail, List<String> recipients, List<String> cc, String subject, String text)
            throws MessagingException, IOException, SfrException {
        send(senderName, senderEmail, recipients, cc, subject, text, null, null, null);
    }

    /**
     * Sends an email message to one recipient with one attachment.
     *
     * @param recipient  the recipients of the message.
     * @param subject    subject header field.
     * @param text       content of the message.
     * @param attachment attachment to be included with the message.
     * @param fileName   file name of the attachment.
     * @param mimeType   mime type of the attachment.
     * @throws MessagingException
     * @throws IOException
     * @throws SfrException
     */
    public static void send(String recipient, String cc, String subject, String text, InputStream attachment,
                            String fileName, String mimeType)
            throws MessagingException, IOException, SfrException {
        send(null, null, Arrays.asList(recipient), Arrays.asList(cc), subject, text, Arrays.asList(attachment), Arrays.asList(fileName),
                Arrays.asList(mimeType));
    }

    /**
     * Sends an email message with attachments.
     *
     * @param recipients  array of strings containing the recipients of the message.
     * @param subject     subject header field.
     * @param text        content of the message.
     * @param attachments attachments to be included with the message.
     * @param fileNames   file names for each attachment.
     * @param mimeTypes   mime types for each attachment.
     * @throws MessagingException
     * @throws IOException
     * @throws SfrException
     */
    public static void send(String senderName, String senderEmail, List<String> recipients, List<String> cc, String subject, String text,
                            List<InputStream> attachments, List<String> fileNames, List<String> mimeTypes)
            throws MessagingException, IOException, SfrException {
        // check for null references
        if (CollectionUtil.isEmpty(recipients)) {
            logger.error("send: RECIPIENTS is empty!");
            throw new SfrException(SfrExceptionCode.ERR_SV017_RECIPIENTS_EMPTY);
        }

        // a message with attachments consists of several parts in a multipart
        MimeMultipart multipart = new MimeMultipart();

        // create text part
        MimeBodyPart textPart = new MimeBodyPart();
        textPart.setText(text, Constants.UTF_8, "html");

        // add the text part to the multipart
        multipart.addBodyPart(textPart);

        // create attachment parts if required
        if (attachments != null) {
            // check that attachment and fileNames arrays sizes match
            if (attachments.size() != fileNames.size() || attachments.size() != mimeTypes.size()) {
                logger.error("send: attachment and fileNames arrays sizes and mimeTypes are not match");
                throw new SfrException(SfrExceptionCode.ERR_SV017_MISSING_ATTACH_FILES);
            }

            // create parts and add them to the multipart
            for (int i = 0; i < attachments.size(); i++) {
                // create a data source to wrap the attachment and its mime type
                ByteArrayDataSource dataSource = new ByteArrayDataSource(attachments.get(i), mimeTypes.get(i));

                // create a dataHandler wrapping the data source
                DataHandler dataHandler = new DataHandler(dataSource);

                // create a body part for the attachment and set its data handler and file name
                MimeBodyPart attachmentPart = new MimeBodyPart();
                attachmentPart.setDataHandler(dataHandler);

                // .png,.pdf,.jpg,.gif,.zip
                String fileNameExt = getFullFileNameExt(fileNames.get(i), mimeTypes.get(i).toLowerCase());
                attachmentPart.setFileName(fileNameExt);

                // add the body part to the multipart
                multipart.addBodyPart(attachmentPart);

                // close stream
                attachments.get(i).close();
            }
        }

        // send mail
        send(senderName, senderEmail, recipients, cc, subject, multipart);
    }

    private static String encodeFileName(final String fileName) throws UnsupportedEncodingException {
        return MimeUtility.encodeText(fileName, Constants.UTF_8, null);
    }

    private static Session getSession() {
        Session session = null;
        if (Enums.BooleanType.TRUE.getValue().equals(isAuth) && username != null && password != null) {
            // identity authentication
            Authenticator auth = new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            };

            session = Session.getInstance(properties, auth);
        } else {
            // send the message without authenticate
            session = Session.getInstance(properties, null);
        }
        //session.setDebug(true);

        return session;
    }

    private static void send(final String senderName, String senderEmail, final List<String> recipients, final List<String> cc, final String subject,
                             final MimeMultipart multipart) throws MessagingException, UnsupportedEncodingException {
        play.Logger.debug("Start send mail.");

        // Add filter feature
        List<String> rcpts = new ArrayList<>();
        List<String> ccs = new ArrayList<>();
        if (isFilterEnabled()) {
            List<String> whiteList = getWhiteList();
            for (String recipient : safe(recipients)) {
                if (whiteList.contains(recipient)) {
                    rcpts.add(recipient);
                }
            }
            for (String recipient : safe(cc)) {
                if (whiteList.contains(recipient)) {
                    ccs.add(recipient);
                }
            }
            if (rcpts.isEmpty()) {
                // stop send mail if no receipt
                return;
            }
        } else {
            rcpts = recipients;
            ccs = cc;
        }

        play.Logger.debug("Finish filtering.");

        // create a Session instance specifying the system properties
        Session session = getSession();

        play.Logger.debug("Get Session.");

        // create a message instance associated to the session
        MimeMessage message = new MimeMessage(session);
        // configure from address, add recipients, and set the subject of the message
        if(StringUtils.isEmpty(senderEmail)) {
            message.setFrom(username);
            play.Logger.debug("from : {}", username);
        } else {
            message.setFrom(new InternetAddress(senderEmail, senderName));
            play.Logger.debug("from : {}", new InternetAddress(senderEmail, senderName).toString());
        }

        // set the multipart as content for the message
        message.setContent(multipart);

        // add recipients
        play.Logger.debug("to   : {}", rcpts.toString());
        message.addRecipients(Message.RecipientType.TO, String.join(Constants.COMMA, rcpts));

        if (CollectionUtil.isNotEmpty(ccs)){
            play.Logger.debug("cc   : {}", ccs.toString());
            message.addRecipients(Message.RecipientType.CC, String.join(Constants.COMMA, ccs));
        }

        play.Logger.debug("sub  : {}", subject.toString());
        message.setSubject(subject, Constants.UTF_8);
        play.Logger.debug("date : {}", new Date().toString());
        message.setSentDate(new Date());

        play.Logger.debug("Finish build mail info.");

        Transport.send(message);
        play.Logger.debug("Finish send mail.");
    }

    private static MimeBodyPart zipAttachment(final List<InputStream> attachments, final List<String> fileNames,
                                              final List<String> mimeTypes, final String zipFileName) {
        try {
            ByteArrayOutputStream bout = new ByteArrayOutputStream(attachments.size());
            ZipOutputStream zos = new ZipOutputStream(bout);
            for (int i = 0; i < attachments.size(); i++) {
                InputStream is = attachments.get(i);
                byte[] bytes = IOUtils.toByteArray(is);

                String fileNameExt = getFullZipFileNameExt(fileNames.get(i), mimeTypes.get(i).toLowerCase());
                ZipEntry entry = new ZipEntry(fileNameExt);
                entry.setSize(bytes.length);
                zos.putNextEntry(entry);
                zos.write(bytes);

                is.close();
            }

            zos.close();

            MimeBodyPart mimeBodyPart = new MimeBodyPart();
            DataSource source = new ByteArrayDataSource(bout.toByteArray(), Enums.MimeType.ZIP.getType());
            mimeBodyPart.setDataHandler(new DataHandler(source));
            mimeBodyPart.setFileName(getFullFileNameExt(zipFileName, Enums.MimeType.ZIP.getType()));

            return mimeBodyPart;
        } catch (Exception e) {
            logger.error("SfrMailService#zipAttachment", e.getCause());
            return null;
        }
    }

    /**
     * Sends an email message with attachments.
     *
     * @param recipients  array of strings containing the recipients of the message.
     * @param subject     subject header field.
     * @param text        content of the message.
     * @param attachments attachments to be included with the message.
     * @param fileNames   file names for each attachment.
     * @param mimeTypes   mime types for each attachment.
     * @param zipFileName zip filename.
     * @throws MessagingException
     * @throws IOException
     * @throws SfrException
     */
    public static void send(final List<String> recipients, final List<String> cc, final String subject,
                            final String text, final List<InputStream> attachments, final List<String> fileNames,
                            final List<String> mimeTypes, final String zipFileName)
            throws MessagingException, IOException, SfrException {
        if (Strings.isNullOrEmpty(zipFileName)) { // multi attachments into mail
            send(null, null, recipients, cc, subject, text, attachments, fileNames, mimeTypes);
        } else { // zip multi attachments into 'zipFileName' file
            // a message with attachments consists of several parts in a multipart
            MimeMultipart multipart = new MimeMultipart();

            // create text part
            MimeBodyPart textPart = new MimeBodyPart();
            textPart.setText(text, Constants.UTF_8, "html");

            // add the text part to the multipart
            multipart.addBodyPart(textPart);

            // create attachment parts if required
            if (attachments != null) {
                // check that attachment and fileNames arrays sizes match
                if (attachments.size() != fileNames.size() || attachments.size() != mimeTypes.size()) {
                    logger.error("send: attachment and fileNames arrays sizes and mimeTypes are not match");
                    throw new SfrException(SfrExceptionCode.ERR_SV017_MISSING_ATTACH_FILES);
                }

                MimeBodyPart mimeBodyPart = zipAttachment(attachments, fileNames, mimeTypes, zipFileName);
                // add the body part to the multipart
                multipart.addBodyPart(mimeBodyPart);
            }

            // send mail
            send(null, null, recipients, cc, subject, multipart);
        }
    }

    private static String getFullFileNameExt(final String fileName, final String mimeType)
            throws UnsupportedEncodingException {
        String fullFileExt;
        if (Enums.MimeType.PDF.getType().equals(mimeType)) {
            fullFileExt = encodeFileName(fileName) + Enums.FileType.PDF.getExtension();
        } else if (Enums.MimeType.PNG.getType().equals(mimeType)) {
            fullFileExt = encodeFileName(fileName) + Enums.FileType.PNG.getExtension();
        } else if (Enums.MimeType.GIF.getType().equals(mimeType)) {
            fullFileExt = encodeFileName(fileName) + Enums.FileType.GIF.getExtension();
        } else if (Enums.MimeType.JPG.getType().equals(mimeType)
                || Enums.MimeType.JPEG.getType().equals(mimeType)) {
            fullFileExt = encodeFileName(fileName) + Enums.FileType.JPG.getExtension();
        } else if (Enums.MimeType.ZIP.getType().equals(mimeType)) {
            fullFileExt = encodeFileName(fileName) + Enums.FileType.ZIP.getExtension();
        } else {
            fullFileExt = encodeFileName(fileName);
        }

        return fullFileExt;
    }

    private static String encodeZipFileName(final String fileName) throws UnsupportedEncodingException {
        return new String(fileName.getBytes(StandardCharsets.UTF_8), Constants.UTF_8);
    }

    private static String getFullZipFileNameExt(final String fileName, final String mimeType) throws UnsupportedEncodingException {
        String fullFileExt;
        if (Enums.MimeType.PDF.getType().equals(mimeType)) {
            fullFileExt = encodeZipFileName(fileName) + Enums.FileType.PDF.getExtension();
        } else if (Enums.MimeType.PNG.getType().equals(mimeType)) {
            fullFileExt = encodeZipFileName(fileName) + Enums.FileType.PNG.getExtension();
        } else if (Enums.MimeType.GIF.getType().equals(mimeType)) {
            fullFileExt = encodeZipFileName(fileName) + Enums.FileType.GIF.getExtension();
        } else if (Enums.MimeType.JPG.getType().equals(mimeType)
                || Enums.MimeType.JPEG.getType().equals(mimeType)) {
            fullFileExt = encodeZipFileName(fileName) + Enums.FileType.JPG.getExtension();
        } else if (Enums.MimeType.ZIP.getType().equals(mimeType)) {
            fullFileExt = encodeZipFileName(fileName) + Enums.FileType.ZIP.getExtension();
        } else {
            fullFileExt = encodeZipFileName(fileName);
        }

        return fullFileExt;
    }
}

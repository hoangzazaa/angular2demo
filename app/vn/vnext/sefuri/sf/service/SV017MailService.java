package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.service.impl.SV017MailServiceImpl;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * Created by DungTQ on 3/14/2017.
 */

@ImplementedBy(SV017MailServiceImpl.class)
public interface SV017MailService {
    void sv01701SendMail(List<String> recipients, String subject, String mailBody) throws IOException, MessagingException;

    void sv01702SendMailWithAttachFiles(String senderName, String senderEmail, List<String> recipients, List<String> cc,
                                        String subject, String mailContent, List<InputStream> attachments,
                                        List<String> fileNames, List<String> mimeTypes) throws IOException, MessagingException;

    void sv01703SendMailWithZipAttachFiles(List<String> recipients, List<String> cc, String subject, String mailContent,
                                           List<InputStream> attachments, List<String> fileNames, List<String> mimeTypes,
                                           String zipFileName) throws IOException, MessagingException;

    void sv01704SendMail(String senderName, String senderEmail, List<String> recipients, List<String> cc,
                         String subject, String mailBody) throws IOException, MessagingException;
}

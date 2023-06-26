package vn.vnext.sefuri.sf.service.impl;

import vn.vnext.sefuri.sf.helper.SfrMailService;
import vn.vnext.sefuri.sf.service.SV017MailService;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * Created by DungTQ on 3/14/2017.
 */
public class SV017MailServiceImpl implements SV017MailService {

    @Override
    public void sv01701SendMail(List<String> recipients, String subject, String mailBody)
            throws IOException, MessagingException {
        SfrMailService.send(recipients, null, subject, mailBody);
    }

    @Override
    public void sv01702SendMailWithAttachFiles(String senderName, String email, List<String> recipients, List<String> cc, String subject,
                                               String mailContent, List<InputStream> attachments,
                                               List<String> fileNames, List<String> mimeTypes)
            throws IOException, MessagingException {
        SfrMailService.send(senderName, email, recipients, cc, subject, mailContent, attachments, fileNames, mimeTypes);
    }

    @Override
    public void sv01703SendMailWithZipAttachFiles(final List<String> recipients, final List<String> cc,
                                                  final String subject, final String mailContent,
                                                  final List<InputStream> attachments, final List<String> fileNames,
                                                  final List<String> mimeTypes, final String zipFileName)
            throws IOException, MessagingException {
        SfrMailService.send(recipients, cc, subject, mailContent, attachments, fileNames, mimeTypes, zipFileName);
    }

    @Override
    public void sv01704SendMail(String senderName, String senderEmail, List<String> recipients, List<String> cc,
                                String subject, String mailBody) throws IOException, MessagingException {
        SfrMailService.send(senderName, senderEmail, recipients, cc, subject, mailBody);
    }
}

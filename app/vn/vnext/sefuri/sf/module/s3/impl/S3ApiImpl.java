package vn.vnext.sefuri.sf.module.s3.impl;

import com.amazonaws.AmazonClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.module.s3.S3Api;
import vn.vnext.sefuri.sf.util.LogUtil;
import vn.vnext.sefuri.sf.util.SettingUtil;

import java.io.File;
import java.io.IOException;

/**
 * Created by haipt on 1/9/2017.
 */
public class S3ApiImpl implements S3Api {
    private static final Logger logger = LogUtil.getLogger(S3ApiImpl.class);

    /* S3 bucket value */
    private String s3Bucket;

    /* S3 client */
    private AmazonS3 amazonS3;

    public S3ApiImpl() {
        logger.info("Init AWS S3 module");

        // setup s3
        String accessKey = SettingUtil.getString(SETTING, ACCESS_KEY);
        String secretKey = SettingUtil.getString(SETTING, SECRET_KEY);
        if (StringUtils.isEmpty(accessKey)) {
            // no credentials, setup anonymous client
            amazonS3 = new AmazonS3Client();
        } else {
            // setup authen client
            AWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
            amazonS3 = new AmazonS3Client(awsCredentials);
        }

        // set endpoint if exists
        String endpoint = SettingUtil.getString(SETTING, ENDPOINT);
        if (!StringUtils.isEmpty(endpoint)) {
            // no s3 config, disable s3 mode
            amazonS3.setEndpoint(endpoint);
        }
        logger.info("S3 region: {}", amazonS3.getRegionName());

        // check bucket exists
        s3Bucket = SettingUtil.getString(SETTING, BUCKET);
        if (StringUtils.isEmpty(s3Bucket)) {
            logger.error("Missing S3Bucket configuration");
            throw new RuntimeException();
        }
        try {
            boolean bucketExist = amazonS3.doesBucketExist(s3Bucket);
            if (!bucketExist) {
                // stop if bucker not exists
                logger.error("S3 bucket does not exists");
                throw new RuntimeException();
            }
        } catch (AmazonClientException e) {
            // stop if cannot connect to AWS
            logger.error("S3 bucket checking fail", e);
            throw new RuntimeException();
        }

        // init S3 client success
        logger.info("AWS S3 initialized successful");
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean saveFile(final String key, final File file) {
        // upload file to S3
        try {
            // create new push request within public for all
            PutObjectRequest putObjectRequest = new PutObjectRequest(s3Bucket, key, file)
                    .withCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3.putObject(putObjectRequest);

            return true;
        } catch (AmazonClientException e) {
            logger.error("S3 upload error", e);
            return false;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public File getFile(final String key, String extension) {
        try {
            // get S3 object
            boolean isExist = amazonS3.doesObjectExist(s3Bucket, key);
            if (isExist) {
                S3Object object = amazonS3.getObject(s3Bucket, key);
                // get object content
                S3ObjectInputStream objectContent = object.getObjectContent();
                // create temp file
                File tempFile = File.createTempFile("s3File", Constants.DOT + extension);
                tempFile.deleteOnExit();
                // save object to temp file
                FileUtils.copyInputStreamToFile(objectContent, tempFile);
                // close object stream
                objectContent.close();
                // return temp file
                return tempFile;
            } else {
                // object not found
                logger.error("file not found on S3");
                return null;
            }
        } catch (AmazonClientException e) {
            logger.error("get S3 file error", e);
            return null;
        } catch (IOException e) {
            logger.error("get S3 file error", e);
            return null;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean deleteFile(final String key) {
        try {
            amazonS3.deleteObject(s3Bucket, key);
            return true;
        } catch (AmazonClientException e) {
            logger.error("delete S3 file error", e);
            return false;
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getURL(final String key) {
        return amazonS3.getUrl(s3Bucket, key).toString();
    }
}

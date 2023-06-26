package vn.vnext.sefuri.sf.module.s3;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.module.s3.impl.S3ApiNoImpl;

import java.io.File;

/**
 * Created by haipt on 1/9/2017.
 */
@ImplementedBy(S3ApiNoImpl.class)
public interface S3Api {

    String SETTING = "directory";
    /* config key for S3 bucket. E.g. saleafront-s3*/
    String BUCKET = "s3.bucket";
    /* config key for S3 endpoint. E.g. s3-ap-northeast-1.amazonaws.com */
    String ENDPOINT = "s3.endpoint";
    /* config key for AWS access key */
    String ACCESS_KEY = "s3.accessKey";
    /* config key for AWS secret key */
    String SECRET_KEY = "s3.secretKey";

    /**
     * check if s3 enabled
     *
     * @return
     */
    boolean isEnabled();

    /**
     * Save file to S3
     *
     * @param key  key(file path) to upload
     * @param file upload file
     * @return true if save file successful
     */
    boolean saveFile(String key, File file);

    /**
     * Get S3 URL of file
     *
     * @param key
     * @return file
     */
    File getFile(String key, String extension);

    /**
     * Remove file from S3
     *
     * @param key
     * @return true if delete file successful
     */
    boolean deleteFile(String key);

    /**
     * Returns public url to access object.
     *
     * @param key as file name
     * @return the file location
     */
    String getURL(String key);
}

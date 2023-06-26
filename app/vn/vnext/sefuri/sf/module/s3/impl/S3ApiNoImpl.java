package vn.vnext.sefuri.sf.module.s3.impl;

import vn.vnext.sefuri.sf.module.s3.S3Api;

import java.io.File;

/**
 * Created by manhnv on 3/24/2017.
 */
public class S3ApiNoImpl implements S3Api {

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isEnabled() {
        return false;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean saveFile(final String key, final File file) {
        return false;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public File getFile(final String key, String extension) {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean deleteFile(final String key) {
        return false;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getURL(final String key) {
        return null;
    }

}

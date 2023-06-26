package vn.vnext.sefuri.sf.module.s3;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.slf4j.Logger;
import play.Configuration;
import vn.vnext.sefuri.sf.util.LogUtil;

import java.util.Map;

/**
 * Test S3Api
 * Cannot test for auth, save and delete file due to security issue.
 */
public class S3ApiTest {
    private static final Logger logger = LogUtil.getLogger(S3ApiTest.class);
    private static final String KEY = "README.md";
    private static final String FOLDER = "dummy";

    private static S3Api s3Api;
    private static Configuration configuration;
    private static Map<String, Object> configs;

    @BeforeClass
    public static void setupOnlyOnce() {
        // call only once and provides the config when all test method starting.

        // declare config
//        configs = Maps.newHashMap();
//        configs.put("aws.s3.bucket", System.getenv("AWS_S3_BUCKET"));
//        configs.put("aws.s3.endpoint", System.getenv("AWS_S3_ENDPOINT"));
//        configs.put("aws.access.key", System.getenv("AWS_ACCESS_KEY"));
//        configs.put("aws.secret.key", System.getenv("AWS_SECRET_KEY"));
//
//        // create config object
//        configuration = new Configuration(configs);
//
//        // create S3Api Object
//        s3Api = new S3ApiImpl(configuration);
    }

    @AfterClass
    public static void tearDownOnlyOnce() {
        // call only once and destroy the config when all test method ending.
        configs.clear();
        s3Api = null;
        configuration = null;
    }

//    @Test
//    public void saveFile() throws IOException {
//        File fileUpload = new File(System.getProperty("user.dir") + File.separator + KEY);
//
//        // save file to S3
//        s3Api.saveFile(KEY, fileUpload);
//
//        // verify file already added
//        InputStream is = s3Api.getFile(KEY);
//        assertNotNull(is);
//    }
//
//    @Test(expected = AmazonClientException.class)
//    public void saveFileWithException() {
//    }
//
//    @Test
//    public void getFile() throws IOException {
//        // get file from S3
//        InputStream is = s3Api.getFile(KEY);
//        String content = IOUtils.toString(is, "UTF-8");
//
//        // verify file content
//        assertEquals("# sgsk_sefuri_sf", content);
//    }
//
//    @Test(expected = AmazonClientException.class)
//    public void getFileWithException() {
//    }
//
//    @Test
//    public void deleteFile() {
//        boolean isDelete = s3Api.deleteFile(KEY);
//        assertTrue(isDelete);
//    }
//
//    @Test(expected = AmazonClientException.class)
//    public void deleteFileWithException() {
//    }
//
//    @Test
//    public void getURI() {
//        // verify exist uri
//        URI uri = s3Api.getURI(KEY);
//        assertFalse(Strings.isNullOrEmpty(uri.toString()));
//
//        // verify not exist uri
//        uri = s3Api.getURI(KEY + 1);
//        assertNull(uri);
//    }
//
//    @Test
//    public void createFolderInBucket() {
//        s3Api.createFolderInBucket(FOLDER);
//        assertTrue(s3Api.isFolder(FOLDER));
//    }
//
//    @Test
//    public void deleteFolderInBucket() {
//        s3Api.deleteFolderInBucket(FOLDER);
//    }
//
//    @Test
//    public void listBuckets() {
//        List<Bucket> buckets = s3Api.listBuckets();
//        assertTrue(CollectionUtil.isNotEmpty(buckets));
//
//        // verify contains current bucket
//        assertTrue(buckets.contains(configs.get("aws.s3.bucket")));
//    }
//
//    @Test
//    public void getObjectSummariesInBucket() {
//        List<S3ObjectSummary> summaries = s3Api.getObjectSummariesInBucket();
//        assertTrue(CollectionUtil.isNotEmpty(summaries));
//
//        // verify contains KEY
//        S3ObjectSummary summary = summaries.stream().filter(item -> KEY == item.getKey()).findFirst().orElse(null);
//        assertTrue(KEY == summary.getKey());
//    }
//
//    @Test
//    public void isFolder() {
//        boolean isFolder = s3Api.isFolder(KEY);
//        assertFalse(isFolder);
//    }
}
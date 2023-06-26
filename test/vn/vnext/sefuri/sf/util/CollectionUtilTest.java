package vn.vnext.sefuri.sf.util;

import com.google.common.collect.Lists;
import org.junit.Assert;
import org.junit.Test;
import play.test.WithApplication;

import java.util.List;

/**
 * Test class for coverage all test case in {@link CollectionUtil}
 *
 * @author manhnv
 */
public class CollectionUtilTest extends WithApplication {
    private List<Integer> dummies = null;

    @Override
    public void startPlay() {
        dummies = Lists.newArrayList();
    }

    @Override
    public void stopPlay() {
        dummies.clear();
    }

    @Test
    public void isEmpty() {
        Assert.assertTrue(CollectionUtil.isEmpty(dummies));
    }

    @Test
    public void isNotEmpty() {
        dummies.add(0);
        Assert.assertTrue(CollectionUtil.isNotEmpty(dummies));
    }

    @Test
    public void contains() {
        for (int i = 0; i < 5; i++)
            dummies.add(i);

        Assert.assertTrue(CollectionUtil.contains(dummies, 0));
    }
}

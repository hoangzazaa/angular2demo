package vn.vnext.sefuri.sf.testdata;

import play.db.evolutions.Evolution;

/**
 * Created by haipt on 10/21/2016.
 */
public abstract class BaseData {

    public Evolution getEvolutionReader(int no) {
        return new Evolution(no, sqlUp(), sqlDown());
    }

    abstract String sqlUp();

    abstract String sqlDown();
}

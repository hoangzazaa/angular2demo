package vn.vnext.sefuri.sf.dto.dao;

import java.math.BigDecimal;

/**
 * Created by Teddy on 3/23/2017.
 */
public class DepartmentGoal01Dto {

    private int departmentId;
    private int month;
    private BigDecimal goal;

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public BigDecimal getGoal() {
        return goal;
    }

    public void setGoal(BigDecimal goal) {
        this.goal = goal;
    }
}

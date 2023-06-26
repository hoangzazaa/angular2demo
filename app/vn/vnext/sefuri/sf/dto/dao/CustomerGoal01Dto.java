package vn.vnext.sefuri.sf.dto.dao;

import java.math.BigDecimal;

/**
 * Created by Teddy on 3/23/2017.
 */
public class CustomerGoal01Dto {

    private int userId;
    private int month;
    private BigDecimal goal;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

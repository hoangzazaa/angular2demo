package vn.vnext.sefuri.sf.dto.dao;

import java.math.BigDecimal;
import java.util.List;

public class Procedure006Dto {

    private List<Procedure00601Dto> procedure00601DtoList;
    private List<Procedure00602Dto> procedure00602DtoList;

    public List<Procedure00601Dto> getProcedure00601DtoList() {
        return procedure00601DtoList;
    }

    public void setProcedure00601DtoList(List<Procedure00601Dto> procedure00601DtoList) {
        this.procedure00601DtoList = procedure00601DtoList;
    }

    public List<Procedure00602Dto> getProcedure00602DtoList() {
        return procedure00602DtoList;
    }

    public void setProcedure00602DtoList(List<Procedure00602Dto> procedure00602DtoList) {
        this.procedure00602DtoList = procedure00602DtoList;
    }

    public static class Procedure00601Dto {
        private int year;
        private int month;
        private int customerId;
        private BigDecimal oldAmount1;
        private BigDecimal oldAmount2;
        private BigDecimal oldAmount3;
        private BigDecimal newAmount1;
        private BigDecimal newAmount2;
        private BigDecimal newAmount3;
        private String note;

        public int getYear() {
            return year;
        }

        public void setYear(int year) {
            this.year = year;
        }

        public int getMonth() {
            return month;
        }

        public void setMonth(int month) {
            this.month = month;
        }

        public int getCustomerId() {
            return customerId;
        }

        public void setCustomerId(int customerId) {
            this.customerId = customerId;
        }

        public BigDecimal getOldAmount1() {
            return oldAmount1;
        }

        public void setOldAmount1(BigDecimal oldAmount1) {
            this.oldAmount1 = oldAmount1;
        }

        public BigDecimal getOldAmount2() {
            return oldAmount2;
        }

        public void setOldAmount2(BigDecimal oldAmount2) {
            this.oldAmount2 = oldAmount2;
        }

        public BigDecimal getOldAmount3() {
            return oldAmount3;
        }

        public void setOldAmount3(BigDecimal oldAmount3) {
            this.oldAmount3 = oldAmount3;
        }

        public BigDecimal getNewAmount1() {
            return newAmount1;
        }

        public void setNewAmount1(BigDecimal newAmount1) {
            this.newAmount1 = newAmount1;
        }

        public BigDecimal getNewAmount2() {
            return newAmount2;
        }

        public void setNewAmount2(BigDecimal newAmount2) {
            this.newAmount2 = newAmount2;
        }

        public BigDecimal getNewAmount3() {
            return newAmount3;
        }

        public void setNewAmount3(BigDecimal newAmount3) {
            this.newAmount3 = newAmount3;
        }

        public String getNote() {
            return note;
        }

        public void setNote(String note) {
            this.note = note;
        }
    }

    public static class Procedure00602Dto {
        private int year;
        private int month;
        private BigDecimal oldAmount1;
        private BigDecimal oldAmount2;
        private BigDecimal oldAmount3;
        private BigDecimal newAmount1;
        private BigDecimal newAmount2;
        private BigDecimal newAmount3;

        public int getYear() {
            return year;
        }

        public void setYear(int year) {
            this.year = year;
        }

        public int getMonth() {
            return month;
        }

        public void setMonth(int month) {
            this.month = month;
        }

        public BigDecimal getOldAmount1() {
            return oldAmount1;
        }

        public void setOldAmount1(BigDecimal oldAmount1) {
            this.oldAmount1 = oldAmount1;
        }

        public BigDecimal getOldAmount2() {
            return oldAmount2;
        }

        public void setOldAmount2(BigDecimal oldAmount2) {
            this.oldAmount2 = oldAmount2;
        }

        public BigDecimal getOldAmount3() {
            return oldAmount3;
        }

        public void setOldAmount3(BigDecimal oldAmount3) {
            this.oldAmount3 = oldAmount3;
        }

        public BigDecimal getNewAmount1() {
            return newAmount1;
        }

        public void setNewAmount1(BigDecimal newAmount1) {
            this.newAmount1 = newAmount1;
        }

        public BigDecimal getNewAmount2() {
            return newAmount2;
        }

        public void setNewAmount2(BigDecimal newAmount2) {
            this.newAmount2 = newAmount2;
        }

        public BigDecimal getNewAmount3() {
            return newAmount3;
        }

        public void setNewAmount3(BigDecimal newAmount3) {
            this.newAmount3 = newAmount3;
        }
    }
}

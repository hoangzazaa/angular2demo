package vn.vnext.sefuri.sf.dto;

import java.util.List;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class CustomPaperDto {
    private int id;
    private String name;
    private List<MstPaperDto> basisWeightList;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<MstPaperDto> getBasisWeightList() {
        return basisWeightList;
    }

    public void setBasisWeightList(List<MstPaperDto> basisWeightList) {
        this.basisWeightList = basisWeightList;
    }
}

package vn.vnext.sefuri.sf.json.SF00306.model;

import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.json.common.CheckSheetInfoJson;

/**
 * Created by manhnv on 4/11/2017.
 */
public class SF00306_CheckSheetJson extends CheckSheetInfoJson {
    @Override
    public void setModel(final ChecksheetDto dto) {
        if (dto != null) {
            super.setData(dto);

            this.dealId = dto.getDealId();
            this.questionCode = dto.getQuestionCode();
            this.textArea1 = dto.getTextArea1();
            this.textArea2 = dto.getTextArea2();
            this.selectBox1 = dto.getSelectBox1();
            this.selectBox2 = dto.getSelectBox2();
            this.selectBox3 = dto.getSelectBox3();
            this.checkBox1 = dto.getCheckBox1();
            this.checkBox2 = dto.getCheckBox2();
            this.checkBox3 = dto.getCheckBox3();
            this.radioButton = dto.getRadioButton();
        }
    }
}

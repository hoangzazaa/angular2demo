package vn.vnext.sefuri.sf.dto;

import java.util.List;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class SF0080101ResultDto {

    private Integer productId;

    private String productName;

    private String customerName;

    private Integer selectedShape;

    private Integer selectedPaper;

    private Integer selectedBasisWeight;

    private Integer selectedSheetSize;

    private MstSheetSizeDto sheetSize;

    private Integer imposition;

    private List<DrawingImageDto> drawingImageDtoList;

    private OriginalShapeParamsDto originalShapeParamsDto;

    private List<MstShapeDto> shapes;

    private List<CustomPaperDto> papers;

    private List<MstSheetSizeDto> sheetSizes;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getSelectedShape() {
        return selectedShape;
    }

    public void setSelectedShape(Integer selectedShape) {
        this.selectedShape = selectedShape;
    }

    public Integer getSelectedPaper() {
        return selectedPaper;
    }

    public void setSelectedPaper(Integer selectedPaper) {
        this.selectedPaper = selectedPaper;
    }

    public Integer getSelectedBasisWeight() {
        return selectedBasisWeight;
    }

    public void setSelectedBasisWeight(Integer selectedBasisWeight) {
        this.selectedBasisWeight = selectedBasisWeight;
    }

    public Integer getSelectedSheetSize() {
        return selectedSheetSize;
    }

    public void setSelectedSheetSize(Integer selectedSheetSize) {
        this.selectedSheetSize = selectedSheetSize;
    }

    public MstSheetSizeDto getSheetSize() {
        return sheetSize;
    }

    public void setSheetSize(MstSheetSizeDto sheetSize) {
        this.sheetSize = sheetSize;
    }

    public Integer getImposition() {
        return imposition;
    }

    public void setImposition(Integer imposition) {
        this.imposition = imposition;
    }

    public List<DrawingImageDto> getDrawingImageDtoList() {
        return drawingImageDtoList;
    }

    public void setDrawingImageDtoList(List<DrawingImageDto> drawingImageDtoList) {
        this.drawingImageDtoList = drawingImageDtoList;
    }

    public OriginalShapeParamsDto getOriginalShapeParamsDto() {
        return originalShapeParamsDto;
    }

    public void setOriginalShapeParamsDto(OriginalShapeParamsDto originalShapeParamsDto) {
        this.originalShapeParamsDto = originalShapeParamsDto;
    }

    public List<MstShapeDto> getShapes() {
        return shapes;
    }

    public void setShapes(List<MstShapeDto> shapes) {
        this.shapes = shapes;
    }

    public List<CustomPaperDto> getPapers() {
        return papers;
    }

    public void setPapers(List<CustomPaperDto> papers) {
        this.papers = papers;
    }

    public List<MstSheetSizeDto> getSheetSizes() {
        return sheetSizes;
    }

    public void setSheetSizes(List<MstSheetSizeDto> sheetSizes) {
        this.sheetSizes = sheetSizes;
    }
}

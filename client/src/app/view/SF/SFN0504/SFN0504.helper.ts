/**
 * Helper class for SFN0504
 * @author haipt
 */
export class SFN0504Helper {
    static getStockTypeStr(type: number): string {
        if (type == 1) {
            return "在庫";
        } else if (type == 2) {
            return "預り";
        } else {
            return "";
        }
    }
}
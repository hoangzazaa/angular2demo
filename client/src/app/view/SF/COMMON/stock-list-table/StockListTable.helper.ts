export class StockListTableHelper {

    static getInventoryTypeStr(type: number) {
        if (type == 1) {
            return "在庫";
        } else if (type == 2) {
            return "預り";
        } else {
            return "";
        }
    }
}
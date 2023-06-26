import MathUtil from "../../../util/math-util";
/**
 * Created by hoangtd on 9/25/2017.
 */
export class SF00503Helper{

    static convertYenToThousanYen(value: number){
        return MathUtil.round(value/1000, 0);
    }
}
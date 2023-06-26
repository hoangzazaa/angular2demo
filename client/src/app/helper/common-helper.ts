export class CommonHelper {
    static getList(keys: Array<any>, master: any): Option[] {
        let list = [];
        keys.forEach(key => {
            let value = master[key];
            if (value == undefined) {
                return;
            }
            list.push(<Option>{
                value: key,
                name: value
            });
        });
        return list;
    }
}

export interface Option {
    value: any;
    name: string;
}
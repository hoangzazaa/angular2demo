import {PIBLoading} from "../../../../component/product-info-box/model/PIBLoading.model";
/**
 * Loading Address model for SFN0307
 */
export class LoadingAddressModel implements PIBLoading {

    /* id */
    id: number;
    /* name */
    name: string;
    /* code */
    code: string;
    /* abbr */
    abbr: string;

    get pib_id(): number {
        return this.id;
    }

    set pib_id(value: number) {
        this.id = value;
    }

    get pib_code(): string {
        return this.code;
    }

    set pib_code(value: string) {
        this.code = value;
    }

    get pib_name(): string {
        return this.name;
    }

    set pib_name(value: string) {
        this.name = value;
    }

    get pib_abbr(): string {
        return this.abbr;
    }

    set pib_abbr(value: string) {
        this.abbr = value;
    }
}
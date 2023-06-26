import {USER_ROLE} from "../helper/mst-data-type";
import ValidatorUtil from "./validator-util";
let _ = require("lodash");

/**
 * Class represent data util which handles data by using structures to push and get data Json: root -> key1 -> key2 -> value
 */
export default class DataUtil {
    /**
     * Getting value from data
     * @param {any} data: the source data used to get value
     * @param {any} defaultData: return data in case error
     * @param {} ...keys: the array of keys used for getting value
     */
    static getData(data: any, defaultData: any, ...keys) {
        try {
            //Traverse through each key to get value
            keys.forEach(key => {
                data = data[key];
            });
            return data;
        } catch (e) {
            return defaultData;
        }
    }

    /**
     * Pushing value to data
     * @param {any} data: the source data
     * @param {any} value: the value to push data
     * @param {any} lastKey: the last key in the data, will be used to get value
     * @param {} ...keys: the array of keys before the last key
     */
    static pushData(data: any, value: any, lastKey: any, ...keys) {
        // Check if data is undefined
        if (data == undefined) {
            return;
        }
        keys.forEach(key => {
            // Pushing data, if get data from key is undefined, initialize value to continue traversing
            if (data[key] == undefined) {
                data[key] = {};
            }
            data = data[key];
        })
        // Set data for last key
        data[lastKey] = value;
    }

    /**
     * Check user role exist in system. If role exist then return itself, else return undefined.
     * @param roleId the current user role
     * @returns {actual role id}
     */
    static getRoleByUserRoleId(roleId: any) {
        // if role not defined, set default role is staff (roleId = 9)
        let currentUserRole = 9;
        if (ValidatorUtil.isEmpty(roleId))
            return currentUserRole;

        // otherwise, return current role id
        let keys = Object.keys(USER_ROLE);
        for (let i = keys.length; i--;)
            if (keys[i] == roleId)
                return roleId; // role existed.

        return currentUserRole;
    }

    /**
     * deepCopy/cloning given object
     * @param obj
     * @returns {any}
     */
    static cloneObject<T>(obj: T): T {
        return _.cloneDeep(obj);
    }

    static compareNumber(n1: number, n2: number, desc?: boolean) {
        if ((n1 == n2 == null)) {
            return 0;
        } else if (n1 != null && n2 == null) {
            return desc ? -1 : 1;
        } else if (n1 == null && n2 != null) {
            return desc ? 1 : -1;
        } else if (n1 > n2) {
            return desc ? -1 : 1;
        } else if (n1 < n2) {
            return desc ? 1 : -1;
        } else {
            return 0
        }
    }

    static toSelectBoxDataSource(data: any): { id: number, name: string }[] {
        return Object.keys(data).map(key => ({id: +key, name: data[key]}));
    }

    /**
     * data helper func for handsontable
     */
    static data(attr) {
        return function (row, value) {
            if (typeof value === 'undefined') {
                return row[attr];
            }
            row[attr] = value;
            return row;
        }
    }

    static getString(data: any, defaultValue?: string): string {
        if (data == undefined) {
            return defaultValue;
        } else {
            return data + "";
        }
    }
};

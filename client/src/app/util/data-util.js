"use strict";
var mst_data_type_1 = require("../helper/mst-data-type");
var validator_util_1 = require("./validator-util");
var _ = require("lodash");
/**
 * Class represent data util which handles data by using structures to push and get data Json: root -> key1 -> key2 -> value
 */
var DataUtil = (function () {
    function DataUtil() {
    }
    /**
     * Getting value from data
     * @param {any} data: the source data used to get value
     * @param {any} defaultData: return data in case error
     * @param {} ...keys: the array of keys used for getting value
     */
    DataUtil.getData = function (data, defaultData) {
        var keys = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            keys[_i - 2] = arguments[_i];
        }
        try {
            //Traverse through each key to get value
            keys.forEach(function (key) {
                data = data[key];
            });
            return data;
        }
        catch (e) {
            return defaultData;
        }
    };
    /**
     * Pushing value to data
     * @param {any} data: the source data
     * @param {any} value: the value to push data
     * @param {any} lastKey: the last key in the data, will be used to get value
     * @param {} ...keys: the array of keys before the last key
     */
    DataUtil.pushData = function (data, value, lastKey) {
        var keys = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            keys[_i - 3] = arguments[_i];
        }
        // Check if data is undefined
        if (data == undefined) {
            return;
        }
        keys.forEach(function (key) {
            // Pushing data, if get data from key is undefined, initialize value to continue traversing
            if (data[key] == undefined) {
                data[key] = {};
            }
            data = data[key];
        });
        // Set data for last key
        data[lastKey] = value;
    };
    /**
     * Check user role exist in system. If role exist then return itself, else return undefined.
     * @param roleId the current user role
     * @returns {actual role id}
     */
    DataUtil.getRoleByUserRoleId = function (roleId) {
        // if role not defined, set default role is staff (roleId = 9)
        var currentUserRole = 9;
        if (validator_util_1.default.isEmpty(roleId))
            return currentUserRole;
        // otherwise, return current role id
        var keys = Object.keys(mst_data_type_1.USER_ROLE);
        for (var i = keys.length; i--;)
            if (keys[i] == roleId)
                return roleId; // role existed.
        return currentUserRole;
    };
    /**
     * deepCopy/cloning given object
     * @param obj
     * @returns {any}
     */
    DataUtil.cloneObject = function (obj) {
        return _.cloneDeep(obj);
    };
    DataUtil.compareNumber = function (n1, n2, desc) {
        if ((n1 == n2 == null)) {
            return 0;
        }
        else if (n1 != null && n2 == null) {
            return desc ? -1 : 1;
        }
        else if (n1 == null && n2 != null) {
            return desc ? 1 : -1;
        }
        else if (n1 > n2) {
            return desc ? -1 : 1;
        }
        else if (n1 < n2) {
            return desc ? 1 : -1;
        }
        else {
            return 0;
        }
    };
    DataUtil.toSelectBoxDataSource = function (data) {
        return Object.keys(data).map(function (key) { return ({ id: +key, name: data[key] }); });
    };
    /**
     * data helper func for handsontable
     */
    DataUtil.data = function (attr) {
        return function (row, value) {
            if (typeof value === 'undefined') {
                return row[attr];
            }
            row[attr] = value;
            return row;
        };
    };
    DataUtil.getString = function (data, defaultValue) {
        if (data == undefined) {
            return defaultValue;
        }
        else {
            return data + "";
        }
    };
    return DataUtil;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataUtil;
;
//# sourceMappingURL=data-util.js.map
"use strict";
var constants_1 = require("../../../helper/constants");
var SF00205_Request_model_1 = require("./model/SF00205_Request.model");
/**
 * Created by manhnv on 6/14/2017.
 */
var SF00205Data = (function () {
    function SF00205Data() {
        // used to enable|disable button when processing
        this.isDisable = false;
        // total records when search|load page
        this.totalRecords = constants_1.Constants.ZERO;
        // records per page to paginator
        this.pageSize = constants_1.Constants.PAGE_SIZE;
        // request model per request to server
        this.requestModel = new SF00205_Request_model_1.SF00205Request();
        // deal list
        this.deals = [];
        // department list
        this.departments = [];
        // person-in-charge list
        this.pics = [];
    }
    return SF00205Data;
}());
exports.SF00205Data = SF00205Data;
//# sourceMappingURL=SF00205.data.js.map
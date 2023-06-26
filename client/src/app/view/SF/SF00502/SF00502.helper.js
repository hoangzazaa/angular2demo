"use strict";
var Note_model_1 = require("./model/Note.model");
var Revenue_model_1 = require("./model/Revenue.model");
var SF00502_constants_1 = require("./SF00502.constants");
var math_util_1 = require("../../../util/math-util");
/**
 * Helper class for SF00502
 * @author haipt
 */
var SF00502Helper = (function () {
    function SF00502Helper() {
    }
    /**
     * get financial year of given date
     */
    SF00502Helper.cloneNote = function (note) {
        // check undefined
        if (note == undefined) {
            return undefined;
        }
        // create clone obj
        var cloneNote = new Note_model_1.NoteModel();
        cloneNote.id = note.id;
        cloneNote.customerId = note.customerId;
        cloneNote.year = note.year;
        cloneNote.month = note.month;
        cloneNote.prediction = SF00502Helper.cloneRevenue(note.prediction);
        cloneNote.newRevenue = SF00502Helper.cloneRevenue(note.newRevenue);
        cloneNote.oldRevenue = SF00502Helper.cloneRevenue(note.oldRevenue);
        cloneNote.diffRate = note.diffRate;
        cloneNote.comment = note.comment;
        cloneNote.head = note.head;
        return cloneNote;
    };
    /**
     * get financial year of given date
     */
    SF00502Helper.cloneRevenue = function (revenue) {
        // check undefined
        if (revenue == undefined) {
            return undefined;
        }
        // create clone obj
        var cloneRevenue = new Revenue_model_1.RevenueModel();
        cloneRevenue.amount1 = revenue.amount1;
        cloneRevenue.amount2 = revenue.amount2;
        cloneRevenue.amount3 = revenue.amount3;
        cloneRevenue.total = revenue.total;
        return cloneRevenue;
    };
    /**
     * get changed notes
     */
    SF00502Helper.findChanged = function (currentNotes, originNotes, mode) {
        var changeList = [];
        if (currentNotes.length == 0 && originNotes.length == 0) {
            return changeList;
        }
        // compare current to origin
        if (mode == SF00502_constants_1.SF00502Constants.SCREEN_MODE_ACHIEVEMENT) {
            for (var _i = 0, currentNotes_1 = currentNotes; _i < currentNotes_1.length; _i++) {
                var cNote = currentNotes_1[_i];
                for (var _a = 0, originNotes_1 = originNotes; _a < originNotes_1.length; _a++) {
                    var oNote = originNotes_1[_a];
                    // match by customer
                    if (cNote.customerId == oNote.customerId) {
                        // compare comment only
                        if (cNote.comment != oNote.comment) {
                            // count as changed
                            changeList.push(cNote);
                        }
                        break;
                    }
                }
            }
        }
        else {
            // current node ids
            var cIds_1 = [];
            for (var _b = 0, currentNotes_2 = currentNotes; _b < currentNotes_2.length; _b++) {
                var cNote = currentNotes_2[_b];
                // check new note
                if (cNote.id == undefined) {
                    changeList.push(cNote);
                }
                else {
                    cIds_1.push(cNote.id);
                    // check update note
                    var foundNote = false;
                    for (var _c = 0, originNotes_2 = originNotes; _c < originNotes_2.length; _c++) {
                        var oNote = originNotes_2[_c];
                        // match by customerId
                        if (cNote.customerId == oNote.customerId) {
                            // compare comment and revenue
                            if ((cNote.comment != oNote.comment)
                                || (cNote.prediction.amount1 != oNote.prediction.amount1)
                                || (cNote.prediction.amount2 != oNote.prediction.amount2)
                                || (cNote.prediction.amount3 != oNote.prediction.amount3)) {
                                // count as changed
                                changeList.push(cNote);
                            }
                            // note for customer found
                            foundNote = true;
                            break;
                        }
                    }
                    // note note found from origin
                    if (!foundNote) {
                        // note is added from somewhere
                        changeList.push(cNote);
                    }
                }
            }
            // check for removed note
            var removeNotes = originNotes.forEach(function (note) {
                if (cIds_1.indexOf(note.id) < 0) {
                    var removeNote = new Note_model_1.NoteModel();
                    removeNote.id = note.id;
                    removeNote.customerId = note.customerId;
                    removeNote.delete = true;
                    // add dump dataa
                    removeNote.prediction = new Revenue_model_1.RevenueModel();
                    changeList.push(removeNote);
                }
            });
        }
        return changeList;
    };
    SF00502Helper.convertYenToThousanYen = function (value) {
        return math_util_1.default.round(value / 1000, 0);
    };
    return SF00502Helper;
}());
exports.SF00502Helper = SF00502Helper;
//# sourceMappingURL=SF00502.helper.js.map
import {NoteModel} from "./model/Note.model";
import {RevenueModel} from "./model/Revenue.model";
import {SF00502Constants} from "./SF00502.constants";
import MathUtil from "../../../util/math-util";
/**
 * Helper class for SF00502
 * @author haipt
 */
export class SF00502Helper {

    /**
     * get financial year of given date
     */
    static cloneNote(note: NoteModel): NoteModel {
        // check undefined
        if (note == undefined) {
            return undefined;
        }
        // create clone obj
        let cloneNote = new NoteModel();
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
    }

    /**
     * get financial year of given date
     */
    static cloneRevenue(revenue: RevenueModel): RevenueModel {
        // check undefined
        if (revenue == undefined) {
            return undefined;
        }
        // create clone obj
        let cloneRevenue = new RevenueModel();
        cloneRevenue.amount1 = revenue.amount1;
        cloneRevenue.amount2 = revenue.amount2;
        cloneRevenue.amount3 = revenue.amount3;
        cloneRevenue.total = revenue.total;

        return cloneRevenue
    }

    /**
     * get changed notes
     */
    static findChanged(currentNotes: NoteModel[], originNotes: NoteModel[], mode: number): NoteModel[] {
        let changeList: NoteModel[] = [];

        if (currentNotes.length == 0 && originNotes.length == 0) {
            return changeList;
        }

        // compare current to origin
        if (mode == SF00502Constants.SCREEN_MODE_ACHIEVEMENT) {
            for (let cNote of currentNotes) {
                for (let oNote of originNotes) {
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
        } else {
            // current node ids
            let cIds = [];

            for (let cNote of currentNotes) {
                // check new note
                if (cNote.id == undefined) {
                    changeList.push(cNote);
                } else {
                    cIds.push(cNote.id);
                    // check update note
                    let foundNote = false;
                    for (let oNote of originNotes) {
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
            let removeNotes = originNotes.forEach(note => {
                if (cIds.indexOf(note.id) < 0) {
                    let removeNote = new NoteModel();
                    removeNote.id = note.id;
                    removeNote.customerId = note.customerId;
                    removeNote.delete = true;
                    // add dump dataa
                    removeNote.prediction = new RevenueModel();

                    changeList.push(removeNote);
                }
            });
        }

        return changeList;
    }

    static convertYenToThousanYen(value: number){
        return MathUtil.round(value/1000, 0);
    }
}
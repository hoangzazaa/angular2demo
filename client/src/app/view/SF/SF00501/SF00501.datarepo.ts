import {StaffModel} from "./model/SF00501_Staff.model";
import DataUtil from "../../../util/data-util";
import {SF00501Constants} from "./SF00501.constants";
import {DateModel} from "./model/SF00501_Date.model";
import {AgentModel} from "./model/SF00501_Agent.model";
export class SF00501DataRepo {

    // data map
    private dataRepo: any = {};

    //region staff: departmentid - staff[]
    getStaffs(departmentId: number): StaffModel[] {
        return DataUtil.getData(this.dataRepo, [], SF00501Constants.MAP_DEPARTMENT_STAFF, departmentId);
    }

    addStaff(staff: StaffModel, departmentId: number): void {
        let staffs = DataUtil.getData(this.dataRepo, undefined, SF00501Constants.MAP_DEPARTMENT_STAFF, departmentId);
        if (staffs == undefined) {
            staffs = [];
            DataUtil.pushData(this.dataRepo, staffs, departmentId, SF00501Constants.MAP_DEPARTMENT_STAFF);
        }
        staffs.push(staff);
    }

    //endregion

    //region staff: dateUnit - SelectDate[]
    getSelectDates(dateUnit: number): DateModel[] {
        let list = DataUtil.getData(this.dataRepo, undefined, SF00501Constants.MAP_DATE_SELECT, dateUnit);
        if (list == undefined) {
            return [];
        } else {
            return list;
        }
    }

    setSelectDates(notes: DateModel[], dateUnit: number): void {
        DataUtil.pushData(this.dataRepo, notes, dateUnit, SF00501Constants.MAP_DATE_SELECT);
    }

    //endregion

    //region staff: departmentid - DepartmentModel
    getAgent(agentId: number): AgentModel {
        return DataUtil.getData(this.dataRepo, undefined, SF00501Constants.MAP_AGENT, agentId);
    }

    setAgent(agent: AgentModel, agentId: number): void {
        DataUtil.pushData(this.dataRepo, agent, agentId, SF00501Constants.MAP_AGENT);
    }

    clearAgents() {
        DataUtil.pushData(this.dataRepo, undefined, SF00501Constants.MAP_AGENT);
    }

    //endregion
}
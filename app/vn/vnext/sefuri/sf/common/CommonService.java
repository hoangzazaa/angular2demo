package vn.vnext.sefuri.sf.common;

import vn.vnext.sefuri.sf.dto.CommentDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.common.ActivityJson;

/**
 * Common service to resolve duplicate code.
 *
 * @author manhnv
 */
public class CommonService {
    /**
     * Method use to create activity model.
     *
     * @param comment    {@link CommentDto}
     * @param user       {@link UserDto}
     * @param department {@link DepartmentDto}
     * @return activity model {@link ActivityJson}
     */
    public static ActivityJson createActivity(final CommentDto comment, final UserDto user, final DepartmentDto department) {
        if (comment == null)
            return null;

        ActivityJson activityJson = new ActivityJson();
        activityJson.setModel(comment);
        activityJson.setUsername(user != null ? user.getUsername() : null);
        activityJson.setDepartmentName(department != null ? department.getDepartment() : null);

        return activityJson;
    }
}

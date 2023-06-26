package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.service.impl.SV901DBLoggingServiceImpl;

@ImplementedBy(SV901DBLoggingServiceImpl.class)
public interface SV901DBLoggingService {

    void sv90101ErrorMessage(String function, String message);

    void sv90102WarningMessage(String function, String message);

    void sv90103InfoMessage(String function, String message);

    void sv90104DebugMessage(String function, String message);

    void sv90105TraceMessage(String function, String message);

    void sv90106ButtonOperation(String function, String buttonName);

    void sv90107Transition(String function, String screenName);

    void sv90110Transition50xPage();
}

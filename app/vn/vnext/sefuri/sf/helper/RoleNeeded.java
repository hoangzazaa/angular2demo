package vn.vnext.sefuri.sf.helper;

import play.mvc.With;

import java.lang.annotation.*;

/**
 * Created by haipt on 9/19/2016.
 */
@With(RoleNeededAction.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE,
         ElementType.METHOD})
@Inherited
@Documented
public @interface RoleNeeded {
    String[] value() default {};
}
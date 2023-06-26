package vn.vnext.sefuri.sf.util;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.helper.SfrException;

/**
 * Created by Teddy on 10/09/2016.
 */
public class JsonUtil implements Constants {

    private static ObjectMapper mapper = new ObjectMapper();

    /** ロガー */
    private static Logger logger = LoggerFactory.getLogger(JsonUtil.class);

    static {
        mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

        BooleanSerializerModule module = new BooleanSerializerModule();
        mapper.registerModule(module);
        mapper.registerModule(new JodaModule());
        mapper.registerModule(new JavaTimeModule());
    }

    public static <T> T fromJson(String json, Class<T> klass) {
        try {
            return mapper.readValue(json, klass);
        } catch (IOException e) {
            // メッセージだけで十分なので、起因例外はログに記録しません。
            logger.info("JSON parse error. message=" + e.getMessage());
            return null;
        }
    }

    public static String toJsonString(Object object) throws SfrException {
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            logger.warn("JSON processing error. message=" + e.getMessage(), e);
            return STR_JSON_BLANK;
        }
    }

    static class BooleanSerializerModule extends SimpleModule {

        public BooleanSerializerModule() {
            this.addSerializer(new JsonSerializer<Boolean>() {
                @Override
                public Class<Boolean> handledType() {
                    return Boolean.class;
                }

                @Override
                public void serialize(Boolean value, JsonGenerator gen, SerializerProvider serializers) throws
                        IOException, JsonProcessingException {
                    if (value != null) {
                        gen.writeNumber(value ? 1 : 0);
                    }
                }
            });
        }
    }
}

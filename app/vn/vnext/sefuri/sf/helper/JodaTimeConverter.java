package vn.vnext.sefuri.sf.helper;

import org.joda.time.DateTime;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Date;

/**
 * Joda DateTime <-> JPA 2.1 converter.
 *
 * @author manhnv
 */
@Converter(autoApply = true)
public class JodaTimeConverter implements AttributeConverter<DateTime, Date> {
    @Override
    public Date convertToDatabaseColumn(final DateTime dateTime) {
        return dateTime != null ? dateTime.toDate() : null;
    }

    @Override
    public DateTime convertToEntityAttribute(final Date date) {
        return date != null ? new DateTime(date) : null;
    }
}

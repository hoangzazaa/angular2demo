package vn.vnext.sefuri.sf.module.jms.impl;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.vnext.sefuri.sf.module.jms.JmsApi;
import vn.vnext.sefuri.sf.module.jms.json.if0111.IF0111Json;
import vn.vnext.sefuri.sf.module.jms.json.if0121.IF0121Json;
import vn.vnext.sefuri.sf.module.jms.json.if0131.IF0131Json;
import vn.vnext.sefuri.sf.util.JsonUtil;
import vn.vnext.sefuri.sf.util.SettingUtil;

import javax.jms.*;

/**
 * Created by VuPT on 3/15/2017.
 */
public class JmsApiImpl implements JmsApi {

    private static final Logger logger = LoggerFactory.getLogger(JmsApiImpl.class);

    private ActiveMQConnectionFactory connectionFactory;

    public JmsApiImpl() {
        connectionFactory = new ActiveMQConnectionFactory(SettingUtil.getString(SETTING, BROCKER));
    }

    @Override
    public int callIF0111(IF0111Json json) {

        // send msg
        int result = sendJms("IF01-1-1", null, JsonUtil.toJsonString(json), null);
        return result;
    }

    @Override
    public int callIF0121(IF0121Json json) {
        // send msg
        int result = sendJms("IF01-2-1", "IF01-2-1-REPLY", JsonUtil.toJsonString(json), null);
        return result;
    }

    @Override
    public int callIF0131(IF0131Json json) {
        // send msg
        int result = sendJms("IF01-3-1", "IF01-3-1-REPLY", JsonUtil.toJsonString(json), null);
        return result;
    }

    private int sendJms(String queueName, String replyQueueName, String body, StringBuilder replyBody) {
        QueueConnection queueConnection = null;
        try {
            queueConnection = connectionFactory.createQueueConnection();
            QueueSession queueSession = queueConnection.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
            Queue queue = queueSession.createQueue(queueName);
            MessageProducer producer = queueSession.createProducer(queue);

            Queue replyQueue = null;
            if (replyQueueName != null) {
                QueueSession queueSession2 = queueConnection.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
                replyQueue = queueSession2.createQueue(replyQueueName);
            }
            queueConnection.start();

            TextMessage message = queueSession.createTextMessage();
            message.setText(body);
            producer.send(message);

            if (replyQueue != null) {
                String correlationId = message.getJMSMessageID();
                QueueReceiver receiver = queueSession.createReceiver(replyQueue, "JMSCorrelationID='" + correlationId + "'");
                Message receiveMsg = receiver.receive(TIMEOUT);

                if (receiveMsg == null) {
                    return RESULT_NG;
                }

                int resultCode = receiveMsg.getIntProperty("JMSResultCode");

                if (replyBody != null) {
                    replyBody.setLength(0);
                    String replyText = ((TextMessage) receiveMsg).getText();
                    if (replyText != null) {
                        replyBody.append(replyText);
                    }
                }

                return resultCode;
            } else {
                return RESULT_OK;
            }
        } catch (JMSException e) {
            logger.debug("jms error", e);
        } finally {
            if (queueConnection != null) {
                try {
                    queueConnection.close();
                } catch (JMSException e) {
                    logger.debug("jms error", e);
                }
            }
        }
        return RESULT_NG;
    }
}

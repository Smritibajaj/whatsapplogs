/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageStatus } from "@app/common/types/common.type";
import axios from "axios";
import dayjs from "dayjs";

export type Message = {
  id: string;
  body: any;
  date: string;
  timestamp: string;
  messageStatus: MessageStatus;
  isOpponent: boolean;
  actor?: string;
  type: string;
  baseType?: "request" | "response";
};

const messages: Message[] = [];

async function getChatData(id: string, offset: number) {
  const data = await axios.get(
    `https://us-central1-visof-new-vuja.cloudfunctions.net/middleware/conv/${id}`,
    {
      params: {
        limit: 20,
        offset: offset,
      },
    }
  );
  return data.data;
}
const getMessage = (datum: any): any => {
  const data = datum?.request?.entry?.[0]?.changes?.[0]?.value;
  const key = data?.messages?.[0]?.type;
  const response = datum.response;
  const messageType = [
    "audio",
    "contact",
    "document",
    "image",
    "location",
    "sticker",
    "text",
    "video",
  ];
  // text type message - https://developers.facebook.com/docs/whatsapp/api/messages/text
  if (messageType.includes(key)) {
    return {
      type: key,
      body:
        data?.messages?.[0]?.[key]?.body ??
        data?.messages?.[0]?.[key]?.link ??
        data?.messages?.[0]?.[key]?.id,
    };
  } else if (data?.messages?.[0]?.interactive) {
    const type = data?.messages?.[0]?.interactive?.type;
    if (type === "button_reply") {
      return {
        type,
        body: data?.messages?.[0]?.interactive.button_reply?.title,
      };
    }
    if (type === "list_reply") {
      return {
        type,
        body: {
          title: data?.messages?.[0]?.interactive?.list_reply?.title,
          description:
            data?.messages?.[0]?.interactive?.list_reply?.description,
        },
      };
    }
    if (type === "nfm_reply") {
      return {
        type,
        body: data?.messages?.[0]?.interactive?.nfm_reply?.response_json
          ? JSON.parse(
              data?.messages?.[0]?.interactive?.nfm_reply?.response_json
            )?.flow_token
          : "",
      };
    }
  } else if (response?.interactive?.type === "list") {
    return {
      baseType: "response",
      type: "list",
      body: response?.interactive,
    };
  } else if (response?.interactive?.type === "button") {
    return {
      baseType: "response",
      type: response?.interactive?.type,
      body: response?.interactive,
    };
  } else if (response?.type === "text") {
    return {
      type: response?.type,
      body: response?.text.body,
    };
  } else {
    return "not fetched properly";
  }
};

const getTimeStamp = (datum: any) => {
  const data = datum?.request?.entry?.[0]?.changes?.[0]?.value;
  if (data?.messages?.[0]?.timestamp) return data?.messages?.[0]?.timestamp;
};
export async function getMessages(id: string, offset: number): Promise<any> {
  const totalMessagesLength = messages.length;
  let randomNumber = Math.floor(Math.random() * totalMessagesLength);

  if (randomNumber > totalMessagesLength) randomNumber = totalMessagesLength;
  if (randomNumber === 1) randomNumber = 2; // so we always have atleast 1-2 messages.

  const data = await getChatData(id, offset);
  if (data?.length > 0) {
    const newData = data?.map?.((datum: any) => {
      return {
        ...getMessage(datum),
        actor: datum.actor,
        isOpponent: datum?.actor !== "user",
        id: datum?.request?.entry?.[0]?.changes?.[0]?.id,
        date: dayjs(getTimeStamp(datum)).format("DD/MM/YYYY"),
        timestamp: dayjs(getTimeStamp(datum)).format("HH:MM"),
        messageStatus: "DELIVERED",
      };
    });
    return newData;
  }
  return [];
}

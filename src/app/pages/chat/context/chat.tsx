/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { inbox } from "../data/inbox";
import { Inbox } from "@app/common/types/common.type";
import axios from "axios";

type User = {
  name: string;
  image: string;
};

type ChatContextProp = {
  user: User;
  inbox: Inbox[];
  activeChat?: Inbox;
  onChangeChat: (chat: Inbox) => void;
  containerRef: any;
  loading: boolean;
};

const initialValue: ChatContextProp = {
  user: { name: "Simmy Bajaj", image: "/assets/images/girl.jpeg" },
  inbox,
  onChangeChat() {
    throw new Error();
  },
  containerRef: null,
  loading:false
};

export const ChatContext = React.createContext<ChatContextProp>(initialValue);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChatProvider(props: { children: any }) {
  const { children } = props;
  const [user] = useState<User>(initialValue.user);
  const [pageNumber, setPageNumber] = useState(0);
  const [inbox, setInbox] = useState<Inbox[]>(initialValue.inbox);
  const [activeChat, setActiveChat] = useState<Inbox>();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(initialValue.containerRef);
  const handleChangeChat = (chat: Inbox) => {
    setActiveChat(chat);
  };

  const getUserData = async (offset) => {
    setLoading(true);
    const data = await axios.get(
      "https://us-central1-visof-new-vuja.cloudfunctions.net/middleware/users",
      {
        params: {
          limit: 20,
          offset,
        },
      }
    );

    const newData = data?.data?.map((datum: any) => {
      return {
        id: datum.phone,
        name: datum.name,
        image: "/assets/images/boy2.jpeg",
        lastMessage: "",
        notificationsCount: 0,
        messageStatus: "SENT",
        timestamp: "12:15",
        isPinned: false,
        isOnline: false,
      };
    });
    if (newData?.length) {
      setInbox((prevInbox) => [...prevInbox, ...newData]);
      setLoading(false);
    }
    return newData;
  };

  useEffect(() => {
    // Fetch data when pageNumber changes
    getUserData(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = containerRef?.current.scrollTop;
      if (
        currentScrollY > 0 &&
        currentScrollY >=
          containerRef.current?.scrollHeight -
            containerRef.current?.clientHeight
      ) {
        // Your scroll action here
        setPageNumber((prevPageNumber) => prevPageNumber + 1)
      }
    };

    if (containerRef.current) {
      containerRef?.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef?.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        inbox,
        activeChat,
        loading,
        containerRef,
        onChangeChat: handleChangeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => React.useContext(ChatContext);

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "@app/common/components/icons";
import useScrollToBottom from "./hooks/useScrollToBottom";
import { getMessages, Message } from "./data/get-messages";
import {
  ButtonBox,
  ChatMessage,
  ChatMessageFiller,
  ChatMessageFooter,
  Container,
  Date,
  DateWrapper,
  EncryptionMessage,
  MessageGroup,
  MainBox,
} from "./styles";
import { Box, Button } from "@mui/material";
import MessageDialog from "./Dialog";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

type MessagesListProps = {
  onShowBottomIcon: any;
  shouldScrollToBottom?: boolean;
  handleScroll: () => void;
};

export default function MessagesList(props: MessagesListProps) {
  const { onShowBottomIcon, shouldScrollToBottom, handleScroll } = props;
  const firstMsgRef = useRef<any>(null);
  const params = useParams();
  const [messages, setMessages] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const { containerRef, lastMessageRef } = useScrollToBottom(
    onShowBottomIcon,
    shouldScrollToBottom,
    params.id
  );

  const getMsgs = async (offset: number) => {
    if (params.id) {
      try {
        const msg = await getMessages(params.id, offset);
        setMessages((prevMessages) => [...prevMessages, ...msg]);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        if (offset === 0) {
          handleScroll();
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      getMsgs(0); // Initial call with offset 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    // Call getMsgs when the user reacts to the firstMsgRef after scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // If the firstMsgRef becomes visible after scrolling
          getMsgs(pageNumber); // Call getMsgs with the current number of messages as offset
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    if (firstMsgRef.current) {
      observer.observe(firstMsgRef.current);
    }

    return () => {
      if (firstMsgRef && firstMsgRef.current) {
        observer.unobserve(firstMsgRef?.current);
      }
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <EncryptionMessage ref={firstMsgRef}>
        <Icon id="lock" className="icon" />
        Messages are end-to-end encrypted. No one outside of this chat, not even
        WhatsApp, can read or listen to them. Click to learn more.
      </EncryptionMessage>
      <DateWrapper>
        <Date> TODAY </Date>
      </DateWrapper>
      <MessageGroup>
        {messages?.length > 0 &&
          messages?.map((message: Message, i: number) => {
            if (i === messages.length - 1) {
              return (
                <SingleMessage
                  key={message.id}
                  message={message}
                  ref={lastMessageRef}
                />
              );
            } else {
              return <SingleMessage key={message.id} message={message} />;
            }
          })}
      </MessageGroup>
    </Container>
  );
}

const normalMessage = [
  "audio",
  "contact",
  "document",
  "image",
  "location",
  "sticker",
  "text",
  "video",
  "nfm_reply",
  "button_reply",
];
const SingleMessage = forwardRef((props: { message: Message }, ref: any) => {
  const { message } = props;
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <ChatMessage
        key={message.id}
        className={
          message.isOpponent ? "chat__msg--received" : "chat__msg--sent"
        }
        ref={ref}
      >
        <Box
          p={2}
          display={"flex"}
          position={"relative"}
          flexDirection={"column"}
        >
          {normalMessage.includes(message.type) && <span>{message.body}</span>}
          {message.type === "list_reply" && (
            <div>
              <div>{message.body.title}</div>
              <div>{message.body.description}</div>
            </div>
          )}
          {message.baseType === "response" && message.type === "button" && (
            <div>
              {message?.body?.header?.type === "image" && (
                <img src={message.body.header?.image?.link} width="100%" />
              )}
              <div>{message.body.body.text}</div>
            </div>
          )}
          {message.baseType === "response" && message.type === "list" && (
            <div>
              <div>{message.body.body.text}</div>
            </div>
          )}
          <ChatMessageFiller />
          <ChatMessageFooter>
            <span>{message.timestamp}</span>
            {message.actor === "user" && (
              <Icon
                id={`${
                  message.messageStatus === "SENT" ? "singleTick" : "doubleTick"
                }`}
                className={`chat__msg-status-icon ${
                  message.messageStatus === "READ"
                    ? "chat__msg-status-icon--blue"
                    : ""
                }`}
              />
            )}
          </ChatMessageFooter>
        </Box>
        {message.baseType === "response" && message.type === "list" && (
          <Box
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.text.disabled}`,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ width: "100%" }}
              onClick={() => {
                setSelectedValue(message.body.action);
                handleClickOpen();
              }}
            >
              <FormatListBulletedIcon
                sx={{ fontSize: "12px", mx: 1 }}
                color="primary"
              />
              {message.body?.action?.button}
            </Button>
          </Box>
        )}
      </ChatMessage>
      {message.baseType === "response" && message.type === "button" && (
        <MainBox direction={"row"} gap={1} width={"100%"}>
          {message.body.action?.buttons?.map((button: any) => {
            return (
              <ButtonBox>
                <Button sx={{ mx: "auto", width: "100%" }}>
                  {button?.reply?.title}
                </Button>
              </ButtonBox>
            );
          })}
        </MainBox>
      )}
      <MessageDialog
        selectedValue={selectedValue}
        open={open && message.body.action?.sections?.length > 0}
        onClose={handleClose}
      />
    </>
  );
});

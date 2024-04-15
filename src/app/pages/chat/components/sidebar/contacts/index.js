/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@app/common/components/icons";
import { 
// Avatar,
AvatarWrapper, BottomContent, Contact, Content, MessageStatusIcon, MessageWrapper, Name, Subtitle, Time, TopContent, UnreadContact, } from "./styles";
import { Avatar } from "@mui/material";
export default function InboxContact(props) {
    const { onChangeChat, isActive } = props;
    const { name, lastMessage, timestamp } = props.inbox;
    const handleChangeChat = () => {
        if (onChangeChat) {
            onChangeChat(props.inbox);
        }
    };
    return (<Contact isActive={isActive} onClick={handleChangeChat}>
      <AvatarWrapper>
        {/* <Avatar src={image} /> */}
        <Avatar />
      </AvatarWrapper>
      <Content>
        <TopContent>
          <Name>{name}</Name>
          {timestamp && lastMessage ? <Time>{timestamp}</Time> : <Trailing {...props.inbox}/>}
        </TopContent>

        <BottomContent>
          <MessageWrapper>
            <Message {...props.inbox}/>
          </MessageWrapper>

          {timestamp && lastMessage && <Trailing {...props.inbox}/>}
        </BottomContent>
      </Content>
    </Contact>);
}
function Message(props) {
    const { lastMessage, messageStatus } = props;
    if (!lastMessage)
        return <></>;
    return (<>
      <MessageStatusIcon isRead={messageStatus === "READ"} id={messageStatus === "SENT" ? "singleTick" : "doubleTick"}/>
      <Subtitle>{lastMessage}</Subtitle>
    </>);
}
function Trailing(props) {
    const { isPinned, notificationsCount } = props;
    return (<div className="sidebar-contact__icons">
      {isPinned && <Icon id="pinned" className="sidebar-contact__icon"/>}

      {notificationsCount !== undefined && notificationsCount > 0 && (<UnreadContact>{notificationsCount}</UnreadContact>)}

      <button aria-label="sidebar-contact__btn">
        <Icon id="downArrow" className="sidebar-contact__icon sidebar-contact__icon--dropdown"/>
      </button>
    </div>);
}

import { useNavigate } from "react-router-dom";
// import { BsFillMoonFill, BsMoon } from "react-icons/bs";
// import SidebarAlert from "./alert";
import InboxContact from "./contacts";
// import OptionsMenu from "../option-menu";
import SearchField from "../search-field";
// import Icon from "@app/common/components/icons";
// import { useAppTheme } from "@app/common/theme";
import { Inbox } from "@app/common/types/common.type";
import { useChatContext } from "@app/pages/chat/context/chat";
import {
  // Actions,
  ContactContainer,
  Header,
  ImageWrapper,
  SidebarContainer,
  // ThemeIconContainer,
} from "./styles";
import { Avatar, Box, CircularProgress } from "@mui/material";

export default function Sidebar() {
  // const theme = useAppTheme();
  const navigate = useNavigate();
  const chatCtx = useChatContext();

  // const handleChangeThemeMode = () => {
  //   theme.onChangeThemeMode();
  // };

  const handleChangeChat = (chat: Inbox) => {
    chatCtx.onChangeChat(chat);
    navigate("/" + chat.id);
  };
  console.log(chatCtx);
  return (
    <SidebarContainer>
      <Header>
        <ImageWrapper>
          <Avatar />
        </ImageWrapper>
        {/* <Actions>
          <ThemeIconContainer onClick={handleChangeThemeMode}>
            {theme.mode === "light" ? <BsMoon /> : <BsFillMoonFill />}
          </ThemeIconContainer>
          <button aria-label="Status">
            <Icon id="status" className="icon" />
          </button>
          <button aria-label="New chat">
            <Icon id="chat" className="icon" />
          </button>
          <OptionsMenu
            iconClassName="icon"
            className="icon"
            ariaLabel="Menu"
            iconId="menu"
            options={[
              "New group",
              "Create a room",
              "Profile",
              "Archived",
              "Starred",
              "Settings",
              "Log out",
            ]}
          />
        </Actions> */}
      </Header>
      {/* <SidebarAlert /> */}
      <SearchField />
      <ContactContainer ref={chatCtx.containerRef}>
        <Box pb={10}>
          {chatCtx.inbox.map((inbox) => (
            <InboxContact
              key={inbox.id}
              inbox={inbox}
              isActive={inbox.id === chatCtx.activeChat?.id}
              onChangeChat={handleChangeChat}
            />
          ))}
          {chatCtx.loading && <Box display={'flex'} justifyContent={'center'} p={2}>
            <CircularProgress />
          </Box>}
        </Box>
      </ContactContainer>
    </SidebarContainer>
  );
}

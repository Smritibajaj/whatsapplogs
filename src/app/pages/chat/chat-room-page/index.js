import ChatLayout from "../layouts";
import Header from "./components/header";
import Footer from "./components/footer";
// import Sidebar from "./components/sidebar";
import Icon from "@app/common/components/icons";
import useChatRoom from "./hooks/useChatRoom";
//import ProfileSection from "./components/profile";
import MessagesList from "./components/messages-list";
//import SearchSection from "./components/search-section";
import useNavigateToChat from "./hooks/useNavigateToChat";
import { Container, Body, Background, FooterContainer, ScrollButton } from "./styles";
export default function ChatRoomPage() {
    const { activeInbox, handleMenuOpen, handleShowIcon, 
    // isProfileOpen,
    // isSearchOpen,
    isShowIcon, 
    // setIsProfileOpen,
    // setIsSearchOpen,
    setShouldScrollToBottom, shouldScrollToBottom, } = useChatRoom();
    useNavigateToChat(activeInbox);
    return (<ChatLayout>
      <Container>
        <Body>
          <Background />
          <Header title={activeInbox?.name ?? ""} image={activeInbox?.image ?? ""} subTitle={activeInbox?.isOnline ? "Online" : ""} onSearchClick={() => handleMenuOpen("search")} onProfileClick={() => handleMenuOpen("profile")}/>
          <MessagesList onShowBottomIcon={handleShowIcon} shouldScrollToBottom={shouldScrollToBottom} handleScroll={() => setShouldScrollToBottom(true)}/>
          <FooterContainer>
            {isShowIcon && (<ScrollButton onClick={() => setShouldScrollToBottom(true)}>
                <Icon id="downArrow"/>
              </ScrollButton>)}
            <Footer />
          </FooterContainer>
        </Body>
      </Container>
    </ChatLayout>);
}

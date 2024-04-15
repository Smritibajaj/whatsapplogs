// import Icon from "@app/common/components/icons";
// import OptionsMenu from "@app/pages/chat/components/option-menu";
import { 
// Action,
// Actions,
// actionStyles,
// Avatar,
AvatarWrapper, Container, Name, ProfileWrapper, Subtitle, } from "./styles";
import { Avatar } from "@mui/material";
export default function Header(props) {
    const { title, subTitle, onProfileClick } = props;
    return (<Container>
      <AvatarWrapper>
        {/* <Avatar src={image} /> */}
        <Avatar />
      </AvatarWrapper>
      <ProfileWrapper onClick={onProfileClick}>
        <Name>{title}</Name>
        {subTitle && <Subtitle>{subTitle}</Subtitle>}
      </ProfileWrapper>
      {/* <Actions>
          <Action onClick={onSearchClick}>
            <Icon id="search" className="icon search-icon" />
          </Action>
          <OptionsMenu
            styles={actionStyles}
            ariaLabel="Menu"
            iconId="menu"
            iconClassName="icon"
            options={[
              "Contact Info",
              "Select Messages",
              "Mute notifications",
              "Clear messages",
              "Delete chat",
            ]}
          />
        </Actions> */}
    </Container>);
}

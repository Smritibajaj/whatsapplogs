import ChatLayout from "../layouts";
//import Icon from "@app/common/components/icons";
import { useAppTheme } from "@app/common/theme";
import { Container, ImageWrapper, Title, Image, Text } from "./styles";
export default function UnSelectedChatPage() {
    const theme = useAppTheme();
    const getImageURL = () => {
        if (theme.mode === "light")
            return "/assets/images/entry-image-light.webp";
        return "/assets/images/entry-image-dark.png";
    };
    return (<ChatLayout>
      <Container>
        <ImageWrapper>
          <Image src={getImageURL()}/>
        </ImageWrapper>
        <Title>Binary WhatsApp Bot </Title>
        <Text>
          {/* Send and receive messages without keeping your phone online. <br />
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time. */}
        </Text>
        {/* <Text>
          <span>Built by</span>{" "}
          <Link target="_blank" href="https://github.com/Smritibajaj">
            Simmy Bajaj
          </Link>
          <IconWrapper>
            <Icon id="heart" />
          </IconWrapper>
        </Text> */}
      </Container>
    </ChatLayout>);
}

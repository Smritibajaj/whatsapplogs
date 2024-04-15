/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@app/common/components/icons";
import { CloseButton, Heading, Content, Header, Container } from "./styles";
export default function Sidebar(props) {
    const { title, isOpen = false, onClose, children } = props;
    return (<Container isOpen={isOpen}>
      <Header>
        <CloseButton onClick={onClose}>
          <Icon id="cancel" className="icon"/>
        </CloseButton>
        <Heading> {title} </Heading>
      </Header>
      <Content> {children} </Content>
    </Container>);
}

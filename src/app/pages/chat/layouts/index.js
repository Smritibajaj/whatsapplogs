import Sidebar from "../components/sidebar";
import { App, Content, Message } from "./styles";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChatLayout(props) {
    return (<App>
      <Message>Currently Only available on desktop or large devices 😊.</Message>
      <Content>
        <Sidebar />
        {props.children}
      </Content>
    </App>);
}

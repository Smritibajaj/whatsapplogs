/* eslint-disable @typescript-eslint/no-explicit-any */
import ListIcons from "./list-icons";
export default function Icon(props) {
    const { id, ...rest } = props;
    const currentSelectedIcon = ListIcons?.[id];
    return currentSelectedIcon ? currentSelectedIcon(rest) : null;
}

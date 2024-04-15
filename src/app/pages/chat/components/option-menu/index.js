import { useState } from "react";
import Icon from "@app/common/components/icons";
import useCloseMenu from "../../hooks/useCloseMenu";
import { Container, Button, Options, Option } from "./styles";
export default function OptionsMenu(props) {
    const [showOptions, setShowOptions] = useState(false);
    const ref = useCloseMenu(() => setShowOptions(false));
    const { iconId, options, ariaLabel, className, iconClassName, position = "left", showPressed = true, } = props;
    const getBtnClassName = () => {
        let _className = showOptions && showPressed ? "btn-pressed " : "";
        _className += className ?? "";
        return _className;
    };
    const getOptionsClassName = () => {
        let className = showOptions ? "active " : "";
        className += position === "right" ? "right" : "";
        return className;
    };
    const handleClick = () => {
        setShowOptions(!showOptions);
    };
    return (<Container ref={ref}>
      <Button aria-label={ariaLabel} className={getBtnClassName()} onClick={handleClick}>
        <Icon id={iconId} className={iconClassName}/>
      </Button>
      <Options className={getOptionsClassName()}>
        {options.map((option) => (<Option key={option}>{option}</Option>))}
      </Options>
    </Container>);
}

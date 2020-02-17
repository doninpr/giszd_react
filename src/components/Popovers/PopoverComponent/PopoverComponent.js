import React from "react";
import cx from "classnames";
import _ from "lodash";
import { Popover } from 'react-bootstrap';
import "./styles.css";

const PopoverComponent = React.forwardRef(
  ({ children, header, ...props }, ref) => {
    return (
      <Popover ref={ref} id="popover-component" {...props}>
      	<Popover.Title as="h3">{header}</Popover.Title>
        <Popover.Content>
        	{children}
        </Popover.Content>
      </Popover>
    );
  },
);

export default PopoverComponent;
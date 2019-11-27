import React from 'react';
import { withRouter } from 'next/router';

// used for Links that styles rely on if
// they're they "active link or not"
const ActiveLink = ({
  children, router, href, mobile,
}) => {
  const defaultColor = mobile ? '#FDFDFD' : '#5A5656';
  const style = {
    color: router.pathname === href ? '#8DCD89' : defaultColor,
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default withRouter(ActiveLink);

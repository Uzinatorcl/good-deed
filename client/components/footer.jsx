import React from 'react';

function Footer(props) {
  return (
    <footer onClick={() => props.setView('dashboard')} className="mainFooter">
      DASHBOARD
    </footer>
  );
}
export default Footer;

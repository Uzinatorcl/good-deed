import React from 'react';

function Footer(props) {
  return (
    <footer onClick={() => props.setView('dashboard')} className="mainFooter">
      BACK TO DASHBOARD
    </footer>
  );
}
export default Footer;

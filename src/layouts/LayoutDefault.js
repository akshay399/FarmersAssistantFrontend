import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const LayoutDefault = ({ children} ) => (
  // const {handleLogout} = props;

  <>
    <Header navPosition="right" className="" />
    <main className="site-content">

      
      {children}
    </main>
    <Footer />
  </>
);

export default LayoutDefault;  
import React from 'react';
// head is the same as head in html
// gives u metadata about ur site
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>My Store</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className='main-container'>{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;

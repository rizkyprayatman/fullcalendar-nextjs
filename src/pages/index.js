/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import NavbarSection from "@/components/Navbar/Navbar";
import React, { useRef, useEffect, useState } from 'react'
import Beranda from "@/components/Dashboard/Dashboard";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <>
      <Head>
        <title>Rizky Prayatman</title>
        <meta name="description" content="Web Personal Rizky Prayatman" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/icon/logoRP.png" />
      </Head>
      <NavbarSection />
      <Beranda />
    </>
  );
}

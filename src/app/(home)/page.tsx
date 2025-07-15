'use client'

import Image from "next/image";
import styles from "./styles.module.scss";
import { useState } from 'react';
import { connectClient } from "@/xrpl/xrplClient";

export default function Home() {

  const handleCheck = async () => {
    const result = await connectClient()
    console.log(result)
  }
  return (
    <div>
      <button onClick={handleCheck}>TESTE</button>
    </div>
  );
}

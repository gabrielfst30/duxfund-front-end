'use client'

import Image from "next/image";
import Link from "next/link"
import styles from "./styles.module.scss";
import { useState } from 'react';

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/nft" className={styles.nftLink}>
        Ver NFT
      </Link>
    </div>
  );
}

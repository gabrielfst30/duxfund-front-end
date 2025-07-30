// pages/index.tsx
"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { Contribute } from "@/components/Contribute/Contribute";
import { Lastest } from "@/components/Lastest/Lastest";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import { Navbar } from "@/components/Navbar/Navbar";

interface Contribution {
  amount: number;
  timestamp: string;
}

export default function Home() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  function handleSendContribution(amount: number) {
    const newContribution = {
      amount,
      timestamp: new Date().toISOString(), // gera data atual em ISO
    };
    setContributions((prev) => [newContribution, ...prev]); // adiciona nova contribuição no topo
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Navbar />
      </div>

      <div className={styles.content}>
        <div className={styles.leftContent}>
          <Contribute onSend={handleSendContribution} />
          <ProjectDetails />
        </div>

        <div className={styles.rightContent}>
          <Lastest contributions={contributions} />
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { Contribute } from "@/components/Contribute/Contribute";
import { Lastest } from "@/components/Lastest/Lastest";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import { Navbar } from "@/components/Navbar/Navbar";


export default function Home() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  // function handleSendContribution(amount: string) {
  //   const newContribution = {
  //     amount: Number(amount), // Convertendo string para number
  //     timestamp: new Date().toISOString(), // gera data atual em ISO
  //   };
  //   setContributions((prev) => [newContribution, ...prev]); // adiciona nova contribuição no topo
  // }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Navbar />
      </div>

      <div className={styles.content}>
        <div className={styles.leftContent}>
          <Contribute/>
          <ProjectDetails />
        </div>

        <div className={styles.rightContent}>
          <Lastest contributions={contributions} />
        </div>
      </div>
    </div>
  );
}

import styles from "./styles.module.scss";
import { Contribute } from "@/components/Contribute/Contribute";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import { Lastest } from "@/components/Lastest/Lastest";
import { Navbar } from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <Navbar />
      </div>

      <div className={styles.content}>
        <div className={styles.leftContent}>
          <div>
            <Contribute />
          </div>
          <div>
            <ProjectDetails />
          </div>
        </div>

        <div className={styles.rightContent}>
          <Lastest />
        </div>
      </div>
    </div>
  );
}

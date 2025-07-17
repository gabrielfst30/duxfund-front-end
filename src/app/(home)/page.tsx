import Image from "next/image";
import styles from "./styles.module.scss";
import { Contribute } from "@/components/Contribute/Contribute";
import { ProjectDetails } from "@/components/ProjectDetails/ProjectDetails";
import { Lastest } from "@/components/Lastest/Lastest";
import { Navbar } from "@/components/Navbar/Navbar";


export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <Contribute />
      </div>

      <div>
        <ProjectDetails />
      </div>

      <div>
        <Lastest />
      </div>
    </div>
  );
}
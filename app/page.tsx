"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { useRouter } from "next/navigation";

type Props = {};

const Home = (props: Props) => {
  const [email, setEmail] = useState("");
  const [uniqueId, setUniqueId] = useState<string | null>(null);
  // const router = useRouter();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:3000/api/students/getall"
      );

      // console.log("response.data: ", response.data);
      // console.log("response.data.students: ", response.data.students);
      const students: Student[] = response.data.students;

      let studentExists = false;

      for (const student of students) {
        // console.log("Email: ", student.email);
        if (email === student.email && !student.uniqueId) {
          // setUniqueId(uuidv4());
          studentExists = true;

          const uniqueId = uuidv4();

          const updatedStudent = {
            ...student,
            uniqueId: uniqueId,
          };

          const putResponse = await axios.put(
            `http://localhost:3000/api/students/${student.email}`,
            updatedStudent
          );
          console.log("Data updated on the server:", putResponse.data);

          setUniqueId(uniqueId);
        } else {
          console.log("email doesn't exist on the db");
        }
      }
    } catch (error) {
      console.log("Error fetching or processing data: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enter your Email:</h1>
        <input value={email} type="text" onChange={handleEmailChange} />
        <button type="submit">Get Certificate</button>
      </form>

      <Link href={"/verify"}>Verify Page</Link>

      {uniqueId && <p>Unique ID: {uniqueId}</p>}
    </div>
  );
};

export default Home;

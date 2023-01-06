import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getUser } from "../database/database";

const membersList = [
  {
    name: "Vicky",
    prMerge: 3,
    typeingSpeed: 26,
    keyboardOrMouse: "Low",
    leetcodeScore: 0,
  },
  {
    name: "Sagar",
    prMerge: 3,
    typeingSpeed: 16,
    keyboardOrMouse: "Low",
    leetcodeScore: 0,
  },
  {
    name: "Vikash",
    prMerge: 3,
    typeingSpeed: 7,
    keyboardOrMouse: "Low",
    leetcodeScore: 0,
  },
  {
    name: "Harsh",
    prMerge: 0,
    typeingSpeed: 0,
    keyboardOrMouse: "Low",
    leetcodeScore: 0,
  },
  {
    name: "Saransh",
    prMerge: 0,
    typeingSpeed: 0,
    keyboardOrMouse: "Low",
    leetcodeScore: 0,
  },
];

function bubbleSort(membersList) {
  for (let i = 0; i < membersList.length; i++) {
    for (let j = 0; j < membersList.length - i - 1; j++) {
      if (membersList[j + 1].prMerge >= membersList[j].prMerge) {
        [membersList[j + 1], membersList[j]] = [
          membersList[j],
          membersList[j + 1],
        ];
      }
    }
  }
  return membersList;
}

bubbleSort(membersList);

export default function Home() {
  const [members, setMembers] = useState(membersList);
  const [list, setList] = useState([]);

  useEffect(() => {
    getUser(setList);
  }, []);

  return <LeaderBoard members={members} />;
}

function LeaderBoard(members) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <div>
            <h3>Epvi Engineering Leader Board</h3>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>PR Merge</th>
                  <th>Name</th>
                  <th>Typeing Speed</th>
                  <th>Keyboard Use</th>
                  <th>Leetcode Score</th>
                </tr>
              </thead>
              <tbody>
                {members.members.map((member, i) => (
                  <tr key={i}>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {i + 1}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {member.prMerge}
                    </td>
                    <td>{member.name}</td>
                    <td style={{ textAlign: "center" }}>
                      {member.typeingSpeed}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {member.keyboardOrMouse}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {member.leetcodeScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

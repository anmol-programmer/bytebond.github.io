// BYTEBOND Syllabus Data (Edit/Add content anytime)
window.BYTEBOND = {
  meta: {
    university: "B.R.A. Bihar University, Muzaffarpur",
    program: "BCA (Semester System)",
    pdf: "syllabus.pdf"
  },

  semesters: [
    {
      sem: 1,
      subjects: [
        { code:"BCA-101", name:"Mathematical Foundation" },
        { code:"BCA-102", name:"Computer Fundamentals" },
        { code:"BCA-103", name:"Business Communication & Information System" },
        { code:"BCA-104", name:"C Programming" },
        { code:"BCA-105", name:"Lab on DOS & Windows" },
        { code:"BCA-106", name:"Lab on C" }
      ]
    },
    {
      sem: 2,
      subjects: [
        { code:"BCA-201", name:"Discrete Mathematics" },
        { code:"BCA-202", name:"Computer Architecture" },
        { code:"BCA-203", name:"Data Structure through C" },
        { code:"BCA-204", name:"System Analysis & Design" },
        { code:"BCA-205", name:"Lab on MS-Office" },
        { code:"BCA-206", name:"Lab on Data Structure through C" }
      ]
    },
    {
      sem: 3,
      subjects: [
        { code:"BCA-301", name:"Fundamentals of Management & Business Accounting" },
        { code:"BCA-302", name:"Database Management System" },
        { code:"BCA-303", name:"OOP using C++" },
        { code:"BCA-304", name:"Numerical Methodology" },
        { code:"BCA-305", name:"Lab on DBMS (SQL/MS-ACCESS)" },
        { code:"BCA-306", name:"Lab on C++" }
      ]
    },
    {
      sem: 4,
      subjects: [
        { code:"BCA-401", name:"Java Programming" },
        { code:"BCA-402", name:"Computer Graphics & Multimedia" },
        { code:"BCA-403", name:"Operating System & Linux" },
        { code:"BCA-404", name:"Software Engineering Principles" },
        { code:"BCA-405", name:"Lab on Java Programming" },
        { code:"BCA-406", name:"Lab on Computer Graphics & Linux" }
      ]
    },
    {
      sem: 5,
      subjects: [
        { code:"BCA-501", name:"Relational Database Management System" },
        { code:"BCA-502", name:"Artificial Intelligence through Python" },
        { code:"BCA-503", name:"Web Technology (HTML, JS, CSS)" },
        { code:"BCA-504", name:"Computer Network, Security & Cyber Law" },
        { code:"BCA-505", name:"Lab on Oracle" },
        { code:"BCA-506", name:"Lab on Python & Web Technology" }
      ]
    }
  ],

  // Units + explanations (Add more over time)
  // Key format: `${sem}|${code}`
  topics: {
    
    // SEM 1
    "1|BCA-104": [
      {
        unit: "Unit I",
        title: "C Basics: Tokens, Data Types, Operators",
        explain: `C programs are built from tokens (keywords, identifiers, constants, operators).
Data types decide memory + operations (int, float, char). Operators perform computations.`,
        exampleTitle: "Example: Area of circle",
        exampleCode:
`#include <stdio.h>
int main(){
  float r = 5, area;
  area = 3.14159f * r * r;
  printf("Area = %.2f", area);
  return 0;
}`
      },
      {
        unit:"Unit II",
        title:"Decision Making & Loops (if/else, switch, for/while/do-while)",
        explain:`Use if/else for conditions. Use switch for multiple fixed choices.
Loops repeat tasks: for (known count), while (condition based), do-while (runs at least once).`,
        exampleTitle:"Example: Check even/odd",
        exampleCode:
`#include <stdio.h>
int main(){
  int n=7;
  if(n%2==0) printf("Even");
  else printf("Odd");
  return 0;
}`
      },
      {
        unit:"Unit III",
        title:"Functions & Parameter Passing (call by value/reference idea)",
        explain:`Functions break program into reusable blocks.
In C, arguments are passed by value, but you can simulate pass-by-reference using pointers.`,
        exampleTitle:"Example: Swap using pointers",
        exampleCode:
`#include <stdio.h>
void swap(int *a,int *b){ int t=*a; *a=*b; *b=t; }
int main(){
  int x=10,y=20;
  swap(&x,&y);
  printf("%d %d", x, y);
}`
      }
    ],

    "1|BCA-102": [
      { unit:"Unit I", title:"Introduction to Computers", explain:"History, generations, types of computers, PCs." },
      { unit:"Unit II", title:"Computer Organization & Memory", explain:"CPU, RAM/ROM, EPROM/PROM." },
      { unit:"Unit III", title:"I/O Devices & Storage", explain:"Keyboard/mouse, monitors, printers, HDD, CD/DVD." },
      { unit:"Unit IV", title:"Software & OS", explain:"System vs application software; OS types; compilers/interpreters." },
      { unit:"Unit V", title:"Algorithms & Flowcharts", explain:"Flowchart symbols, pseudo-code, decision tables/trees." },
      { unit:"Unit VI", title:"Programming Techniques & Security Basics", explain:"Top-down/bottom-up; looping; security & virus basics." }
    ],

    // SEM 3 DBMS (your PDF has full units)
    "3|BCA-302": [
      {
        unit:"Unit I",
        title:"DBMS Basics & Architecture",
        explain:`DBMS helps store and manage data with less redundancy and better security.
Architecture (ANSI/SPARC 3-level): External, Conceptual, Internal → gives data independence.`,
        exampleTitle:"Real example",
        exampleCode:`Think of a college DB:
Students(roll, name, sem), Subjects(code, name), Marks(roll, code, marks).`
      },
      {
        unit:"Unit II",
        title:"ER Model → Tables",
        explain:`ER model is used to design database.
Entities become tables, attributes become columns, relationships become foreign keys.`,
        exampleTitle:"Example: Student–Course",
        exampleCode:
`Student(roll PK, name)
Course(code PK, title)
Enroll(roll FK -> Student, code FK -> Course)`
      },
      {
        unit:"Unit IV",
        title:"Normalization (1NF–BCNF)",
        explain:`Normalization removes redundancy and update anomalies.
2NF removes partial dependency, 3NF removes transitive dependency.`,
        exampleTitle:"Example: 2NF",
        exampleCode:
`Bad: Marks(roll, name, subCode, subName, marks)
Fix:
Student(roll, name)
Subject(subCode, subName)
Marks(roll, subCode, marks)`
      },
      {
        unit:"Unit V",
        title:"SQL (DDL/DML) + Queries",
        explain:`DDL: CREATE/ALTER/DROP. DML: INSERT/UPDATE/DELETE/SELECT.
Use WHERE, GROUP BY, HAVING, JOIN for powerful queries.`,
        exampleTitle:"SQL Example",
        exampleCode:
`CREATE TABLE Student(roll INT PRIMARY KEY, name VARCHAR(50));
INSERT INTO Student VALUES(1,'Aman');
SELECT * FROM Student WHERE roll=1;`
      }
    ],

    // SEM 4 OS & Linux units (from your PDF)
    "4|BCA-403": [
      { unit:"Unit I", title:"OS Overview", explain:"OS manages hardware & provides services to programs." },
      {
        unit:"Unit II",
        title:"Processes & States",
        explain:`A process is a program in execution.
Common states: New, Ready, Running, Waiting, Terminated.`,
        exampleTitle:"Example",
        exampleCode:`A browser tab (Running) → waiting for network (Waiting) → back to Ready.`
      },
      {
        unit:"Unit VI",
        title:"CPU Scheduling",
        explain:`Scheduling decides which ready process gets CPU.
Algorithms: FCFS, SJF, Priority, Round Robin.`,
        exampleTitle:"Example: Round Robin idea",
        exampleCode:`Each process gets fixed time quantum (e.g., 2ms). After that it goes to end of queue.`
      },
      {
        unit:"Unit VIII",
        title:"Linux + Shell Programming",
        explain:`Linux basics: file structure, users, processes, commands.
Shell scripting: variables, if/else, case, loops. (Matches your unit list)`,
        exampleTitle:"Example: shell if-else",
        exampleCode:
`#!/bin/sh
n=10
if [ $n -gt 5 ]; then
  echo "Greater than 5"
else
  echo "5 or less"
fi`
      }
    ],

    // SEM 5 CN (outline from your PDF)
    "5|BCA-504": [
      {
        unit:"Unit I",
        title:"OSI Model + TCP/IP",
        explain:`OSI has 7 layers (Physical → Application). TCP/IP is practical model used on internet.`,
        exampleTitle:"Example mapping",
        exampleCode:`HTTP → Application, TCP → Transport, IP → Network, Ethernet → Data Link/Physical`
      },
      {
        unit:"Unit IV",
        title:"Network Security Basics + Symmetric Encryption",
        explain:`Security goals: confidentiality, integrity, availability.
Symmetric crypto uses same key (DES/3DES/AES).`,
        exampleTitle:"AES concept",
        exampleCode:`Sender + receiver share same secret key; fast for bulk data encryption.`
      }
    ]
    
  },

  // Simple quiz demo (you can expand)
  quizSets: [
    {
      title: "DBMS Quick Quiz",
      sem: 3,
      code: "BCA-302",
      questions: [
        {
          q: "Which command removes all rows but keeps table structure?",
          options: ["DROP", "TRUNCATE", "REMOVE", "ERASE"],
          answer: 1
        },
        {
          q: "3NF mainly removes which dependency?",
          options: ["Partial", "Transitive", "Multi-valued", "None"],
          answer: 1
        }
      ]
    }
  ]
};

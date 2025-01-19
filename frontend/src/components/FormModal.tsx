"use client"

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
// import TeacherForm from "./Forms/TeacherForm";
// import StudentForm from "./Forms/StudentForm";

const TeacherForm = dynamic(() => import("./Forms/TeacherForm"), {
    loading: () => <h1>Loading . . .</h1>,
});
const StudentForm = dynamic(() => import("./Forms/StudentForm"), {
    loading: () => <h1>Loading . . .</h1>,
});

const ParentForm = dynamic(() => import("./Forms/ParentForm"));
const ClassForm = dynamic(() => import("./Forms/ClassForm"));
const ResultForm = dynamic(() => import("./Forms/ResultForm"));
const EventForm = dynamic(() => import("./Forms/EventForm"));
const Assignmentform = dynamic(() => import("./Forms/AssignmentForm"));
const ExamForm = dynamic(() => import("./Forms/ExamForm"));
const SubjectForm = dynamic(() => import("./Forms/SubjectForm"));
const AnnouncementForm = dynamic(() => import("./Forms/AnnouncementForm"));
const AttendanceForm = dynamic(() => import("./Forms/AttendanceForm"));



const forms:{
    [key:string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
    teacher: (type, data) => <TeacherForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />,
    parent: (type, data) => <ParentForm type={type} data={data} />,
    class: (type, data) => <ClassForm type={type} data={data} />,
    result: (type, data) => <ResultForm type={type} data={data} />,
    event: (type, data) => <EventForm type={type} data={data} />,
    assignment: (type, data) => <Assignmentform type={type} data={data} />,
    exam: (type, data) => <ExamForm type={type} data={data} />,
    subject: (type, data) => <SubjectForm type={type} data={data} />,
    announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
    attendance: (type, data) => <AttendanceForm type={type} data={data} />,
};

const FormModal = ({table, type, data, id} : {
    table: 
    | "teacher" 
    | "student" 
    | "parent"
    | "subject"
    | "class"
    | "exam"
    | "event"
    | "assignment"
    | "result"
    | "attendance"
    | "announcement";
    type:"create" | "update" | "delete";
    data? : any;
    id?: number;
}) => {

    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky": "bg-lamaPurple";

    const Form = ()=> {
        return type === "delete" && id ? (
        <form action="" className="p-4 flex flex-col gap-4">
            <span>All data will be lost. Are you sure you want to delete this {table}?</span>
            <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
        </form>
    ) : type === "create" || type ==="update" ? (
        forms[table](type, data)
    ) : (
        "Form not found!"
    );
    }

    const [open, setOpen] = useState(false);
    return ( 
        <>
            <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`} onClick={()=>setOpen(true)}>
                <Image src={`/${type}.png`} alt="" width={16} height={16} />  
            </button>
            {open && (
                <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center ">
                    <div className="bg-white p-4 rounded-md relative w-[50%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <Form/>
                        <div className="absolute top-4 right-4 cursor-pointer " onClick={()=>setOpen(false)}>
                            <Image src="/close.png" alt="" width={14} height={14} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default FormModal;
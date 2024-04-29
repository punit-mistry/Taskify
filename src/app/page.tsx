'use client'
import { Button } from "@/components/ui/button";
import Modal from "@/components/TaskModal";
import { useState } from "react";
const Page = () => {
  const [newArray, setNewArray] = useState([0]);
  const addNewTask =()=>{
    setNewArray([...newArray,0]);
  }
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row-reverse px-5 py-2">
        <Button onClick={addNewTask}> Add Task</Button>
      </div>
      <div className="flex w-full">

      {newArray.map((keys) => (
        <div className="w-1/4 hover:shadow-2xl hover:cursor-pointer transition-shadow border-2 shadow-black m-5 flex items-center justify-center p-5 rounded-2xl" key={keys}>
          <Modal/>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Page;

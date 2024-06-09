"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/TaskModal";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useToast } from "@/components/ui/use-toast";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoMdRefreshCircle } from "react-icons/io";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Page = () => {
  const { toast } = useToast();

  const [newArray, setNewArray] = useState<any>([]);
  const [loadingArray, setloadingArray] = useState<any>(new Array(6).fill(0));
  const [loading, setLoading] = useState<boolean>(false);
  const [taskCountData, setTaskCountData] = useState<any[]>([]);
  const addNewTask = async () => {
    const { data, error } = await supabase
      .from("taskify")
      .insert([{ task_name: new Date().toDateString() }])
      .select();
    if (data) {
      const updatedArray = [...newArray, ...data];
      setNewArray(updatedArray);
      processTaskData(updatedArray); // Update task count data// Update task count data
      toast({
        title: "Success !!",
        description: "New Task Added ..",
      });
    } else if (error) {
      toast({
        variant: "destructive",
        title: "Error !!",
        description: "new error ",
      });
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchTask();
  }, []);
  
  const fetchTask = async () => {
    let { data: taskify, error } = await supabase.from("taskify").select("*");
    setNewArray(taskify);
    processTaskData(taskify)
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const processTaskData = (tasks: any) => {
    const taskCount = tasks.reduce((acc:any, task:any) => {
      const date = new Date(task.task_name).toDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    
    const taskCountArray = Object.keys(taskCount).map(date => ({
      date,
      count: taskCount[date]
    }));

    setTaskCountData(taskCountArray);
  };
  const handleDelete = async(id:number,index:number) => {
    setLoading(true);

console.log(id)
    const { error } = await supabase
      .from("taskify")
      .delete()
      .eq("id", id);

      if(error) {
        toast({
          variant: "destructive",
          title: "Error !!",
          description: error.message,
        });
      }else{

        toast({
          title: "Success !!",
          description: "Task Deleted  ..",
        });

        const updateTask = [...newArray]; // Create a copy of newArray using spread syntax
        updateTask.splice(index, 1); // Remove one element at the specified index
        console.log(updateTask);
        setNewArray(updateTask); // Update the state with the modified array
      setLoading(false); 
      }
  };

  const refresh = async () => {
    setLoading(true);
    fetchTask();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return (
    <div className="flex flex-col w-full max-h-[90vh]  ">
      <div className="flex flex-row-reverse gap-4 px-5 py-2">
        <Button onClick={addNewTask}> Add Task</Button>
        <Button className="gap-2" onClick={refresh}> <IoMdRefreshCircle size={16}/>Refresh</Button>
      </div>
      {/* max-h-[40vh] */}
      <div className="flex w flex-col md:flex-row flex-wrap justify-center m-4 md:m-0 gap-4 overflow-auto">
        {loading &&
          loadingArray.map((keys: number) => (
            <div
              key={keys}
              className=" bg-gray-500 h-32 animate-pulse w-full md:w-[32.33%] hover:shadow-2xl hover:cursor-pointer transition-shadow border-2 shadow-black m-1  flex items-center justify-center p-5 rounded-2xl"
            ></div>
          ))}
        {!loading &&
          newArray.length > 0 &&
          newArray.map((res: any, keys: number) => (
            <div
              className="flex-col w-full md:w-[32.33%] h-32 hover:shadow-2xl hover:cursor-pointer transition-shadow border-2 shadow-black flex items-center px-5 pb-2 rounded-2xl"
              key={keys}
            >
              <div className="w-full flex justify-between pt-2">
                <span className="font-bold">{keys + 1}.</span>
                <Button
                  variant="outline"
                  onClick={() => handleDelete(res.id,keys)}
                >
                  <MdOutlineDeleteOutline />
                </Button>
              </div>
              <div>{res ? <Modal selectedTask={res} /> : null}</div>
            </div>
          ))}
      </div>
      <div className="m-5">
        {/* <Graph /> */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={taskCountData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="black" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Page;

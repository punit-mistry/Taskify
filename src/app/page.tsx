"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/TaskModal";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useToast } from "@/components/ui/use-toast"

const Page = () => {
  const { toast } = useToast()

  const [newArray, setNewArray] = useState<any>([]);
  const [loadingArray, setloadingArray] = useState<any>(new Array(6).fill(0));
  const [loading, setLoading] = useState<boolean>(false);
  const addNewTask = async () => {
    const { data, error } = await supabase
      .from("taskify")
      .insert([{"task_name":new Date().toDateString()}])
      .select();
      if (data){
        setNewArray([...newArray,data]);
        toast({
          title: "Success !!",
          description: "New Task Added ..",
        })
      }else if (error) {
        toast({
          variant: "destructive",
          title: "Error !!",
          description: "new error ",
        })
      }
  };
  useEffect(() => {
    setLoading(true);
    fetchTask();
  }, []);
  const fetchTask = async () => {

    let { data: taskify, error } = await supabase.from("taskify").select("*");
    setNewArray(taskify);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row-reverse px-5 py-2">
        <Button onClick={addNewTask}> Add Task</Button>
      </div>
      <div className="flex w flex-col md:flex-row flex-wrap justify-center m-4 md:m-0">
        {
          loading && loadingArray.map((keys:number)=>(<div key={keys} className=" bg-gray-500 h-32 animate-pulse w-full md:w-[32.33%] hover:shadow-2xl hover:cursor-pointer transition-shadow border-2 shadow-black m-1  flex items-center justify-center p-5 rounded-2xl"
          >
            
            </div>))
        }
        {!loading && newArray.length> 0 && newArray.map((res:any, keys:number) => (
          <div
            className="w-full md:w-[32.33%] hover:shadow-2xl hover:cursor-pointer transition-shadow border-2 shadow-black m-1  flex items-center justify-center p-5 rounded-2xl"
            key={keys}
          >
            {res? <Modal selectedTask={res} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/utils/supabase";
import { useToast } from "@/components/ui/use-toast"

function Modal({ selectedTask }: any) {
  const { toast } = useToast()
  const initialCheckBox = selectedTask?.subtask?.length > 0 ? new Array(selectedTask.subtask.length).fill(0) : [0];
  const [newCheckBox, setNewCheckBox] = useState(initialCheckBox);
  const [Tasks, setTasks] = useState(selectedTask?.subtask?.length > 0 ? selectedTask.subtask : [{ task: "", isChecked: false }]);

  const addNewTask = () => {
    setNewCheckBox([...newCheckBox, 0]);
  };

  const handleChange = (e: any, index: number) => {
    const { value} = e.target;
    setTasks((prevTasks: any) => {
      const newTasks = [...prevTasks];
      newTasks[index] = { ...newTasks[index], task:value };
      return newTasks;
    });
  };

  const handleCheckBox =(e: any, index: number) => {
    setTasks((prevTasks: any) => {
      const newTasks = [...prevTasks];
      newTasks[index] = { ...newTasks[index],isChecked: !newTasks[index].isChecked };
      return newTasks;
    });
  };

  const submitTask = async () => {
    const { data: newSubmitRecord, error } = await supabase
      .from("taskify")
      .update({ subtask: Tasks })
      .eq("id", selectedTask.id)
      .select();
    console.log(newSubmitRecord);
    toast({
      title: "Success !!",
      description: "Changes Submited..",
    })
    if (error) {
      toast({
        variant: "destructive",
        title: "Error !!",
        description: "new error ",
      })
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {selectedTask
            ? new Date(selectedTask.created_at).toDateString() === "Invalid Date"
              ? "New Task Added !!"
              : new Date(selectedTask.created_at).toDateString()
            : "View"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Today&apos;s Task{selectedTask.id}</DialogTitle>
          <DialogDescription>
            Effortlessly manage your daily agenda with Today&apos;s Task
          </DialogDescription>
        </DialogHeader>
        <div className="h-[28vh] max-h-[28vh] overflow-auto flex flex-col gap-2">
          {newCheckBox.map((_, index) => (
            <div
              className="flex gap-2 items-center my-0.5"
              key={index}
            >
              <Checkbox
                id={`terms-${index}`}
                checked={Tasks[index] ? Tasks[index].isChecked : false}
                onClick={(e) => handleCheckBox(e, index)}
              />
              <label
                htmlFor={`terms-${index}`}
                className="text-sm font-medium"
              >
                <input
                  type="text"
                  value={Tasks[index] ? Tasks[index].task : ""}
                  onChange={(e) => handleChange(e, index)}
                  className="h-[1.5rem] rounded-sm py-0 px-2"
                  placeholder="Add new Task"
                />
              </label>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={addNewTask}
          >
            Add New Task
          </Button>
          <Button
            type="submit"
            onClick={submitTask}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;

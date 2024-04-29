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

function Modal({ data }) {
  const initialCheckBox = data.subtask.length > 0 ? new Array(data.subtask.length).fill(0) : [0];
  const [newCheckBox, setNewCheckBox] = useState(initialCheckBox);
  const [Tasks, setTasks] = useState(data.subtask.length > 0 ? data.subtask : [{ task: "", isChecked: false }]);

  const addNewTask = () => {
    setNewCheckBox([...newCheckBox, 0]);
    console.log("Adding new task", newCheckBox, Tasks);
  };

  const handleChange = (e, index) => {
    const { checked } = e.target;
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index] = { ...newTasks[index], isChecked: checked };
      return newTasks;
    });
  };

  const submitTask = async () => {
    const { data: newSubmitRecord, error } = await supabase
      .from("taskify")
      .update({ subtask: Tasks })
      .eq("id", data.id)
      .select();
    console.log(newSubmitRecord);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {data
            ? new Date(data.created_at).toDateString() === "Invalid Date"
              ? "New Task Added !!"
              : new Date(data.created_at).toDateString()
            : "View"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Today's Task</DialogTitle>
          <DialogDescription>
            Effortlessly manage your daily agenda with 'Today's Task'
          </DialogDescription>
        </DialogHeader>
        {JSON.stringify(Tasks)}
        <div className="h-[28vh] max-h-[28vh] overflow-auto flex flex-col gap-2">
          {newCheckBox.map((_, index) => (
            <div
              className="flex gap-2 items-center my-0.5"
              key={index}
            >
              <Checkbox
                id={`terms-${index}`}
                checked={Tasks[index] ? Tasks[index].isChecked : false}
                onChange={(e) => handleChange(e, index)}
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

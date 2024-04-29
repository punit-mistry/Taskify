"use client";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
function Modal() {
  const [newCheckBox, setNewCheckBox] = useState([0]);
  const addNewTask = () => {
    setNewCheckBox([...newCheckBox, 0]);
    console.log("Adding new task", newCheckBox);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Today's Task</DialogTitle>
          <DialogDescription>
            Effortlessly manage your daily agenda with 'Today's Task'
          </DialogDescription>
        </DialogHeader>
        <div className="h-[28vh] max-h-[28vh] overflow-auto flex flex-col gap-2">
          {newCheckBox.map((keys) => (
            <div className="flex gap-2 items-center my-0.5" key={keys}>
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed  peer-disabled:opacity-70"
              >
                <Input className="h-[1.5rem] rounded-sm py-0 px-2" placeholder="Add new Task's"/>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;

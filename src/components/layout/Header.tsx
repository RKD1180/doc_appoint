import React from "react";
import { Button } from "../ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AppointmentForm from "../Shared/AppointmentForm";

const Header = () => {
  return (
    <div className="flex justify-between items-center m-3">
      <div>
        <h2>Date</h2>
      </div>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button >Create Appointment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Fill the data</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <AppointmentForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Header;

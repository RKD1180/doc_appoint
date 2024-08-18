import React from 'react';
import { Dialog, DialogContent, DialogTitle, } from '@radix-ui/react-dialog';
import { DialogHeader } from '../ui/dialog';

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: any; // Replace with a more specific type if available
}

const EventDialog: React.FC<EventDialogProps> = ({ isOpen, onClose, eventDetails }) => {
  if (!eventDetails) {
    return null; // Render nothing if no event details are provided
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p><strong>Title:</strong> {eventDetails.title}</p>
          <p><strong>Start:</strong> {eventDetails.start.toString()}</p>
          <p><strong>End:</strong> {eventDetails.end.toString()}</p>
          <p><strong>Gender:</strong> {eventDetails.gender}</p>
          <p><strong>Age:</strong> {eventDetails.age}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;

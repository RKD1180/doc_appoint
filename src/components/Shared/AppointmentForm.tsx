import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { addAppointment } from '@/redux/appointmentsSlice';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { v1 as uuidv1 } from 'uuid';

// Define schema with Zod for form validation
const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  gender: z.string().nonempty("Gender is required"),
  age: z.string().nonempty("Age is required"),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
});

const AppointmentForm = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: '',
      age: '',
      date: '',
      time: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const id = uuidv1();
    const newData = { ...values, id };
    dispatch(addAppointment(newData));
  };

  return (
    <div className="w-full h-[80vh] overflow-auto">
      <div className="border p-3 rounded flex items-center justify-center shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      {...field}
                      className="w-full border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter gender"
                      {...field}
                      className="w-full border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter age"
                      {...field}
                      className="w-full border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="w-full border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      {...field}
                      className="w-full border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AppointmentForm;

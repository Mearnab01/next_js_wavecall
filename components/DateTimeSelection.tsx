"use client";
import { motion } from "framer-motion";
import ReactDatePicker from "react-datepicker";
import { Textarea } from "./ui/textarea";
import "react-datepicker/dist/react-datepicker.css";

type DateTimeSelectionProps = {
  values: {
    description?: string;
    dateTime?: Date;
    [key: string]: any;
  };
  setValues: (values: any) => void;
};

const DateTimeSelection = ({ values, setValues }: DateTimeSelectionProps) => {
  return (
    <div className="space-y-6">
      {/* Description Field */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-2.5"
      >
        <label className="text-base font-medium text-white">
          Add a description:
        </label>
        <Textarea
          className="min-h-[120px] border-2 
          focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2
          transition-all duration-200 rounded-xl p-4 shadow-sm"
          onChange={(e) => {
            setValues({ ...values, description: e.target.value });
          }}
        />
      </motion.div>

      {/* Date Picker */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col gap-2.5"
      >
        <label className="text-base font-medium text-white">
          Select Date and Time
        </label>
        <div className="relative">
          <ReactDatePicker
            selected={values.dateTime}
            onChange={(date) => setValues({ ...values, dateTime: date! })}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy hh:mm aa"
            className="w-full rounded-xl bg-transparent p-4 pr-10 border-2
            focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2
            transition-all duration-200 shadow-sm"
            calendarClassName="bg-dark-2 border border-dark-4 rounded-xl shadow-2xl 
            animate-fade-in"
            dayClassName={(date) =>
              date.getDate() === values.dateTime?.getDate()
                ? "bg-sky-500/90 text-white rounded-full"
                : "hover:bg-dark-4/50 text-white"
            }
            popperClassName="!z-[1000]"
            wrapperClassName="w-full"
          />
          <motion.div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-sky-400/80"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DateTimeSelection;

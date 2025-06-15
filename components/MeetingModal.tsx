"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { MeetingModalProps } from "@/types";

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  buttonText,
  handleClick,
  image,
  buttonIcon,
  children,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 🔥 Blur everything behind the modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
            />

            {/* 🧊 Modal Content */}
            <DialogContent className="z-50 bg-transparent border-none flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative mx-auto w-full max-w-md"
              >
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-900 shadow-2xl">
                  {/* Decorative glowing blobs */}
                  <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-purple-700/20" />
                  <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-indigo-700/20" />

                  <div className="relative z-10 p-8">
                    {/* Optional image */}
                    {image && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 flex justify-center"
                      >
                        <img
                          src={image}
                          alt="Meeting illustration"
                          className="h-32 w-32 object-contain"
                        />
                      </motion.div>
                    )}

                    {/* Modal title + description */}
                    <DialogHeader className="mb-6 text-center">
                      <DialogTitle
                        className={`text-3xl font-extrabold text-white ${className}`}
                      >
                        {title}
                      </DialogTitle>
                      <DialogDescription className="mt-2 text-purple-200">
                        {children}
                      </DialogDescription>
                    </DialogHeader>

                    {/* Buttons */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      <Button
                        onClick={handleClick}
                        className="group relative overflow-hidden rounded-xl bg-white/10 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {buttonIcon && (
                            <img
                              src={buttonIcon}
                              alt="button icon"
                              width={20}
                              height={20}
                              className="transition-transform group-hover:scale-110"
                            />
                          )}
                          {buttonText || "Confirm"}
                        </span>
                        <span className="absolute inset-0 -z-0 rounded-xl bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 transition-opacity group-hover:opacity-100"></span>
                      </Button>

                      <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-purple-200"
                      >
                        Cancel
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default MeetingModal;

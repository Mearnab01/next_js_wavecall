import { ReactNode } from "react";

export interface HomeCardProps {
  handleClick?: () => void;
  className?: string;
  img: string;
  title: string;
  description: string;
}

export interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  buttonText?: string;
  image?: string;
  handleClick?: () => void;
  buttonIcon?: string;
  children?: ReactNode;
}
type MeetingTypesProp =
  | "isScheduleMeeting"
  | "isJoiningMeeting"
  | "isInstantMeeting"
  | undefined;

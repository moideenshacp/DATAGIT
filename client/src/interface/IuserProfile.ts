import { IUser } from "./Iuser";

export interface UserProfileProps {
  user: IUser;
  setShowFollowers: React.Dispatch<React.SetStateAction<boolean>>;
  onBack: () => void;
}

import { Ifollower } from "./Ifollower";
import { IUser } from "./Iuser";

export interface UserProfileProps {
  user: IUser
  setFollowers: React.Dispatch<React.SetStateAction<Ifollower[]>>;
  setShowFollowers: React.Dispatch<React.SetStateAction<boolean>>;
  followers:Ifollower[]
  onBack: () => void;
}

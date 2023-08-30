import { FC } from "react";
import { Avatar, AvatarImage } from ".";
import { cn } from "@/lib";

interface Props {
  src?: string;
  className?: string;
}

const UserAvatar: FC<Props> = ({ className, src }) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};
export default UserAvatar;

import { FC } from "react";
import { Menu } from "lucide-react";
import { Button, Sheet, SheetContent, SheetTrigger } from ".";
import { NavigationSidebar } from "@/app/(main)/components";
import { ServerSidebar } from "@/app/(main)/(routes)/servers/[serverId]/components";

interface Props {
  serverId: string;
}

const MobileToggle: FC<Props> = ({ serverId }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};
export default MobileToggle;

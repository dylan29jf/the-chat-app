import { ReactNode } from "react";
import { NavigationSidebar } from "./components";

interface Props {
  children: ReactNode;
}

const layout = async ({ children }: Props) => {
  return (
    <main className="h-full">
      <aside className="only-desktop h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NavigationSidebar />
      </aside>
      <section className="md:pl-[72px] h-full">{children}</section>
    </main>
  );
};
export default layout;

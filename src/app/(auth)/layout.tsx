import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const LayoutAuth = ({ children }: Props) => {
  return <main className="h-full flex items-center justify-center">{children}</main>;
};
export default LayoutAuth;

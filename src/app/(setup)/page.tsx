import { initialProfile } from "@/lib";
import { serverByUser } from "@/services";
import { CreateServerModal } from "@/components";

const SetupPage = async () => {
  const profile = await initialProfile();

  await serverByUser(profile.id);

  return (
    <main>
      <CreateServerModal />
    </main>
  );
};
export default SetupPage;

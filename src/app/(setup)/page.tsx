import { initialProfile } from "@/lib";
import { serverByUser } from "@/services";
import { InitialModal } from "@/components";

const SetupPage = async () => {
  const profile = await initialProfile();

  await serverByUser(profile.id);

  return (
    <main>
      <InitialModal />
    </main>
  );
};
export default SetupPage;

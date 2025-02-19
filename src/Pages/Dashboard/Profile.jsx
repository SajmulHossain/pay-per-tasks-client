import useAuth from "../../hooks/useAuth";


const Profile = () => {
  const { user } = useAuth();
  return (
    <section className="section py-4">
      <p className="font-semibold text-xl">
        Welcome <span className="bg-gradient-to-t from-main-color to-second-color bg-clip-text text-transparent">{user?.displayName}</span>
      </p>
    </section>
  );
};

export default Profile;
import { MdVerified } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { BsIncognito } from "react-icons/bs";


const Profile = () => {
  const { user } = useAuth();
  return (
    <section className="section py-4">
      <p className="font-semibold text-xl">
        Welcome{" "}
        <span className="bg-gradient-to-t from-main-color to-second-color bg-clip-text text-transparent">
          {user?.displayName}
        </span>
      </p>

      <div className="mt-20 border border-second-color p-4 rounded-md relative">
        <div>
          <div className="absolute outline outline-4 rounded-full outline-main-color outline-offset-2 left-10 translate-y-1/2 bottom-full">
            <img
              src={user?.photoURL}
              alt={`${user?.displayName}'s photo`}
              referrerPolicy="no-referrer"
              className="rounded-full"
            />
          </div>
          <h3 className="mt-16 font-bold text-xl flex gap-2 items-center">
            {user?.displayName}{" "}
            {user?.emailVerified && (
              <MdVerified size={24} className="text-main-color" />
            )}
            {user?.isAnonymous && (
              <BsIncognito size={24} className="text-second-color" />
            )}
          </h3>
          <div className="mt-2">
            <p>
              Lives in: <span className="text-gray-600 italic">Unavalable</span>
            </p>
            <p>
              Mobile Number:{" "}
              <span className="text-gray-600 italic">Unavalable</span>
            </p>
            <p>
              Email: <span className="text-gray-600 italic">{user.email}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
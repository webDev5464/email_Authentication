import { useSelector } from "react-redux";

export default function Home() {
  const { validUser, userData } = useSelector((state) => state.userStore);
  return (
    <>
      {validUser ? (
        <h1 className="heading">Hello {userData.fullName}</h1>
      ) : (
        <h1 className="heading">User not login</h1>
      )}
    </>
  );
}

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userAuthSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Thông tin cá nhân</h1>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Username:</strong> {user?.username}</p>
      <button
        onClick={() => dispatch(logoutUser())}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Đăng xuất
      </button>
    </div>
  );
}

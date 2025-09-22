import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  isUpdatingProfileSelector,
  userSelector,
} from "./redux/selectors/userSelector";
import Input from "./Input";
import CartButton from "./CartButton";
import {
  accountDeletionInitiatedAction,
  logoutInitiatedAction,
  toggleIsUpdatingProfileAction,
  updateDataInitiatedAction,
  updatingProfileInitiatedAction,
} from "./redux/slice/userSlice";
import { MdEdit } from "react-icons/md";

interface ProfilePageProps extends ReduxProps {}

const ProfilePage: FC<ProfilePageProps> = ({
  user,
  initiateLogout,
  initiateAccountDeletion,
  initiateUpdateData,
  isUpdatingProfile,
  toggleIsUpdatingProfile,
  updateProfile,
}) => {
  const handleClick = () => {
    const fullName = (document.getElementById("fullName") as HTMLInputElement)
      .value;
    const userName = (document.getElementById("userName") as HTMLInputElement)
      .value;
    console.log("fullName,userName", fullName, userName);
    updateProfile({
      fullName,
      userName,
      email: user.email,
      isVerified: user.isVerified,
    });
  };

  return (
    <div className="my-2">
      <div className="flex items-center justify-center gap-6">
        <div className="rounded-full bg-blue-500 text-rose-700 w-12 h-12 flex items-center justify-center text-3xl font-semibold mx-auto">
          {user.userName.charAt(0).toUpperCase()}
        </div>
        <div>
          {isUpdatingProfile ? (
            <CartButton
              onClick={handleClick}
              className="w-fit p-2 bg-blue-500 text-rose-700"
            >
              Update Profile
            </CartButton>
          ) : (
            <MdEdit
              onClick={() => toggleIsUpdatingProfile()}
              className="text-5xl text-blue-700 bg-rose-500 rounded-full p-2 cursor-pointer"
            />
          )}
        </div>
        {user.email === "termi@gmail.com" && (
          <CartButton
            className="w-fit p-2 bg-blue-500 text-rose-700"
            onClick={() => initiateUpdateData()}
          >
            Update
          </CartButton>
        )}
        <CartButton
          className="w-fit p-2 bg-blue-500 text-rose-700"
          onClick={() => initiateLogout()}
        >
          Sign Out
        </CartButton>
        <CartButton
          className="w-fit p-2 bg-blue-500 text-rose-700"
          onClick={() => initiateAccountDeletion({ email: user.email })}
        >
          Delete Account
        </CartButton>
      </div>
      <form>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <div>User Name</div>
            <Input
              id="userName"
              defaultValue={user.userName}
              disabled={!isUpdatingProfile}
            />
          </div>
          <div>
            <div>Full Name</div>
            <Input
              id="fullName"
              defaultValue={user.fullName}
              disabled={!isUpdatingProfile}
            />
          </div>
          <div>
            <div>Email</div>
            <Input value={user.email} disabled={true} onChange={() => {}} />
          </div>
          <div>
            <div>Verified</div>
            <Input
              value={user.isVerified ? "Verified" : "Not Verified"}
              disabled={true}
              onChange={() => {}}
            />
          </div>
        </div>
      </form>
      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

        {loadingOrders ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <div className="text-sm text-gray-600">
                  Order ID: <span className="font-medium">{order.id}</span>
                </div>
                <div>
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div>Status: {order.status || "Processing"}</div>
                <div>Total: ₹{order.totalAmount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  isUpdatingProfile: isUpdatingProfileSelector(state),
});

const mapDispatchToProps = {
  initiateLogout: logoutInitiatedAction,
  initiateAccountDeletion: accountDeletionInitiatedAction,
  initiateUpdateData: updateDataInitiatedAction,
  toggleIsUpdatingProfile: toggleIsUpdatingProfileAction,
  updateProfile: updatingProfileInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ProfilePage);

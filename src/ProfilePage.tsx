import { FC, useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  isUpdatingProfileSelector,
  userSelector,
} from "./redux/selectors/userSelector";
import { userOrdersMapSelector } from "./redux/selectors/orderSelector";
import Input from "./Input";
import CartButton from "./CartButton";
import { MdEdit } from "react-icons/md";
import {
  accountDeletionInitiatedAction,
  logoutInitiatedAction,
  toggleIsUpdatingProfileAction,
  updateDataInitiatedAction,
  updatingProfileInitiatedAction,
} from "./redux/slice/userSlice";
import { fetchOrderInitiatedAction } from "./redux/slice/orderSlice";
import { OrderStatus } from "./models/order";

interface ProfilePageProps extends ReduxProps {}

const ProfilePage: FC<ProfilePageProps> = ({
  user,
  userOrders,
  isUpdatingProfile,
  initiateLogout,
  initiateAccountDeletion,
  initiateUpdateData,
  toggleIsUpdatingProfile,
  updateProfile,
  fetchOrders,
}) => {
  const [userName, setUserName] = useState(user.userName);
  const [fullName, setFullName] = useState(user.fullName);

  useEffect(() => {
    setUserName(user.userName);
    setFullName(user.fullName);
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateClick = () => {
    updateProfile({ ...user, userName, fullName });
    toggleIsUpdatingProfile();
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 p-6">
      <div className="max-w-4xl mx-auto rounded-xl shadow-xl p-6 bg-gradient-to-r from-yellow-100 via-rose-100 to-orange-100">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
          <div className="relative">
            <div className="rounded-full w-24 h-24 flex items-center justify-center text-6xl font-bold text-red-600 bg-gradient-to-br from-blue-500 to-pink-500">
              {user.userName.charAt(0).toUpperCase()}
            </div>
            {!isUpdatingProfile && (
              <MdEdit
                onClick={() => toggleIsUpdatingProfile()}
                className="absolute bottom-0 right-0 text-white bg-blue-700 rounded-full p-1 cursor-pointer hover:bg-blue-800 transition"
                size={32}
              />
            )}
          </div>
          <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-medium text-gray-600">User Name</div>
              <Input
                value={userName}
                disabled={!isUpdatingProfile}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <div className="font-medium text-gray-600">Full Name</div>
              <Input
                value={fullName}
                disabled={!isUpdatingProfile}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <div className="font-medium text-gray-600">Email</div>
              <Input value={user.email} disabled />
            </div>
            <div>
              <div className="font-medium text-gray-600">Verified</div>
              <Input
                value={user.isVerified ? "Verified" : "Not Verified"}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 mb-4">
          <CartButton
            onClick={() => initiateLogout()}
            className="flex-1 p-2 bg-blue-500 text-white hover:bg-blue-600 rounded shadow"
          >
            Sign Out
          </CartButton>
          <CartButton
            onClick={() => initiateAccountDeletion()}
            className="flex-1 p-2 bg-rose-500 text-white hover:bg-rose-600 rounded shadow"
          >
            Delete Account
          </CartButton>
        </div>
        <div className="flex justify-end gap-4 mb-6">
          {isUpdatingProfile && (
            <CartButton
              onClick={handleUpdateClick}
              className="p-2 bg-green-500 text-white hover:bg-green-600 rounded shadow"
            >
              Save Changes
            </CartButton>
          )}
          {user.email === "termi@gmail.com" && (
            <CartButton
              onClick={() => initiateUpdateData()}
              className="p-2 bg-purple-500 text-white hover:bg-purple-600 rounded shadow"
            >
              Update Data
            </CartButton>
          )}
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
            Your Orders
          </h2>
          <div className="space-y-4">
            {userOrders.map((order) => {
              let orderBg = "bg-gray-50";
              if (order.status === OrderStatus.DELIVERED)
                orderBg = "bg-green-50";
              else if (order.status === OrderStatus.PENDING)
                orderBg = "bg-yellow-50";
              else if (order.status === OrderStatus.CANCELLED)
                orderBg = "bg-red-50";
              return (
                <div
                  key={order.id}
                  className={`border border-gray-200 rounded-lg p-4 hover:cursor-pointer transition shadow-sm hover:shadow-md flex flex-col justify-between ${orderBg}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-semibold">Order #{order.id}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="font-semibold text-blue-600">
                      ${order.totalAmount}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-600">
                      {order.items?.length} item
                      {order.items?.length > 1 ? "s" : ""}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        order.status === OrderStatus.DELIVERED
                          ? "bg-green-100 text-green-700"
                          : order.status === OrderStatus.PENDING
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  isUpdatingProfile: isUpdatingProfileSelector(state),
  userOrders: userOrdersMapSelector(state),
});

const mapDispatchToProps = {
  initiateLogout: logoutInitiatedAction,
  initiateAccountDeletion: accountDeletionInitiatedAction,
  initiateUpdateData: updateDataInitiatedAction,
  toggleIsUpdatingProfile: toggleIsUpdatingProfileAction,
  updateProfile: updatingProfileInitiatedAction,
  fetchOrders: fetchOrderInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ProfilePage);

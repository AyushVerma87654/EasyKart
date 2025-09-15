import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { userSelector } from "./redux/selectors/userSelector";
import Input from "./Input";
import { useParams } from "react-router";
import CartButton from "./CartButton";
import {
  accountDeletionInitiatedAction,
  logoutInitiatedAction,
  updateDataInitiatedAction,
} from "./redux/slice/userSlice";
// import { MdEdit } from "react-icons/md";

interface ProfilePageProps extends ReduxProps {}

const ProfilePage: FC<ProfilePageProps> = ({
  user,
  initiateLogout,
  initiateAccountDeletion,
  initiateUpdateData,
}) => {
  const params = useParams();
  console.log("params", params);
  return (
    <div className="my-8 pt-[2px]">
      <div className="flex items-center justify-center gap-6">
        <div className="rounded-full bg-blue-500 text-rose-700 w-12 h-12 flex items-center justify-center text-3xl font-semibold mx-auto">
          {user.userName.charAt(0).toUpperCase()}
        </div>
        {/* <div>
          <MdEdit className="text-5xl text-blue-700 bg-rose-500 rounded-full p-2 cursor-pointer" />
        </div> */}
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
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <div>User Name</div>
          <Input value={user.userName} onChange={() => {}} />
        </div>
        <div>
          <div>Full Name</div>
          <Input value={user.fullName} onChange={() => {}} />
        </div>
        <div>
          <div>Email</div>
          <Input value={user.email} onChange={() => {}} />
        </div>
        <div>
          <div>Verified</div>
          <Input
            value={user.isVerified ? "Verified" : "Not Verified"}
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
});

const mapDispatchToProps = {
  initiateLogout: logoutInitiatedAction,
  initiateAccountDeletion: accountDeletionInitiatedAction,
  initiateUpdateData: updateDataInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ProfilePage);

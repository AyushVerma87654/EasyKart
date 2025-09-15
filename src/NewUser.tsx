import { FC } from "react";
import { Navigate } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { isLoggedInSelector } from "./redux/selectors/userSelector";

interface NewUserProps extends ReduxProps {
  children: JSX.Element;
}

const NewUser: FC<NewUserProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NewUser);

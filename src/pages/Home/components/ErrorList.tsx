import AlertMessage from "@/components/ui/AlertMessage";
import { selectAllUsers } from "@/pages/Home/usersSlice";
import { selectAllErrors } from "@/redux/errorSlice";
import { selectAllInfoMessages } from "@/redux/infoSlice";
import { useSelector } from "react-redux";

interface IProps {
  inputError?: string | null;
  success?: boolean;
}

const ErrorList = ({ inputError, success }: IProps) => {
  const errors = useSelector(selectAllErrors);
  const infoMessages = useSelector(selectAllInfoMessages);
  const users = useSelector(selectAllUsers);
  return (
    <>
      {errors.map((error: string) => {
        return <AlertMessage severity="error" message={error} />;
      })}
      {inputError ? (
        <AlertMessage severity="error" message={inputError} />
      ) : null}
      {users.length === 0 && success ? (
        <AlertMessage
          severity="error"
          message="No users found with this account"
        />
      ) : null}
      {errors.length == 0
        ? infoMessages.map((info: string) => {
            return <AlertMessage severity="info" message={info} />;
          })
        : null}
      {success && users.length > 0 && errors.length == 0 ? (
        <AlertMessage
          severity="success"
          message="Loading successful. Click the download icon to save the result."
        />
      ) : null}
    </>
  );
};

export default ErrorList;

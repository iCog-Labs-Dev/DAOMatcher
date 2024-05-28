import { ChangeEvent, useState } from "react";
import ProfilePresentation from "./ProfilePresentation";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/userSlice";
import { RootState } from "@/redux/store";

const ProfileContainer = () => {
	const user = useSelector((state: RootState) => selectUser(state));
	const [profileData, setProfileData] = useState({
		email: user.email,
		displayName: user.display_name,
		apiKey: user.api_key || "",
	});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

	return (
		<ProfilePresentation
			displayName={profileData.displayName}
			email={profileData.email}
			apiKey={profileData.apiKey} 
			handleInputChange={handleInputChange}
		/>
	);
};

export default ProfileContainer;

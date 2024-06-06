import { ChangeEvent, useState } from "react";
import ProfilePresentation, {
	MessageType,
	ProfileDataType,
} from "./ProfilePresentation";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser, updateUser } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { CONSTANTS } from "@/config/default";
import AuthResponse from "@/types/AuthTypes";

const ProfileContainer = () => {
	// store state
	const {
		id,
		email,
		display_name: displayName,
		api_key: apiKey,
	} = useSelector((state: RootState) => selectUser(state));
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => selectToken(state));

	// local state
	const [message, setMessage] = useState<MessageType>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [profileData, setProfileData] = useState<ProfileDataType>({
		displayName,
		apiKey: apiKey,
		email,
	});

	// handlers
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setProfileData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const updateProfile = async () => {
		// vlidation 
		if (profileData.displayName === displayName && profileData.apiKey === apiKey) {
			setMessage({status:false,text:"You haven't made any changes to your profile. Please update at least one field before submitting."})
			return
		}
		setIsLoading(true);
		try {
			const { data: updatedUserInfo } = await axios.put(
				`${CONSTANTS.URL.PUT_PROFILE}/${id}`,
				{
					display_name: profileData.displayName,
					api_key: profileData.apiKey,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			dispatch(updateUser(updatedUserInfo.data));

			setMessage({
				status: true,
				text: "updated successfully",
			});
		} catch (error) {
			let errorMessage = "Something went wrong with try again";
			if (error instanceof AxiosError) {
				const errorData: AuthResponse = error
					? error.response
						? error.response.data
							? error.response.data
							: null
						: null
					: null;
				errorMessage = errorData.message
					? errorData.message
					: "Update Failed due to server error";
			}
			setMessage({ status: false, text: errorMessage });
		}

		setIsLoading(false);
	};

	return (
		<ProfilePresentation
			profileData={profileData}
			handleInputChange={handleInputChange}
			handleUpdateProfile={updateProfile}
			isLoading={isLoading}
			message={message}
		/>
	);
};

export default ProfileContainer;

import { ChangeEvent, useEffect, useState } from "react";
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
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => selectUser(state));
	const token = useSelector((state: RootState) => selectToken(state));

	// local state
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<MessageType>(null);
	const [profileData, setProfileData] = useState<ProfileDataType>({
		displayName: user.display_name,
		apiKey: user.api_key,
		email: user.email,
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
		setIsLoading(true);
		try {
			const { data: updatedUserInfo } = await axios.put(
				`${CONSTANTS.URL.PUT_PROFILE}/${user.id}`,
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

	useEffect(() => {
		if (message?.status) {
			const timer = setTimeout(() => {
				setMessage(null);
			}, 3000); 
			return () => clearTimeout(timer); 
		}
	}, [message]);

	return (
		<ProfilePresentation
			user={user}
			newProfileData={profileData}
			handleInputChange={handleInputChange}
			handleUpdateProfile={updateProfile}
			isLoading={isLoading}
			message={message}
		/>
	);
};

export default ProfileContainer;

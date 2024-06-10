import { ChangeEvent, useEffect, useState } from "react";
import ProfilePresentation from "./ProfilePresentation";
import { useDispatch, useSelector } from "react-redux";
import { clearUser,selectToken, selectUser, updateUser } from "@/redux/userSlice";
import { RootState } from "@/redux/store";
import { AxiosError } from "axios";
import { CONSTANTS } from "@/config/default";
import AuthResponse from "@/types/AuthTypes";
import { ProfileDataType, ProfileMessageType } from "@/types/ProfilePageTypes";
import { extractErrorData } from "@/utils/helpers";
import axiosInstance from "@/services/api/axiosInstance";
import { selectAllHomeStates } from "../Home/homeSlice";
import { Navigate } from "react-router-dom";



const ProfileContainer = () => {
	// store state
	const dispatch = useDispatch();
	const user = useSelector((state: RootState) => selectUser(state));
	const token = useSelector((state: RootState) => selectToken(state));

	// local state
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<ProfileMessageType>(null);
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
			const { data: updatedUserInfo } = await axiosInstance.put(
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
				const errorData: AuthResponse | null = extractErrorData(error);
				errorMessage = errorData?.message
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

	//navigate to login page if not logged in
	const isLoggedIn = useSelector(selectAllHomeStates).isLoggedIn;
	if (!isLoggedIn) {
		dispatch(clearUser());
		return <Navigate to="/DAOMatcher/login" />;
	}

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

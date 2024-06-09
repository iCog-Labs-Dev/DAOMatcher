import { ChangeEvent } from "react";
import { IAuthUser } from "./AuthTypes";

export type ProfileDataType = {
	displayName: string;
	email: string;
	apiKey: string;
};

export type ProfileMessageType = {
	text: string;
	status: boolean;
} | null;

type ProfilePropsType = {
	user: IAuthUser;
	newProfileData: ProfileDataType;
	isLoading: boolean;
	message: ProfileMessageType;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleUpdateProfile: () => Promise<void>;
};

export default ProfilePropsType;

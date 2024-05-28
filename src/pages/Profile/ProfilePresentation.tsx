import { ChangeEvent, FC } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

type Props = {
	displayName: string;
	email: string;
	apiKey: string;
	handleInputChange:(e: ChangeEvent<HTMLInputElement>) => void
};

const ProfilePresentation: FC<Props> = ({
	displayName,
	email,
	apiKey,
	handleInputChange,
}) => {
	return (
		<>
			<CssVarsProvider>
				<Box sx={{ flex: 1, width: "100%", marginTop: "3rem" }}>
					{/* *personal info */}
					<Stack
						spacing={4}
						sx={{
							display: "flex",
							maxWidth: "800px",
							mx: "auto",
							px: { xs: 2, md: 6 },
							py: { xs: 2, md: 3 },
						}}
					>
						<Card>
							<Box sx={{ mb: 1 }}>
								<Typography level="title-md">Personal info</Typography>
								<Typography level="body-sm">
									your profile information.
								</Typography>
							</Box>
							<Divider />
							<Stack direction="row" spacing={3}>
								<Stack spacing={2} sx={{ flexGrow: 1 }}>
									<Stack spacing={1}>
										<FormLabel>Display Name</FormLabel>
										<FormControl
											sx={{
												display: { sm: "flex-column", md: "flex-row" },
												gap: 2,
											}}
										>
											<Input
												size="sm"
												placeholder="type your dispaly name"
												name="displayName"
												value={displayName}
												onChange={handleInputChange}
											/>
										</FormControl>
									</Stack>
									<Stack direction="row" spacing={2}>
										<FormControl sx={{ flexGrow: 1 }}>
											<FormLabel>Email</FormLabel>
											<Input
												size="sm"
												type="email"
												startDecorator={<EmailRoundedIcon />}
												placeholder="email"
												defaultValue={email}
												readOnly
												sx={{ flexGrow: 1 }}
											/>
										</FormControl>
									</Stack>
								</Stack>
							</Stack>
							<CardOverflow
								sx={{ borderTop: "1px solid", borderColor: "divider" }}
							>
								<CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
									<Button size="sm" variant="outlined" color="neutral">
										Cancel
									</Button>
									<Button size="sm" variant="solid">
										Save
									</Button>
								</CardActions>
							</CardOverflow>
						</Card>
					</Stack>

					{/*
					 *api info
					 */}
					<Stack
						spacing={4}
						sx={{
							display: "flex",
							maxWidth: "800px",
							mx: "auto",
							px: { xs: 2, md: 6 },
							py: { xs: 2, md: 3 },
						}}
					>
						<Card>
							<Box sx={{ mb: 1 }}>
								<Typography level="title-md">API Key info</Typography>
								<Typography level="body-sm">
									your API key information
								</Typography>
							</Box>
							<Divider />
							<Stack direction="row" spacing={3}>
								<Stack spacing={2} sx={{ flexGrow: 1 }}>
									<Stack spacing={1}>
										<FormLabel>API Key</FormLabel>
										<FormControl
											sx={{
												display: { sm: "flex-column", md: "flex-row" },
												gap: 2,
											}}
										>
											<Input
												size="sm"
												placeholder="add your apiKey"
												name="apiKey"
												value={apiKey}
												onChange={handleInputChange}
											/>
										</FormControl>
									</Stack>
								</Stack>
							</Stack>
							<CardOverflow
								sx={{ borderTop: "1px solid", borderColor: "divider" }}
							>
								<CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
									<Button size="sm" variant="outlined" color="neutral">
										Cancel
									</Button>
									<Button size="sm" variant="solid">
										Save
									</Button>
								</CardActions>
							</CardOverflow>
						</Card>
					</Stack>
				</Box>
			</CssVarsProvider>
		</>
	);
};

export default ProfilePresentation;

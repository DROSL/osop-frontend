import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import image from "./images/error.svg";

function NotFound() {
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 3,
				boxSizing: "border-box",
			}}
		>
			<Stack direction="column" alignItems="center">
				<img src={image} alt="Seite nicht gefunden" width="100px" />
				<Typography variant="h6" sx={{ mt: 3 }}>
					Seite nicht gefunden
				</Typography>
				<Typography align="center" sx={{ mt: 1 }}>
					Das hat nicht geklappt. Die angeforderte Seite existiert
					nicht.
				</Typography>
				<Button
					LinkComponent={Link}
					to="/"
					size="large"
					variant="contained"
					color="primary"
					disableElevation
					sx={{ mt: 3 }}
				>
					Zur Startseite
				</Button>
			</Stack>
		</Box>
	);
}

export default NotFound;

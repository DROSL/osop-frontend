import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BarChartIcon from "@mui/icons-material/BarChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function ListPolls(props) {
	const {
		polls,
		startPoll,
		stopPoll,
		editPoll,
		deletePoll,
		showResults,
		deleteResults,
	} = props;

	const activePolls = polls.filter((poll) => poll.started && !poll.stopped);
	const savedPolls = polls.filter((poll) => !poll.started);
	const finishedPolls = polls.filter((poll) => poll.started && poll.stopped);

	const theme = useTheme();
	const desktop = useMediaQuery(theme.breakpoints.up("md"));

	const [selectedPollId, setSelectedPollId] = useState(null);

	const [anchorEl1, setAnchorEl1] = useState(null);
	const [anchorEl2, setAnchorEl2] = useState(null);
	const [anchorEl3, setAnchorEl3] = useState(null);

	const createClickHandler1 = (pollId) => (event) => {
		setSelectedPollId(pollId);
		setAnchorEl1(event.currentTarget);
		setAnchorEl2(null);
		setAnchorEl3(null);
	};

	const createClickHandler2 = (pollId) => (event) => {
		setSelectedPollId(pollId);
		setAnchorEl1(null);
		setAnchorEl2(event.currentTarget);
		setAnchorEl3(null);
	};

	const createClickHandler3 = (pollId) => (event) => {
		setSelectedPollId(pollId);
		setAnchorEl1(null);
		setAnchorEl2(null);
		setAnchorEl3(event.currentTarget);
	};

	const handleClose = () => {
		setSelectedPollId(null);
		setAnchorEl1(null);
		setAnchorEl2(null);
		setAnchorEl3(null);
	};

	return (
		<React.Fragment>
			{activePolls.length > 0 && (
				<List
					subheader={
						<ListSubheader disableGutters>
							Aktive Abstimmung
						</ListSubheader>
					}
				>
					{activePolls.map((poll, index) => (
						<ListItem key={`poll-active-${index}`}>
							<ListItemText
								primary={poll.title}
								secondary="Mehrere Antwortmöglichkeiten"
							/>
							<Stack direction="row" spacing={1}>
								{desktop && (
									<Button
										disableElevation
										variant="contained"
										startIcon={<BarChartIcon />}
										onClick={() => {
											showResults(poll._id);
										}}
									>
										Ergebnisse
									</Button>
								)}
								<IconButton
									onClick={createClickHandler1(poll._id)}
								>
									<MoreVertIcon />
								</IconButton>
							</Stack>
						</ListItem>
					))}
				</List>
			)}
			<Menu
				anchorEl={anchorEl1}
				open={Boolean(anchorEl1)}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<MenuItem disabled>Starten</MenuItem>
				<MenuItem
					onClick={() => {
						stopPoll(selectedPollId);
						handleClose();
					}}
				>
					Stoppen
				</MenuItem>
				<MenuItem
					onClick={() => {
						showResults(selectedPollId);
						handleClose();
					}}
				>
					Ergebnisse
				</MenuItem>
				<Divider sx={{ width: 200 }} />
				<MenuItem
					onClick={() => {
						deletePoll(selectedPollId);
						handleClose();
					}}
				>
					<Typography color="error">Löschen</Typography>
				</MenuItem>
			</Menu>

			{savedPolls.length > 0 && (
				<List
					subheader={
						<ListSubheader disableGutters>
							Geplante Abstimmungen
						</ListSubheader>
					}
				>
					{savedPolls.map((poll, index) => (
						<ListItem key={`poll-saved-${index}`}>
							<ListItemText
								primary={poll.title}
								secondary="Mehrere Antwortmöglichkeiten"
							/>
							<Stack direction="row" spacing={1}>
								{desktop && activePolls.length === 0 && (
									<Button
										disableElevation
										variant="contained"
										startIcon={<PlayArrowIcon />}
										onClick={() => startPoll(poll._id)}
									>
										Starten
									</Button>
								)}
								<IconButton
									onClick={createClickHandler2(poll._id)}
								>
									<MoreVertIcon />
								</IconButton>
							</Stack>
						</ListItem>
					))}
				</List>
			)}
			<Menu
				anchorEl={anchorEl2}
				open={Boolean(anchorEl2)}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<MenuItem
					onClick={() => {
						startPoll(selectedPollId);
						handleClose();
					}}
					disabled={activePolls.length > 0}
				>
					Starten
				</MenuItem>
				<MenuItem disabled>Stoppen</MenuItem>
				<MenuItem
					onClick={() => {
						editPoll(selectedPollId);
						handleClose();
					}}
				>
					Bearbeiten
				</MenuItem>
				<Divider sx={{ width: 200 }} />
				<MenuItem
					onClick={() => {
						deletePoll(selectedPollId);
						handleClose();
					}}
				>
					<Typography color="error">Löschen</Typography>
				</MenuItem>
			</Menu>

			{finishedPolls.length > 0 && (
				<List
					subheader={
						<ListSubheader disableGutters>
							Beendete Abstimmungen
						</ListSubheader>
					}
				>
					{finishedPolls.map((poll, index) => (
						<ListItem key={`poll-finished-${index}`}>
							<ListItemText
								primary={poll.title}
								secondary="Mehrere Antwortmöglichkeiten"
							/>
							<IconButton onClick={createClickHandler3(poll._id)}>
								<MoreVertIcon />
							</IconButton>
						</ListItem>
					))}
				</List>
			)}
			<Menu
				anchorEl={anchorEl3}
				open={Boolean(anchorEl3)}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<MenuItem
					onClick={() => {
						showResults(selectedPollId);
						handleClose();
					}}
				>
					Ergebnisse anzeigen
				</MenuItem>
				<MenuItem
					onClick={() => {
						deleteResults(selectedPollId);
						handleClose();
					}}
				>
					Ergebnisse löschen
				</MenuItem>
				<Divider />
				<MenuItem
					onClick={() => {
						deletePoll(selectedPollId);
						handleClose();
					}}
				>
					<Typography color="error">Löschen</Typography>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}

export default ListPolls;

import ImgOfMe from '../../../assets/images/me.png';
import CssCheatsheet from '../../../assets/images/CSS-Cheatsheet.png';
import DiceRoller from '../../../assets/images/Dice-Roller.png';
import EmployeeTracker from '../../../assets/images/Employee-Tracker.png';
import PianoPlayer from '../../../assets/images/Piano-Player.png';
import RandomPasswordGenerator from '../../../assets/images/Random-Password-Generator.png';
import ReadmeGenerator from '../../../assets/images/Readme-Generator.png';
import RpsGame from '../../../assets/images/RPS-Game.png';
import VehicleBuilder from '../../../assets/images/Vehicle-Builder.png';
import WeatherDashboard from '../../../assets/images/Weather-Dashboard.png';
import JaceResumeDownload from '../../../assets/downloads/Jace-Resume.pdf';

interface Images {
	[key: string]: string;
	ImgOfMe: string;
	CssCheatsheet: string;
	DiceRoller: string;
	EmployeeTracker: string;
	PianoPlayer: string;
	RandomPasswordGenerator: string;
	ReadmeGenerator: string;
	RpsGame: string;
	VehicleBuilder: string;
	WeatherDashboard: string;
	JaceResumeDownload: string;
}

const images: Images = {
	ImgOfMe,
	CssCheatsheet,
	DiceRoller,
	EmployeeTracker,
	PianoPlayer,
	RandomPasswordGenerator,
	ReadmeGenerator,
	RpsGame,
	VehicleBuilder,
	WeatherDashboard,
	JaceResumeDownload,
};

export default images;

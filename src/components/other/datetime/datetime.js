import { useEffect, useState, useMemo } from "react";
import styles from "./styles.module.css";

const initialTime = new Date().toLocaleTimeString([], {
	hour: "2-digit",
	minute: "2-digit",
});
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
export default function DateTime() {
	const [currentTime, setCurrentTime] = useState(initialTime);

	useEffect(() => {
		setInterval(() => {
			setCurrentTime(
				new Date().toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit",
				})
			);
		}, 1000);
	}, []);

	const currentDate = useMemo(() => {
		const date = new Date();
		return `${date.getDate()}. ${MONTHS[date.getMonth()]}`;
	}, []);

	return (
		<div className={styles["date-time"]}>
			<span>{currentDate}</span>
			<span>{currentTime}</span>
		</div>
	);
}

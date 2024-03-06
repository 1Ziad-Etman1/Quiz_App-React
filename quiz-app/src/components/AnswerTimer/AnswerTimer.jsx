import "./AnswerTimer.scss";
import React, { useState, useEffect, useRef } from "react";

const AnswerTimer = (duration, onTimeUp) => {
	const [counter, setCounter] = useState(0);
	const [progressLoaded, serProgressLoaded] = useState(0);
	const intervalRef = useRef();

	useEffect(() => {
		intervalRef.current = setInterval(() => {
			setCounter((cur) => cur + 1);
		}, 1000);

		return () => clearInterval(intervalRef.current);
	}, []);

	useEffect(() => {
		serProgressLoaded(100 * (counter / duration.duration));

		if (counter === duration.duration) {
			clearInterval(intervalRef.current);
			console.log("type : " + typeof onTimeUp);
			setTimeout(() => {
				onTimeUp();
			}, 1000);
		}
	}, [counter]);

	return (
		<div className="answer-timer-container">
			<div
				style={{
					width: `${progressLoaded}%`,
					backgroundColor: `${
						progressLoaded < 40
							? "lightgreen"
							: progressLoaded < 70
							? "orange"
							: "red"
					}`,
				}}
				className="progress"
			></div>
		</div>
	);
};

export default AnswerTimer;

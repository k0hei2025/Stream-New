import React, { useState } from 'react';
import { Input, Button, IconButton } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import "./Home.css";
import Navbar from './componentsPragya/Navbar';
import { v4 as uuidV4 } from 'uuid';
import { useHistory } from "react-router-dom"


let globalVar = '';


export const Home = () => {
	const history = useHistory()
	const [idLink, setId] = useState('')

	const join = () => {

		const id = uuidV4();
		history.push('/join/' + id)

		setId(`/join/${id}`);
		globalVar = idLink;



	}


	return (
		<>
			<Navbar sign={true} />
		<div className="container2">


			<div>
				<h1 style={{ fontSize: "45px" }}>Video Meeting</h1>
				<p style={{ fontWeight: "200" }}>Video conference website that lets you stay in touch with all your friends.</p>
			</div>

			<div style={{
				background: "white", width: "30%", height: "auto", padding: "20px", minWidth: "400px",
				textAlign: "center", margin: "auto", marginTop: "100px"
			}}>
				<p style={{ margin: 0, fontWeight: "bold", paddingRight: "50px" }}>Start or join a meeting</p>
				<Input placeholder="URL" />
				<Button variant="contained" color="primary" onClick={() => join()} style={{ margin: "20px" }}>Go</Button>
			</div>
			</div>
			</>
	)


}

export const linkUrl = globalVar;









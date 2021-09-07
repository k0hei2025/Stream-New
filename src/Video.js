import React, { Component } from 'react'

import io from 'socket.io-client'
import faker from "faker"

import screenfull from 'screenfull'

import { Badge, Input, Button } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import ScreenShareIcon from '@material-ui/icons/ScreenShare'
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare'
import CallEndIcon from '@material-ui/icons/CallEnd'
import ChatIcon from '@material-ui/icons/Chat'
import { FaHandPaper, FaHandRock } from 'react-icons/fa'
import { IoVideocam } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { FiCopy } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MdSave } from 'react-icons/md';
import { MdSend } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

import { FiLink2 } from 'react-icons/fi';
import { FaRecordVinyl } from 'react-icons/fa'
import { BiFullscreen } from 'react-icons/bi'
import { FaChalkboard } from 'react-icons/fa'
import { CgMoreVertical } from 'react-icons/cg';

import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import WhiteBoard from './screens/whiteboard/Board'

import { message } from 'antd'
import 'antd/dist/antd.css'

import { Row } from 'reactstrap'
import Modal from 'react-bootstrap/Modal'


import 'bootstrap/dist/css/bootstrap.css'
import "./Video.css"


const server_url = process.env.NODE_ENV === 'production' ? 'https://video.sebastienbiollo.com' : "http://localhost:4001"

var connections = {}
const peerConnectionConfig = {
	'iceServers': [// { 'urls': 'stun:stun.services.mozilla.com' },
		{ 'urls': 'stun:stun.l.google.com:19302' },
	]
}
var socket = null
var socketId = null
var elms = 0

class Video extends Component {
	constructor(props) {
		super(props)

		this.localVideoref = React.createRef()

		this.videoAvailable = false
		this.audioAvailable = false

		this.state = {
			video: false,
			audio: false,
			screen: false,
			showModal: true,
			screenAvailable: false,
			messages: [],
			message: "",
			newmessages: 0,
			initialsList: [],
			askForUsername: true,
			username: faker.internet.userName(),
			button: false,
			recordings: false,
			mediaState: "",
			theStream: null,
			theRecorder: null,
			recordedChunks: [],
			whiteBoard: false,
			authenticateId: '',

			btnlist: false,
			btn: true,
			raise: false,



		}
		connections = {}

		this.getPermissions()

	}


	componentDidMount() {


		if (!this.props.tokenState) {
			this.setState({ audio: false })
			console.log(' mounted audio', this.state.audio)
		}

		if (this.props.tokenState) {
			console.log('mounted audio of auth', this.state.audio)
		}

	}





	getPermissions = async () => {
		try {

			console.log(this.props.conditionForVideo)


			await navigator.mediaDevices.getUserMedia({ video: this.props.conditionForVideo })
				.then(() => this.videoAvailable = true)
				.catch(() => this.videoAvailable = false)

			await navigator.mediaDevices.getUserMedia({ audio: true })
				.then(() => this.audioAvailable = true)
				.catch(() => this.audioAvailable = false)

			if (navigator.mediaDevices.getDisplayMedia) {
				this.setState({ screenAvailable: true })
			} else {
				this.setState({ screenAvailable: false })
			}

			if (this.videoAvailable || this.audioAvailable) {
				navigator.mediaDevices.getUserMedia({ video: this.videoAvailable, audio: this.audioAvailable })
					.then((stream) => {
						window.localStream = stream
						this.localVideoref.current.srcObject = stream
					})
					.then((stream) => { })
					.catch((e) => console.log(e))
			}
		} catch (e) { console.log(e) }
	}

	getMedia = () => {
		this.setState({
			video: this.videoAvailable,
			audio: this.audioAvailable
		}, () => {
			this.getUserMedia()
			this.connectToSocketServer()
		})
	}

	getWhiteBoard = () => {
		this.setState({ whiteBoard: !this.state.whiteBoard })
		console.log(this.state.whiteBoard);


	}


	getUserMedia = () => {
		if ((this.state.video && this.videoAvailable) || (this.state.audio && this.audioAvailable)) {
			navigator.mediaDevices.getUserMedia({ video: this.state.video, audio: this.state.audio })
				.then(this.getUserMediaSuccess)
				.then((stream) => { })
				.catch((e) => console.log(e))
		} else {
			try {
				let tracks = this.localVideoref.current.srcObject.getTracks()
				tracks.forEach(track => track.stop())
			} catch (e) { }
		}
	}

	getUserMediaSuccess = (stream) => {
		try {
			window.localStream.getTracks().forEach(track => track.stop())
		} catch (e) { console.log(e) }

		window.localStream = stream
		this.localVideoref.current.srcObject = stream

		for (let id in connections) {
			if (id === socketId) continue

			connections[id].addStream(window.localStream)           // alll new video of new id will be adding 


			connections[id].createOffer().then((description) => {
				connections[id].setLocalDescription(description)
					.then(() => {
						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
					})
					.catch(e => console.log(e))
			})


			console.log(connections[id], 'connection videos');
		}

		stream.getTracks().forEach(track => track.onended = () => {
			this.setState({
				video: false,
				audio: false,
			}, () => {
				try {
					let tracks = this.localVideoref.current.srcObject.getTracks()
					tracks.forEach(track => track.stop())
				} catch (e) { console.log(e) }

				let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
				window.localStream = blackSilence()
				this.localVideoref.current.srcObject = window.localStream

				for (let id in connections) {
					connections[id].addStream(window.localStream)

					connections[id].createOffer().then((description) => {
						connections[id].setLocalDescription(description)
							.then(() => {
								socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
							})
							.catch(e => console.log(e))
					})
				}
			})
		})
	}


	fullScreenHandler = () => {
		let vid = document.querySelector('video');
		console.log('click')
		if (screenfull.isEnabled) {
			screenfull.toggle(vid)
		}



	}

	getDislayMedia = () => {
		if (this.state.screen) {
			if (navigator.mediaDevices.getDisplayMedia) {
				navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
					.then(this.getDislayMediaSuccess)
					.then((stream) => { })
					.catch((e) => console.log(e))
			}
		}
	}


	recordHandler = () => {

		this.setState({ recordings: !this.state.recordings })
		console.log(this.state.recordings)


		let parts = [];
		let mediaRecord;
		navigator.mediaDevices.getUserMedia({
			"video": { width: { max: 320 } }, "audio": true
		})

			.then((stream) => {


				document.getElementById("my-video").srcObject = stream;




				mediaRecord = new MediaRecorder(stream);
				if (this.state.recordings) {

					mediaRecord.start(1000);
					this.setState({ mediaState: mediaRecord })
					console.log(mediaRecord);
					mediaRecord.ondataavailable = (e) => {
						parts.push(e.data);
					}

				}

				if (!this.state.recordings) {
					this.state.mediaState.stop();
					const blob = new Blob(parts, {
						type: "video/webm"
					})
					const url = URL.createObjectURL(blob);
					console.log(url);
					const a = document.createElement("a");
					document.body.appendChild(a);
					a.style = "display: none";
					a.href = url;
					a.download = "test.webm";
					a.click();
				}

			})

	}



	getDislayMediaSuccess = (stream) => {
		try {
			window.localStream.getTracks().forEach(track => track.stop())
		} catch (e) { console.log(e) }

		window.localStream = stream
		this.localVideoref.current.srcObject = stream

		for (let id in connections) {
			if (id === socketId) continue

			connections[id].addStream(window.localStream)

			connections[id].createOffer().then((description) => {
				connections[id].setLocalDescriptionwwwwwww(description)
					.then(() => {
						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
					})
					.catch(e => console.log(e))
			})
		}

		stream.getTracks().forEach(track => track.onended = () => {
			this.setState({
				screen: false,
			}, () => {
				try {
					let tracks = this.localVideoref.current.srcObject.getTracks()
					tracks.forEach(track => track.stop())
				} catch (e) { console.log(e) }

				let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
				window.localStream = blackSilence()
				this.localVideoref.current.srcObject = window.localStream

				this.getUserMedia()
			})
		})
	}

	gotMessageFromServer = (fromId, message) => {
		var signal = JSON.parse(message)

		if (fromId !== socketId) {
			if (signal.sdp) {
				connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
					if (signal.sdp.type === 'offer') {
						connections[fromId].createAnswer().then((description) => {
							connections[fromId].setLocalDescription(description).then(() => {
								socket.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
							}).catch(e => console.log(e))
						}).catch(e => console.log(e))
					}
				}).catch(e => console.log(e))
			}

			if (signal.ice) {
				connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
			}
		}
	}

	changeCssVideos = (main) => {
		let widthMain = main.offsetWidth


		let videos = main.querySelectorAll("video")
		if (window.innerWidth > 660) {
			for (let a = 0; a < videos.length; ++a) {
				if (a === 0) {
					videos[a].style.setProperty("width", "95%")
					videos[a].style.setProperty("height", "470px")
				}
				else {

					videos[a].style.setProperty("display", "none")
				}

			}
		}
		else {
			for (let a = 0; a < videos.length; ++a) {
				if (a === 0) {
					videos[a].style.setProperty("width", "95%")
					videos[a].style.setProperty("height", "470px")
				}
				else {
					let top = String(90 * (a)) + "px"
					videos[a].style.top = top
					videos[a].style.left = "70%"
					videos[a].style.margin = "3px"
					videos[a].style.setProperty("width", "90px")
					videos[a].style.setProperty("height", "90px")
				}

				if (a > 3) {
					videos[a].style.setProperty("display", "none")
				}

			}
		}

		/* return { minWidth, minHeight, width, height, widthMain } */
	}

	connectToSocketServer = () => {
		socket = io.connect(server_url, { secure: true })

		socket.on('signal', this.gotMessageFromServer)

		if (this.props.tokenState) {
			this.setState({ authenticateId: socket.id })
		}


		console.log('authenticated Id', this.state.authenticateId)

		socket.on('popup', (handRaise, id) => {
			console.log('id ', id, 'handRaise', handRaise)
		})

		socket.on('saveToken', (token) => {

			console.log(".lp[;.............----__>", token)
		})

		socket.on('popup', (handRaise, id) => {
			console.log('id ', id, 'handRaise', handRaise)
		})


		socket.on('connect', () => {



			socket.emit('popup', this.state.raise, this.state.authenticateId)




			console.log('---------------------->', this.props.tokenState)
			socket.emit('saveToken', this.props.tokenState, this.state.authenticateId)
			console.log(this.props.tokenState)

			socket.emit('join-call', window.location.href)
			socketId = socket.id

			socket.on('chat-message', this.addMessage)
			socket.on('users', this.displayParticipants)

			socket.on('user-left', (id) => {
				let video = document.querySelector(`[data-socket="${id}"]`)
				if (video !== null) {
					elms--
					video.parentNode.removeChild(video)

					let main = document.getElementById('main')
					this.changeCssVideos(main)
				}
			})

			socket.on('user-joined', (id, clients) => {
				clients.forEach((socketListId) => {
					connections[socketListId] = new RTCPeerConnection(peerConnectionConfig)
					// Wait for their ice candidate       
					connections[socketListId].onicecandidate = function (event) {
						if (event.candidate != null) {
							socket.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
						}
					}

					// Wait for their video stream
					connections[socketListId].onaddstream = (event) => {
						// TODO mute button, full screen button
						var searchVidep = document.querySelector(`[data-socket="${socketListId}"]`)
						if (searchVidep !== null) { // if i don't do this check it make an empyt square
							searchVidep.srcObject = event.stream
						} else {
							elms = clients.length
							let main = document.getElementById('main')
							let cssMesure = this.changeCssVideos(main)

							let video = document.createElement('video')
							/* 
														let css = {
															maxHeight: "100%", marginRight: "10px", marginTop: "1px",
															borderStyle: "solid", borderColor: "#bdbdbd", objectFit: "fill", borderRadius: "12px", position: "absolute"
														}
														for (let i in css) video.style[i] = css[i]
							
														video.style.setProperty("width", "110px")
														video.style.setProperty("height", "110px") */
							video.setAttribute('data-socket', socketListId)
							video.srcObject = event.stream
							video.autoplay = true
							video.playsinline = true

							main.appendChild(video)
						}
					}

					// Add the local video stream
					if (window.localStream !== undefined && window.localStream !== null) {
						connections[socketListId].addStream(window.localStream)
					} else {
						let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
						window.localStream = blackSilence()
						connections[socketListId].addStream(window.localStream)
					}
				})

				if (id === socketId) {
					for (let id2 in connections) {
						if (id2 === socketId) continue

						try {
							connections[id2].addStream(window.localStream)
						} catch (e) { }

						connections[id2].createOffer().then((description) => {
							connections[id2].setLocalDescription(description)
								.then(() => {
									socket.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
								})
								.catch(e => console.log(e))
						})
					}
				}
			})
		})
	}

	silence = () => {
		let ctx = new AudioContext()
		let oscillator = ctx.createOscillator()
		let dst = oscillator.connect(ctx.createMediaStreamDestination())
		oscillator.start()
		ctx.resume()
		return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
	}
	black = ({ width = 640, height = 480 } = {}) => {
		let canvas = Object.assign(document.createElement("canvas"), { width, height })
		canvas.getContext('2d').fillRect(0, 0, width, height)
		let stream = canvas.captureStream()
		return Object.assign(stream.getVideoTracks()[0], { enabled: false })
	}

	handleVideo = () => this.setState({ video: !this.state.video }, () => this.getUserMedia())
	handleAudio = () => this.setState({ audio: !this.state.audio }, () => this.getUserMedia())
	handleScreen = () => this.setState({ screen: !this.state.screen }, () => this.getDislayMedia())

	handleEndCall = () => {
		try {
			let tracks = this.localVideoref.current.srcObject.getTracks()
			tracks.forEach(track => track.stop())
		} catch (e) { }
		window.location.href = "/"
	}

	openChat = () => this.setState({ showModal: true, newmessages: 0 })
	closeChat = () => this.setState({ showModal: false })
	handleMessage = (e) => this.setState({ message: e.target.value })

	addMessage = (data, sender, socketIdSender) => {
		this.setState(prevState => ({
			messages: [...prevState.messages, { "sender": sender, "data": data }],
		}))
		if (socketIdSender !== socketId) {
			this.setState({ newmessages: this.state.newmessages + 1 })
		}
	}

	handleUsername = (e) => {
		this.setState({ username: e.target.value });
		socket.emit('users', this.state.username)
	}
	displayParticipants = (newJoinee) => {
		var parts = newJoinee.split(' ')
		var initials = ''
		for (var i = 0; i < parts.length; i++) {
			if (parts[i].length > 0 && parts[i] !== '') {
				initials += parts[i][0]
			}
		}
		this.setState(prevState => ({ initialsList: [...prevState.initialsList], initials }))
		console.log(this.state.initialsList)
	}
	sendMessage = () => {
		socket.emit('chat-message', this.state.message, this.state.username)
		this.setState({ message: "", sender: this.state.username })
	}

	raiseHand = () => {
		this.setState({ raise: !this.state.raise })

		let alertOk = alert(` raise hand ${this.state.raise}`);
		console.log(alertOk);

	}

	copyUrl = () => {
		let text = window.location.href
		if (!navigator.clipboard) {
			let textArea = document.createElement("textarea")
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			try {
				document.execCommand('copy')
				message.success("Link copied to clipboard!")
			} catch (err) {
				message.error("Failed to copy")
			}
			document.body.removeChild(textArea)
			return
		}
		navigator.clipboard.writeText(text).then(function () {
			message.success("Link copied to clipboard!")
		}, () => {
			message.error("Failed to copy")
		})
	}

	connect = () => this.setState({ askForUsername: false }, () => this.getMedia())


	showButton = () => this.setState({ button: !this.state.button, newmessages: 0 });
	more = () => this.setState({ btnlist: !this.state.btnlist });

	close = () => this.setState({ close: this.state.btnlist });






	render() {




		const showBtn = () => {

			if (window.innerWidth <= 660) {
				this.setState({ btn: false })
			}
			else {
				this.setState({ btn: true });
			}
		};

		window.addEventListener('resize', showBtn);



		return (

			<div  >


				{
					this.state.askForUsername === true ?
						<div>
							<div style={{
								background: "white", width: "30%", height: "auto", padding: "20px", minWidth: "400px",
								textAlign: "center", margin: "auto", marginTop: "50px", justifyContent: "center"
							}}>
								<p style={{ margin: 0, fontWeight: "bold", paddingRight: "50px" }}>Set your username</p>
								<Input placeholder="Username" value={this.state.username} onChange={e => this.handleUsername(e)} />
								<Button variant="contained" color="primary" onClick={this.connect} style={{ margin: "20px" }}>Connect</Button>
							</div>

							<div style={{ justifyContent: "center", textAlign: "center", paddingTop: "40px" }}>
								<video id="my-video" ref={this.localVideoref} autoPlay muted style={{
									borderStyle: "solid", borderColor: "#bdbdbd", objectFit: "fill", width: "60%", height: "30%"
								}}></video>
							</div>
						</div>
						:
						<div className='dashboard_container background_main_color'>

							{this.state.WhiteBoard === true ?
								<WhiteBoard getWhiteBoard={this.getWhiteBoard} /> : null}
							<div className={this.state.button === true ? 'dashboard_left_section flexy' : 'dashboard_left_section flexya'} id={this.state.whiteBoard === true ? "scroll" : "no-scroll"}>
								<div className="meet-name">
									<Link to="/" className=" stream-logo"><IoVideocam className="navbar-icon" />STREAM</Link>
									<div className="meet-desc" >
										<Input value={window.location.href} disable="true" style={{ display: "block", marginRight: "auto", marginLeft: "auto", marginTop: "20px", border: "none", textAlign: "center", textDecoration: "none", fontSize: "25px", justifyContent: "center", alignContent: "center", alignItems: "center", width: "70%" }}></Input>

										<div className={this.props.conditionForVideo === true ? "copy-share" : "no-chatter"}>
											<button className="copy-share-button" onClick={this.copyUrl}><FiCopy /></button>
										</div>
										<div className={this.props.conditionForVideo === false ? "copy-share" : "no-chatter"}>
											<button className="copy-share-button" onClick={this.raiseHand}>
												{this.state.raise ? <FaHandPaper /> : <FaHandRock />}						</button>

											<button className="copy-share-button" onClick={this.handleEndCall}>


												<CallEndIcon style={{ fill: "red" }} />



											</button>
										</div>
									</div>
								</div>
								<div className="video">
									<div className='dashboard_content_container'>


										<div id="main" className="flex-container" style={{ margin: 0, padding: 0, borderRadius: "20px", height: "470px" }}>
											<video id="my-video" ref={this.localVideoref} autoPlay onClick={this.fullScreenHandler} muted style={{ objectFit: "fill", borderRadius: "20px", width: "95%", height: "470px" }} ></video>
											<button onClick={this.fullScreenHandler} style={{ border: "none", backgroundColor: "transparent", boxShadow: "none", borderStyle: "none", position: "absolute", top: "15px", left: "94%", zIndex: "2" }} >
												<BiFullscreen style={{ fontSize: '25px', fill: "#004362", float: "right" }} />
											</button>
										</div>

										<div className={this.props.conditionForVideo === true ? "participants" : "pos-parti"}>
											{this.state.initialsList.map((item) => (
												<div style={{ display: "flex", textAlign: "center", height: "70px", width: "70px", borderRadius: "50%", fontSize: "20px", backgroundColor: "#004362", color: "#fff" }}>
													{item}
												</div>
											))}

										</div>




										<div className={this.props.conditionForVideo === true ? "btn-down" : "no-chatter"} >
											<button className="call-btn" onClick={this.handleVideo}>
												{(this.state.video === true) ? <VideocamIcon style={{ fontSize: '35px', fill: "#004362" }} /> : <VideocamOffIcon style={{ fontSize: '35px', fill: "#004362" }} />}
											</button>

											<button className="call-btn" onClick={this.handleAudio}>
												{this.state.audio === true ? <MicIcon style={{ fontSize: '35px', fill: "#004362" }} /> : <MicOffIcon style={{ fontSize: '35px', fill: "#004362" }} />}

											</button>


											{this.state.screenAvailable === true ?
												<button className="call-btn" onClick={this.handleScreen}>
													{this.state.screen === true ? <ScreenShareIcon style={{ fontSize: '35px', fill: "#004362" }} /> : <StopScreenShareIcon style={{ fontSize: '35px', fill: "#004362" }} />}
												</button>
												: null}




											<button className="call-btn" onClick={this.handleEndCall}>
												<CallEndIcon style={{ fontSize: '35px', fill: "red" }} />
											</button>


											<button className="call-btn" onClick={this.more} >
												<CgMoreVertical style={{ fontSize: '35px', fill: "#004362" }} />
											</button>

											<div className={this.state.btnlist === true ? "btn-group" : 'no-chatter '}  >



												<button onClick={this.recordHandler} >Record
													<FaRecordVinyl style={{ fontSize: '15px', fill: "#004362", float: "right" }} />
												</button>

												<button onClick={this.getWhiteBoard}>Whiteboard
													<FaChalkboard style={{ fontSize: '15px', fill: "#004362", float: "right" }} />
												</button>
											</div>


										</div>


										<div className="btn-up" >

											<button className="call-btn" onClick={this.handleVideo}>
												{(this.state.video === true) ? <VideocamIcon style={{ fontSize: '25px', fill: "#004362" }} /> : <VideocamOffIcon style={{ fontSize: '25px', fill: "#004362" }} />}
											</button>

											<button className="call-btn" onClick={this.handleAudio}>
												{this.state.audio === true ? <MicIcon style={{ fontSize: '25px', fill: "#004362" }} /> : <MicOffIcon style={{ fontSize: '25px', fill: "#004362" }} />}
											</button>

											<button className="call-btn" onClick={this.handleEndCall}>
												<CallEndIcon style={{ fontSize: '25px', fill: "red" }} />
											</button>


											<button className="call-btn" onClick={this.more} >
												<CgMoreVertical style={{ fontSize: '25px', fill: "#004362" }} />
											</button>

											<div className={this.state.btnlist === true ? "btn-group" : 'no-chatter '}  >


												{this.state.screenAvailable === true ?
													<button onClick={this.handleScreen}>ScreenShare
														{this.state.screen === true ? <ScreenShareIcon style={{ fontSize: '10px', fill: "#004362", float: "right" }} /> : <StopScreenShareIcon style={{ fontSize: '10px', fill: "#004362", float: "right" }} />}
													</button>
													: null}

												<button onClick={this.fullScreenHandler}  >Full Screen
													<BiFullscreen style={{ fontSize: '10px', fill: "#004362", float: "right" }} />
												</button>

												<button onClick={this.recordHandler} >Record
													<FaRecordVinyl style={{ fontSize: '10px', fill: "#004362", float: "right" }} />
												</button>

												<button onClick={this.getWhiteBoard}>Whiteboard
													<FaChalkboard style={{ fontSize: '10px', fill: "#004362", float: "right" }} />
												</button>
											</div>



										</div>

									</div>
								</div>
							</div>

							<div className='chatter'  >
								<div id="chat-options">
									Chat
									<div className="c-icons">
										<MdSave />
										<MdDelete />
									</div>
								</div>

								<div style={{ height: "510px", textAlign: "left" }} >
									{this.state.messages.length > 0 ? this.state.messages.map((item, index) => (
										<div key={index} style={{ textAlign: "left" }}>
											<p style={{ wordBreak: "break-all" }}><b>{item.sender}</b>: {item.data}</p>
										</div>
									)) : <p>No message yet</p>}
								</div>

								<div className="chat-msg">
									<div className="c-icons leftpos"><FiLink2 /> </div>
									<Input placeholder="Message" value={this.state.message} onChange={e => this.handleMessage(e)} />
									<div className="c-icons rightpos" onClick={this.sendMessage}><MdSend /></div>
								</div>
							</div>
						</div>

				}
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	userIdState: state.majorStore.userId,
	tokenState: state.majorStore.tokenId,
	conditionForVideo: state.majorStore.conditionTrial
});




export default connect(mapStateToProps)(Video)
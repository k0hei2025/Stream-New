const express = require("express");
const cors = require("cors");
// const mongodb = require('mongodb');
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const express_async_handler = require("express-async-handler");
const dotenv = require("dotenv");
const bcryptjs = require("bcryptjs");
const bodyparser = require("body-parser");
const Schedule = require("./model/schedule");
const socket = require("socket.io");
const { ExpressPeerServer } = require("peer");
const groupCallHandler = require("./groupCallHandler");
const { v4: uuidv4 } = require("uuid");

const User = require("./model/user");
const generateToken = require("./generateToken");

const PORT = 5000;

const app = express();

app.use(cors());

//set the json as MIME Type
app.use(bodyparser.json());

//read the data from client application
app.use(bodyparser.urlencoded({ extended: false }));

//make the availability of .env file
dotenv.config();

//connect to mongodb database by using mongoose module
let MONGODB_URL = "mongodb://localhost:27017/stream_db";
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected successfully");
  });

// signin
app.post(
  "/api/users/signin",
  express_async_handler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcryptjs.compareSync(req.body.password, user.password)) {
        res.status(200).send({
          id: user._id,
          email: user.email,
          token: generateToken(user),
        });
      } else {
        res.status(401).send({ message: "Invalid credentials!! Try Again" });
      }
    } else {
      res.status(401).send({ message: "Invalid credentials!! Try Again" });
    }
  }),
);

//register the user
app.post(
  "/api/users/signup",
  express_async_handler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      let new_user = await req.body;
      new_user.password = await bcryptjs.hashSync(new_user.password, 8);
      await User.create(new_user, function (err, insertUserObj) {
        // console.log(insertUserObj)
        if (err) res.status(401).send({ message: err });
        res.status(200).send({ message: "Registered successfully!!" });
      });
    } else {
      res.status(401).send({ message: "Email Already exists!!" });
    }
  }),
);
// get query 
// app.post(
//   "/api/isscheduled",
//   express_async_handler(async (req, res) => {
//     const user = await User.find({});
//     if (!user) {
//       let new_user = await req.body;
//       new_user.password = await bcryptjs.hashSync(new_user.password, 8);
//       await User.create(new_user, function (err, insertUserObj) {
//         // console.log(insertUserObj)
//         if (err) res.status(401).send({ message: err });
//         res.status(200).send({ message: "Registered successfully!!" });
//       });
//     } else {
//       res.status(401).send({ message: "Email Already exists!!" });
//     }
//   }),
// );

// Sechedule
app.post(
  "/api/users/schedule",
  express_async_handler(async (req, res) => {
    let new_schedule = await req.body;
    console.log(new_schedule);
    await Schedule.create(new_schedule, function (err, insertUserObj) {
      // console.log(insertUserObj)
      if (err) throw err;
      res.status(200).send({ message: "Scheduled successfully!!" });
    });
  }),
);
// get Scheduled
app.get(
  "/api/users/getschedule",
  express_async_handler(async (req, res) => {
    let find_schedule = await Schedule.find({});
    // console.log(find_schedule);
    res.status(200).send(find_schedule);
  }),
);

//handle the server side error
app.use((err, req, res, next) => {
  res.status(500).send({ err: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);

groupCallHandler.createPeerServerListeners(peerServer);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let peers = [];
let groupCallRooms = [];

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

io.on("connection", (socket) => {
  socket.emit("connection", null);
  console.log("new user connected");
  console.log(socket.id);

  socket.on("register-new-user", (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId,
    });
    console.log("registered new user");
    console.log(peers);

    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });

    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    peers = peers.filter((peer) => peer.socketId !== socket.id);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });

    groupCallRooms = groupCallRooms.filter(
      (room) => room.socketId !== socket.id,
    );
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  // listeners related with direct call

  socket.on("pre-offer", (data) => {
    console.log("pre-offer handled");
    io.to(data.callee.socketId).emit("pre-offer", {
      callerUsername: data.caller.username,
      callerSocketId: socket.id,
    });
  });

  socket.on("pre-offer-answer", (data) => {
    console.log("handling pre offer answer");
    io.to(data.callerSocketId).emit("pre-offer-answer", {
      answer: data.answer,
    });
  });

  socket.on("webRTC-offer", (data) => {
    console.log("handling webRTC offer");
    io.to(data.calleeSocketId).emit("webRTC-offer", {
      offer: data.offer,
    });
  });

  socket.on("webRTC-answer", (data) => {
    console.log("handling webRTC answer");
    io.to(data.callerSocketId).emit("webRTC-answer", {
      answer: data.answer,
    });
  });

  socket.on("webRTC-candidate", (data) => {
    console.log("handling ice candidate");
    io.to(data.connectedUserSocketId).emit("webRTC-candidate", {
      candidate: data.candidate,
    });
  });

  socket.on("user-hanged-up", (data) => {
    io.to(data.connectedUserSocketId).emit("user-hanged-up");
  });

  // listeners related with group call
  socket.on("group-call-register", (data) => {
    const roomId = uuidv4();
    socket.join(roomId);

    const newGroupCallRoom = {
      peerId: data.peerId,
      hostName: data.username,
      socketId: socket.id,
      roomId: roomId,
    };

    groupCallRooms.push(newGroupCallRoom);
    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on("group-call-join-request", (data) => {
    io.to(data.roomId).emit("group-call-join-request", {
      peerId: data.peerId,
      streamId: data.streamId,
    });

    socket.join(data.roomId);
  });

  socket.on("group-call-user-left", (data) => {
    socket.leave(data.roomId);

    io.to(data.roomId).emit("group-call-user-left", {
      streamId: data.streamId,
    });
  });

  socket.on("group-call-closed-by-host", (data) => {
    groupCallRooms = groupCallRooms.filter(
      (room) => room.peerId !== data.peerId,
    );

    io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });
});

exports.socketInit = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected");

    let activeUsers = [];
    const addUser = (userId, socketId, user) => {
      const checkUser = activeUsers.some((newUser) => newUser.id === userId);
      if (!checkUser) {
        activeUsers.push({ id: userId, socketId, user: user });
      }
    };

    const removeUser = (socketId) => {
      activeUsers = activeUsers.filter((user) => user.socketId !== socketId);
    };

    socket.on("addUser", (user) => {
      addUser(user.id, socket.id, user);
      io.emit("activeUsers", activeUsers);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      removeUser(socket.id);
      io.emit("activeUsers", activeUsers);
    });
  });
};

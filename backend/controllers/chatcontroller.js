const Chat = require("../models/chatModel");
const User = require("../models/UserModel");

// Working API for Creating 1 on 1 Chat
exports.accessChat = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "UserId was not Sent by request" })
        }
        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }).populate("users", "-password").populate("latestMessage");
        isChat = await User.populate(isChat, {
            path: 'latestMessage.sender',
            select: "name profile email"
        });
        if (isChat.length > 0) {
            res.send(isChat[0]);
        }
        else {
            let chatData = {
                name: "sender",
                isGroupChat: false,
                users: [req.user._id, userId]
            }
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "users", "-password"
            )
            res.status(200).json({
                message: "Create/Access Chat Working",
                chat: FullChat
            })
        }
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

// API for getting all Chats that user is in
exports.getallChats = async (req, res) => {
    try {
        const allchats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 });
        res.status(200).json({
            TotalChats: allchats.length,
            Chats: allchats
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

//API for Creating Group chat 
exports.createGrpchat = async (req, res) => {
    try {
        if (!req.body.name || !req.body.users) {
            return res.status(400).json({ message: "Please Fill All Details" });
        }
        let users = JSON.parse(req.body.users);
        if (users.length < 2) {
            return res.status(400).json({
                message: "Required more than 2 Users for group Chat"
            })
        }
        users.push(req.user);
        const groupChat = await Chat.create({
            name: req.body.name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user._id
        });
        res.status(200).json({
            message: "Group Created",
            groupChat
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

// API for Renaming Group Name
exports.renameGrp = async (req, res) => {
    try {
        const { chatName, chatId } = req.body;
        const updatedGrp = await Chat.findOneAndUpdate({ _id: chatId, isGroupChat: true }, { name: chatName }, { new: true });
        if (!updatedGrp) {
            return res.status(400).json({
                message: "Group Not Found"
            })
        }
        res.status(200).json({
            message: "Group Name Updated",
            updatedGrp
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

//API for adding other user in group by groupAdmin - Raj
exports.addUser = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        if (!chatId || !userId) {
            return res.status(400).json({ message: "Chat ID and User ID are required" });
        }

        const isAdmin = await Chat.findOne({ _id: chatId, isGroupChat: true, groupAdmin: req.user._id });
        if (!isAdmin) {
            return res.status(403).json({
                message: "Only Group admins have the permission to add members to this group"
            })
        }
        console.log(isAdmin);
        if (isAdmin.users.includes(userId)) {
            return res.status(400).json({ message: "User is already a member of the group" });
        }

        const addedinGrp = await Chat.findOneAndUpdate({ _id: chatId, isGroupChat: true }, { $push: { users: userId } }, { new: true });

        if (!addedinGrp) {
            return res.status(404).json({ message: "Group not found or unable to add user" });
        }

        res.status(200).json({
            message: "User added to the Group",
            group: addedinGrp
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

//API for removing user from group by groupAdmin - Raj
exports.removeUser = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        if (!chatId || !userId) {
            return res.status(400).json({ message: "Chat ID and User ID are required" });
        }

        const isAdmin = await Chat.findOne({ _id: chatId, isGroupChat: true, groupAdmin: req.user._id });
        if (!isAdmin) {
            return res.status(403).json({
                message: "Only Group admins have the permission to remove members from this group"
            })
        }
        // console.log(isAdmin);
        if (!isAdmin.users.includes(userId)) {
            return res.status(400).json({ message: "User is not a member of this group" });
        }

        const removefromGrp = await Chat.findOneAndUpdate({ _id: chatId, isGroupChat: true }, { $pull: { users: userId } }, { new: true });

        if (!removefromGrp) {
            return res.status(404).json({ message: "Group not found or unable to remove user" });
        }

        res.status(200).json({
            message: "User Removed from Group",
            group: removefromGrp
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

//API for leaving user from group by Login User or Login Group Admin
exports.leaveGrp = async (req, res) => {
    try {
        const { chatId } = req.body;
        if (!chatId) {
            return res.status(400).json({ message: "Chat ID is required" });
        }

        const group = await Chat.findOne({ _id: chatId, isGroupChat: true });
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Check if the user is in the group
        if (!group.users.includes(req.user._id)) {
            return res.status(403).json({ message: "You are not a member of this group" });
        }

        // Check if the user exist in groupAdmin array 
        if (group.groupAdmin.includes(req.user._id)) {
            // Check if groupAdmin is 1 only & many users.
            if (group.users.length > 1 && group.groupAdmin.length === 1) {
                return res.status(403).json({ message: "You can't leave group make other user Admin first." });
            }
            // Check if group users & admin both are 1 
            if (group.users.length === 1 && group.groupAdmin.length === 1) {
                const deletegroup = await Chat.findByIdAndDelete(chatId);

                if (!deletegroup) {
                    return res.status(404).json({ message: "Failed to delete group" });
                }

                return res.status(200).json({
                    message: "You have successfully deleted group",
                })
            }
            const updatedGroup = await Chat.findOneAndUpdate(
                { _id: chatId },
                {
                    $pull: {
                        users: req.user._id,
                        groupAdmin: req.user._id
                    }
                },
                { new: true }
            );

            if (!updatedGroup) {
                return res.status(404).json({ message: "Failed to leave the group" });
            }

            return res.status(200).json({
                message: "You have successfully left the group",
                group: updatedGroup
            })
        }
        // user not exist in groupAdmin Array
        const leaveGrp = await Chat.findOneAndUpdate({ _id: chatId }, { $pull: { users: req.user._id } }, { new: true });

        if (!leaveGrp) {
            return res.status(404).json({ message: "Failed to leave the Group" });
        }

        res.status(200).json({
            message: "You have successfully left the group",
            group: leaveGrp
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ErrorMessage: error
        })
    }
}
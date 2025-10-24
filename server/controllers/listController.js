const csv = require('csv-parser');
const fs = require('fs');
const Agent = require('../models/Agent');
const Task = require('../models/Task');
const mongoose = require('mongoose');


exports.uploadAndDistribute = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        //Remove .limit(5) to fetch ALL agents for the current admin ---
        const agents = await Agent.find({ createdBy: req.admin.id });
        
        //Check if there is at least ONE agent, instead of checking for 5 ---
        if (agents.length === 0) {
            fs.unlinkSync(req.file.path);
            // Update the error message
            return res.status(400).json({ message: "You must create at least one agent before distributing tasks." });
        }

        const tasksData = [];
        const filePath = req.file.path;

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                if (row.FirstName && row.Phone) {
                    tasksData.push({
                        firstName: row.FirstName,
                        phone: row.Phone,
                        notes: row.Notes || '',
                    });
                }
            })
            .on('end', async () => {
                try {
                    await distributeTasks(agents, tasksData, req.admin.id);
                    
                    fs.unlinkSync(filePath);
                    res.status(200).json({ message: "CSV processed and tasks distributed successfully." });
                } catch(dbError){
                    fs.unlinkSync(filePath);
                    res.status(500).json({ message: "Error saving tasks to database", error: dbError.message });
                }
            });

    } catch (error) {
        res.status(500).json({ message: "Error processing file", error: error.message });
    }
};


async function distributeTasks(agents, tasks, adminId) {
    await Task.deleteMany({ createdBy: adminId });

    let agentIndex = 0;
    for (const task of tasks) {
        const assignedAgent = agents[agentIndex];
        const newTask = new Task({ 
            ...task, 
            assignedTo: assignedAgent._id,
            createdBy: adminId
        });
        await newTask.save();
        agentIndex = (agentIndex + 1) % agents.length;
    }
    console.log(`Tasks have been distributed among ${agents.length} agents.`);
}

exports.getDistributedLists = async (req, res) => {
    try {
        const adminId = new mongoose.Types.ObjectId(req.admin.id);

        const lists = await Agent.aggregate([
            { $match: { createdBy: adminId } },

            {
                $lookup: {
                    from: "tasks",
                    let: { agent_id: "$_id" },
                    pipeline: [
                        { $match: 
                            { $expr: 
                                { $and:
                                    [
                                        { $eq: [ "$assignedTo", "$$agent_id" ] },
                                        { $eq: [ "$createdBy", adminId ] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "tasks"
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    tasks: 1
                }
            }
        ]);
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: "Error fetching distributed lists", error: error.message });
    }
}
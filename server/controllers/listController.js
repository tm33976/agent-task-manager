const csv = require('csv-parser');
const fs = require('fs');
const Agent = require('../models/Agent');
const Task = require('../models/Task');

exports.uploadAndDistribute = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const agents = await Agent.find().limit(5);
        if (agents.length < 5) {
            fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: "Need at least 5 agents in the database to distribute tasks." });
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
                    await Task.deleteMany({}); 

                    let agentIndex = 0;
                    for (const task of tasksData) {
                        const assignedAgent = agents[agentIndex];
                        const newTask = new Task({ ...task, assignedTo: assignedAgent._id });
                        await newTask.save();
                        agentIndex = (agentIndex + 1) % agents.length;
                    }
                    
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

exports.getDistributedLists = async (req, res) => {
    try {
        const lists = await Agent.aggregate([
            { $limit: 5 },
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "assignedTo",
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
const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');


exports.createAgent = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        
        // We check against all agents to keep email unique globally
        const agentExists = await Agent.findOne({ email });
        if (agentExists) {
            return res.status(400).json({ message: "Agent with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAgent = new Agent({
            name,
            email,
            mobile,
            password: hashedPassword,
            createdBy: req.admin.id //ADD THIS LINE to associate agent with the logged-in admin
        });

        await newAgent.save();
        
        const agentResponse = { ...newAgent._doc };
        delete agentResponse.password;

        res.status(201).json({ message: "Agent created successfully", agent: agentResponse });

    } catch (error) {
        res.status(500).json({ message: "Error creating agent", error: error.message });
    }
};

// UPDATE getAllAgents function
exports.getAllAgents = async (req, res) => {
    try {
        // Find only the agents created by the currently logged-in admin
        const agents = await Agent.find({ createdBy: req.admin.id }).select('-password'); // <-- UPDATE THIS LINE
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching agents", error: error.message });
    }
}
const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.createAgent = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        
        const agentExists = await Agent.findOne({ email });
        if (agentExists) {
            return res.status(400).json({ message: "Agent with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAgent = new Agent({ name, email, mobile, password: hashedPassword });
        await newAgent.save();
        
        const agentResponse = { ...newAgent._doc };
        delete agentResponse.password;

        res.status(201).json({ message: "Agent created successfully", agent: agentResponse });

    } catch (error) {
        res.status(500).json({ message: "Error creating agent", error: error.message });
    }
};

exports.getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find().select('-password');
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching agents", error: error.message });
    }
}
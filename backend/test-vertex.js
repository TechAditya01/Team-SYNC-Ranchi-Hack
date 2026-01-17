require('dotenv').config();
const { VertexAI } = require('@google-cloud/vertexai');

async function testAI() {
    console.log("Testing Vertex AI...");
    console.log("Project:", process.env.GCP_PROJECT_ID);
    console.log("Model: gemini-2.0-flash-001");

    try {
        const vertex_ai = new VertexAI({
            project: process.env.GCP_PROJECT_ID,
            location: 'us-central1'
        });

        const model = vertex_ai.getGenerativeModel({
            model: 'gemini-2.0-flash-001',
        });

        const request = {
            contents: [{
                role: 'user',
                parts: [{ text: "Hello, this is a test." }]
            }]
        };

        const result = await model.generateContent(request);
        const response = await result.response;
        console.log("Response:", response.candidates[0].content.parts[0].text);
        console.log("SUCCESS!");
    } catch (error) {
        console.error("FAILURE:", error);
    }
}

testAI();

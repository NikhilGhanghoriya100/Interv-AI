import axios from "axios";

export const askAi = async (messages) => {
    try {
        if(!messages || !Array.isArray(messages) || messages.length === 0){
            throw new Error("Messages array is empty.");
        }
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
        {
            model: "openai/gpt-4o-mini",
            messages:messages

        },{
        headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
     }, });
     const content = response?.data?.choices?.[0]?.message?.content;

     if(!content || !content.trim()) {
        throw new Error("AI returned empty response.");
     }
     return content
     
    } catch (error) {
        console.error("OpenRouter Error:" , error.response?.data || error.message);
        throw new Error("OpenRouter API Error");
    }
    
}


// import axios from "axios";

// export const askAi = async (messages) => {
//     try {
//         if (!messages || !Array.isArray(messages) || messages.length === 0) {
//             throw new Error("Messages array is empty.");
//         }

//         const response = await axios.post(
//             "https://openrouter.ai/api/v1/chat/completions",
//             {
//                 model: "openai/gpt-4o-mini",
//                 messages: messages,
//                 max_tokens: 1200
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//                     "Content-Type": "application/json",
//                 },
//             }
//         );

//         const content = response?.data?.choices?.[0]?.message?.content;

//         if (!content || !content.trim()) {
//             throw new Error("AI returned empty response.");
//         }

//         return content;

//     } catch (error) {
//         console.error(
//             "OpenRouter Error:",
//             error.response?.data || error.message
//         );

// import axios from "axios";

// const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// export const askAi = async (messages) => {
//     try {
//         if (!Array.isArray(messages) || messages.length === 0) {
//             throw new Error("Messages array is empty.");
//         }

//         if (!process.env.OPENROUTER_API_KEY) {
//             throw new Error("OPENROUTER_API_KEY is not configured on the server.");
//         }

//         const response = await axios.post(
//             OPENROUTER_URL,
//             {
//                 model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
//                 messages,
//                 max_tokens: Number(process.env.OPENROUTER_MAX_TOKENS) || 800,
//                 temperature: 0.2,
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//                     "Content-Type": "application/json",
//                     "HTTP-Referer": "https://interv-ai-client.onrender.com",
//                     "X-Title": "Interv.AI",
//                 },
//                 timeout: 60000,
//             }
//         );

//         const content = response?.data?.choices?.[0]?.message?.content;

//         if (!content || !content.trim()) {
//             throw new Error("AI returned an empty response.");
//         }

//         return content.trim();

//     } catch (error) {
//         const providerError = error.response?.data?.error;

//         console.error("OpenRouter Error:", {
//             status: error.response?.status,
//             message: providerError?.message || error.message,
//             code: providerError?.code,
//             data: error.response?.data,
//         });

//         throw new Error(
//             providerError?.message ||
//             error.message ||
//             "OpenRouter API Error"
//         );
//     }
// };

// //         throw new Error("OpenRouter API Error");
// //     }
// // };

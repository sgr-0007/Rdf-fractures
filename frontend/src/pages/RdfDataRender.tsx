import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import FamilyHistoryTable from '../components/FamilyHistoryTable';
import FracturesTable from '../components/FracturesTable';
import animationData from '../assets/loaderlottie.json';

// Default Lottie loader options
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: 'svg',
};

const CACHE_KEY = 'chatGPTResponseCache'; // Define a cache key for local storage

const RdfDataRender: React.FC = () => {
    const [familyHistoryData, setFamilyHistoryData] = useState<any[]>([]);
    const [fracturesData, setFracturesData] = useState<any[]>([]);
    const [chatGPTResponse, setChatGPTResponse] = useState<string | null>(null);
    const [userQuestion, setUserQuestion] = useState<string>(''); // For storing the user question
    const [isChatGPTLoading, setIsChatGPTLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Control modal visibility

    // Function to fetch a summary and insights from ChatGPT based on both tables and user input
    const fetchChatGPTSummary = async () => {
        if (!userQuestion) {
            setChatGPTResponse('Please enter a question.');
            return;
        }

        if (familyHistoryData.length === 0 && fracturesData.length === 0) {
            setChatGPTResponse('No data available for summarization.');
            return;
        }

        setIsChatGPTLoading(true);
        setChatGPTResponse(null);
        setIsModalOpen(true); // Open the modal when loading starts

        try {
            console.log(familyHistoryData);
            // Prepare the data from both tables for GPT-4 by summarizing the tables in text format
            const familyHistoryText = familyHistoryData.map(item => {
                const subject = item.subject;
                const predicate = item.predicate;
                const object = item.object;
                return `Family History - Subject: ${subject}, Predicate: ${predicate}, Object: ${object}`;
            }).join('\n');

            console.log(fracturesData);
            const fracturesText = fracturesData.map(item => {
                const subject = item.subject;
                const predicate = item.predicate;
                const object = item.object;
                return `Fractures - Subject: ${subject}, Predicate: ${predicate}, Object: ${object}`;
            }).join('\n');

            const combinedText = `${familyHistoryText}\n\n${fracturesText}`;

            // Include user question in the prompt
            const prompt = `Here is some patient data including family history and fractures:\n${combinedText}\nQuestion: ${userQuestion}?`;

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: prompt }],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const chatGPTResult = response.data.choices[0].message.content;

            // Set the response in both state and local storage
            setChatGPTResponse(chatGPTResult);
            localStorage.setItem(CACHE_KEY, chatGPTResult); // Cache the response
        } catch (error) {
            console.error('Error fetching ChatGPT response:', error);
            setChatGPTResponse('Failed to fetch insights from ChatGPT.');
        } finally {
            setIsChatGPTLoading(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-12 space-y-8">
            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-bold mb-4">Patient Family History</h2>
                <FamilyHistoryTable onDataFetched={setFamilyHistoryData} />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 py-8">
                <h2 className="text-xl font-bold mb-4">Fractures</h2>
                <FracturesTable onDataFetched={setFracturesData} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
            {/* User Input for Asking Question */}
            <div className="mt-6 mb-6">

                {/* Flex container to align input and button horizontally */}
                <div className="flex space-x-2">
                    <input
                        id="question"
                        type="text"
                        className="flex-1 mt-1 p-2 border border-gray-300 rounded-lg"
                        value={userQuestion}
                        onChange={(e) => setUserQuestion(e.target.value)} // Handle user input
                        placeholder="Ask! e.g. What is the Child's risk of abuse?"
                    />
                    <button
                        className="bg-black text-white py-2 px-4 rounded shadow-md hover:bg-gray-800"
                        onClick={fetchChatGPTSummary}
                        disabled={isChatGPTLoading}
                    >
                        Get Answer
                    </button>
                </div>
                
            </div>
            </div>



            {/* DaisyUI Modal for displaying ChatGPT response */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box relative">
                        <button
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold">Analysing</h3>

                        {isChatGPTLoading ? (
                            <div className="flex justify-center">
                                <Lottie options={defaultOptions} height={150} width={150} />
                            </div>
                        ) : (
                            <div className="mt-4 bg-gray-100 p-4 rounded shadow-md">
                                <p>{chatGPTResponse}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RdfDataRender;

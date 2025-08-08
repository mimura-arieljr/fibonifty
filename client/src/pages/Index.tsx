import Threads from '../components/animation/Threads';
import { useState } from 'react';
import io from 'socket.io-client';
import GradientText from '../components/animation/GradientText'
import { Coffee } from 'lucide-react';


const socket = io(); // Connect to backend

const StoryPoints: unknown[] = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, <Coffee></Coffee>];
const TShirtSizes: unknown[] = ['XS-Green', 'XS-Yellow', 'XS-Red', 'S-Green', 'S-Yellow', 'S-Red', 'M-Green', 'M-Yellow', 'M-Red', 'L-Green', 'L-Yellow', 'L-Red', 'XL-Green', 'XL-Yellow', 'XL-Red', <Coffee></Coffee>];

export const Index = () => {
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);
    const [userId, setUserId] = useState('');
    const [estimateType, setEstimateType] = useState<'story' | 'tshirt'>('story');
    const [selection, setSelection] = useState<string | number | ''>('');
    const [users, setUsers] = useState<Record<string, number | string>>({});
    const [revealed, setRevealed] = useState(false);

    // Options derived from the existing arrays (filter out the Coffee icon React element)
    const storyOptions = (StoryPoints.filter((v) => typeof v === 'number') as number[]);
    const tshirtOptions = (TShirtSizes.filter((v) => typeof v === 'string') as string[]);

    const joinRoom = () => {
        if (!roomId.trim()) {
            alert('Please enter a valid room ID');
            return;
        }
        socket.emit('joinRoom', roomId);
        setJoined(true);
    };

    const generateRoomId = () => {
        // Simple client-side ID (replace with backend-generated in prod)
        const id = Math.random().toString(36).slice(2, 8).toUpperCase();
        setRoomId(id);
    };

    const submitPoints = () => {
        if (!userId.trim()) {
            alert('Please enter your name');
            return;
        }
        if (selection === '') {
            alert('Please choose an estimate');
            return;
        }

        setUsers((prev) => ({ ...prev, [userId]: selection }));
        setSelection('');
    };

    const revealPoints = () => setRevealed(true);

    const resetEntries = () => {
        setUsers({});
        setRevealed(false);
        setSelection('');
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-background text-white px-3 overflow-hidden">
            {!joined && (
                <>
                    <div className="absolute inset-0 z-[2]">
                        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
                    </div>

                    <div className="text-primary text-center z-[3]">
                        <h1 className="text-[40px] md:text-[46px] font-inter font-bold mb-4">
                            Estimate Smarter, Plan Better -
                            <GradientText
                                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                                animationSpeed={3}
                                showBorder={false}
                                className="custom-class"
                            >
                                <span className='text-primary text-[40px] md:text-[46px] font-inter font-bold'>with</span> Fibonifty!
                            </GradientText>
                        </h1>

                        <div className="flex justify-center space-x-4 mt-8">
                            <button
                                type="button"
                                onClick={generateRoomId}
                                className="bg-transparent border border-white text-white text-sm font-inter font-thin px-6 py-2 rounded-full transition-transform duration-300"
                            >
                                Generate Room ID
                            </button>

                            <input
                                type="text"
                                className="border bg-primary text-background pl-5 py-2 rounded-full text-sm font-inter font-thin"
                                placeholder="Enter Room ID"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && roomId.trim() !== '') {
                                        joinRoom();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </>
            )}

            {joined && (
                <div className="z-[3] w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-black">
                        <div className="mb-4">
                            <input
                                type="text"
                                className="mb-3 w-full border border-gray-300 px-3 py-2 rounded"
                                placeholder="Your Name"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />

                            <div className="flex gap-3 mb-3">
                                <label htmlFor="estimateType" className="sr-only">Estimate Type</label>
                                <select
                                    id="estimateType"
                                    className="w-1/2 border border-gray-300 px-3 py-2 rounded"
                                    value={estimateType}
                                    onChange={(e) => setEstimateType(e.target.value as 'story' | 'tshirt')}
                                >
                                    <option value="story">Story Points</option>
                                    <option value="tshirt">T-Shirt Size</option>
                                </select>

                                <label htmlFor="estimate" className="sr-only">Estimate</label>
                                <select
                                    id="estimate"
                                    className="flex-1 border border-gray-300 px-3 py-2 rounded"
                                    value={selection === '' ? '' : String(selection)}
                                    onChange={(e) => setSelection(e.target.value)}
                                >
                                    <option value="">Select…</option>
                                    {estimateType === 'story'
                                        ? storyOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))
                                        : tshirtOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                </select>
                                <button >
                                    <Coffee></Coffee>
                                </button>
                            </div>

                            <button
                                className="w-full px-3 py-2 rounded bg-green-600 text-white"
                                onClick={submitPoints}
                            >
                                Submit
                            </button>
                        </div>

                        <div className="mt-2 flex justify-end gap-2">
                            <button className="px-3 py-1 rounded bg-yellow-500 text-white" onClick={revealPoints}>
                                Reveal
                            </button>
                            <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={resetEntries}>
                                Reset
                            </button>
                        </div>

                        <div className="mt-4 text-gray-900">
                            {Object.entries(users).map(([name, pts]) => (
                                <p key={name}>
                                    {name}: {revealed ? pts : 'X'}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

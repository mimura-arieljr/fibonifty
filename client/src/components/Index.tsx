import Dropdown from './Dropdown';
import Threads from './animation/Threads';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import GradientText from './animation/GradientText'
import { Coffee, View, RotateCcw, VenetianMask, UserRoundCheck, CircleAlert } from 'lucide-react';
import Toast from 'react-hot-toast';


const socket = io('http://localhost:3001', { transports: ['websocket'] });

const StoryPoints: number[] = [1, 2, 3, 5, 8, 13, 21, 34];
const TShirtSizes: string[] = ['XS-Green', 'XS-Yellow', 'XS-Red', 'S-Green', 'S-Yellow', 'S-Red', 'M-Green', 'M-Yellow', 'M-Red', 'L-Green', 'L-Yellow', 'L-Red', 'XL-Green', 'XL-Yellow', 'XL-Red'];

export const Index = () => {
    const [roomId, setRoomId] = useState('');
    const [joined, setJoined] = useState(false);
    const [userId, setUserId] = useState('');
    const [estimateType, setEstimateType] = useState<'story' | 'tshirt'>('story');
    const [selection, setSelection] = useState<string | number | ''>('');
    const [users, setUsers] = useState<Record<string, number | string>>({});
    const [revealed, setRevealed] = useState(false);

    const toasterProps = {
        style: {
            background: 'hsl(var(--border))',
            color: '#f2f0ef',
            fontFamily: 'Inter, sans-serif',
        },
        icon: <CircleAlert className="text-red-500" />
    };

    // Listen for room updates from the server
    useEffect(() => {
        const handler = (payload: { users: Record<string, number | string>; revealed: boolean }) => {
            setUsers(payload.users || {});
            setRevealed(!!payload.revealed);
        };
        socket.on('room:update', handler);
        return () => {
            socket.off('room:update', handler);
        };
    }, []);


    const storyOptions = (StoryPoints.filter((v) => typeof v === 'number') as number[]);
    const tshirtOptions = (TShirtSizes.filter((v) => typeof v === 'string') as string[]);

    const joinRoom = () => {
        if (!roomId.trim() || roomId.length < 6) {
            Toast.error('Please enter a valid room ID', { ...toasterProps });
            return;
        }
        socket.emit('joinRoom', { roomId, userId });
        setJoined(true);
    };

    const generateRoomId = () => {
        const id = Math.random().toString(36).slice(2, 8).toUpperCase();
        setRoomId(id);
    };

    const submitPoints = (newSelection?: string | number) => {
        if (!userId.trim()) {
            Toast.error('Please enter your name', { ...toasterProps });
            return;
        }
        const finalSelection = newSelection ?? selection;
        if (finalSelection === '' || finalSelection === undefined) {
            Toast.error('Please choose an estimate', { ...toasterProps });
            return;
        }
        socket.emit('submitSelection', { roomId, userId, selection: finalSelection });
        setSelection('');
    };

    const revealPoints = () => {
        socket.emit('reveal', { roomId });
    };

    const resetEntries = () => {
        socket.emit('reset', { roomId });
        setUsers({});
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-background text-primary px-3">
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
                                className="bg-transparent border border-primary text-primary text-sm font-inter font-thin px-6 py-2 rounded-full transition-transform duration-300"
                            >
                                Generate Room ID
                            </button>

                            <input
                                type="text"
                                className="border bg-primary text-background pl-5 py-2 rounded-full text-sm font-inter font-thin caret-accent"
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
                    <h1 className="text-2xl font-inter font-bold mb-4 text-center">Fibonifty</h1>
                    <h2 className="text-md font-inter font-thin mb-4 text-center">You are in room: <span className="text-accent">{roomId}</span></h2>
                    <div className="bg-primary rounded-2xl shadow-lg p-6 text-black">
                        <div className="mb-4">
                            <input
                                type="text"
                                className="mb-3 w-full border-b-2 border-secondary px-1 py-2 font-inter outline-none focus:outline-none focus:border-b-2 focus:border-secondary active:border-secondary caret-accent"
                                placeholder="Name"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />

                            <div className="flex gap-3 mb-3">
                                <div className="w-1/2 font-inter font-thin">
                                    <Dropdown
                                        label="Estimate Type"
                                        options={['Story Points', 'T-Shirt Size']}
                                        selected={estimateType === 'story' ? 'Story Points' : 'T-Shirt Size'}
                                        onSelect={(val) => setEstimateType(val === 'Story Points' ? 'story' : 'tshirt')}
                                    />
                                </div>
                                <div className="flex-1 font-inter font-thin">
                                    <Dropdown
                                        label="Estimate"
                                        options={estimateType === 'story' ? storyOptions.map(String) : tshirtOptions}
                                        selected={selection === '' ? '' : String(selection)}
                                        onSelect={(val) => setSelection(val)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => submitPoints("coffee")}
                                >
                                    <Coffee className="inline mr-1 border border-secondary p-1 rounded hover:scale-110" />
                                </button>
                            </div>

                            <button
                                className="w-full px-3 py-2 rounded font-inter font-light text-black border border-secondary hover:border-accent-themed hover:text-accent-themed"
                                onClick={() => submitPoints()}
                            >
                                <UserRoundCheck className="inline mr-2 h-4 w-4 mb-1" />
                                Submit
                            </button>
                        </div>

                        <div className="mt-0.5 flex justify-end gap-2">
                            <button onClick={revealPoints}>
                                <View className="inline h-4 w-4 hover:scale-120" />
                            </button>
                            <button onClick={resetEntries}>
                                <RotateCcw className="inline h-4 w-4 transition-transform hover:-rotate-90 toolt" />
                            </button>
                        </div>

                        {/* Display users and their estimates: */}
                        <div className="mt-4 font-inter text-gray-900">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                                {Object.entries(users).map(([name, pts]) => {
                                    const isCoffee = pts === 'coffee';
                                    const isRevealed = revealed;
                                    return (
                                        <div
                                            key={name}
                                            className="flex flex-col items-center justify-between rounded-xl border border-secondary/40 bg-accent-themed text-primary px-3 py-3 shadow-sm text-center"
                                            title={name}
                                        >
                                            <div className="w-full truncate text-sm font-inter font-thin text-primary" aria-label={`User ${name}`}>
                                                {name}
                                            </div>
                                            <div className="mt-2 text-base">
                                                {isCoffee ? (
                                                    isRevealed ? (
                                                        <Coffee className="inline h-5 w-5 align-middle" />
                                                    ) : (
                                                        <VenetianMask className="inline h-5 w-5 align-middle" />
                                                    )
                                                ) : (
                                                    isRevealed ? (
                                                        <span className="font-inter text-primary text-sm" aria-label={`Points ${String(pts)}`}>{String(pts)}</span>
                                                    ) : (
                                                        <VenetianMask className="inline h-5 w-5 align-middle" />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Index;

import React, { useState, useEffect, useRef } from 'react';

const Terminal = ({ onClose }) => {
    const [lines, setLines] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [flickerEnabled, setFlickerEnabled] = useState(true);
    const [currentCommand, setCurrentCommand] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const terminalRef = useRef(null);
    const lineCounter = useRef(0);
    const inputRef = useRef(null);

    const initialLines = [
        { id: 0, text: 'root@retro-system:~$ system_boot.exe', type: 'prompt', delay: 200 },
        { id: 1, text: 'Initializing retro terminal interface...', type: 'normal', delay: 400 },
        { id: 2, text: '[INFO] Loading vintage display drivers... OK', type: 'info', delay: 600 },
        { id: 3, text: '[INFO] Calibrating CRT phosphors... OK', type: 'info', delay: 800 },
        { id: 4, text: '[WARN] Temporal displacement detected', type: 'warning', delay: 1000 },
        { id: 5, text: 'Welcome to RETRO-OS v1.985', type: 'normal', delay: 1200 },
        { id: 6, text: 'System Status: ONLINE', type: 'success', delay: 1400 },
        { id: 7, text: 'Available commands: help, status, jedi,, resume, exit', type: 'normal', delay: 1600 },
        { id: 8, text: 'root@retro-system:~$ ', type: 'prompt', delay: 1800 }
    ];

    useEffect(() => {
        initialLines.forEach(line => {
            setTimeout(() => {
                setLines(prev => [...prev, line]);
            }, line.delay);
        });

        setTimeout(() => {
            inputRef.current?.focus();
        }, 2000);
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    const addLine = (text, type = 'normal') => {
        const newLine = {
            id: ++lineCounter.current,
            text,
            type,
            delay: 0
        };
        setLines(prev => [...prev, newLine]);
    };

    const closeTerminal = () => {
        addLine('[ERROR] Connection terminated', 'error');
        setTimeout(() => {
            addLine('Goodbye, user.', 'normal');
            setTimeout(() => {
                if (onClose) onClose(); // call parent to close
            }, 1000);
        }, 500);
    };

    const clearTerminal = () => {
        setLines([
            { id: ++lineCounter.current, text: 'root@retro-system:~$ clear', type: 'prompt', delay: 0 },
            { id: ++lineCounter.current, text: 'Terminal cleared.', type: 'normal', delay: 0 },
            { id: ++lineCounter.current, text: 'root@retro-system:~$ ', type: 'prompt', delay: 0 }
        ]);
    };

    const handleCommand = (command) => {
        const cmd = command.toLowerCase().trim();
        addLine(`root@retro-system:~$ ${command}`, 'prompt');

        switch (cmd) {
            case 'resume':
                addLine('Accessing resume database...', 'info');
                setTimeout(() => {
                    addLine('Opening PDF in new window...', 'normal');
                    setTimeout(() => {
                        addLine('Resume loaded successfully!', 'success');
                        window.open('/AnishaR_resume%20(4).pdf', '_blank');
                    }, 800);
                }, 1000);
                break;
            case 'help':
                addLine('Available commands:', 'info');
                addLine('  resume  - Open resume PDF', 'normal');
                addLine('  help    - Show this help message', 'normal');
                addLine('  status  - Show system status', 'normal');
                addLine('  jedi   - Jedi archives', 'normal');
                addLine('  district 13 - Tribute protocol', 'normal');
                addLine('  clear   - Clear terminal', 'normal');
                addLine('  exit    - Close terminal', 'normal');
                break;
            case 'status':
                addLine('System Status Report:', 'info');
                addLine('CPU: Retro-8086 @ 4.77MHz', 'normal');
                addLine('Memory: 640KB conventional', 'normal');
                addLine('Graphics: CGA Compatible', 'normal');
                addLine('Network: RETRO-NET Connected', 'success');
                break;
            case 'jedi':
                addLine('[ACCESSING JEDI ARCHIVES]', 'info');
                setTimeout(() => {
                    addLine('"The Force will be with you. Always." – Obi-Wan Kenobi', 'success');
                    addLine('🚀 Initiating Lightspeed Jump... 💫', 'normal');
                    setTimeout(() => {
                        addLine('🌌 Welcome to the galaxy far, far away...', 'info');
                    }, 800);
                }, 1000);
                break;
            case 'district 13':
                addLine('[DISTRICT 13 TERMINAL ACCESSED]', 'info');
                setTimeout(() => {
                    addLine('"May the odds be ever in your favor."', 'success');
                    addLine('🎯 Loading Mockingjay protocol...', 'normal');
                    setTimeout(() => {
                        addLine('🔥 Rebellion sequence initiated...', 'warning');
                    }, 800);
                }, 1000);
                break;


            case 'clear':
                clearTerminal();
                return;
            case 'exit':
                closeTerminal();
                return;
            default:
                addLine(`Command not found: ${command}`, 'error');
                addLine('Type "help" for available commands', 'info');
                break;
        }

        setTimeout(() => {
            addLine('root@retro-system:~$ ', 'prompt');
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && currentCommand.trim()) {
            setIsTyping(true);
            handleCommand(currentCommand);
            setCurrentCommand('');
        }
    };

    const runCommand = () => {
        const commands = [
            { text: 'Scanning quantum fluctuations...', type: 'normal' },
            { text: '[INFO] Temporal anchor established', type: 'info' },
            { text: 'Accessing mainframe database...', type: 'normal' },
            { text: '[WARN] Firewall detected - bypassing...', type: 'warning' },
            { text: 'Connection established to RETRO-NET', type: 'success' },
            { text: 'root@retro-system:~$ ', type: 'prompt' }
        ];

        commands.forEach((cmd, index) => {
            setTimeout(() => addLine(cmd.text, cmd.type), index * 800);
        });
    };

    const getLineClasses = (type) => {
        const base = 'font-mono text-sm leading-relaxed mb-1 animate-pulse';
        const colors = {
            prompt: 'text-green-400 font-bold',
            error: 'text-red-400',
            warning: 'text-yellow-400',
            info: 'text-blue-400',
            success: 'text-green-400',
            normal: 'text-green-400',
        };
        return `${base} ${colors[type] || colors.normal}`;
    };

    const BlinkingCursor = () => <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>;

    const CommandInput = () => {
        const lastLine = lines[lines.length - 1];
        const show = lastLine?.type === 'prompt' && lastLine.text.includes('root@retro-system:~$') && !isTyping;

        if (!show) return null;

        return (
            <div className="flex items-center">
                <span className="text-green-400 font-mono text-sm font-bold">root@retro-system:~$ </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="bg-transparent border-none outline-none text-green-400 font-mono text-sm flex-1 caret-green-400"
                    autoFocus
                />
                <BlinkingCursor />
            </div>
        );
    };

    return (
        <div className="p-4">
            <div className="relative">
                <div className="relative bg-transparent rounded-2xl p-6 ">
                    <div className={`w-full max-w-4xl h-96 bg-black border-2 border-gray-600 rounded-lg overflow-hidden relative ${flickerEnabled ? 'flicker-custom' : ''}`}>

                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)' }}
                        ></div>

                        {/* Header */}
                        <div className="bg-gradient-to-r from-gray-700 to-gray-600 h-8 flex items-center px-4 border-b border-gray-500">
                            <div className="flex space-x-2">
                                <button
                                    onClick={closeTerminal}
                                    className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors hover:shadow-lg hover:shadow-red-500/50"
                                ></button>
                                <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"></button>
                                <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"></button>
                            </div>
                            <div className="flex-1 text-center text-green-400 text-xs font-mono font-bold tracking-wider">
                                RETRO TERMINAL v2.1
                            </div>
                        </div>

                        {/* Terminal content */}
                        <div
                            ref={terminalRef}
                            className="h-full bg-black p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-900"
                            style={{ height: 'calc(100% - 2rem)' }}
                            onClick={() => inputRef.current?.focus()}
                        >
                            {lines.map((line) => (
                                <div key={line.id} className={getLineClasses(line.type)}>
                                    {line.text}
                                    {line.type === 'prompt' && line.id === lines[lines.length - 1]?.id && <BlinkingCursor />}
                                </div>
                            ))}
                            <CommandInput />
                            <div className="text-green-400 text-xs font-mono leading-none mt-4 whitespace-pre">
                                {`╔══════════════════════════════════════════════════════╗
║  ██████╗ ███████╗████████╗██████╗  ██████╗           ║
║  ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗          ║
║  ██████╔╝█████╗     ██║   ██████╔╝██║   ██║          ║
║  ██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║          ║
║  ██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝          ║
║  ╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝           ║
╚══════════════════════════════════════════════════════╝`}
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-end space-x-3 mt-4">
                        <button
                            onClick={runCommand}
                            className="bg-green-400/10 border border-green-400 text-green-400 px-4 py-2 rounded font-mono text-sm hover:bg-green-400/20"
                        >
                            RUN
                        </button>
                        <button
                            onClick={clearTerminal}
                            className="bg-green-400/10 border border-green-400 text-green-400 px-4 py-2 rounded font-mono text-sm hover:bg-green-400/20"
                        >
                            CLEAR
                        </button>
                        {/* <button
              onClick={() => setFlickerEnabled(!flickerEnabled)}
              className="bg-green-400/10 border border-green-400 text-green-400 px-4 py-2 rounded font-mono text-sm hover:bg-green-400/20"
            >
              FLICKER
            </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;

// --- Interactive Terminal Emulator ---
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');
const shortcutBtns = document.querySelectorAll('.shortcut-btn');

// Command History
let cmdHistory = [];
let cmdIndex = -1;

const commands = {
  help: `Available commands:
  -------------------------------------------------------------
  [nanos]       Display WebAssembly micro-runtime architecture
  [qubo]        View Ph.D. quadratic routing formulation
  [amphitude]   Inspect C++ P2P socket engine specifications
  [ninai]       Bypass CORS/CSP Electron webview structure
  [creed]       Print Jason's systems engineering philosophy
  [education]   Show academic credentials
  [experience]  Show professional background
  [clear]       Clear the terminal console`,

  nanos: `[nanos] Sandbox Microkernel Architecture
  -------------------------------------------------------------
  Language: Rust / WebAssembly
  Target: Lightweight Process-Isolated Local LLM Runtimes

  Virtualization Paradigm:
  Guest (User Space)        <--->      FFI Shared Memory      <--->     Host (Kernel Space)
  [TypeScript/JS Agent]               [Linear Pointer Pass]            [Native Rust Engine]
  - WASM Linear memory                - <1ms execution latency        - LlmEngine (C++ Binding)
  - Metered Fuel budget               - Zero TCP Loopback             - Metal/CUDA offload
  - Zero host direct access           - No JSON serialization         - File/Network proxies

  Performance Metrics:
  * Startup Boot Latency: <3ms (WASM instantiation)
  * System Memory Footprint: ~20MB RSS (50x lighter than Docker/VM)
  * FFI Syscall execution: <1ms (300x faster than local HTTP)`,

  qubo: `[qubo-space-routing] Always-Feasible DTN Congestion Solver
  -------------------------------------------------------------
  Formulation: Quadratic Unconstrained Binary Optimization (QUBO)
  Objective: Minimize path cost, maximize delivery value, resolve overloads.

  Mathematical Model:
  H(x) = Sum_e [ (λ_e / w_b) * (Sum_b,k A_bk^e * x_bk - C_e)^2 ] - γ * Sum_b,k w_b * x_bk * S(π_bk)

  How it solves DTN congestion:
  1. The squared capacity term (L_e - C_e)^2 expands to create bundle-pair cross-terms (x_b1 * x_b2).
  2. These cross-terms make shared-edge conflicts visible in the energy matrix.
  3. Lagrangian Dual Ascent updates edge prices (λ_e) dynamically.
  4. Solver automatically balances and spreads traffic to alternative orbits.
  5. In deep overloads, Algorithm resolves remaining conflicts via priority-aware eviction.`,

  amphitude: `[amphitude] C++ Zero-Dependency Serverless Multiplayer
  -------------------------------------------------------------
  Language: C++ (C++17) / SDL2
  Architecture: Authoritative Client-Host Peer-to-Peer

  Networking Stack:
  * Reliable UDP (rUDP): Custom packet structure with sequence tracking.
  * NAT Traversal: Custom STUN client implementation to query public mapping.
  * Connection Bridge: Direct client-to-client UDP Hole Punching.
  * State Compression: Delta-encoded state packets to fit within MTU.
  * Synchronization: Clock drift compensation and active input buffering.

  Structure:
  [Host Player]  <==== STUN NAT Hole Punch ====>  [Client Player]
  (Authoritative)      (Direct UDP Packets)       (Input Forwarding)`,

  ninai: `[ninai] Local-First Desktop Workspace Integration
  -------------------------------------------------------------
  Framework: Electron / React 19 / TypeScript 5.9 / Vite 7
  Storage: Dexie.js (IndexedDB wrapper)

  Key Core Engineering Features:
  * CSP/Frame Interception: Electron Main Process intercepts network layer
    to strip X-Frame-Options & Content-Security-Policy headers, enabling
    safe embedded frame loads of ChatGPT, Claude, and Gemini.
  * Super Copy: Bypasses standard browser CORS/hotlink locks by intercepting
    media urls, downloading them to local buffers via Node.js, and writing 
    directly to the native system Clipboard API.
  * DB Write Buffering: Debounced save hooks flush changes in groups to 
    IndexedDB, preventing UI lagging during intensive typing.`,

  creed: `[Engineering Creed]
  -------------------------------------------------------------
  "I don't just learn syntax; I build. I learn by building my own 
  version of a system, studying existing production implementations, 
  comparing the differences, and recursively refining both design 
  and code. I believe that mastering data structures and algorithms 
  with AI as an accelerator is a developer's superpower. With perfect 
  agentic orchestration and a deep logical understanding of low-level 
  systems, I build high-performance software that solves real-world 
  challenges—turning complex architectural concepts into highly 
  optimized working beasts."`,

  education: `[Academic Background]
  -------------------------------------------------------------
  * Ph.D. Candidate (Computer Science & Engineering)
    Anna University, Chennai, India (Doctoral Committee Confirmed)
    Focus: Delay-Tolerant Networking (DTN), Quadratic soft-constraints.
  
  * M.E. in Computer Science & Engineering
    Anna University, Chennai, India
  
  * B.E. in Computer Science & Engineering
    Anna University, Chennai, India`,

  experience: `[Professional Experience]
  -------------------------------------------------------------
  * Assistant Professor / Systems Researcher (June 2021 - Present)
    IT Department, Nehru Institute of Technology, Coimbatore, India
    - Courses taught: Advanced Networks, OS, Distributed Systems.
    - Built 'cnl-codetainers' to make sandboxed networking labs accessible.
    - Researched QUBO formulations for aerospace DTN architectures.`
};

// Process terminal commands
function runCommand(cmdText) {
  const cleanCmd = cmdText.trim().toLowerCase();
  
  // Clear command output first if requested
  if (cleanCmd === 'clear') {
    terminalOutput.innerHTML = '';
    return;
  }
  
  let result = '';
  if (cleanCmd === '') {
    result = '';
  } else if (commands[cleanCmd]) {
    result = commands[cleanCmd];
  } else {
    result = `Command not found: '${cmdText}'. Type 'help' for valid options.`;
  }
  
  // Format prompt echo
  const echoLine = `\nguest@pandiajason.github.io:~$ ${cmdText}\n`;
  terminalOutput.innerHTML += echoLine + result + '\n';
  
  // Auto-scroll terminal
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Event Listeners
terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value;
    cmdHistory.push(cmd);
    cmdIndex = cmdHistory.length;
    
    runCommand(cmd);
    terminalInput.value = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (cmdIndex > 0) {
      cmdIndex--;
      terminalInput.value = cmdHistory[cmdIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (cmdIndex < cmdHistory.length - 1) {
      cmdIndex++;
      terminalInput.value = cmdHistory[cmdIndex];
    } else {
      cmdIndex = cmdHistory.length;
      terminalInput.value = '';
    }
  }
});

// Shortcut buttons
shortcutBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-cmd');
    runCommand(cmd);
  });
});

// Focus terminal input on clicking the body
terminalBody.addEventListener('click', () => {
  terminalInput.focus();
});


// --- DTN 2D Canvas Orbital Simulator ---
const canvas = document.getElementById('dtn-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = canvas.parentElement.clientWidth;
let height = canvas.height = canvas.parentElement.clientHeight;

// Handle canvas resizing
window.addEventListener('resize', () => {
  if (canvas.parentElement) {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }
});

// Physics/Node coordinates
const mars = { x: 80, y: 0, r: 35, color: '#e74c3c', label: 'Mars' };
const earth = { x: 0, y: 0, r: 45, color: '#3498db', label: 'Earth DSN' };

const rover = { angle: 0, r: 8, color: '#f1c40f', label: 'Rover (Source)' };
const mro = { orbitR: 70, speed: 0.008, angle: 0, r: 6, color: '#ffde00', label: 'MRO' };
const odyssey = { orbitR: 110, speed: 0.005, angle: Math.PI, r: 6, color: '#ffde00', label: 'Odyssey' };

// Queue variables to show store-and-forward state
let mroQueue = [];
let odysseyQueue = [];
let activePackets = [];

// Helper distance check
function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Particle Class for transferring data packets
class DataPacket {
  constructor(startX, startY, targetNode, speed, priority) {
    this.x = startX;
    this.y = startY;
    this.target = targetNode;
    this.speed = speed;
    this.priority = priority; // 1 = low (housekeeping), 10 = high (science)
    this.progress = 0;
  }

  update() {
    this.progress += this.speed;
    if (this.progress >= 1) {
      this.progress = 1;
      return true; // arrived
    }
    return false;
  }

  draw() {
    // Interpolate positions
    const currentX = this.x + (this.target.x - this.x) * this.progress;
    const currentY = this.y + (this.target.y - this.y) * this.progress;
    
    ctx.beginPath();
    ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
    ctx.fillStyle = this.priority > 5 ? '#ffde00' : '#888888';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#ffde00';
    ctx.fill();
    ctx.shadowBlur = 0; // reset
  }
}

// Simulation loop
function drawSimulation() {
  ctx.fillStyle = '#080808';
  ctx.fillRect(0, 0, width, height);

  // Center coordinate mappings
  const centerX = width / 2;
  const centerY = height / 2;

  // Position Mars & Earth
  mars.x = centerX - width * 0.28;
  mars.y = centerY + height * 0.15;
  earth.x = centerX + width * 0.28;
  earth.y = centerY - height * 0.15;

  // Draw Earth
  ctx.beginPath();
  ctx.arc(earth.x, earth.y, earth.r, 0, Math.PI * 2);
  ctx.fillStyle = '#112233';
  ctx.strokeStyle = '#3498db';
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();
  ctx.font = '10px Fira Code';
  ctx.fillStyle = '#3498db';
  ctx.fillText(earth.label, earth.x - 26, earth.y + 4);

  // Draw Mars
  ctx.beginPath();
  ctx.arc(mars.x, mars.y, mars.r, 0, Math.PI * 2);
  ctx.fillStyle = '#2d1111';
  ctx.strokeStyle = '#e74c3c';
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e74c3c';
  ctx.fillText(mars.label, mars.x - 12, mars.y + 4);

  // Rover stationary on Mars surface
  const roverX = mars.x + Math.cos(-Math.PI / 4) * mars.r;
  const roverY = mars.y + Math.sin(-Math.PI / 4) * mars.r;
  ctx.beginPath();
  ctx.arc(roverX, roverY, rover.r, 0, Math.PI * 2);
  ctx.fillStyle = rover.color;
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Rover', roverX + 10, roverY - 5);

  // Update Orbiters
  mro.angle += mro.speed;
  odyssey.angle += odyssey.speed;

  // Compute Orbiter Positions around Mars
  const mroX = mars.x + Math.cos(mro.angle) * mro.orbitR;
  const mroY = mars.y + Math.sin(mro.angle) * mro.orbitR;
  
  const odyX = mars.x + Math.cos(odyssey.angle) * odyssey.orbitR;
  const odyY = mars.y + Math.sin(odyssey.angle) * odyssey.orbitR;

  // Draw Orbits
  ctx.beginPath();
  ctx.arc(mars.x, mars.y, mro.orbitR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,222,0,0.06)';
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(mars.x, mars.y, odyssey.orbitR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,222,0,0.04)';
  ctx.stroke();

  // Draw MRO Relay Node
  ctx.beginPath();
  ctx.arc(mroX, mroY, mro.r, 0, Math.PI * 2);
  ctx.fillStyle = mro.color;
  ctx.fill();
  ctx.fillStyle = '#888888';
  ctx.fillText('MRO', mroX - 10, mroY - 10);
  // Render MRO queue buffer indicator
  ctx.fillStyle = 'rgba(255,222,0,0.1)';
  ctx.fillRect(mroX - 10, mroY + 8, 20, 4);
  ctx.fillStyle = '#ffde00';
  ctx.fillRect(mroX - 10, mroY + 8, Math.min(20, mroQueue.length * 4), 4);

  // Draw Odyssey Relay Node
  ctx.beginPath();
  ctx.arc(odyX, odyY, odyssey.r, 0, Math.PI * 2);
  ctx.fillStyle = odyssey.color;
  ctx.fill();
  ctx.fillStyle = '#888888';
  ctx.fillText('Odyssey', odyX - 18, odyY - 10);
  // Render Odyssey queue buffer indicator
  ctx.fillStyle = 'rgba(255,222,0,0.1)';
  ctx.fillRect(odyX - 10, odyY + 8, 20, 4);
  ctx.fillStyle = '#ffde00';
  ctx.fillRect(odyX - 10, odyY + 8, Math.min(20, odysseyQueue.length * 4), 4);

  // Connection range checks (visualize store-and-forward rules)
  const mroToRoverDist = dist(mroX, mroY, roverX, roverY);
  const odyToRoverDist = dist(odyX, odyY, roverX, roverY);
  
  const mroToEarthDist = dist(mroX, mroY, earth.x, earth.y);
  const odyToEarthDist = dist(odyX, odyY, earth.x, earth.y);

  const maxRangeRover = 85;
  const maxRangeEarth = 300;

  // Rover to Relays active connections
  let mroLinkedToRover = mroToRoverDist < maxRangeRover;
  let odyLinkedToRover = odyToRoverDist < maxRangeRover;

  // Relays to Earth active connections
  let mroLinkedToEarth = mroToEarthDist < maxRangeEarth;
  let odyLinkedToEarth = odyToEarthDist < maxRangeEarth;

  // Draw Link lines
  if (mroLinkedToRover) {
    ctx.beginPath();
    ctx.moveTo(roverX, roverY);
    ctx.lineTo(mroX, mroY);
    ctx.strokeStyle = 'rgba(255, 222, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  if (odyLinkedToRover) {
    ctx.beginPath();
    ctx.moveTo(roverX, roverY);
    ctx.lineTo(odyX, odyY);
    ctx.strokeStyle = 'rgba(255, 222, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  if (mroLinkedToEarth) {
    ctx.beginPath();
    ctx.moveTo(mroX, mroY);
    ctx.lineTo(earth.x, earth.y);
    ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.stroke();
  }
  if (odyLinkedToEarth) {
    ctx.beginPath();
    ctx.moveTo(odyX, odyY);
    ctx.lineTo(earth.x, earth.y);
    ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)';
    ctx.stroke();
  }

  // --- Queue logic simulation ---
  // Rover periodically creates new data bundles
  if (Math.random() < 0.015) {
    const priority = Math.random() < 0.3 ? 10 : 1; // 30% high priority science
    
    // Always-Feasible Routing logic: Send to orbiter with lowest congestion/queue occupancy
    if (mroLinkedToRover && odyLinkedToRover) {
      if (mroQueue.length <= odysseyQueue.length) {
        activePackets.push(new DataPacket(roverX, roverY, { x: mroX, y: mroY, type: 'mro' }, 0.05, priority));
      } else {
        activePackets.push(new DataPacket(roverX, roverY, { x: odyX, y: odyY, type: 'ody' }, 0.05, priority));
      }
    } else if (mroLinkedToRover) {
      activePackets.push(new DataPacket(roverX, roverY, { x: mroX, y: mroY, type: 'mro' }, 0.05, priority));
    } else if (odyLinkedToRover) {
      activePackets.push(new DataPacket(roverX, roverY, { x: odyX, y: odyY, type: 'ody' }, 0.05, priority));
    }
  }

  // Relays forward queue bundles to Earth DSN when in range
  if (mroLinkedToEarth && mroQueue.length > 0 && Math.random() < 0.08) {
    const packet = mroQueue.shift();
    activePackets.push(new DataPacket(mroX, mroY, { x: earth.x, y: earth.y, type: 'earth' }, 0.03, packet.priority));
  }
  if (odyLinkedToEarth && odysseyQueue.length > 0 && Math.random() < 0.08) {
    const packet = odysseyQueue.shift();
    activePackets.push(new DataPacket(odyX, odyY, { x: earth.x, y: earth.y, type: 'earth' }, 0.03, packet.priority));
  }

  // Update and draw transferring packets
  for (let i = activePackets.length - 1; i >= 0; i--) {
    const p = activePackets[i];
    
    // Update target dynamically as orbits move
    if (p.target.type === 'mro') {
      p.target.x = mroX;
      p.target.y = mroY;
    } else if (p.target.type === 'ody') {
      p.target.x = odyX;
      p.target.y = odyY;
    }

    const arrived = p.update();
    p.draw();

    if (arrived) {
      // If packet arrived at a relay, store in buffer queue
      if (p.target.type === 'mro') {
        mroQueue.push(p);
      } else if (p.target.type === 'ody') {
        odysseyQueue.push(p);
      } else if (p.target.type === 'earth') {
        // Arrived at Earth DSN (Success)
        drawGlowCircle(earth.x, earth.y, earth.r + 5, '#3498db');
      }
      activePackets.splice(i, 1);
    }
  }

  requestAnimationFrame(drawSimulation);
}

function drawGlowCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Start simulation once fonts load
window.addEventListener('load', () => {
  drawSimulation();
});

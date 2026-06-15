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
  [bats]        Display Go deterministic agent safety proxy
  [ranotot]     View Godot 4 gravity physics game structure
  [ninai]       Bypass CORS/CSP Electron webview structure
  [dsa-c]       Inspect C DSA repository implementations
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

  bats: `[bats] WAND -- Watch. Audit. Never Delegate.
  -------------------------------------------------------------
  Language: Go (1.24+)
  Framework: Deterministic safety proxy for autonomous AI agents

  Security Design Paradigm:
  [Autonomous Agent]  --->  [WAND Deterministic Engine]  --->  [Tamper-Evident WAL]  --->  [Infrastructure]
                                   |
                        183 Pre-Compiled Rules
                        (BLOCK / CHALLENGE / ALLOW)

  Key Features:
  * Deterministic Policy: 136 BLOCK and 47 CHALLENGE rules evaluated via pre-compiled regex.
  * Performance: Evaluated in <5ms with zero LLM/probabilistic latency.
  * Compliance: Cryptographic audit log using SHA-256 hash chaining with fsync durability.
  * Safety Gatekeeping: Hard blocks prompt injections, destructive commands, or API resource exhaustion.`,

  ranotot: `[Ranotot] 2D Gravity-Based Space Delivery Game
  -------------------------------------------------------------
  Engine: Godot 4.6 (GL Compatibility)
  Languages: GDScript / Python (Level Generation)

  Mechanics & Architecture:
  * Dynamic Planet Gravity: Custom radial gravity fields where each planet
    attracts the player depending on proximity thresholds.
  * Camera System: Fixed zoom (0.5) that remains locked on planets and 
    follows the player with deadzone dampening in zero-gravity space.
  * Procedural Level Generation: Custom Python automation script generates 
    levels 31-90 dynamically, building planet arrangements and asteroid grids.
  * Save System: JSON-serialized game progress states stored locally.`,

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

  'dsa-c': `[DSA-C] Standard C Data Structures & Algorithms
  -------------------------------------------------------------
  Language: Standard C (C99/C11)
  Focus: Low-level memory management, pointers, and custom implementations

  Example Implementation (Linked List Deletion):
  -------------------------------------------------------------
  #include <stdlib.h>
  
  typedef struct Node {
      int data;
      struct Node* next;
  } Node;
  
  void deleteNode(Node** head_ref, int key) {
      Node *temp = *head_ref, *prev = NULL;
      if (temp != NULL && temp->data == key) {
          *head_ref = temp->next;
          free(temp);
          return;
      }
      while (temp != NULL && temp->data != key) {
          prev = temp;
          temp = temp->next;
      }
      if (temp == NULL) return;
      prev->next = temp->next;
      free(temp);
  }
  
  * Focuses on zero-dependency, manual memory allocation (malloc/free)
    and raw pointer manipulation to build fundamental structures.`,

  creed: `[Engineering Creed]
  -------------------------------------------------------------
  "I don't just learn syntax; I build. I learn by building my 
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
  * Ph.D. Scholar (Computer Science & Engineering)
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
const mars = { x: 80, y: 0, r: 30, color: '#ffcc00', label: 'Mars' };
const earth = { x: 0, y: 0, r: 36, color: '#ffffff', label: 'Earth DSN' };

const rover = { angle: 0, r: 8, color: '#000000', label: 'Rover' };
const mro = { orbitR: 65, speed: 0.009, angle: 0, r: 6, color: '#000000', label: 'MRO' };
const odyssey = { orbitR: 100, speed: 0.006, angle: Math.PI, r: 6, color: '#000000', label: 'Odyssey' };

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
    ctx.fillStyle = this.priority > 5 ? '#ffcc00' : '#000000';
    ctx.fill();
  }
}

// Draw a subtle background grid for visual structure (retrofuturist blueprint)
function drawGrid() {
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  const gridSize = 30;
  
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

// Simulation loop
function drawSimulation() {
  // Clear transparently to inherit the light neumorphic card background style
  ctx.clearRect(0, 0, width, height);

  // Draw coordinate grid lines
  drawGrid();

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
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.font = '600 10px Inter';
  ctx.fillStyle = '#000000';
  ctx.fillText(earth.label, earth.x - 26, earth.y + 4);

  // Draw Mars
  ctx.beginPath();
  ctx.arc(mars.x, mars.y, mars.r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffcc00';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#000000';
  ctx.fillText(mars.label, mars.x - 12, mars.y + 4);

  // Rover stationary on Mars surface
  const roverX = mars.x + Math.cos(-Math.PI / 4) * mars.r;
  const roverY = mars.y + Math.sin(-Math.PI / 4) * mars.r;
  ctx.beginPath();
  ctx.arc(roverX, roverY, rover.r, 0, Math.PI * 2);
  ctx.fillStyle = rover.color;
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.stroke();
  ctx.fillStyle = '#000000';
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
  ctx.strokeStyle = 'rgba(0,0,0,0.04)';
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(mars.x, mars.y, odyssey.orbitR, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,0,0,0.03)';
  ctx.stroke();

  // Draw MRO Relay Node
  ctx.beginPath();
  ctx.arc(mroX, mroY, mro.r, 0, Math.PI * 2);
  ctx.fillStyle = mro.color;
  ctx.fill();
  ctx.strokeStyle = '#ffcc00';
  ctx.stroke();
  ctx.fillStyle = '#000000';
  ctx.fillText('MRO', mroX - 10, mroY - 10);
  
  // Render MRO queue buffer indicator
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(mroX - 10, mroY + 8, 20, 4);
  ctx.fillStyle = varColor('yellow-accent');
  ctx.fillRect(mroX - 10, mroY + 8, Math.min(20, mroQueue.length * 4), 4);

  // Draw Odyssey Relay Node
  ctx.beginPath();
  ctx.arc(odyX, odyY, odyssey.r, 0, Math.PI * 2);
  ctx.fillStyle = odyssey.color;
  ctx.fill();
  ctx.strokeStyle = '#ffcc00';
  ctx.stroke();
  ctx.fillStyle = '#000000';
  ctx.fillText('Odyssey', odyX - 18, odyY - 10);
  
  // Render Odyssey queue buffer indicator
  ctx.fillStyle = 'rgba(0,0,0,0.1)';
  ctx.fillRect(odyX - 10, odyY + 8, 20, 4);
  ctx.fillStyle = varColor('yellow-accent');
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

  // Draw Link lines (Clean light-grey indicators)
  if (mroLinkedToRover) {
    ctx.beginPath();
    ctx.moveTo(roverX, roverY);
    ctx.lineTo(mroX, mroY);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  if (odyLinkedToRover) {
    ctx.beginPath();
    ctx.moveTo(roverX, roverY);
    ctx.lineTo(odyX, odyY);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  if (mroLinkedToEarth) {
    ctx.beginPath();
    ctx.moveTo(mroX, mroY);
    ctx.lineTo(earth.x, earth.y);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }
  if (odyLinkedToEarth) {
    ctx.beginPath();
    ctx.moveTo(odyX, odyY);
    ctx.lineTo(earth.x, earth.y);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1.2;
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

// Get CSS root variables dynamically
function varColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
}

function drawGlowCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = '#ffcc00';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Start simulation once fonts load
window.addEventListener('load', () => {
  drawSimulation();
});

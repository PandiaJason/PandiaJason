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

// --- Interactive Terminal Emulator ---
const terminalInput = document.getElementById('terminal-input');
const terminalInputDisplay = document.getElementById('terminal-input-display');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');
const shortcutBtns = document.querySelectorAll('.shortcut-btn');

const entranceCards = document.querySelectorAll('.desktop-grid > .widget-card:not(#mascot-card)');


// Command History
let cmdHistory = [];
let cmdIndex = -1;

const commands = {
  help: `Available commands:
  -------------------------------------------------------------
  [nanos]       Display WebAssembly micro-runtime architecture
  [ownedc]      Display C memory safety & borrow-checking framework
  [ranotot]     View Godot 4 gravity physics game structure
  [spice-ns]    View ns-3 Delay-Tolerant Network simulation
  [ninai]       Local-first dual-pane CORS/CSP bypass workspace
  [dsa-c]       Pedagogical reference DSA implementations in C
  [bats]        Display Go deterministic agent safety proxy
  [creed]       Print Jason's systems engineering philosophy
  [education]   Show academic credentials & publications
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

  Performance Metrics (from README.md):
  * Startup Boot Latency: <3ms (50x faster than Linux MicroVM instantiation)
  * System Memory Footprint: ~39MB RSS (vs 2GB+ standard Linux VM / 50x RAM reduction)
  * FFI Syscall execution: <1ms (300x faster than localhost TCP loopback)`,

  'spice-ns': `[spice-ns] Deep Space Network Simulation
  -------------------------------------------------------------
  Language: C++ / Python / ns-3 simulator
  Target: High-fidelity simulation of space relay networks

  Simulation Paradigm:
  Mars Surface-to-Orbit  <--->  NASA SPICE Astrodynamics  <--->  ns-3 simulator
  - Ka-band / UHF links         - Orbital contact relays         - Custom node extensions

  Key Features & Performance:
  * Extensions: Models Delay-Tolerant Networking (DTN) and DSN topologies.
  * Congestion Soft Constraints: Integrates quadratic load-balancing Hamiltonian.
  * Performance: Delivers 2.4x more data capacity than standard CGR and matches the ILP-optimal upper bound.`,

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
  * Performance: Evaluated in <5ms (vs 1500ms+ for LLM-based safety evals) with zero LLM-probabilistic latency.
  * Compliance: Cryptographic audit log using SHA-256 hash chaining with fsync durability.
  * Safety Gatekeeping: Hard blocks prompt injections, destructive commands, or API resource exhaustion.`,

  ranotot: `[Ranotot] 2D Gravity-Based Space Delivery Game
  -------------------------------------------------------------
  Engine: Godot 4.6 (GL Compatibility)
  Developer: Hikki Studios
  Languages: GDScript / Python (Level Generation)

  Mechanics & Architecture:
  * Dynamic Planet Gravity: Custom radial gravity fields where each planet
    attracts the player depending on proximity thresholds.
  * Camera System: Fixed zoom (0.5) that remains locked on planets and 
    follows the player with deadzone dampening in zero-gravity space.
  * Procedural Level Generation: Custom Python automation script generates 
    levels 31-90 dynamically, building planet arrangements and asteroid grids.
  * Save System: JSON-serialized game progress states stored locally.`,

  ninai: `[ninai] Local-First CORS/CSP Bypass Workspace
  -------------------------------------------------------------
  Framework: Electron 40 / React 19 / TypeScript 5.9 / Vite 7
  Storage: Dexie.js (IndexedDB wrapper)

  Key Core Engineering & Security Features:
  * CSP/CORS Header Interception: Electron Main Process intercepts network layer
    to strip X-Frame-Options & Content-Security-Policy headers, enabling
    safe embedded frame loads of ChatGPT, Claude, and Gemini.
  * Super Copy: Bypasses standard browser CORS/hotlink locks by intercepting
    media urls, downloading them to local buffers via Node.js, and writing 
    directly to the native system Clipboard API.
  * DB Write Buffering: Debounced save hooks flush changes in groups to 
    IndexedDB, preventing UI lagging during intensive typing.`,

  ownedc: `[OwnedC] Memory Safety Framework for C
  -------------------------------------------------------------
  Language: Standard C (C99 / C11)
  Repository: https://github.com/PandiaJason/OwnedC

  Key Security & Structural Features:
  * Dynamic Ownership Tracking: Uses a runtime metadata registry to intercept 
    double-frees, use-after-frees, and ownership/borrow violations.
  * Scope-Bound RAII: Zero-cost compiler cleanup attributes (GCC/Clang) 
    automatically free resources when variables go out of scope.
  * Thread-Safe Arenas: 'safe_region' provides zero-overhead arena allocation 
    for high-performance hot paths.
  * Real-World Integration: Easily injected into production legacy codebases 
    (like SQLite3 mem_methods) with zero core engine code changes.`,

  'dsa-c': `[DSA-C] Pedagogical Reference DSA Implementations
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
  
  * A pedagogical reference library focusing on manual memory allocation (malloc/free)
    and raw pointer manipulation to teach fundamental structures.`,

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

  education: `[Academic Background & Research Focus]
  -------------------------------------------------------------
  * Ph.D. Scholar (Computer Science & Engineering)
    Nehru Institute of Technology / Anna University, Chennai, India (Doctoral Committee Confirmed)
    Focus: Delay-Tolerant Networking (DTN), Quadratic soft-constraints.
  
  * Ph.D. Thesis Project:
    - "Delay-Tolerant Space Relay Routing Optimization using Astrodynamic Contacts"
  
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
    - Researched SPICE-ns Delay-Tolerant Network simulator architectures.`
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

// Sync display text with hidden input
terminalInput.addEventListener('input', () => {
  terminalInputDisplay.textContent = terminalInput.value;
});

// Event Listeners for Terminal
terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value;
    cmdHistory.push(cmd);
    cmdIndex = cmdHistory.length;
    
    runCommand(cmd);
    terminalInput.value = '';
    terminalInputDisplay.textContent = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (cmdIndex > 0) {
      cmdIndex--;
      terminalInput.value = cmdHistory[cmdIndex];
      terminalInputDisplay.textContent = cmdHistory[cmdIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (cmdIndex < cmdHistory.length - 1) {
      cmdIndex++;
      terminalInput.value = cmdHistory[cmdIndex];
      terminalInputDisplay.textContent = cmdHistory[cmdIndex];
    } else {
      cmdIndex = cmdHistory.length;
      terminalInput.value = '';
      terminalInputDisplay.textContent = '';
    }
  }
});

shortcutBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-cmd');
    runCommand(cmd);
    terminalInput.focus();
  });
});

terminalBody.addEventListener('click', () => {
  terminalInput.focus();
});


// --- Real-time Analog Clock ---
function updateClock() {
  const hourHand = document.getElementById('hour-hand');
  const minuteHand = document.getElementById('minute-hand');
  const secondHand = document.getElementById('second-hand');
  
  if (!hourHand || !minuteHand || !secondHand) return;
  
  const now = new Date();
  const hr = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();
  
  const hrAngle = (hr % 12) * 30 + min * 0.5;
  const minAngle = min * 6 + sec * 0.1;
  const secAngle = sec * 6;
  
  hourHand.style.transform = `rotate(${hrAngle}deg)`;
  minuteHand.style.transform = `rotate(${minAngle}deg)`;
  secondHand.style.transform = `rotate(${secAngle}deg)`;
}
setInterval(updateClock, 1000);
updateClock(); // Initial run


// --- Modal Dialog System ---
const desktopWrapper = document.getElementById('desktop-wrapper');

const modals = {
  console: document.getElementById('modal-console-overlay'),
  projects: document.getElementById('modal-projects-overlay'),
  creed: document.getElementById('modal-creed-overlay'),
  resume: document.getElementById('modal-resume-overlay'),
  profile: document.getElementById('modal-profile-overlay')
};

// Open Modal function
function openModal(modalKey) {
  const modal = modals[modalKey];
  if (!modal) return;
  
  modal.classList.add('active');
  desktopWrapper.classList.add('modal-active');
  
  // Custom behaviors per modal
  if (modalKey === 'console') {
    setTimeout(() => {
      terminalInput.focus();
    }, 100);
  }
}

// Close Modal function
function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  
  // Check if any other modal is still active
  const anyActive = Object.values(modals).some(m => m.classList.contains('active'));
  if (!anyActive) {
    desktopWrapper.classList.remove('modal-active');
  }
}

// Wire Desktop Icons/Cards Click Events
document.getElementById('card-projects').addEventListener('click', () => openModal('projects'));
document.getElementById('card-console').addEventListener('click', () => openModal('console'));
document.getElementById('card-creed').addEventListener('click', () => openModal('creed'));
document.getElementById('card-resume').addEventListener('click', () => openModal('resume'));
document.getElementById('card-profile').addEventListener('click', () => openModal('profile'));

// Clock Card Hover -> Mascot Card Time-Check State
const clockWidget = document.querySelector('.clock-widget');
const mascotCard = document.getElementById('mascot-card');
if (clockWidget && mascotCard) {
  clockWidget.addEventListener('mouseenter', () => {
    mascotCard.classList.add('hover-clock');
  });
  clockWidget.addEventListener('mouseleave', () => {
    mascotCard.classList.remove('hover-clock');
  });
}

// Projects Card Hover -> Mascot Card Projects State
const projectsWidget = document.getElementById('card-projects');
if (projectsWidget && mascotCard) {
  projectsWidget.addEventListener('mouseenter', () => {
    mascotCard.classList.add('hover-projects');
  });
  projectsWidget.addEventListener('mouseleave', () => {
    mascotCard.classList.remove('hover-projects');
  });
}

// Creed Card Hover -> Mascot Card Creed State
const creedWidget = document.getElementById('card-creed');
if (creedWidget && mascotCard) {
  creedWidget.addEventListener('mouseenter', () => {
    mascotCard.classList.add('hover-creed');
  });
  creedWidget.addEventListener('mouseleave', () => {
    mascotCard.classList.remove('hover-creed');
  });
}

// Profile Card Hover -> Mascot Card Profile State
const profileWidget = document.getElementById('card-profile');
if (profileWidget && mascotCard) {
  profileWidget.addEventListener('mouseenter', () => {
    mascotCard.classList.add('hover-profile');
  });
  profileWidget.addEventListener('mouseleave', () => {
    mascotCard.classList.remove('hover-profile');
  });
}

// Console Card Hover -> Mascot Card Console State
const consoleWidget = document.getElementById('card-console');
if (consoleWidget && mascotCard) {
  consoleWidget.addEventListener('mouseenter', () => {
    mascotCard.classList.add('hover-console');
  });
  consoleWidget.addEventListener('mouseleave', () => {
    mascotCard.classList.remove('hover-console');
  });
}

// Resume/CV Card Hover -> Mascot Card Resume State
const resumeWidget = document.getElementById('card-resume');
if (resumeWidget && mascotCard) {
  resumeWidget.addEventListener('mouseenter', () => {
    mascotCard.classList.add('hover-resume');
  });
  resumeWidget.addEventListener('mouseleave', () => {
    mascotCard.classList.remove('hover-resume');
  });
}

// Setup general Close handlers (Click close capsule or click backdrop)
Object.values(modals).forEach(modal => {
  const closeBtn = modal.querySelector('.modal-close-capsule');
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Prevent backdrop close when clicking inside the modal content box
document.querySelectorAll('.modal-container').forEach(container => {
  container.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});


// --- Projects Accordion System ---
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');
  
  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Collapse all items
    accordionItems.forEach(otherItem => {
      otherItem.classList.remove('active');
    });
    
    // Toggle clicked item
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// Open the first accordion item by default in Projects modal
if (accordionItems.length > 0) {
  accordionItems[0].classList.add('active');
}

// --- Card Entrance Fly-Out Animation ---
function triggerEntranceAnimation() {
  if (window.entranceAnimationTriggered) return;
  window.entranceAnimationTriggered = true;
  
  const mascot = document.getElementById('mascot-card');
  if (!mascot) return;
  
  const mascotRect = mascot.getBoundingClientRect();
  const mascotX = mascotRect.left + mascotRect.width / 2;
  const mascotY = mascotRect.top + mascotRect.height / 2;
  
  entranceCards.forEach(card => {
    card.style.transition = 'none';
    
    const cardRect = card.getBoundingClientRect();
    const cardX = cardRect.left + cardRect.width / 2;
    const cardY = cardRect.top + cardRect.height / 2;
    
    const dx = mascotX - cardX;
    const dy = mascotY - cardY;
    
    card.style.transform = `translate(${dx}px, ${dy}px) scale(0.2)`;
    card.style.opacity = '0';
  });
  
  // Remove js-loading class to enable normal layout styles (like default opacity: 1)
  document.documentElement.classList.remove('js-loading');
  
  // Force a browser reflow/layout recalculation
  void mascot.offsetHeight;
  
  // Animate the cards to their layout positions with a cascade delay
  entranceCards.forEach((card, index) => {
    const delay = index * 60; // 60ms staggered delay between cards
    setTimeout(() => {
      card.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease';
      card.style.transform = 'translate(0, 0) scale(1)';
      card.style.opacity = '1';
      
      // Clean up styles to preserve hover transitions defined in CSS
      setTimeout(() => {
        card.style.transform = '';
        card.style.opacity = '';
        card.style.transition = '';
      }, 850);
    }, delay);
  });
}

// Trigger animation on load or via safety timeout fallback
if (document.readyState === 'complete') {
  triggerEntranceAnimation();
} else {
  window.addEventListener('load', triggerEntranceAnimation);
  // Backup timeout: trigger animation if loading takes longer than 1.2s to prevent blank screens
  setTimeout(triggerEntranceAnimation, 1200);
}


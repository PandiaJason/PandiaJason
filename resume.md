# Jason Pandian
**Systems & Infrastructure Engineer · Ph.D. Researcher · Technical Code Auditor**  
Coimbatore, Tamil Nadu, India | pandiajason@gmail.com | [GitHub: github.com/PandiaJason](https://github.com/PandiaJason) | [LinkedIn / Contact Details]

---

## 💡 Builder Philosophy & Engineering Creed
> *"I don't just learn syntax; I build. I learn by building my own version of a system, studying existing production implementations, comparing the differences, and recursively refining both design and code. I believe that mastering data structures and algorithms with AI as an accelerator is a developer's superpower. With perfect agentic orchestration and a deep logical understanding of low-level systems, I build high-performance software that solves real-world challenges—turning complex architectural concepts into highly optimized working beasts."*

---

## 🛠️ Technical Expertise & Core Strengths

*   **Languages:** Rust, C, C++ (C++17), Go, Python, SQL, Assembly, Solidity.
*   **Virtualization & Sandboxing:** WebAssembly (Wasmtime runtime orchestration), FFI boundaries, memory isolation, Docker, LXC, Linux namespaces.
*   **Networking & Distributed Systems:** Delay-Tolerant Networking (DTN), TCP/IP socket programming, custom reliable UDP, STUN client bindings (NAT Hole Punching), Network Simulator 3 (ns-3), NASA SPICE telemetry.
*   **Technical Auditing & Codebase Navigation:** Deep-dive navigation of large, multi-million-line codebases (e.g., `wasmtime`, `ns-3`, `llama.cpp`). Expert in visual debugging, security boundary verification, memory leaks triaging, and reverse engineering.
*   **Agentic Software Engineering:** Co-authoring complex systems with LLM agents (Antigravity), prompt-engineered code synthesis, automated test harness generation, and benchmark-driven optimization.

---

## 🚀 Key Projects & Systems Portfolio

### 1. **nanos** (Rust, WebAssembly, CUDA/Metal)
*Lightweight, process-isolated WASM micro-runtime for sandboxed AI agents with native GPU offload.*
*   Designed and built a capability-isolated WebAssembly (WASM) micro-runtime in **Rust** to execute untrusted AI agent code with native host GPU offloading (**Apple Metal / CUDA**).
*   Achieved a **50x RAM reduction** (~20MB RSS vs. 2GB+ VM) and **<3ms cold-start sandbox boot latency** by virtualizing only application logic space, eliminating hypervisor overhead.
*   Engineered a secure **in-process syscall loop** using direct WASM linear-memory **FFI pointer passing**, bypassing JSON serialization and localhost TCP loopback latency to complete tool calls in **<1ms** (a **300x latency reduction**).
*   Integrated Model Context Protocol (MCP) servers and instruction metering (fuel budgets) to guarantee sandboxed safety and resource constraints.

### 2. **qubo-space-routing & SPICE-ns-Project** (C++, Python, LaTeX)
*Mathematical routing optimization using Lagrangian relaxation and NASA SPICE-derived Mars relay topologies.*
*   Formulated an always-feasible Delay-Tolerant Network (DTN) routing protocol by replacing hard capacity constraints with **quadratic soft penalties** $(L_e - C_e)^2$ mapped to a Quadratic Unconstrained Binary Optimization (QUBO) Hamiltonian.
*   Leveraged quadratic cross-terms to make congestion pairwise visible to the solver, driving automatic global load-balancing without heuristics. Delivered **2.4x more data** than Contact Graph Routing (CGR) and matched ILP-optimal mission value.
*   Built a high-fidelity Delay-Tolerant Network extension for the **ns-3** simulator, validated on Mars surface-to-orbit Ka-band/UHF relay contacts derived from NASA SPICE kernels.
*   Presented research findings on routing survivability under congestion; paper submitted to the Elsevier journal **Ad Hoc Networks**.

### 3. **amphitude** (C++, SDL2)
*A serverless, zero-dependency peer-to-peer (P2P) arcade platform fighter and physics engine built from scratch.*
*   Developed a multiplayer game engine from scratch in **C++ and SDL2**, bypassing commercial game engines to focus on raw performance and custom mechanics.
*   Wrote a **custom reliable UDP transport protocol** implementing **STUN client bindings for NAT Hole Punching**, allowing players to establish direct client-to-client connections over public networks without central relay servers.
*   Implemented custom packet acknowledgment, state interpolation, clock-drift compensation, and local-physics synchronization.

### 4. **ninai** (Electron, React 19, TypeScript 5.9, Vite 7)
*Local-first, dual-pane desktop workspace unifying AI web assets and a persistent Markdown notebook.*
*   Designed an Electron desktop app with a split-pane layout embedding secure AI webviews side-by-side with a customized TipTap (ProseMirror) editor.
*   Wrote custom Electron main-process network interceptors to dynamically strip `X-Frame-Options` and Content-Security-Policy (CSP) headers, allowing secure integration of restricted web domains.
*   Bypassed browser CORS and hotlinking blocks by intercepting image downloads and writing binary buffers natively to the host clipboard ("Super Copy").
*   Managed local-first data using **Dexie.js (IndexedDB)** with debounced disk-writing queues to eliminate I/O thrashing and query locking over 10,000+ notes.

### 5. **cnl-codetainers** (Docker, Go, Shell)
*Accessible containerized networking sandboxes for student education.*
*   Created a system of lightweight, Docker-isolated sandbox runtimes to make low-level computer networking lab curricula accessible to students with zero installation and dependency friction.

---

## 🎓 Academic Credentials

*   **Ph.D. Scholar in Computer Science & Engineering** (Doctoral Committee Confirmed)  
    *Nehru Institute of Technology / Anna University, Chennai, India*  
    *Research Focus:* Delay-Tolerant Networking (DTN), quadratic optimization, and high-performance routing protocols.
*   **M.E. in Computer Science & Engineering**  
    *Anna University, Chennai, India*
*   **B.E. in Computer Science & Engineering**  
    *Anna University, Chennai, India*

---

## 💼 Professional & Research Experience

**Assistant Professor / Systems Researcher** | Nehru Institute of Technology, IT Department  
*Coimbatore, Tamil Nadu, India* | *June 2021 – Present*
*   Instructed courses on Advanced Computer Networks, Operating Systems, Systems Programming, and Distributed Systems.
*   Guided student lab work utilizing containerization (`cnl-codetainers`) to teach low-level network protocol stacks.
*   Conducted research on quadratic optimization and ad-hoc networks, writing simulators in Python and C++ to validate algorithmic concepts.

---

## 🏆 Honors & Recognitions

*   **Best Researcher Award (2025)** – Nehru Institute of Technology
*   **Best Faculty Award (2024)** – Nehru Institute of Technology

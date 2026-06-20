# React Flow — LLM Agent Workflow

An interactive visualization of a multi-agent LLM system built with [React Flow](https://reactflow.dev).

## What's Shown

A realistic agentic pipeline modeled after frameworks like LangGraph and CrewAI:

| Layer | Nodes | Color |
|-------|-------|-------|
| **I/O** | User Message, Final Response | Teal |
| **Agents** | Intent Router · Task Planner · Tool Selector · Synthesizer | Indigo |
| **Tools** | Web Search · RAG Retrieval · Code Executor · Calculator | Amber |
| **Memory** | Conversation Memory (bidirectional feedback loop) | Purple |

## Flow

```
User Message
  → Intent Router  ←→  Conversation Memory
    → Task Planner (ReAct)
      → Tool Selector (Function calling)
        → Web Search / RAG / Code Executor / Calculator
          → Synthesizer (GPT-4o)
            → Final Response
```

## Features

- 4 custom node types with distinct visual identities
- Edge labels showing the data passed between stages (`Intent`, `Sub-tasks`)
- Animated edges on the agent reasoning path; dashed edges for tool dispatch and memory
- Bidirectional memory feedback loop (dashed purple)
- Model badges on agent nodes (GPT-4o, ReAct, Function call)
- Drag-to-connect to wire new edges interactively
- MiniMap + Controls + dark theme

## Run Locally

```bash
npm install
npm run dev
```

## Stack

- [React](https://react.dev)
- [React Flow](https://reactflow.dev)
- [Vite](https://vitejs.dev)

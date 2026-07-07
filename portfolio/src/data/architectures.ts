/**
 * Data-driven architecture pipelines for the interactive diagram engine
 * (see ArchitectureDiagram). One entry per project. Nodes carry a `row` so
 * the engine can lay them out in horizontal bands; edges are drawn as TRACEd
 * strokes between node centres. Everything here reflects the real system —
 * no invented metrics (honesty rule, PART 4.5 of the motion spec).
 */

export interface PipelineNode {
  id: string;
  label: string;
  sublabel?: string;
  /** Horizontal band, top (0) → bottom. Nodes in the same row sit side by side. */
  row: number;
  /** Extra engineering detail revealed on click. Optional, honest only. */
  detail?: string;
}

export interface PipelineEdge {
  from: string;
  to: string;
}

export interface Pipeline {
  nodes: PipelineNode[];
  edges: PipelineEdge[];
  metrics: { value: string; label: string }[];
}

export const fxAlphaLabPipeline: Pipeline = {
  nodes: [
    // row 0 — data sources (parallel)
    { id: "yahoo", label: "Yahoo Finance", sublabel: "Price data", row: 0, detail: "OHLC price history pulled per currency pair, resampled to the model's window." },
    { id: "fred", label: "FRED API", sublabel: "Yields, VIX", row: 0, detail: "Macro indicators — Treasury yields and the VIX — feed the regime model." },
    { id: "rss", label: "RSS Feeds", sublabel: "News", row: 0, detail: "Financial news headlines streamed in and scored for sentiment." },

    // row 1 — specialist agents (parallel)
    { id: "macro", label: "Macro Agent", sublabel: "KMeans → Regime detection", row: 1, detail: "KMeans clusters macro indicators into market regimes that condition the call." },
    { id: "technical", label: "Technical Agent", sublabel: "LSTM → Price signals", row: 1, detail: "An LSTM reads price action and emits a directional price-momentum signal." },
    { id: "sentiment", label: "Sentiment Agent", sublabel: "LSTM → News signals", row: 1, detail: "An LSTM turns rolling news sentiment into a bullish / bearish signal." },

    // row 2 — orchestrator
    { id: "orchestrator", label: "LLM Orchestrator", sublabel: "Groq · Llama 3.3 70B", row: 2, detail: "Llama 3.3 70B on Groq synthesises every agent output into one reasoned call." },

    // row 3 — signal
    { id: "signal", label: "Signal Output", sublabel: "BUY / SELL / HOLD", row: 3, detail: "Direction, confidence, position size and a plain-language rationale." },

    // row 4 — deployment (split)
    { id: "backend", label: "FastAPI Backend", sublabel: "REST + WebSocket", row: 4, detail: "Serves signals over REST and pushes live updates over WebSocket." },
    { id: "dashboard", label: "React Dashboard", sublabel: "Live signals + stats", row: 4, detail: "Live signals, performance stats and a full call history." },
  ],
  edges: [
    { from: "yahoo", to: "technical" },
    { from: "fred", to: "macro" },
    { from: "rss", to: "sentiment" },
    { from: "macro", to: "orchestrator" },
    { from: "technical", to: "orchestrator" },
    { from: "sentiment", to: "orchestrator" },
    { from: "orchestrator", to: "signal" },
    { from: "signal", to: "backend" },
    { from: "signal", to: "dashboard" },
    { from: "backend", to: "dashboard" },
  ],
  metrics: [
    { value: "3", label: "Specialist agents" },
    { value: "3", label: "Data sources" },
    { value: "6", label: "Currency pairs tracked" },
  ],
};

// Auto-generated from OpenRouter models API snapshot
// Snapshot date: 2026-05-27
// Do not edit by hand. Refresh by regenerating from the API.

export interface OpenRouterModelCacheEntry {
  id: string;
  baseName: string;
  displayName: string;
  description: string | null;
  created: number;
  mixedPricePerMillionUsd: number;
  priceLabel: string;
  inputModalities: string[];
  outputModalities: string[];
}

export const OPENROUTER_MODEL_CACHE: OpenRouterModelCacheEntry[] = [
  {
    "id": "alibaba/wan-2.6",
    "baseName": "Alibaba: Wan 2.6",
    "displayName": "Alibaba: Wan 2.6 — $0.00 / 1M mixed",
    "description": "Alibaba's most advanced video generation model, supporting over 10 visual creation capabilities in a unified system. Wan 2.6 generates 1080p video at 24fps from text, images, reference videos, or audio,...",
    "created": 1774659190,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "alibaba/wan-2.7",
    "baseName": "Alibaba: Wan 2.7",
    "displayName": "Alibaba: Wan 2.7 — $0.00 / 1M mixed",
    "description": "Wan 2.7 is a video generation model from Alibaba. It supports text-to-video, image-to-video with first and last frame control, and reference-to-video, where multiple reference images guide the style and content...",
    "created": 1776211362,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "openrouter/auto",
    "baseName": "Auto Router",
    "displayName": "Auto Router — $0.00 / 1M mixed",
    "description": "Your prompt will be processed by a meta-model and routed to one of dozens of models (see below), optimizing for the best possible output. To see which model was used,...",
    "created": 1699401600,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image",
      "audio",
      "file",
      "video"
    ],
    "outputModalities": [
      "text",
      "image"
    ]
  },
  {
    "id": "black-forest-labs/flux.2-flex",
    "baseName": "Black Forest Labs: FLUX.2 Flex",
    "displayName": "Black Forest Labs: FLUX.2 Flex — $0.00 / 1M mixed",
    "description": "FLUX.2 [flex] excels at rendering complex text, typography, and fine details, and supports multi-reference editing in the same unified architecture. Pricing is as follows, [per the docs](https://bfl.ai/pricing?category=flux.2): We charge $0.06...",
    "created": 1764045987,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "black-forest-labs/flux.2-klein-4b",
    "baseName": "Black Forest Labs: FLUX.2 Klein 4B",
    "displayName": "Black Forest Labs: FLUX.2 Klein 4B — $0.00 / 1M mixed",
    "description": "FLUX.2 [klein] 4B is the fastest and most cost-effective model in the FLUX.2 family, optimized for high-throughput use cases while maintaining excellent image quality. Pricing is based on the output...",
    "created": 1768429228,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "black-forest-labs/flux.2-max",
    "baseName": "Black Forest Labs: FLUX.2 Max",
    "displayName": "Black Forest Labs: FLUX.2 Max — $0.00 / 1M mixed",
    "description": "FLUX.2 [max] is the new top-tier image model from Black Forest Labs, pushing image quality, prompt understanding, and editing consistency to the highest level yet. Pricing is as follows, [per...",
    "created": 1765857570,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "black-forest-labs/flux.2-pro",
    "baseName": "Black Forest Labs: FLUX.2 Pro",
    "displayName": "Black Forest Labs: FLUX.2 Pro — $0.00 / 1M mixed",
    "description": "A high-end image generation and editing model focused on frontier-level visual quality and reliability. It delivers strong prompt adherence, stable lighting, sharp textures, and consistent character/style reproduction across multi-reference inputs....",
    "created": 1764030274,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "openrouter/bodybuilder",
    "baseName": "Body Builder (beta)",
    "displayName": "Body Builder (beta) — $0.00 / 1M mixed",
    "description": "Transform your natural language requests into structured OpenRouter API request objects. Describe what you want to accomplish with AI models, and Body Builder will construct the appropriate API calls. Example:...",
    "created": 1764903653,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "bytedance-seed/seedream-4.5",
    "baseName": "ByteDance Seed: Seedream 4.5",
    "displayName": "ByteDance Seed: Seedream 4.5 — $0.00 / 1M mixed",
    "description": "Seedream 4.5 is the latest in-house image generation model developed by ByteDance. Compared with Seedream 4.0, it delivers comprehensive improvements, especially in editing consistency, including better preservation of subject details,...",
    "created": 1766519506,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "bytedance/seedance-1-5-pro",
    "baseName": "ByteDance: Seedance 1.5 Pro",
    "displayName": "ByteDance: Seedance 1.5 Pro — $0.00 / 1M mixed",
    "description": "ByteDance's next-generation audio-visual generation model with a 4.5B parameter Dual-Branch Diffusion Transformer architecture. Seedance 1.5 Pro generates video and audio simultaneously in a single unified pass — eliminating the timing...",
    "created": 1774277608,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "bytedance/seedance-2.0",
    "baseName": "ByteDance: Seedance 2.0",
    "displayName": "ByteDance: Seedance 2.0 — $0.00 / 1M mixed",
    "description": "Seedance 2.0 is a video generation model from ByteDance. It supports text-to-video, image-to-video with first and last frame control, and multimodal reference-to-video. It is particularly strong at preserving character consistency,...",
    "created": 1776211362,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "bytedance/seedance-2.0-fast",
    "baseName": "ByteDance: Seedance 2.0 Fast",
    "displayName": "ByteDance: Seedance 2.0 Fast — $0.00 / 1M mixed",
    "description": "Seedance 2.0 Fast is a video generation model from ByteDance. It supports text-to-video, image-to-video with first and last frame control, and multimodal reference-to-video. It prioritizes generation speed and lower cost...",
    "created": 1776211362,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "cohere/rerank-4-fast",
    "baseName": "Cohere: Rerank 4 Fast",
    "displayName": "Cohere: Rerank 4 Fast — $0.00 / 1M mixed",
    "description": "Cohere's AI search foundation model for enhancing the relevance of information surfaced within search and RAG systems. Features a 32K context window, multilingual support across 100+ languages, no data pre-processing...",
    "created": 1775442269,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "rerank"
    ]
  },
  {
    "id": "cohere/rerank-4-pro",
    "baseName": "Cohere: Rerank 4 Pro",
    "displayName": "Cohere: Rerank 4 Pro — $0.00 / 1M mixed",
    "description": "Cohere's AI search foundation model for enhancing the relevance of information surfaced within search and RAG systems. Features a 32K context window, multilingual support across 100+ languages, no data pre-processing...",
    "created": 1775446247,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "rerank"
    ]
  },
  {
    "id": "cohere/rerank-v3.5",
    "baseName": "Cohere: Rerank v3.5",
    "displayName": "Cohere: Rerank v3.5 — $0.00 / 1M mixed",
    "description": "Rerank v3.5 is designed to reorder search results for improved relevance. It supports multi-aspect and semi-structured data reranking over 100+ languages. Ideal for refining results from semantic or keyword search...",
    "created": 1775416158,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "rerank"
    ]
  },
  {
    "id": "deepseek/deepseek-v4-flash:free",
    "baseName": "DeepSeek: DeepSeek V4 Flash (free)",
    "displayName": "DeepSeek: DeepSeek V4 Flash (free) — $0.00 / 1M mixed",
    "description": "DeepSeek V4 Flash is an efficiency-optimized Mixture-of-Experts model from DeepSeek with 284B total parameters and 13B activated parameters, supporting a 1M-token context window. It is designed for fast inference and...",
    "created": 1777000666,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openrouter/free",
    "baseName": "Free Models Router",
    "displayName": "Free Models Router — $0.00 / 1M mixed",
    "description": "The simplest way to get free inference. openrouter/free is a router that selects free models at random from the models available on OpenRouter. The router smartly filters for models that...",
    "created": 1769917427,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemma-4-26b-a4b-it:free",
    "baseName": "Google: Gemma 4 26B A4B  (free)",
    "displayName": "Google: Gemma 4 26B A4B  (free) — $0.00 / 1M mixed",
    "description": "Gemma 4 26B A4B IT is an instruction-tuned Mixture-of-Experts (MoE) model from Google DeepMind. Despite 25.2B total parameters, only 3.8B activate per token during inference — delivering near-31B quality at...",
    "created": 1775227989,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemma-4-31b-it:free",
    "baseName": "Google: Gemma 4 31B (free)",
    "displayName": "Google: Gemma 4 31B (free) — $0.00 / 1M mixed",
    "description": "Gemma 4 31B Instruct is Google DeepMind's 30.7B dense multimodal model supporting text and image input with text output. Features a 256K token context window, configurable thinking/reasoning mode, native function...",
    "created": 1775148486,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/lyria-3-clip-preview",
    "baseName": "Google: Lyria 3 Clip Preview",
    "displayName": "Google: Lyria 3 Clip Preview — $0.00 / 1M mixed",
    "description": "30 second duration clips are priced at $0.04 per clip. Lyria 3 is Google's family of music generation models, available through the Gemini API. With Lyria 3, you can generate...",
    "created": 1774907255,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text",
      "audio"
    ]
  },
  {
    "id": "google/lyria-3-pro-preview",
    "baseName": "Google: Lyria 3 Pro Preview",
    "displayName": "Google: Lyria 3 Pro Preview — $0.00 / 1M mixed",
    "description": "Full-length songs are priced at $0.08 per song. Lyria 3 is Google's family of music generation models, available through the Gemini API. With Lyria 3, you can generate high-quality, 48kHz...",
    "created": 1774907286,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text",
      "audio"
    ]
  },
  {
    "id": "google/veo-3.1",
    "baseName": "Google: Veo 3.1",
    "displayName": "Google: Veo 3.1 — $0.00 / 1M mixed",
    "description": "Google's state-of-the-art video generation model, built for maximum visual fidelity in final production cuts. Veo 3.1 generates high-quality 1080p video from text or image prompts with native synchronized audio —...",
    "created": 1774277148,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "google/veo-3.1-fast",
    "baseName": "Google: Veo 3.1 Fast",
    "displayName": "Google: Veo 3.1 Fast — $0.00 / 1M mixed",
    "description": "Google's mid-tier video generation model balancing speed and quality. Veo 3.1 Fast generates high-quality video from text or image prompts with native synchronized audio, offering faster turnaround than Veo 3.1...",
    "created": 1776994666,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "google/veo-3.1-lite",
    "baseName": "Google: Veo 3.1 Lite",
    "displayName": "Google: Veo 3.1 Lite — $0.00 / 1M mixed",
    "description": "Google's most cost-effective video generation model, designed for high-volume applications and rapid iteration. Veo 3.1 Lite generates 720p and 1080p video from text or image prompts with native synchronized audio...",
    "created": 1776978818,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "kwaivgi/kling-video-o1",
    "baseName": "Kling: Video O1",
    "displayName": "Kling: Video O1 — $0.00 / 1M mixed",
    "description": "Kling Video O1 is a video generation model from Kuaishou. It supports text and image inputs with video output, enabling text-to-video and image-to-video workflows. It is suited for cinematic content...",
    "created": 1776704777,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "kwaivgi/kling-v3.0-pro",
    "baseName": "Kling: Video v3.0 Pro",
    "displayName": "Kling: Video v3.0 Pro — $0.00 / 1M mixed",
    "description": "Kling v3.0 Pro is Kuaishou's premium video generation model, offering higher visual quality than the Standard tier. It supports text-to-video and image-to-video workflows, with first-frame and last-frame control for precise...",
    "created": 1777496206,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "kwaivgi/kling-v3.0-std",
    "baseName": "Kling: Video v3.0 Standard",
    "displayName": "Kling: Video v3.0 Standard — $0.00 / 1M mixed",
    "description": "Kling v3.0 Standard is a video generation model from Kuaishou. It supports text-to-video and image-to-video workflows, with first-frame and last-frame control for guided scene composition. Clips range from 3 to...",
    "created": 1777496205,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "liquid/lfm-2.5-1.2b-instruct:free",
    "baseName": "LiquidAI: LFM2.5-1.2B-Instruct (free)",
    "displayName": "LiquidAI: LFM2.5-1.2B-Instruct (free) — $0.00 / 1M mixed",
    "description": "LFM2.5-1.2B-Instruct is a compact, high-performance instruction-tuned model built for fast on-device AI. It delivers strong chat quality in a 1.2B parameter footprint, with efficient edge inference and broad runtime support.",
    "created": 1768927521,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "liquid/lfm-2.5-1.2b-thinking:free",
    "baseName": "LiquidAI: LFM2.5-1.2B-Thinking (free)",
    "displayName": "LiquidAI: LFM2.5-1.2B-Thinking (free) — $0.00 / 1M mixed",
    "description": "LFM2.5-1.2B-Thinking is a lightweight reasoning-focused model optimized for agentic tasks, data extraction, and RAG—while still running comfortably on edge devices. It supports long context (up to 32K tokens) and is...",
    "created": 1768927527,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-3.2-3b-instruct:free",
    "baseName": "Meta: Llama 3.2 3B Instruct (free)",
    "displayName": "Meta: Llama 3.2 3B Instruct (free) — $0.00 / 1M mixed",
    "description": "Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like dialogue generation, reasoning, and summarization. Designed with the latest transformer architecture, it...",
    "created": 1727222400,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-3.3-70b-instruct:free",
    "baseName": "Meta: Llama 3.3 70B Instruct (free)",
    "displayName": "Meta: Llama 3.3 70B Instruct (free) — $0.00 / 1M mixed",
    "description": "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model...",
    "created": 1733506137,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "minimax/hailuo-2.3",
    "baseName": "MiniMax: Hailuo 2.3",
    "displayName": "MiniMax: Hailuo 2.3 — $0.00 / 1M mixed",
    "description": "Hailuo 2.3 is a video generation model from MiniMax. It accepts text prompts and reference images as input and generates video output, supporting both text-to-video and image-to-video workflows. It is...",
    "created": 1776702740,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "minimax/minimax-m2.5:free",
    "baseName": "MiniMax: MiniMax M2.5 (free)",
    "displayName": "MiniMax: MiniMax M2.5 (free) — $0.00 / 1M mixed",
    "description": "MiniMax-M2.5 is a SOTA large language model designed for real-world productivity. Trained in a diverse range of complex real-world digital working environments, M2.5 builds upon the coding expertise of M2.1...",
    "created": 1770908502,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "moonshotai/kimi-k2.6:free",
    "baseName": "MoonshotAI: Kimi K2.6 (free)",
    "displayName": "MoonshotAI: Kimi K2.6 (free) — $0.00 / 1M mixed",
    "description": "Kimi K2.6 is Moonshot AI's next-generation multimodal model, designed for long-horizon coding, coding-driven UI/UX generation, and multi-agent orchestration. It handles complex end-to-end coding tasks across Python, Rust, and Go, and...",
    "created": 1776699402,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nousresearch/hermes-3-llama-3.1-405b:free",
    "baseName": "Nous: Hermes 3 405B Instruct (free)",
    "displayName": "Nous: Hermes 3 405B Instruct (free) — $0.00 / 1M mixed",
    "description": "Hermes 3 is a generalist language model with many improvements over Hermes 2, including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the...",
    "created": 1723766400,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/llama-nemotron-embed-vl-1b-v2:free",
    "baseName": "NVIDIA: Llama Nemotron Embed VL 1B V2 (free)",
    "displayName": "NVIDIA: Llama Nemotron Embed VL 1B V2 (free) — $0.00 / 1M mixed",
    "description": "The Llama Nemotron Embed VL 1B V2 embedding model is optimized for multimodal question-answering retrieval. The model can embed 'documents' in the form of image, text, or image and text...",
    "created": 1772045017,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "nvidia/nemotron-3-nano-30b-a3b:free",
    "baseName": "NVIDIA: Nemotron 3 Nano 30B A3B (free)",
    "displayName": "NVIDIA: Nemotron 3 Nano 30B A3B (free) — $0.00 / 1M mixed",
    "description": "NVIDIA Nemotron 3 Nano 30B A3B is a small language MoE model with highest compute efficiency and accuracy for developers to build specialized agentic AI systems. The model is fully...",
    "created": 1765731275,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
    "baseName": "NVIDIA: Nemotron 3 Nano Omni (free)",
    "displayName": "NVIDIA: Nemotron 3 Nano Omni (free) — $0.00 / 1M mixed",
    "description": "NVIDIA Nemotron™ 3 Nano Omni is a 30B-A3B open multimodal model designed to function as a perception and context sub-agent in enterprise agent systems. It accepts text, image, video, and...",
    "created": 1777393095,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "audio",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/nemotron-3-super-120b-a12b:free",
    "baseName": "NVIDIA: Nemotron 3 Super (free)",
    "displayName": "NVIDIA: Nemotron 3 Super (free) — $0.00 / 1M mixed",
    "description": "NVIDIA Nemotron 3 Super is a 120B-parameter open hybrid MoE model, activating just 12B parameters for maximum compute efficiency and accuracy in complex multi-agent applications. Built on a hybrid Mamba-Transformer...",
    "created": 1773245239,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/nemotron-nano-12b-v2-vl:free",
    "baseName": "NVIDIA: Nemotron Nano 12B 2 VL (free)",
    "displayName": "NVIDIA: Nemotron Nano 12B 2 VL (free) — $0.00 / 1M mixed",
    "description": "NVIDIA Nemotron Nano 2 VL is a 12-billion-parameter open multimodal reasoning model designed for video understanding and document intelligence. It introduces a hybrid Transformer-Mamba architecture, combining transformer-level accuracy with Mamba’s...",
    "created": 1761675565,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/nemotron-nano-9b-v2:free",
    "baseName": "NVIDIA: Nemotron Nano 9B V2 (free)",
    "displayName": "NVIDIA: Nemotron Nano 9B V2 (free) — $0.00 / 1M mixed",
    "description": "NVIDIA-Nemotron-Nano-9B-v2 is a large language model (LLM) trained from scratch by NVIDIA, and designed as a unified model for both reasoning and non-reasoning tasks. It responds to user queries and...",
    "created": 1757106807,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-oss-120b:free",
    "baseName": "OpenAI: gpt-oss-120b (free)",
    "displayName": "OpenAI: gpt-oss-120b (free) — $0.00 / 1M mixed",
    "description": "gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B parameters per forward pass and is optimized...",
    "created": 1754414231,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-oss-20b:free",
    "baseName": "OpenAI: gpt-oss-20b (free)",
    "displayName": "OpenAI: gpt-oss-20b (free) — $0.00 / 1M mixed",
    "description": "gpt-oss-20b is an open-weight 21B parameter model released by OpenAI under the Apache 2.0 license. It uses a Mixture-of-Experts (MoE) architecture with 3.6B active parameters per forward pass, optimized for...",
    "created": 1754414229,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/sora-2-pro",
    "baseName": "OpenAI: Sora 2 Pro",
    "displayName": "OpenAI: Sora 2 Pro — $0.00 / 1M mixed",
    "description": "OpenAI's flagship video generation model, delivering production-quality video with physics-accurate motion, synchronized audio, and world-state persistence across shots. Sora 2 Pro follows intricate multi-shot instructions while maintaining consistent spatial relationships...",
    "created": 1774277521,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "openrouter/owl-alpha",
    "baseName": "Owl Alpha",
    "displayName": "Owl Alpha — $0.00 / 1M mixed",
    "description": "Owl Alpha is a high-performance foundation model designed for agentic workloads. Natively supports tool use, and long-context tasks, with strong performance in code generation, automated workflows, and complex instruction execution....",
    "created": 1777398589,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openrouter/pareto-code",
    "baseName": "Pareto Code Router",
    "displayName": "Pareto Code Router — $0.00 / 1M mixed",
    "description": "The Pareto Router maintains a tiered shortlist of strong coding models, ranked by [Artificial Analysis](https://artificialanalysis.ai/) coding percentiles. Set min_coding_score between 0 and 1 on the [pareto-router plugin](https://openrouter.ai/docs/guides/routing/routers/pareto-router#the-min_coding_score-parameter) to control how...",
    "created": 1776747900,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "perplexity/pplx-embed-v1-0.6b",
    "baseName": "Perplexity: Embed V1 0.6B",
    "displayName": "Perplexity: Embed V1 0.6B — $0.00 / 1M mixed",
    "description": "pplx-embed-v1-0.6B is one of Perplexity's state-of-the-art text embedding models built for real-world, web-scale retrieval. pplx-embed-v1 is optimized for standard dense text retrieval with the 0.6B parameter model targeting lightweight, low-latency...",
    "created": 1773624868,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "poolside/laguna-m.1:free",
    "baseName": "Poolside: Laguna M.1 (free)",
    "displayName": "Poolside: Laguna M.1 (free) — $0.00 / 1M mixed",
    "description": "Laguna M.1 is the flagship coding agent model from [Poolside](https://poolside.ai), optimized for complex software engineering tasks. Designed for agentic coding workflows, it supports tool calling and reasoning, with a 128K...",
    "created": 1777388504,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "poolside/laguna-xs.2:free",
    "baseName": "Poolside: Laguna XS.2 (free)",
    "displayName": "Poolside: Laguna XS.2 (free) — $0.00 / 1M mixed",
    "description": "Laguna XS.2 is the second-generation model in the XS size class from [Poolside](https://poolside.ai), their efficient coding agent series. It combines tool calling and reasoning capabilities with a compact footprint, offering...",
    "created": 1777389604,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-coder:free",
    "baseName": "Qwen: Qwen3 Coder 480B A35B (free)",
    "displayName": "Qwen: Qwen3 Coder 480B A35B (free) — $0.00 / 1M mixed",
    "description": "Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic coding tasks such as function calling, tool use, and long-context reasoning over...",
    "created": 1753230546,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-next-80b-a3b-instruct:free",
    "baseName": "Qwen: Qwen3 Next 80B A3B Instruct (free)",
    "displayName": "Qwen: Qwen3 Next 80B A3B Instruct (free) — $0.00 / 1M mixed",
    "description": "Qwen3-Next-80B-A3B-Instruct is an instruction-tuned chat model in the Qwen3-Next series optimized for fast, stable responses without “thinking” traces. It targets complex tasks across reasoning, code generation, knowledge QA, and multilingual...",
    "created": 1757612213,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "recraft/recraft-v3",
    "baseName": "Recraft: Recraft V3",
    "displayName": "Recraft: Recraft V3 — $0.00 / 1M mixed",
    "description": "Recraft V3 is an image generation model from Recraft. It supports text and image inputs with image output at ~1K resolution across multiple aspect ratios. Supports the following `image_config` parameters:...",
    "created": 1778185433,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4",
    "baseName": "Recraft: Recraft V4",
    "displayName": "Recraft: Recraft V4 — $0.00 / 1M mixed",
    "description": "Recraft V4 is an image generation model from Recraft. It supports text and image inputs with image output at ~1K resolution across multiple aspect ratios. It delivers stronger compositional judgment,...",
    "created": 1778185437,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4-pro",
    "baseName": "Recraft: Recraft V4 Pro",
    "displayName": "Recraft: Recraft V4 Pro — $0.00 / 1M mixed",
    "description": "Recraft V4 Pro is an image generation model from Recraft. It supports text and image inputs with image output at ~2K resolution across multiple aspect ratios, double the resolution of...",
    "created": 1778185441,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4-pro-vector",
    "baseName": "Recraft: Recraft V4 Pro Vector",
    "displayName": "Recraft: Recraft V4 Pro Vector — $0.00 / 1M mixed",
    "description": "Recraft V4 Pro Vector is the vector (SVG) variant of Recraft V4 Pro. It supports text and image inputs and produces vector image output across multiple aspect ratios at the...",
    "created": 1778707334,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4-vector",
    "baseName": "Recraft: Recraft V4 Vector",
    "displayName": "Recraft: Recraft V4 Vector — $0.00 / 1M mixed",
    "description": "Recraft V4 Vector is the vector (SVG) variant of Recraft V4. It supports text and image inputs and produces vector image output across multiple aspect ratios. Compared to the raster...",
    "created": 1778707333,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4.1",
    "baseName": "Recraft: Recraft V4.1",
    "displayName": "Recraft: Recraft V4.1 — $0.00 / 1M mixed",
    "description": "Recraft V4.1 is an image generation model from Recraft tuned for high aesthetics. It supports text and image inputs with image output at ~1K resolution across multiple aspect ratios, with...",
    "created": 1778707381,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4.1-pro",
    "baseName": "Recraft: Recraft V4.1 Pro",
    "displayName": "Recraft: Recraft V4.1 Pro — $0.00 / 1M mixed",
    "description": "Recraft V4.1 Pro is an image generation model from Recraft tuned for high aesthetics. It supports text and image inputs with image output at ~2K resolution across multiple aspect ratios...",
    "created": 1778707384,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4.1-pro-vector",
    "baseName": "Recraft: Recraft V4.1 Pro Vector",
    "displayName": "Recraft: Recraft V4.1 Pro Vector — $0.00 / 1M mixed",
    "description": "Recraft V4.1 Pro Vector is the vector (SVG) variant of Recraft V4.1 Pro, tuned for high aesthetics. It supports text and image inputs and produces higher-resolution SVG image output across...",
    "created": 1778707395,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4.1-utility",
    "baseName": "Recraft: Recraft V4.1 Utility",
    "displayName": "Recraft: Recraft V4.1 Utility — $0.00 / 1M mixed",
    "description": "Recraft V4.1 Utility is a general-purpose image generation model from Recraft. It supports text and image inputs with image output at ~1K resolution across multiple aspect ratios, with typical generation...",
    "created": 1778707387,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4.1-utility-pro",
    "baseName": "Recraft: Recraft V4.1 Utility Pro",
    "displayName": "Recraft: Recraft V4.1 Utility Pro — $0.00 / 1M mixed",
    "description": "Recraft V4.1 Utility Pro is a general-purpose image generation model from Recraft. It supports text and image inputs with image output at ~2K resolution across multiple aspect ratios — double...",
    "created": 1778707389,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "recraft/recraft-v4.1-vector",
    "baseName": "Recraft: Recraft V4.1 Vector",
    "displayName": "Recraft: Recraft V4.1 Vector — $0.00 / 1M mixed",
    "description": "Recraft V4.1 Vector is the vector (SVG) variant of Recraft V4.1, tuned for high aesthetics. It supports text and image inputs and produces SVG image output across multiple aspect ratios,...",
    "created": 1778707392,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "sourceful/riverflow-v2-fast",
    "baseName": "Sourceful: Riverflow V2 Fast",
    "displayName": "Sourceful: Riverflow V2 Fast — $0.00 / 1M mixed",
    "description": "Riverflow V2 Fast is the fastest variant of Sourceful's Riverflow 2.0 lineup, best for production deployments and latency-critical workflows. The Riverflow 2.0 series represents SOTA performance on image generation and...",
    "created": 1770051423,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "sourceful/riverflow-v2-fast-preview",
    "baseName": "Sourceful: Riverflow V2 Fast Preview",
    "displayName": "Sourceful: Riverflow V2 Fast Preview — $0.00 / 1M mixed",
    "description": "Riverflow V2 Fast Preview is the fastest variant of Sourceful's Riverflow V2 preview lineup. This preview version exceeds the performance of Riverflow 1 Family and is Sourceful's first unified text-to-image...",
    "created": 1765237820,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "sourceful/riverflow-v2-max-preview",
    "baseName": "Sourceful: Riverflow V2 Max Preview",
    "displayName": "Sourceful: Riverflow V2 Max Preview — $0.00 / 1M mixed",
    "description": "Riverflow V2 Max Preview is the most powerful variant of Sourceful's Riverflow V2 preview lineup. This preview version exceeds the performance of Riverflow 1 Family and is Sourceful's first unified...",
    "created": 1765237849,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "sourceful/riverflow-v2-pro",
    "baseName": "Sourceful: Riverflow V2 Pro",
    "displayName": "Sourceful: Riverflow V2 Pro — $0.00 / 1M mixed",
    "description": "Riverflow V2 Pro is the most powerful variant of Sourceful's Riverflow 2.0 lineup, best for top-tier control and perfect text rendering. The Riverflow 2.0 series represents SOTA performance on image...",
    "created": 1770051427,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "sourceful/riverflow-v2-standard-preview",
    "baseName": "Sourceful: Riverflow V2 Standard Preview",
    "displayName": "Sourceful: Riverflow V2 Standard Preview — $0.00 / 1M mixed",
    "description": "Riverflow V2 Standard Preview is the standard variant of Sourceful's Riverflow V2 preview lineup. This preview version exceeds the performance of Riverflow 1 Family and is Sourceful's first unified text-to-image...",
    "created": 1765237836,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
    "baseName": "Venice: Uncensored (free)",
    "displayName": "Venice: Uncensored (free) — $0.00 / 1M mixed",
    "description": "Venice Uncensored Dolphin Mistral 24B Venice Edition is a fine-tuned variant of Mistral-Small-24B-Instruct-2501, developed by dphn.ai in collaboration with Venice.ai. This model is designed as an “uncensored” instruct-tuned LLM, preserving...",
    "created": 1752094966,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "x-ai/grok-imagine-image-quality",
    "baseName": "xAI: Grok Imagine Image Quality",
    "displayName": "xAI: Grok Imagine Image Quality — $0.00 / 1M mixed",
    "description": "Grok Imagine Image Quality is xAI's fast, high-fidelity image generation and editing model. It accepts text prompts and optional reference images, producing photorealistic outputs at 1K or 2K across a...",
    "created": 1779117584,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "image"
    ]
  },
  {
    "id": "x-ai/grok-imagine-video",
    "baseName": "xAI: Grok Imagine Video",
    "displayName": "xAI: Grok Imagine Video — $0.00 / 1M mixed",
    "description": "Grok Imagine Video is xAI's fast, text-, image-, and reference-conditioned video generation model. It produces short videos (1–15 seconds, 24 fps) at 480p or 720p across seven aspect ratios -...",
    "created": 1779117586,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "video"
    ]
  },
  {
    "id": "z-ai/glm-4.5-air:free",
    "baseName": "Z.ai: GLM 4.5 Air (free)",
    "displayName": "Z.ai: GLM 4.5 Air (free) — $0.00 / 1M mixed",
    "description": "GLM-4.5-Air is the lightweight variant of our latest flagship model family, also purpose-built for agent-centric applications. Like GLM-4.5, it adopts the Mixture-of-Experts (MoE) architecture but with a more compact parameter...",
    "created": 1753471258,
    "mixedPricePerMillionUsd": 0,
    "priceLabel": "$0.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "baai/bge-base-en-v1.5",
    "baseName": "BAAI: bge-base-en-v1.5",
    "displayName": "BAAI: bge-base-en-v1.5 — $0.01 / 1M mixed",
    "description": "The bge-base-en-v1.5 embedding model converts English sentences and paragraphs into 768-dimensional dense vectors, delivering efficient, high-quality semantic embeddings optimized for retrieval, semantic search, and document-matching workflows. This version (v1.5) features...",
    "created": 1763431837,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "baai/bge-large-en-v1.5",
    "baseName": "BAAI: bge-large-en-v1.5",
    "displayName": "BAAI: bge-large-en-v1.5 — $0.01 / 1M mixed",
    "description": "The bge-large-en-v1.5 embedding model maps English sentences, paragraphs, and documents into a 1024-dimensional dense vector space, delivering high-fidelity semantic embeddings optimized for semantic search, document retrieval, and downstream NLP tasks...",
    "created": 1763431087,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "baai/bge-m3",
    "baseName": "BAAI: bge-m3",
    "displayName": "BAAI: bge-m3 — $0.01 / 1M mixed",
    "description": "The bge-m3 embedding model encodes sentences, paragraphs, and long documents into a 1024-dimensional dense vector space, delivering high-quality semantic embeddings optimized for multilingual retrieval, semantic search, and large-context applications.",
    "created": 1763424372,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "intfloat/e5-base-v2",
    "baseName": "Intfloat: E5-Base-v2",
    "displayName": "Intfloat: E5-Base-v2 — $0.01 / 1M mixed",
    "description": "The e5-base-v2 embedding model encodes English sentences and paragraphs into a 768-dimensional dense vector space, producing efficient and high-quality semantic embeddings optimized for tasks such as semantic search, similarity scoring,...",
    "created": 1763433192,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "intfloat/e5-large-v2",
    "baseName": "Intfloat: E5-Large-v2",
    "displayName": "Intfloat: E5-Large-v2 — $0.01 / 1M mixed",
    "description": "The e5-large-v2 embedding model maps English sentences, paragraphs, and documents into a 1024-dimensional dense vector space, delivering high-accuracy semantic embeddings optimized for retrieval, semantic search, reranking, and similarity-scoring tasks.",
    "created": 1763433432,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "intfloat/multilingual-e5-large",
    "baseName": "Intfloat: Multilingual-E5-Large",
    "displayName": "Intfloat: Multilingual-E5-Large — $0.01 / 1M mixed",
    "description": "The multilingual-e5-large embedding model encodes sentences, paragraphs, and documents across over 90 languages into a 1024-dimensional dense vector space, delivering robust semantic embeddings optimized for multilingual retrieval, cross-language similarity, and...",
    "created": 1763433047,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "qwen/qwen3-embedding-8b",
    "baseName": "Qwen: Qwen3 Embedding 8B",
    "displayName": "Qwen: Qwen3 Embedding 8B — $0.01 / 1M mixed",
    "description": "The Qwen3 Embedding model series is the latest proprietary model of the Qwen family, specifically designed for text embedding and ranking tasks. This series inherits the exceptional multilingual capabilities, long-text...",
    "created": 1761680622,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "sentence-transformers/all-minilm-l12-v2",
    "baseName": "Sentence Transformers: all-MiniLM-L12-v2",
    "displayName": "Sentence Transformers: all-MiniLM-L12-v2 — $0.01 / 1M mixed",
    "description": "The all-MiniLM-L12-v2 embedding model maps sentences and short paragraphs into a 384-dimensional dense vector space, producing efficient and high-quality semantic embeddings optimized for tasks such as semantic search, clustering, and...",
    "created": 1763432155,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "sentence-transformers/all-minilm-l6-v2",
    "baseName": "Sentence Transformers: all-MiniLM-L6-v2",
    "displayName": "Sentence Transformers: all-MiniLM-L6-v2 — $0.01 / 1M mixed",
    "description": "The all-MiniLM-L6-v2 embedding model maps sentences and short paragraphs into a 384-dimensional dense vector space, enabling high-quality semantic representations that are ideal for downstream tasks such as information retrieval, clustering,...",
    "created": 1763421176,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "sentence-transformers/all-mpnet-base-v2",
    "baseName": "Sentence Transformers: all-mpnet-base-v2",
    "displayName": "Sentence Transformers: all-mpnet-base-v2 — $0.01 / 1M mixed",
    "description": "The all-mpnet-base-v2 embedding model encodes sentences and short paragraphs into a 768-dimensional dense vector space, providing high-fidelity semantic embeddings well suited for tasks like information retrieval, clustering, similarity scoring, and...",
    "created": 1763421830,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "sentence-transformers/multi-qa-mpnet-base-dot-v1",
    "baseName": "Sentence Transformers: multi-qa-mpnet-base-dot-v1",
    "displayName": "Sentence Transformers: multi-qa-mpnet-base-dot-v1 — $0.01 / 1M mixed",
    "description": "The multi-qa-mpnet-base-dot-v1 embedding model transforms sentences and short paragraphs into a 768-dimensional dense vector space, generating high-quality semantic embeddings optimized for question-and-answer retrieval, semantic search, and similarity-scoring across diverse content.",
    "created": 1763431339,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "sentence-transformers/paraphrase-minilm-l6-v2",
    "baseName": "Sentence Transformers: paraphrase-MiniLM-L6-v2",
    "displayName": "Sentence Transformers: paraphrase-MiniLM-L6-v2 — $0.01 / 1M mixed",
    "description": "The paraphrase-MiniLM-L6-v2 embedding model converts sentences and short paragraphs into a 384-dimensional dense vector space, producing high-quality semantic embeddings optimized for paraphrase detection, semantic similarity scoring, clustering, and lightweight retrieval...",
    "created": 1763432454,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "thenlper/gte-base",
    "baseName": "Thenlper: GTE-Base",
    "displayName": "Thenlper: GTE-Base — $0.01 / 1M mixed",
    "description": "The gte-base embedding model encodes English sentences and paragraphs into a 768-dimensional dense vector space, delivering efficient and effective semantic embeddings optimized for textual similarity, semantic search, and clustering applications.",
    "created": 1763433820,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "thenlper/gte-large",
    "baseName": "Thenlper: GTE-Large",
    "displayName": "Thenlper: GTE-Large — $0.01 / 1M mixed",
    "description": "The gte-large embedding model converts English sentences, paragraphs and moderate-length documents into a 1024-dimensional dense vector space, delivering high-quality semantic embeddings optimized for information retrieval, semantic textual similarity, reranking and...",
    "created": 1763433655,
    "mixedPricePerMillionUsd": 0.01,
    "priceLabel": "$0.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "inclusionai/ling-2.6-flash",
    "baseName": "inclusionAI: Ling-2.6-flash",
    "displayName": "inclusionAI: Ling-2.6-flash — $0.02 / 1M mixed",
    "description": "Ling-2.6-flash is an instant (instruct) model from inclusionAI with 104B total parameters and 7.4B active parameters, designed for real-world agents that require fast responses, strong execution, and high token efficiency....",
    "created": 1776795886,
    "mixedPricePerMillionUsd": 0.02,
    "priceLabel": "$0.02",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/text-embedding-3-small",
    "baseName": "OpenAI: Text Embedding 3 Small",
    "displayName": "OpenAI: Text Embedding 3 Small — $0.02 / 1M mixed",
    "description": "text-embedding-3-small is OpenAI's improved, more performant version of the ada embedding model. Embeddings are a numerical representation of text that can be used to measure the relatedness between two pieces...",
    "created": 1761857455,
    "mixedPricePerMillionUsd": 0.02,
    "priceLabel": "$0.02",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "qwen/qwen3-embedding-4b",
    "baseName": "Qwen: Qwen3 Embedding 4B",
    "displayName": "Qwen: Qwen3 Embedding 4B — $0.02 / 1M mixed",
    "description": "The Qwen3 Embedding model series is the latest proprietary model of the Qwen family, specifically designed for text embedding and ranking tasks. This series inherits the exceptional multilingual capabilities, long-text...",
    "created": 1761662922,
    "mixedPricePerMillionUsd": 0.02,
    "priceLabel": "$0.02",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "meta-llama/llama-3.1-8b-instruct",
    "baseName": "Meta: Llama 3.1 8B Instruct",
    "displayName": "Meta: Llama 3.1 8B Instruct — $0.03 / 1M mixed",
    "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 8B instruct-tuned version is fast and efficient. It has demonstrated strong performance compared to...",
    "created": 1721692800,
    "mixedPricePerMillionUsd": 0.03,
    "priceLabel": "$0.03",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-nemo",
    "baseName": "Mistral: Mistral Nemo",
    "displayName": "Mistral: Mistral Nemo — $0.03 / 1M mixed",
    "description": "A 12B parameter model with a 128k token context length built by Mistral in collaboration with NVIDIA. The model is multilingual, supporting English, French, German, Spanish, Italian, Portuguese, Chinese, Japanese,...",
    "created": 1721347200,
    "mixedPricePerMillionUsd": 0.03,
    "priceLabel": "$0.03",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "perplexity/pplx-embed-v1-4b",
    "baseName": "Perplexity: Embed V1 4B",
    "displayName": "Perplexity: Embed V1 4B — $0.03 / 1M mixed",
    "description": "pplx-embed-v1 -4B is one of Perplexity's state-of-the-art text embedding models built for real-world, web-scale retrieval. pplx-embed-v1 is optimized for standard dense text retrieval with the 4B parameter model maximizing retrieval...",
    "created": 1773625372,
    "mixedPricePerMillionUsd": 0.03,
    "priceLabel": "$0.03",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "meta-llama/llama-3-8b-instruct",
    "baseName": "Meta: Llama 3 8B Instruct",
    "displayName": "Meta: Llama 3 8B Instruct — $0.04 / 1M mixed",
    "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This 8B instruct-tuned version was optimized for high quality dialogue usecases. It has demonstrated strong...",
    "created": 1713398400,
    "mixedPricePerMillionUsd": 0.04,
    "priceLabel": "$0.04",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "sao10k/l3-lunaris-8b",
    "baseName": "Sao10K: Llama 3 8B Lunaris",
    "displayName": "Sao10K: Llama 3 8B Lunaris — $0.05 / 1M mixed",
    "description": "Lunaris 8B is a versatile generalist and roleplaying model based on Llama 3. It's a strategic merge of multiple models, designed to balance creativity with improved logic and general knowledge....",
    "created": 1723507200,
    "mixedPricePerMillionUsd": 0.05,
    "priceLabel": "$0.05",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemma-3-4b-it",
    "baseName": "Google: Gemma 3 4B",
    "displayName": "Google: Gemma 3 4B — $0.06 / 1M mixed",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities,...",
    "created": 1741905510,
    "mixedPricePerMillionUsd": 0.06,
    "priceLabel": "$0.06",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "ibm-granite/granite-4.0-h-micro",
    "baseName": "IBM: Granite 4.0 Micro",
    "displayName": "IBM: Granite 4.0 Micro — $0.06 / 1M mixed",
    "description": "Granite-4.0-H-Micro is a 3B parameter from the Granite 4 family of models. These models are the latest in a series of models released by IBM. They are fine-tuned for long...",
    "created": 1760927695,
    "mixedPricePerMillionUsd": 0.06,
    "priceLabel": "$0.06",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "gryphe/mythomax-l2-13b",
    "baseName": "MythoMax 13B",
    "displayName": "MythoMax 13B — $0.06 / 1M mixed",
    "description": "One of the highest performing and most popular fine-tunes of Llama 2 13B, with rich descriptions and roleplay. #merge",
    "created": 1688256000,
    "mixedPricePerMillionUsd": 0.06,
    "priceLabel": "$0.06",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-small-24b-instruct-2501",
    "baseName": "Mistral: Mistral Small 3",
    "displayName": "Mistral: Mistral Small 3 — $0.07 / 1M mixed",
    "description": "Mistral Small 3 is a 24B-parameter language model optimized for low-latency performance across common AI tasks. Released under the Apache 2.0 license, it features both pre-trained and instruction-tuned versions designed...",
    "created": 1738255409,
    "mixedPricePerMillionUsd": 0.07,
    "priceLabel": "$0.07",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen-2.5-7b-instruct",
    "baseName": "Qwen: Qwen2.5 7B Instruct",
    "displayName": "Qwen: Qwen2.5 7B Instruct — $0.07 / 1M mixed",
    "description": "Qwen2.5 7B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2: - Significantly more knowledge and has greatly improved capabilities in coding and...",
    "created": 1729036800,
    "mixedPricePerMillionUsd": 0.07,
    "priceLabel": "$0.07",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "ibm-granite/granite-4.1-8b",
    "baseName": "IBM: Granite 4.1 8B",
    "displayName": "IBM: Granite 4.1 8B — $0.08 / 1M mixed",
    "description": "Granite 4.1 8B is a dense, decoder-only 8-billion-parameter language model from IBM, part of the Granite 4.1 family. It supports a 131K-token context window and is designed for enterprise tasks...",
    "created": 1777577071,
    "mixedPricePerMillionUsd": 0.08,
    "priceLabel": "$0.08",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "liquid/lfm-2-24b-a2b",
    "baseName": "LiquidAI: LFM2-24B-A2B",
    "displayName": "LiquidAI: LFM2-24B-A2B — $0.08 / 1M mixed",
    "description": "LFM2-24B-A2B is the largest model in the LFM2 family of hybrid architectures designed for efficient on-device deployment. Built as a 24B parameter Mixture-of-Experts model with only 2B active parameters per...",
    "created": 1772048711,
    "mixedPricePerMillionUsd": 0.08,
    "priceLabel": "$0.08",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "amazon/nova-micro-v1",
    "baseName": "Amazon: Nova Micro 1.0",
    "displayName": "Amazon: Nova Micro 1.0 — $0.09 / 1M mixed",
    "description": "Amazon Nova Micro 1.0 is a text-only model that delivers the lowest latency responses in the Amazon Nova family of models at a very low cost. With a context length...",
    "created": 1733437237,
    "mixedPricePerMillionUsd": 0.09,
    "priceLabel": "$0.09",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "cohere/command-r7b-12-2024",
    "baseName": "Cohere: Command R7B (12-2024)",
    "displayName": "Cohere: Command R7B (12-2024) — $0.09 / 1M mixed",
    "description": "Command R7B (12-2024) is a small, fast update of the Command R+ model, delivered in December 2024. It excels at RAG, tool use, agents, and similar tasks requiring complex reasoning...",
    "created": 1734158152,
    "mixedPricePerMillionUsd": 0.09,
    "priceLabel": "$0.09",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemma-3-12b-it",
    "baseName": "Google: Gemma 3 12B",
    "displayName": "Google: Gemma 3 12B — $0.09 / 1M mixed",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities,...",
    "created": 1741902625,
    "mixedPricePerMillionUsd": 0.09,
    "priceLabel": "$0.09",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemma-3n-e4b-it",
    "baseName": "Google: Gemma 3n 4B",
    "displayName": "Google: Gemma 3n 4B — $0.09 / 1M mixed",
    "description": "Gemma 3n E4B-it is optimized for efficient execution on mobile and low-resource devices, such as phones, laptops, and tablets. It supports multimodal inputs—including text, visual data, and audio—enabling diverse tasks...",
    "created": 1747776824,
    "mixedPricePerMillionUsd": 0.09,
    "priceLabel": "$0.09",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-oss-20b",
    "baseName": "OpenAI: gpt-oss-20b",
    "displayName": "OpenAI: gpt-oss-20b — $0.09 / 1M mixed",
    "description": "gpt-oss-20b is an open-weight 21B parameter model released by OpenAI under the Apache 2.0 license. It uses a Mixture-of-Experts (MoE) architecture with 3.6B active parameters per forward pass, optimized for...",
    "created": 1754414229,
    "mixedPricePerMillionUsd": 0.09,
    "priceLabel": "$0.09",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-235b-a22b-2507",
    "baseName": "Qwen: Qwen3 235B A22B Instruct 2507",
    "displayName": "Qwen: Qwen3 235B A22B Instruct 2507 — $0.09 / 1M mixed",
    "description": "Qwen3-235B-A22B-Instruct-2507 is a multilingual, instruction-tuned mixture-of-experts language model based on the Qwen3-235B architecture, with 22B active parameters per forward pass. It is optimized for general-purpose text generation, including instruction following,...",
    "created": 1753119555,
    "mixedPricePerMillionUsd": 0.09,
    "priceLabel": "$0.09",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.5-9b",
    "baseName": "Qwen: Qwen3.5-9B",
    "displayName": "Qwen: Qwen3.5-9B — $0.09 / 1M mixed",
    "description": "Qwen3.5-9B is a multimodal foundation model from the Qwen3.5 family, designed to deliver strong reasoning, coding, and visual understanding in an efficient 9B-parameter architecture. It uses a unified vision-language design...",
    "created": 1773152396,
    "mixedPricePerMillionUsd": 0.09,
    "priceLabel": "$0.09",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "arcee-ai/trinity-mini",
    "baseName": "Arcee AI: Trinity Mini",
    "displayName": "Arcee AI: Trinity Mini — $0.10 / 1M mixed",
    "description": "Trinity Mini is a 26B-parameter (3B active) sparse mixture-of-experts language model featuring 128 experts with 8 active per token. Engineered for efficient reasoning over long contexts (131k) with robust function...",
    "created": 1764601720,
    "mixedPricePerMillionUsd": 0.1,
    "priceLabel": "$0.10",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "microsoft/phi-4",
    "baseName": "Microsoft: Phi 4",
    "displayName": "Microsoft: Phi 4 — $0.10 / 1M mixed",
    "description": "[Microsoft Research](/microsoft) Phi-4 is designed to perform well in complex reasoning tasks and can operate efficiently in situations with limited memory or where quick responses are needed. At 14 billion...",
    "created": 1736489872,
    "mixedPricePerMillionUsd": 0.1,
    "priceLabel": "$0.10",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/ministral-3b-2512",
    "baseName": "Mistral: Ministral 3 3B 2512",
    "displayName": "Mistral: Ministral 3 3B 2512 — $0.10 / 1M mixed",
    "description": "The smallest model in the Ministral 3 family, Ministral 3 3B is a powerful, efficient tiny language model with vision capabilities.",
    "created": 1764681560,
    "mixedPricePerMillionUsd": 0.1,
    "priceLabel": "$0.10",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-embed-2312",
    "baseName": "Mistral: Mistral Embed 2312",
    "displayName": "Mistral: Mistral Embed 2312 — $0.10 / 1M mixed",
    "description": "Mistral Embed is a specialized embedding model for text data, optimized for semantic search and RAG applications. Developed by Mistral AI in late 2023, it produces 1024-dimensional vectors that effectively...",
    "created": 1761944622,
    "mixedPricePerMillionUsd": 0.1,
    "priceLabel": "$0.10",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "nvidia/nemotron-nano-9b-v2",
    "baseName": "NVIDIA: Nemotron Nano 9B V2",
    "displayName": "NVIDIA: Nemotron Nano 9B V2 — $0.10 / 1M mixed",
    "description": "NVIDIA-Nemotron-Nano-9B-v2 is a large language model (LLM) trained from scratch by NVIDIA, and designed as a unified model for both reasoning and non-reasoning tasks. It responds to user queries and...",
    "created": 1757106807,
    "mixedPricePerMillionUsd": 0.1,
    "priceLabel": "$0.10",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/text-embedding-ada-002",
    "baseName": "OpenAI: Text Embedding Ada 002",
    "displayName": "OpenAI: Text Embedding Ada 002 — $0.10 / 1M mixed",
    "description": "text-embedding-ada-002 is OpenAI's legacy text embedding model.",
    "created": 1761865798,
    "mixedPricePerMillionUsd": 0.1,
    "priceLabel": "$0.10",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "rekaai/reka-edge",
    "baseName": "Reka Edge",
    "displayName": "Reka Edge — $0.10 / 1M mixed",
    "description": "Reka Edge is an extremely efficient 7B multimodal vision-language model that accepts image/video+text inputs and generates text outputs. This model is optimized specifically to deliver industry-leading performance in image understanding,...",
    "created": 1774026965,
    "mixedPricePerMillionUsd": 0.1,
    "priceLabel": "$0.10",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-4-32b",
    "baseName": "Z.ai: GLM 4 32B ",
    "displayName": "Z.ai: GLM 4 32B  — $0.10 / 1M mixed",
    "description": "GLM 4 32B is a cost-effective foundation language model. It can efficiently perform complex tasks and has significantly enhanced capabilities in tool use, online search, and code-related intelligent tasks. It...",
    "created": 1753376617,
    "mixedPricePerMillionUsd": 0.1,
    "priceLabel": "$0.10",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-3.2-1b-instruct",
    "baseName": "Meta: Llama 3.2 1B Instruct",
    "displayName": "Meta: Llama 3.2 1B Instruct — $0.11 / 1M mixed",
    "description": "Llama 3.2 1B is a 1-billion-parameter language model focused on efficiently performing natural language tasks, such as summarization, dialogue, and multilingual text analysis. Its smaller size allows it to operate...",
    "created": 1727222400,
    "mixedPricePerMillionUsd": 0.11,
    "priceLabel": "$0.11",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-oss-120b",
    "baseName": "OpenAI: gpt-oss-120b",
    "displayName": "OpenAI: gpt-oss-120b — $0.11 / 1M mixed",
    "description": "gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B parameters per forward pass and is optimized...",
    "created": 1754414231,
    "mixedPricePerMillionUsd": 0.11,
    "priceLabel": "$0.11",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemma-3-27b-it",
    "baseName": "Google: Gemma 3 27B",
    "displayName": "Google: Gemma 3 27B — $0.12 / 1M mixed",
    "description": "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, and chat capabilities,...",
    "created": 1741756359,
    "mixedPricePerMillionUsd": 0.12,
    "priceLabel": "$0.12",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/nemotron-3-nano-30b-a3b",
    "baseName": "NVIDIA: Nemotron 3 Nano 30B A3B",
    "displayName": "NVIDIA: Nemotron 3 Nano 30B A3B — $0.13 / 1M mixed",
    "description": "NVIDIA Nemotron 3 Nano 30B A3B is a small language MoE model with highest compute efficiency and accuracy for developers to build specialized agentic AI systems. The model is fully...",
    "created": 1765731275,
    "mixedPricePerMillionUsd": 0.13,
    "priceLabel": "$0.13",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/text-embedding-3-large",
    "baseName": "OpenAI: Text Embedding 3 Large",
    "displayName": "OpenAI: Text Embedding 3 Large — $0.13 / 1M mixed",
    "description": "text-embedding-3-large is OpenAI's most capable embedding model for both english and non-english tasks. Embeddings are a numerical representation of text that can be used to measure the relatedness between two...",
    "created": 1761862866,
    "mixedPricePerMillionUsd": 0.13,
    "priceLabel": "$0.13",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "mistralai/mistral-small-3.2-24b-instruct",
    "baseName": "Mistral: Mistral Small 3.2 24B",
    "displayName": "Mistral: Mistral Small 3.2 24B — $0.14 / 1M mixed",
    "description": "Mistral-Small-3.2-24B-Instruct-2506 is an updated 24B parameter model from Mistral optimized for instruction following, repetition reduction, and improved function calling. Compared to the 3.1 release, version 3.2 significantly improves accuracy on...",
    "created": 1750443016,
    "mixedPricePerMillionUsd": 0.14,
    "priceLabel": "$0.14",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nousresearch/hermes-2-pro-llama-3-8b",
    "baseName": "NousResearch: Hermes 2 Pro - Llama-3 8B",
    "displayName": "NousResearch: Hermes 2 Pro - Llama-3 8B — $0.14 / 1M mixed",
    "description": "Hermes 2 Pro is an upgraded, retrained version of Nous Hermes 2, consisting of an updated and cleaned version of the OpenHermes 2.5 Dataset, as well as a newly introduced...",
    "created": 1716768000,
    "mixedPricePerMillionUsd": 0.14,
    "priceLabel": "$0.14",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "tencent/hy3-preview",
    "baseName": "Tencent: Hy3 preview",
    "displayName": "Tencent: Hy3 preview — $0.14 / 1M mixed",
    "description": "Hy3 preview is a high-efficiency Mixture-of-Experts model from Tencent designed for agentic workflows and production use. It supports configurable reasoning levels across disabled, low, and high modes, allowing it to...",
    "created": 1776878150,
    "mixedPricePerMillionUsd": 0.14,
    "priceLabel": "$0.14",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "amazon/nova-lite-v1",
    "baseName": "Amazon: Nova Lite 1.0",
    "displayName": "Amazon: Nova Lite 1.0 — $0.15 / 1M mixed",
    "description": "Amazon Nova Lite 1.0 is a very low-cost multimodal model from Amazon that focused on fast processing of image, video, and text inputs to generate text output. Amazon Nova Lite...",
    "created": 1733437363,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "bytedance/ui-tars-1.5-7b",
    "baseName": "ByteDance: UI-TARS 7B ",
    "displayName": "ByteDance: UI-TARS 7B  — $0.15 / 1M mixed",
    "description": "UI-TARS-1.5 is a multimodal vision-language agent optimized for GUI-based environments, including desktop interfaces, web browsers, mobile systems, and games. Built by ByteDance, it builds upon the UI-TARS framework with reinforcement...",
    "created": 1753205056,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-v4-flash",
    "baseName": "DeepSeek: DeepSeek V4 Flash",
    "displayName": "DeepSeek: DeepSeek V4 Flash — $0.15 / 1M mixed",
    "description": "DeepSeek V4 Flash is an efficiency-optimized Mixture-of-Experts model from DeepSeek with 284B total parameters and 13B activated parameters, supporting a 1M-token context window. It is designed for fast inference and...",
    "created": 1777000666,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "essentialai/rnj-1-instruct",
    "baseName": "EssentialAI: Rnj 1 Instruct",
    "displayName": "EssentialAI: Rnj 1 Instruct — $0.15 / 1M mixed",
    "description": "Rnj-1 is an 8B-parameter, dense, open-weight model family developed by Essential AI and trained from scratch with a focus on programming, math, and scientific reasoning. The model demonstrates strong performance...",
    "created": 1765094847,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-embedding-001",
    "baseName": "Google: Gemini Embedding 001",
    "displayName": "Google: Gemini Embedding 001 — $0.15 / 1M mixed",
    "description": "gemini-embedding-001 provides a unified cutting edge experience across domains, including science, legal, finance, and coding. This embedding model has consistently held a top spot on the Massive Text Embedding Benchmark...",
    "created": 1761943410,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "mistralai/codestral-embed-2505",
    "baseName": "Mistral: Codestral Embed 2505",
    "displayName": "Mistral: Codestral Embed 2505 — $0.15 / 1M mixed",
    "description": "Mistral Codestral Embed is specially designed for code, perfect for embedding code databases, repositories, and powering coding assistants with state-of-the-art retrieval.",
    "created": 1761864460,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "mistralai/ministral-8b-2512",
    "baseName": "Mistral: Ministral 3 8B 2512",
    "displayName": "Mistral: Ministral 3 8B 2512 — $0.15 / 1M mixed",
    "description": "A balanced model in the Ministral 3 family, Ministral 3 8B is a powerful, efficient tiny language model with vision capabilities.",
    "created": 1764681654,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-7b-instruct-v0.1",
    "baseName": "Mistral: Mistral 7B Instruct v0.1",
    "displayName": "Mistral: Mistral 7B Instruct v0.1 — $0.15 / 1M mixed",
    "description": "A 7.3B parameter model that outperforms Llama 2 13B on all benchmarks, with optimizations for speed and context length.",
    "created": 1695859200,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "rekaai/reka-flash-3",
    "baseName": "Reka Flash 3",
    "displayName": "Reka Flash 3 — $0.15 / 1M mixed",
    "description": "Reka Flash 3 is a general-purpose, instruction-tuned large language model with 21 billion parameters, developed by Reka. It excels at general chat, coding tasks, instruction-following, and function calling. Featuring a...",
    "created": 1741812813,
    "mixedPricePerMillionUsd": 0.15,
    "priceLabel": "$0.15",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.5-flash-02-23",
    "baseName": "Qwen: Qwen3.5-Flash",
    "displayName": "Qwen: Qwen3.5-Flash — $0.16 / 1M mixed",
    "description": "The Qwen3.5 native vision-language Flash models are built on a hybrid architecture that integrates a linear attention mechanism with a sparse mixture-of-experts model, achieving higher inference efficiency. Compared to the...",
    "created": 1772053776,
    "mixedPricePerMillionUsd": 0.16,
    "priceLabel": "$0.16",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-14b",
    "baseName": "Qwen: Qwen3 14B",
    "displayName": "Qwen: Qwen3 14B — $0.17 / 1M mixed",
    "description": "Qwen3-14B is a dense 14.8B parameter causal language model from the Qwen3 series, designed for both complex reasoning and efficient dialogue. It supports seamless switching between a \"thinking\" mode for...",
    "created": 1745876478,
    "mixedPricePerMillionUsd": 0.17,
    "priceLabel": "$0.17",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-coder-30b-a3b-instruct",
    "baseName": "Qwen: Qwen3 Coder 30B A3B Instruct",
    "displayName": "Qwen: Qwen3 Coder 30B A3B Instruct — $0.17 / 1M mixed",
    "description": "Qwen3-Coder-30B-A3B-Instruct is a 30.5B parameter Mixture-of-Experts (MoE) model with 128 experts (8 active per forward pass), designed for advanced code generation, repository-scale understanding, and agentic tool use. Built on the...",
    "created": 1753972379,
    "mixedPricePerMillionUsd": 0.17,
    "priceLabel": "$0.17",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "arcee-ai/spotlight",
    "baseName": "Arcee AI: Spotlight",
    "displayName": "Arcee AI: Spotlight — $0.18 / 1M mixed",
    "description": "Spotlight is a 7‑billion‑parameter vision‑language model derived from Qwen 2.5‑VL and fine‑tuned by Arcee AI for tight image‑text grounding tasks. It offers a 32 k‑token context window, enabling rich multimodal...",
    "created": 1746481552,
    "mixedPricePerMillionUsd": 0.18,
    "priceLabel": "$0.18",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "baidu/ernie-4.5-21b-a3b",
    "baseName": "Baidu: ERNIE 4.5 21B A3B",
    "displayName": "Baidu: ERNIE 4.5 21B A3B — $0.18 / 1M mixed",
    "description": "A sophisticated text-based Mixture-of-Experts (MoE) model featuring 21B total parameters with 3B activated per token, delivering exceptional multimodal understanding and generation through heterogeneous MoE structures and modality-isolated routing. Supporting an...",
    "created": 1755034167,
    "mixedPricePerMillionUsd": 0.18,
    "priceLabel": "$0.18",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "baidu/ernie-4.5-21b-a3b-thinking",
    "baseName": "Baidu: ERNIE 4.5 21B A3B Thinking",
    "displayName": "Baidu: ERNIE 4.5 21B A3B Thinking — $0.18 / 1M mixed",
    "description": "ERNIE-4.5-21B-A3B-Thinking is Baidu's upgraded lightweight MoE model, refined to boost reasoning depth and quality for top-tier performance in logical puzzles, math, science, coding, text generation, and expert-level academic benchmarks.",
    "created": 1760048887,
    "mixedPricePerMillionUsd": 0.18,
    "priceLabel": "$0.18",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-guard-4-12b",
    "baseName": "Meta: Llama Guard 4 12B",
    "displayName": "Meta: Llama Guard 4 12B — $0.18 / 1M mixed",
    "description": "Llama Guard 4 is a Llama 4 Scout-derived multimodal pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM...",
    "created": 1745975193,
    "mixedPricePerMillionUsd": 0.18,
    "priceLabel": "$0.18",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-32b",
    "baseName": "Qwen: Qwen3 32B",
    "displayName": "Qwen: Qwen3 32B — $0.18 / 1M mixed",
    "description": "Qwen3-32B is a dense 32.8B parameter causal language model from the Qwen3 series, optimized for both complex reasoning and efficient dialogue. It supports seamless switching between a \"thinking\" mode for...",
    "created": 1745875945,
    "mixedPricePerMillionUsd": 0.18,
    "priceLabel": "$0.18",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "bytedance-seed/seed-1.6-flash",
    "baseName": "ByteDance Seed: Seed 1.6 Flash",
    "displayName": "ByteDance Seed: Seed 1.6 Flash — $0.19 / 1M mixed",
    "description": "Seed 1.6 Flash is an ultra-fast multimodal deep thinking model by ByteDance Seed, supporting both text and visual understanding. It features a 256k context window and can generate outputs of...",
    "created": 1766505011,
    "mixedPricePerMillionUsd": 0.19,
    "priceLabel": "$0.19",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.0-flash-lite-001",
    "baseName": "Google: Gemini 2.0 Flash Lite",
    "displayName": "Google: Gemini 2.0 Flash Lite — $0.19 / 1M mixed",
    "description": "Gemini 2.0 Flash Lite offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5),...",
    "created": 1740506212,
    "mixedPricePerMillionUsd": 0.19,
    "priceLabel": "$0.19",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-3.2-3b-instruct",
    "baseName": "Meta: Llama 3.2 3B Instruct",
    "displayName": "Meta: Llama 3.2 3B Instruct — $0.19 / 1M mixed",
    "description": "Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like dialogue generation, reasoning, and summarization. Designed with the latest transformer architecture, it...",
    "created": 1727222400,
    "mixedPricePerMillionUsd": 0.19,
    "priceLabel": "$0.19",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-4-scout",
    "baseName": "Meta: Llama 4 Scout",
    "displayName": "Meta: Llama 4 Scout — $0.19 / 1M mixed",
    "description": "Llama 4 Scout 17B Instruct (16E) is a mixture-of-experts (MoE) language model developed by Meta, activating 17 billion parameters out of a total of 109B. It supports native multimodal input...",
    "created": 1743881519,
    "mixedPricePerMillionUsd": 0.19,
    "priceLabel": "$0.19",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-oss-safeguard-20b",
    "baseName": "OpenAI: gpt-oss-safeguard-20b",
    "displayName": "OpenAI: gpt-oss-safeguard-20b — $0.19 / 1M mixed",
    "description": "gpt-oss-safeguard-20b is a safety reasoning model from OpenAI built upon gpt-oss-20b. This open-weight, 21B-parameter Mixture-of-Experts (MoE) model offers lower latency for safety tasks like content classification, LLM filtering, and trust...",
    "created": 1761752836,
    "mixedPricePerMillionUsd": 0.19,
    "priceLabel": "$0.19",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-30b-a3b-instruct-2507",
    "baseName": "Qwen: Qwen3 30B A3B Instruct 2507",
    "displayName": "Qwen: Qwen3 30B A3B Instruct 2507 — $0.19 / 1M mixed",
    "description": "Qwen3-30B-A3B-Instruct-2507 is a 30.5B-parameter mixture-of-experts language model from Qwen, with 3.3B active parameters per inference. It operates in non-thinking mode and is designed for high-quality instruction following, multilingual understanding, and...",
    "created": 1753806965,
    "mixedPricePerMillionUsd": 0.19,
    "priceLabel": "$0.19",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "stepfun/step-3.5-flash",
    "baseName": "StepFun: Step 3.5 Flash",
    "displayName": "StepFun: Step 3.5 Flash — $0.19 / 1M mixed",
    "description": "Step 3.5 Flash is StepFun's most capable open-source foundation model. Built on a sparse Mixture of Experts (MoE) architecture, it selectively activates only 11B of its 196B parameters per token....",
    "created": 1769728337,
    "mixedPricePerMillionUsd": 0.19,
    "priceLabel": "$0.19",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-embedding-2",
    "baseName": "Google: Gemini Embedding 2",
    "displayName": "Google: Gemini Embedding 2 — $0.20 / 1M mixed",
    "description": "Gemini Embedding 2 is Google's first multimodal embedding model. We currently support mapping text and images into a unified vector space for semantic search and retrieval-augmented generation (RAG). It supports...",
    "created": 1779290135,
    "mixedPricePerMillionUsd": 0.2,
    "priceLabel": "$0.20",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "google/gemini-embedding-2-preview",
    "baseName": "Google: Gemini Embedding 2 Preview",
    "displayName": "Google: Gemini Embedding 2 Preview — $0.20 / 1M mixed",
    "description": "Gemini Embedding 2 Preview is Google's first multimodal embedding model. We currently support mapping text and images into a unified vector space for semantic search and retrieval-augmented generation (RAG). It...",
    "created": 1776436465,
    "mixedPricePerMillionUsd": 0.2,
    "priceLabel": "$0.20",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "embeddings"
    ]
  },
  {
    "id": "google/gemma-4-26b-a4b-it",
    "baseName": "Google: Gemma 4 26B A4B ",
    "displayName": "Google: Gemma 4 26B A4B  — $0.20 / 1M mixed",
    "description": "Gemma 4 26B A4B IT is an instruction-tuned Mixture-of-Experts (MoE) model from Google DeepMind. Despite 25.2B total parameters, only 3.8B activate per token during inference — delivering near-31B quality at...",
    "created": 1775227989,
    "mixedPricePerMillionUsd": 0.2,
    "priceLabel": "$0.20",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/devstral-small",
    "baseName": "Mistral: Devstral Small 1.1",
    "displayName": "Mistral: Devstral Small 1.1 — $0.20 / 1M mixed",
    "description": "Devstral Small 1.1 is a 24B parameter open-weight language model for software engineering agents, developed by Mistral AI in collaboration with All Hands AI. Finetuned from Mistral Small 3.1 and...",
    "created": 1752160751,
    "mixedPricePerMillionUsd": 0.2,
    "priceLabel": "$0.20",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/ministral-14b-2512",
    "baseName": "Mistral: Ministral 3 14B 2512",
    "displayName": "Mistral: Ministral 3 14B 2512 — $0.20 / 1M mixed",
    "description": "The largest model in the Ministral 3 family, Ministral 3 14B offers frontier capabilities and performance comparable to its larger Mistral Small 3.2 24B counterpart. A powerful and efficient language...",
    "created": 1764681735,
    "mixedPricePerMillionUsd": 0.2,
    "priceLabel": "$0.20",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/voxtral-small-24b-2507",
    "baseName": "Mistral: Voxtral Small 24B 2507",
    "displayName": "Mistral: Voxtral Small 24B 2507 — $0.20 / 1M mixed",
    "description": "Voxtral Small is an enhancement of Mistral Small 3, incorporating state-of-the-art audio input capabilities while retaining best-in-class text performance. It excels at speech transcription, translation and audio understanding. Input audio...",
    "created": 1761835144,
    "mixedPricePerMillionUsd": 0.2,
    "priceLabel": "$0.20",
    "inputModalities": [
      "text",
      "audio",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "xiaomi/mimo-v2-flash",
    "baseName": "Xiaomi: MiMo-V2-Flash",
    "displayName": "Xiaomi: MiMo-V2-Flash — $0.20 / 1M mixed",
    "description": "MiMo-V2-Flash is an open-source foundation language model developed by Xiaomi. It is a Mixture-of-Experts model with 309B total parameters and 15B active parameters, adopting hybrid attention architecture. MiMo-V2-Flash supports a...",
    "created": 1765731308,
    "mixedPricePerMillionUsd": 0.2,
    "priceLabel": "$0.20",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-3.3-70b-instruct",
    "baseName": "Meta: Llama 3.3 70B Instruct",
    "displayName": "Meta: Llama 3.3 70B Instruct — $0.21 / 1M mixed",
    "description": "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model...",
    "created": 1733506137,
    "mixedPricePerMillionUsd": 0.21,
    "priceLabel": "$0.21",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "xiaomi/mimo-v2.5",
    "baseName": "Xiaomi: MiMo-V2.5",
    "displayName": "Xiaomi: MiMo-V2.5 — $0.21 / 1M mixed",
    "description": "MiMo-V2.5 is a native omnimodal model by Xiaomi. It delivers Pro-level agentic performance at roughly half the inference cost, while surpassing MiMo-V2-Omni in multimodal perception across image and video understanding...",
    "created": 1776874269,
    "mixedPricePerMillionUsd": 0.21,
    "priceLabel": "$0.21",
    "inputModalities": [
      "text",
      "audio",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "microsoft/phi-4-mini-instruct",
    "baseName": "Microsoft: Phi 4 Mini Instruct",
    "displayName": "Microsoft: Phi 4 Mini Instruct — $0.22 / 1M mixed",
    "description": "Phi-4-mini-instruct is a lightweight open model built upon synthetic data and filtered publicly available websites - with a focus on high-quality, reasoning dense data. The model belongs to the Phi-4...",
    "created": 1760726049,
    "mixedPricePerMillionUsd": 0.22,
    "priceLabel": "$0.22",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5-nano",
    "baseName": "OpenAI: GPT-5 Nano",
    "displayName": "OpenAI: GPT-5 Nano — $0.22 / 1M mixed",
    "description": "GPT-5-Nano is the smallest and fastest variant in the GPT-5 system, optimized for developer tools, rapid interactions, and ultra-low latency environments. While limited in reasoning depth compared to its larger...",
    "created": 1754587402,
    "mixedPricePerMillionUsd": 0.22,
    "priceLabel": "$0.22",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-8b",
    "baseName": "Qwen: Qwen3 8B",
    "displayName": "Qwen: Qwen3 8B — $0.22 / 1M mixed",
    "description": "Qwen3-8B is a dense 8.2B parameter causal language model from the Qwen3 series, designed for both reasoning-heavy tasks and efficient dialogue. It supports seamless switching between \"thinking\" mode for math,...",
    "created": 1745876632,
    "mixedPricePerMillionUsd": 0.22,
    "priceLabel": "$0.22",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-4.7-flash",
    "baseName": "Z.ai: GLM 4.7 Flash",
    "displayName": "Z.ai: GLM 4.7 Flash — $0.23 / 1M mixed",
    "description": "As a 30B-class SOTA model, GLM-4.7-Flash offers a new option that balances performance and efficiency. It is further optimized for agentic coding use cases, strengthening coding capabilities, long-horizon task planning,...",
    "created": 1768833913,
    "mixedPricePerMillionUsd": 0.23,
    "priceLabel": "$0.23",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-30b-a3b-thinking-2507",
    "baseName": "Qwen: Qwen3 30B A3B Thinking 2507",
    "displayName": "Qwen: Qwen3 30B A3B Thinking 2507 — $0.24 / 1M mixed",
    "description": "Qwen3-30B-A3B-Thinking-2507 is a 30B parameter Mixture-of-Experts reasoning model optimized for complex tasks requiring extended multi-step thinking. The model is designed specifically for “thinking mode,” where internal reasoning traces are separated...",
    "created": 1756399192,
    "mixedPricePerMillionUsd": 0.24,
    "priceLabel": "$0.24",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "bytedance-seed/seed-2.0-mini",
    "baseName": "ByteDance Seed: Seed-2.0-Mini",
    "displayName": "ByteDance Seed: Seed-2.0-Mini — $0.25 / 1M mixed",
    "description": "Seed-2.0-mini targets latency-sensitive, high-concurrency, and cost-sensitive scenarios, emphasizing fast response and flexible inference deployment. It delivers performance comparable to ByteDance-Seed-1.6, supports 256k context, four reasoning effort modes (minimal/low/medium/high), multimodal understanding,...",
    "created": 1772131107,
    "mixedPricePerMillionUsd": 0.25,
    "priceLabel": "$0.25",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.0-flash-001",
    "baseName": "Google: Gemini 2.0 Flash",
    "displayName": "Google: Gemini 2.0 Flash — $0.25 / 1M mixed",
    "description": "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro 1.5](/google/gemini-pro-1.5). It...",
    "created": 1738769413,
    "mixedPricePerMillionUsd": 0.25,
    "priceLabel": "$0.25",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.5-flash-lite",
    "baseName": "Google: Gemini 2.5 Flash Lite",
    "displayName": "Google: Gemini 2.5 Flash Lite — $0.25 / 1M mixed",
    "description": "Gemini 2.5 Flash-Lite is a lightweight reasoning model in the Gemini 2.5 family, optimized for ultra-low latency and cost efficiency. It offers improved throughput, faster token generation, and better performance...",
    "created": 1753200276,
    "mixedPricePerMillionUsd": 0.25,
    "priceLabel": "$0.25",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.5-flash-lite-preview-09-2025",
    "baseName": "Google: Gemini 2.5 Flash Lite Preview 09-2025",
    "displayName": "Google: Gemini 2.5 Flash Lite Preview 09-2025 — $0.25 / 1M mixed",
    "description": "Gemini 2.5 Flash-Lite is a lightweight reasoning model in the Gemini 2.5 family, optimized for ultra-low latency and cost efficiency. It offers improved throughput, faster token generation, and better performance...",
    "created": 1758819686,
    "mixedPricePerMillionUsd": 0.25,
    "priceLabel": "$0.25",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemma-4-31b-it",
    "baseName": "Google: Gemma 4 31B",
    "displayName": "Google: Gemma 4 31B — $0.25 / 1M mixed",
    "description": "Gemma 4 31B Instruct is Google DeepMind's 30.7B dense multimodal model supporting text and image input with text output. Features a 256K token context window, configurable thinking/reasoning mode, native function...",
    "created": 1775148486,
    "mixedPricePerMillionUsd": 0.25,
    "priceLabel": "$0.25",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-3.2-11b-vision-instruct",
    "baseName": "Meta: Llama 3.2 11B Vision Instruct",
    "displayName": "Meta: Llama 3.2 11B Vision Instruct — $0.25 / 1M mixed",
    "description": "Llama 3.2 11B Vision is a multimodal model with 11 billion parameters, designed to handle tasks combining visual and textual data. It excels in tasks such as image captioning and...",
    "created": 1727222400,
    "mixedPricePerMillionUsd": 0.25,
    "priceLabel": "$0.25",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/llama-3.3-nemotron-super-49b-v1.5",
    "baseName": "NVIDIA: Llama 3.3 Nemotron Super 49B V1.5",
    "displayName": "NVIDIA: Llama 3.3 Nemotron Super 49B V1.5 — $0.25 / 1M mixed",
    "description": "Llama-3.3-Nemotron-Super-49B-v1.5 is a 49B-parameter, English-centric reasoning/chat model derived from Meta’s Llama-3.3-70B-Instruct with a 128K context. It’s post-trained for agentic workflows (RAG, tool calling) via SFT across math, code, science, and...",
    "created": 1760101395,
    "mixedPricePerMillionUsd": 0.25,
    "priceLabel": "$0.25",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4.1-nano",
    "baseName": "OpenAI: GPT-4.1 Nano",
    "displayName": "OpenAI: GPT-4.1 Nano — $0.25 / 1M mixed",
    "description": "For tasks that demand low latency, GPT‑4.1 nano is the fastest and cheapest model in the GPT-4.1 series. It delivers exceptional performance at a small size with its 1 million...",
    "created": 1744651369,
    "mixedPricePerMillionUsd": 0.25,
    "priceLabel": "$0.25",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-guard-3-8b",
    "baseName": "Llama Guard 3 8B",
    "displayName": "Llama Guard 3 8B — $0.26 / 1M mixed",
    "description": "Llama Guard 3 is a Llama-3.1-8B pretrained model, fine-tuned for content safety classification. Similar to previous versions, it can be used to classify content in both LLM inputs (prompt classification)...",
    "created": 1739401318,
    "mixedPricePerMillionUsd": 0.26,
    "priceLabel": "$0.26",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-vl-32b-instruct",
    "baseName": "Qwen: Qwen3 VL 32B Instruct",
    "displayName": "Qwen: Qwen3 VL 32B Instruct — $0.26 / 1M mixed",
    "description": "Qwen3-VL-32B-Instruct is a large-scale multimodal vision-language model designed for high-precision understanding and reasoning across text, images, and video. With 32 billion parameters, it combines deep visual perception with advanced text...",
    "created": 1761231332,
    "mixedPricePerMillionUsd": 0.26,
    "priceLabel": "$0.26",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nousresearch/hermes-4-70b",
    "baseName": "Nous: Hermes 4 70B",
    "displayName": "Nous: Hermes 4 70B — $0.27 / 1M mixed",
    "description": "Hermes 4 70B is a hybrid reasoning model from Nous Research, built on Meta-Llama-3.1-70B. It introduces the same hybrid mode as the larger 405B release, allowing the model to either...",
    "created": 1756236182,
    "mixedPricePerMillionUsd": 0.27,
    "priceLabel": "$0.27",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/nemotron-3-super-120b-a12b",
    "baseName": "NVIDIA: Nemotron 3 Super",
    "displayName": "NVIDIA: Nemotron 3 Super — $0.27 / 1M mixed",
    "description": "NVIDIA Nemotron 3 Super is a 120B-parameter open hybrid MoE model, activating just 12B parameters for maximum compute efficiency and accuracy in complex multi-agent applications. Built on a hybrid Mamba-Transformer...",
    "created": 1773245239,
    "mixedPricePerMillionUsd": 0.27,
    "priceLabel": "$0.27",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-30b-a3b",
    "baseName": "Qwen: Qwen3 30B A3B",
    "displayName": "Qwen: Qwen3 30B A3B — $0.27 / 1M mixed",
    "description": "Qwen3, the latest generation in the Qwen large language model series, features both dense and mixture-of-experts (MoE) architectures to excel in reasoning, multilingual support, and advanced agent tasks. Its unique...",
    "created": 1745878604,
    "mixedPricePerMillionUsd": 0.27,
    "priceLabel": "$0.27",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-r1-distill-qwen-32b",
    "baseName": "DeepSeek: R1 Distill Qwen 32B",
    "displayName": "DeepSeek: R1 Distill Qwen 32B — $0.29 / 1M mixed",
    "description": "DeepSeek R1 Distill Qwen 32B is a distilled large language model based on [Qwen 2.5 32B](https://huggingface.co/Qwen/Qwen2.5-32B), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). It outperforms OpenAI's o1-mini across various benchmarks, achieving new...",
    "created": 1738194830,
    "mixedPricePerMillionUsd": 0.29,
    "priceLabel": "$0.29",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-vl-8b-instruct",
    "baseName": "Qwen: Qwen3 VL 8B Instruct",
    "displayName": "Qwen: Qwen3 VL 8B Instruct — $0.29 / 1M mixed",
    "description": "Qwen3-VL-8B-Instruct is a multimodal vision-language model from the Qwen3-VL series, built for high-fidelity understanding and reasoning across text, images, and video. It features improved multimodal fusion with Interleaved-MRoPE for long-horizon...",
    "created": 1760463308,
    "mixedPricePerMillionUsd": 0.29,
    "priceLabel": "$0.29",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nousresearch/hermes-3-llama-3.1-70b",
    "baseName": "Nous: Hermes 3 70B Instruct",
    "displayName": "Nous: Hermes 3 70B Instruct — $0.30 / 1M mixed",
    "description": "Hermes 3 is a generalist language model with many improvements over [Hermes 2](/models/nousresearch/nous-hermes-2-mistral-7b-dpo), including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the...",
    "created": 1723939200,
    "mixedPricePerMillionUsd": 0.3,
    "priceLabel": "$0.30",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "thedrummer/rocinante-12b",
    "baseName": "TheDrummer: Rocinante 12B",
    "displayName": "TheDrummer: Rocinante 12B — $0.30 / 1M mixed",
    "description": "Rocinante 12B is designed for engaging storytelling and rich prose. Early testers have reported: - Expanded vocabulary with unique and expressive word choices - Enhanced creativity for vivid narratives -...",
    "created": 1727654400,
    "mixedPricePerMillionUsd": 0.3,
    "priceLabel": "$0.30",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "allenai/olmo-3-32b-think",
    "baseName": "AllenAI: Olmo 3 32B Think",
    "displayName": "AllenAI: Olmo 3 32B Think — $0.32 / 1M mixed",
    "description": "Olmo 3 32B Think is a large-scale, 32-billion-parameter model purpose-built for deep reasoning, complex logic chains and advanced instruction-following scenarios. Its capacity enables strong performance on demanding evaluation tasks and...",
    "created": 1763758276,
    "mixedPricePerMillionUsd": 0.32,
    "priceLabel": "$0.32",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-v3.2",
    "baseName": "DeepSeek: DeepSeek V3.2",
    "displayName": "DeepSeek: DeepSeek V3.2 — $0.32 / 1M mixed",
    "description": "DeepSeek-V3.2 is a large language model designed to harmonize high computational efficiency with strong reasoning and agentic tool-use performance. It introduces DeepSeek Sparse Attention (DSA), a fine-grained sparse attention mechanism...",
    "created": 1764594642,
    "mixedPricePerMillionUsd": 0.32,
    "priceLabel": "$0.32",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nex-agi/deepseek-v3.1-nex-n1",
    "baseName": "Nex AGI: DeepSeek V3.1 Nex N1",
    "displayName": "Nex AGI: DeepSeek V3.1 Nex N1 — $0.32 / 1M mixed",
    "description": "DeepSeek V3.1 Nex-N1 is the flagship release of the Nex-N1 series — a post-trained model designed to highlight agent autonomy, tool use, and real-world productivity. Nex-N1 demonstrates competitive performance across...",
    "created": 1765204393,
    "mixedPricePerMillionUsd": 0.32,
    "priceLabel": "$0.32",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-vl-30b-a3b-instruct",
    "baseName": "Qwen: Qwen3 VL 30B A3B Instruct",
    "displayName": "Qwen: Qwen3 VL 30B A3B Instruct — $0.33 / 1M mixed",
    "description": "Qwen3-VL-30B-A3B-Instruct is a multimodal model that unifies strong text generation with visual understanding for images and videos. Its Instruct variant optimizes instruction-following for general multimodal tasks. It excels in perception...",
    "created": 1759794476,
    "mixedPricePerMillionUsd": 0.33,
    "priceLabel": "$0.33",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-v3.2-exp",
    "baseName": "DeepSeek: DeepSeek V3.2 Exp",
    "displayName": "DeepSeek: DeepSeek V3.2 Exp — $0.34 / 1M mixed",
    "description": "DeepSeek-V3.2-Exp is an experimental large language model released by DeepSeek as an intermediate step between V3.1 and future architectures. It introduces DeepSeek Sparse Attention (DSA), a fine-grained sparse attention mechanism...",
    "created": 1759150481,
    "mixedPricePerMillionUsd": 0.34,
    "priceLabel": "$0.34",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "baidu/ernie-4.5-vl-28b-a3b",
    "baseName": "Baidu: ERNIE 4.5 VL 28B A3B",
    "displayName": "Baidu: ERNIE 4.5 VL 28B A3B — $0.35 / 1M mixed",
    "description": "A powerful multimodal Mixture-of-Experts chat model featuring 28B total parameters with 3B activated per token, delivering exceptional text and vision understanding through its innovative heterogeneous MoE structure with modality-isolated routing....",
    "created": 1755032836,
    "mixedPricePerMillionUsd": 0.35,
    "priceLabel": "$0.35",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "inclusionai/ling-2.6-1t",
    "baseName": "inclusionAI: Ling-2.6-1T",
    "displayName": "inclusionAI: Ling-2.6-1T — $0.35 / 1M mixed",
    "description": "Ling-2.6-1T is an instant (instruct) model from inclusionAI and the company’s trillion-parameter flagship, designed for real-world agents that require fast execution and high efficiency at scale. It uses a “fast...",
    "created": 1776948238,
    "mixedPricePerMillionUsd": 0.35,
    "priceLabel": "$0.35",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "inclusionai/ring-2.6-1t",
    "baseName": "inclusionAI: Ring-2.6-1T",
    "displayName": "inclusionAI: Ring-2.6-1T — $0.35 / 1M mixed",
    "description": "Ring-2.6-1T is a 1T-parameter-scale thinking model with 63B active parameters, built for real-world agent workflows that require both strong capability and operational efficiency. It is optimized for coding agents, tool...",
    "created": 1778247440,
    "mixedPricePerMillionUsd": 0.35,
    "priceLabel": "$0.35",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-v3.2-speciale",
    "baseName": "DeepSeek: DeepSeek V3.2 Speciale",
    "displayName": "DeepSeek: DeepSeek V3.2 Speciale — $0.36 / 1M mixed",
    "description": "DeepSeek-V3.2-Speciale is a high-compute variant of DeepSeek-V3.2 optimized for maximum reasoning and agentic performance. It builds on DeepSeek Sparse Attention (DSA) for efficient long-context processing, then scales post-training reinforcement learning...",
    "created": 1764594837,
    "mixedPricePerMillionUsd": 0.36,
    "priceLabel": "$0.36",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "tencent/hunyuan-a13b-instruct",
    "baseName": "Tencent: Hunyuan A13B Instruct",
    "displayName": "Tencent: Hunyuan A13B Instruct — $0.36 / 1M mixed",
    "description": "Hunyuan-A13B is a 13B active parameter Mixture-of-Experts (MoE) language model developed by Tencent, with a total parameter count of 80B and support for reasoning via Chain-of-Thought. It offers competitive benchmark...",
    "created": 1751987664,
    "mixedPricePerMillionUsd": 0.36,
    "priceLabel": "$0.36",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "cohere/command-r-08-2024",
    "baseName": "Cohere: Command R (08-2024)",
    "displayName": "Cohere: Command R (08-2024) — $0.38 / 1M mixed",
    "description": "command-r-08-2024 is an update of the [Command R](/models/cohere/command-r) with improved performance for multilingual retrieval-augmented generation (RAG) and tool use. More broadly, it is better at math, code and reasoning and...",
    "created": 1724976000,
    "mixedPricePerMillionUsd": 0.38,
    "priceLabel": "$0.38",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-4-maverick",
    "baseName": "Meta: Llama 4 Maverick",
    "displayName": "Meta: Llama 4 Maverick — $0.38 / 1M mixed",
    "description": "Llama 4 Maverick 17B Instruct (128E) is a high-capacity multimodal language model from Meta, built on a mixture-of-experts (MoE) architecture with 128 experts and 17 billion active parameters per forward...",
    "created": 1743881822,
    "mixedPricePerMillionUsd": 0.38,
    "priceLabel": "$0.38",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-small-2603",
    "baseName": "Mistral: Mistral Small 4",
    "displayName": "Mistral: Mistral Small 4 — $0.38 / 1M mixed",
    "description": "Mistral Small 4 is the next major release in the Mistral Small family, unifying the capabilities of several flagship Mistral models into a single system. It combines strong reasoning from...",
    "created": 1773695685,
    "mixedPricePerMillionUsd": 0.38,
    "priceLabel": "$0.38",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-mini",
    "baseName": "OpenAI: GPT-4o-mini",
    "displayName": "OpenAI: GPT-4o-mini — $0.38 / 1M mixed",
    "description": "GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs. As their most advanced small model, it is many multiples more affordable...",
    "created": 1721260800,
    "mixedPricePerMillionUsd": 0.38,
    "priceLabel": "$0.38",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-mini-2024-07-18",
    "baseName": "OpenAI: GPT-4o-mini (2024-07-18)",
    "displayName": "OpenAI: GPT-4o-mini (2024-07-18) — $0.38 / 1M mixed",
    "description": "GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs. As their most advanced small model, it is many multiples more affordable...",
    "created": 1721260800,
    "mixedPricePerMillionUsd": 0.38,
    "priceLabel": "$0.38",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-mini-search-preview",
    "baseName": "OpenAI: GPT-4o-mini Search Preview",
    "displayName": "OpenAI: GPT-4o-mini Search Preview — $0.38 / 1M mixed",
    "description": "GPT-4o mini Search Preview is a specialized model for web search in Chat Completions. It is trained to understand and execute web search queries.",
    "created": 1741818122,
    "mixedPricePerMillionUsd": 0.38,
    "priceLabel": "$0.38",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen-2.5-72b-instruct",
    "baseName": "Qwen2.5 72B Instruct",
    "displayName": "Qwen2.5 72B Instruct — $0.38 / 1M mixed",
    "description": "Qwen2.5 72B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2: - Significantly more knowledge and has greatly improved capabilities in coding and...",
    "created": 1726704000,
    "mixedPricePerMillionUsd": 0.38,
    "priceLabel": "$0.38",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "upstage/solar-pro-3",
    "baseName": "Upstage: Solar Pro 3",
    "displayName": "Upstage: Solar Pro 3 — $0.38 / 1M mixed",
    "description": "Solar Pro 3 is Upstage's powerful Mixture-of-Experts (MoE) language model. With 102B total parameters and 12B active parameters per forward pass, it delivers exceptional performance while maintaining computational efficiency. Optimized...",
    "created": 1769481200,
    "mixedPricePerMillionUsd": 0.38,
    "priceLabel": "$0.38",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-3.1-70b-instruct",
    "baseName": "Meta: Llama 3.1 70B Instruct",
    "displayName": "Meta: Llama 3.1 70B Instruct — $0.40 / 1M mixed",
    "description": "Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 70B instruct-tuned version is optimized for high quality dialogue usecases. It has demonstrated strong...",
    "created": 1721692800,
    "mixedPricePerMillionUsd": 0.4,
    "priceLabel": "$0.40",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-saba",
    "baseName": "Mistral: Saba",
    "displayName": "Mistral: Saba — $0.40 / 1M mixed",
    "description": "Mistral Saba is a 24B-parameter language model specifically designed for the Middle East and South Asia, delivering accurate and contextually relevant responses while maintaining efficient performance. Trained on curated regional...",
    "created": 1739803239,
    "mixedPricePerMillionUsd": 0.4,
    "priceLabel": "$0.40",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "thedrummer/cydonia-24b-v4.1",
    "baseName": "TheDrummer: Cydonia 24B V4.1",
    "displayName": "TheDrummer: Cydonia 24B V4.1 — $0.40 / 1M mixed",
    "description": "Uncensored and creative writing model based on Mistral Small 3.2 24B with good recall, prompt adherence, and intelligence.",
    "created": 1758931878,
    "mixedPricePerMillionUsd": 0.4,
    "priceLabel": "$0.40",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "thedrummer/unslopnemo-12b",
    "baseName": "TheDrummer: UnslopNemo 12B",
    "displayName": "TheDrummer: UnslopNemo 12B — $0.40 / 1M mixed",
    "description": "UnslopNemo v4.1 is the latest addition from the creator of Rocinante, designed for adventure writing and role-play scenarios.",
    "created": 1731103448,
    "mixedPricePerMillionUsd": 0.4,
    "priceLabel": "$0.40",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-next-80b-a3b-thinking",
    "baseName": "Qwen: Qwen3 Next 80B A3B Thinking",
    "displayName": "Qwen: Qwen3 Next 80B A3B Thinking — $0.44 / 1M mixed",
    "description": "Qwen3-Next-80B-A3B-Thinking is a reasoning-first chat model in the Qwen3-Next line that outputs structured “thinking” traces by default. It’s designed for hard multi-step problems; math proofs, code synthesis/debugging, logic, and agentic...",
    "created": 1757612284,
    "mixedPricePerMillionUsd": 0.44,
    "priceLabel": "$0.44",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-small-3.1-24b-instruct",
    "baseName": "Mistral: Mistral Small 3.1 24B",
    "displayName": "Mistral: Mistral Small 3.1 24B — $0.45 / 1M mixed",
    "description": "Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal capabilities. It provides state-of-the-art performance in text-based reasoning and...",
    "created": 1742238937,
    "mixedPricePerMillionUsd": 0.45,
    "priceLabel": "$0.45",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-coder-next",
    "baseName": "Qwen: Qwen3 Coder Next",
    "displayName": "Qwen: Qwen3 Coder Next — $0.45 / 1M mixed",
    "description": "Qwen3-Coder-Next is an open-weight causal language model optimized for coding agents and local development workflows. It uses a sparse MoE design with 80B total parameters and only 3B activated per...",
    "created": 1770164101,
    "mixedPricePerMillionUsd": 0.45,
    "priceLabel": "$0.45",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-chat-v3-0324",
    "baseName": "DeepSeek: DeepSeek V3 0324",
    "displayName": "DeepSeek: DeepSeek V3 0324 — $0.49 / 1M mixed",
    "description": "DeepSeek V3, a 685B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team. It succeeds the [DeepSeek V3](/deepseek/deepseek-chat-v3) model and performs really well...",
    "created": 1742824755,
    "mixedPricePerMillionUsd": 0.49,
    "priceLabel": "$0.49",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-4.5-air",
    "baseName": "Z.ai: GLM 4.5 Air",
    "displayName": "Z.ai: GLM 4.5 Air — $0.49 / 1M mixed",
    "description": "GLM-4.5-Air is the lightweight variant of our latest flagship model family, also purpose-built for agent-centric applications. Like GLM-4.5, it adopts the Mixture-of-Experts (MoE) architecture but with a more compact parameter...",
    "created": 1753471258,
    "mixedPricePerMillionUsd": 0.49,
    "priceLabel": "$0.49",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-chat-v3.1",
    "baseName": "DeepSeek: DeepSeek V3.1",
    "displayName": "DeepSeek: DeepSeek V3.1 — $0.50 / 1M mixed",
    "description": "DeepSeek-V3.1 is a large hybrid reasoning model (671B parameters, 37B active) that supports both thinking and non-thinking modes via prompt templates. It extends the DeepSeek-V3 base with a two-phase long-context...",
    "created": 1755779628,
    "mixedPricePerMillionUsd": 0.5,
    "priceLabel": "$0.50",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "inception/mercury-2",
    "baseName": "Inception: Mercury 2",
    "displayName": "Inception: Mercury 2 — $0.50 / 1M mixed",
    "description": "Mercury 2 is an extremely fast reasoning LLM, and the first reasoning diffusion LLM (dLLM). Instead of generating tokens sequentially, Mercury 2 produces and refines multiple tokens in parallel, achieving...",
    "created": 1772636275,
    "mixedPricePerMillionUsd": 0.5,
    "priceLabel": "$0.50",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen2.5-vl-72b-instruct",
    "baseName": "Qwen: Qwen2.5 VL 72B Instruct",
    "displayName": "Qwen: Qwen2.5 VL 72B Instruct — $0.50 / 1M mixed",
    "description": "Qwen2.5-VL is proficient in recognizing common objects such as flowers, birds, fish, and insects. It is also highly capable of analyzing texts, charts, icons, graphics, and layouts within images.",
    "created": 1738410311,
    "mixedPricePerMillionUsd": 0.5,
    "priceLabel": "$0.50",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen-plus-2025-07-28",
    "baseName": "Qwen: Qwen Plus 0728",
    "displayName": "Qwen: Qwen Plus 0728 — $0.52 / 1M mixed",
    "description": "Qwen Plus 0728, based on the Qwen3 foundation model, is a 1 million context hybrid reasoning model with a balanced performance, speed, and cost combination.",
    "created": 1757347599,
    "mixedPricePerMillionUsd": 0.52,
    "priceLabel": "$0.52",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen-plus-2025-07-28:thinking",
    "baseName": "Qwen: Qwen Plus 0728 (thinking)",
    "displayName": "Qwen: Qwen Plus 0728 (thinking) — $0.52 / 1M mixed",
    "description": "Qwen Plus 0728, based on the Qwen3 foundation model, is a 1 million context hybrid reasoning model with a balanced performance, speed, and cost combination.",
    "created": 1757347599,
    "mixedPricePerMillionUsd": 0.52,
    "priceLabel": "$0.52",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen-plus",
    "baseName": "Qwen: Qwen-Plus",
    "displayName": "Qwen: Qwen-Plus — $0.52 / 1M mixed",
    "description": "Qwen-Plus, based on the Qwen2.5 foundation model, is a 131K context model with a balanced performance, speed, and cost combination.",
    "created": 1738409840,
    "mixedPricePerMillionUsd": 0.52,
    "priceLabel": "$0.52",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "arcee-ai/trinity-large-thinking",
    "baseName": "Arcee AI: Trinity Large Thinking",
    "displayName": "Arcee AI: Trinity Large Thinking — $0.53 / 1M mixed",
    "description": "Trinity Large Thinking is a powerful open source reasoning model from the team at Arcee AI. It shows strong performance in PinchBench, agentic workloads, and reasoning tasks. Launch video: https://youtu.be/Gc82AXLa0Rg?si=4RLn6WBz33qT--B7...",
    "created": 1775058318,
    "mixedPricePerMillionUsd": 0.53,
    "priceLabel": "$0.53",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-vl-235b-a22b-instruct",
    "baseName": "Qwen: Qwen3 VL 235B A22B Instruct",
    "displayName": "Qwen: Qwen3 VL 235B A22B Instruct — $0.54 / 1M mixed",
    "description": "Qwen3-VL-235B-A22B Instruct is an open-weight multimodal model that unifies strong text generation with visual understanding across images and video. The Instruct model targets general vision-language use (VQA, document parsing, chart/table...",
    "created": 1758668687,
    "mixedPricePerMillionUsd": 0.54,
    "priceLabel": "$0.54",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "undi95/remm-slerp-l2-13b",
    "baseName": "ReMM SLERP 13B",
    "displayName": "ReMM SLERP 13B — $0.55 / 1M mixed",
    "description": "A recreation trial of the original MythoMax-L2-B13 but with updated models. #merge",
    "created": 1689984000,
    "mixedPricePerMillionUsd": 0.55,
    "priceLabel": "$0.55",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-chat",
    "baseName": "DeepSeek: DeepSeek V3",
    "displayName": "DeepSeek: DeepSeek V3 — $0.57 / 1M mixed",
    "description": "DeepSeek-V3 is the latest model from the DeepSeek team, building upon the instruction following and coding abilities of the previous versions. Pre-trained on nearly 15 trillion tokens, the reported evaluations...",
    "created": 1735241320,
    "mixedPricePerMillionUsd": 0.57,
    "priceLabel": "$0.57",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.5-35b-a3b",
    "baseName": "Qwen: Qwen3.5-35B-A3B",
    "displayName": "Qwen: Qwen3.5-35B-A3B — $0.57 / 1M mixed",
    "description": "The Qwen3.5 Series 35B-A3B is a native vision-language model designed with a hybrid architecture that integrates linear attention mechanisms and a sparse mixture-of-experts model, achieving higher inference efficiency. Its overall...",
    "created": 1772053822,
    "mixedPricePerMillionUsd": 0.57,
    "priceLabel": "$0.57",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.6-35b-a3b",
    "baseName": "Qwen: Qwen3.6 35B A3B",
    "displayName": "Qwen: Qwen3.6 35B A3B — $0.57 / 1M mixed",
    "description": "Qwen3.6-35B-A3B is an open-weight multimodal model from Alibaba Cloud with 35 billion total parameters and 3 billion active parameters per token. It uses a hybrid sparse mixture-of-experts architecture combining Gated...",
    "created": 1777260255,
    "mixedPricePerMillionUsd": 0.57,
    "priceLabel": "$0.57",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-coder-flash",
    "baseName": "Qwen: Qwen3 Coder Flash",
    "displayName": "Qwen: Qwen3 Coder Flash — $0.59 / 1M mixed",
    "description": "Qwen3 Coder Flash is Alibaba's fast and cost efficient version of their proprietary Qwen3 Coder Plus. It is a powerful coding agent model specializing in autonomous programming via tool calling...",
    "created": 1758115536,
    "mixedPricePerMillionUsd": 0.59,
    "priceLabel": "$0.59",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/codestral-2508",
    "baseName": "Mistral: Codestral 2508",
    "displayName": "Mistral: Codestral 2508 — $0.60 / 1M mixed",
    "description": "Mistral's cutting-edge language model for coding released end of July 2025. Codestral specializes in low-latency, high-frequency tasks such as fill-in-the-middle (FIM), code correction and test generation.\n\n[Blog Post](https://mistral.ai/news/codestral-25-08)",
    "created": 1754079630,
    "mixedPricePerMillionUsd": 0.6,
    "priceLabel": "$0.60",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-mini-tts-2025-12-15",
    "baseName": "OpenAI: GPT-4o Mini TTS",
    "displayName": "OpenAI: GPT-4o Mini TTS — $0.60 / 1M mixed",
    "description": "GPT-4o Mini TTS is OpenAI's cost-efficient text-to-speech model. It converts text input into natural-sounding audio output, supporting a variety of voices and tones.",
    "created": 1776552477,
    "mixedPricePerMillionUsd": 0.6,
    "priceLabel": "$0.60",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "qwen/qwen3-next-80b-a3b-instruct",
    "baseName": "Qwen: Qwen3 Next 80B A3B Instruct",
    "displayName": "Qwen: Qwen3 Next 80B A3B Instruct — $0.60 / 1M mixed",
    "description": "Qwen3-Next-80B-A3B-Instruct is an instruction-tuned chat model in the Qwen3-Next series optimized for fast, stable responses without “thinking” traces. It targets complex tasks across reasoning, code generation, knowledge QA, and multilingual...",
    "created": 1757612213,
    "mixedPricePerMillionUsd": 0.6,
    "priceLabel": "$0.60",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-4.6v",
    "baseName": "Z.ai: GLM 4.6V",
    "displayName": "Z.ai: GLM 4.6V — $0.60 / 1M mixed",
    "description": "GLM-4.6V is a large multimodal model designed for high-fidelity visual understanding and long-context reasoning across images, documents, and mixed media. It supports up to 128K tokens, processes complex page layouts...",
    "created": 1765207462,
    "mixedPricePerMillionUsd": 0.6,
    "priceLabel": "$0.60",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-v3.1-terminus",
    "baseName": "DeepSeek: DeepSeek V3.1 Terminus",
    "displayName": "DeepSeek: DeepSeek V3.1 Terminus — $0.61 / 1M mixed",
    "description": "DeepSeek-V3.1 Terminus is an update to [DeepSeek V3.1](/deepseek/deepseek-chat-v3.1) that maintains the model's original capabilities while addressing issues reported by users, including language consistency and agent capabilities, further optimizing the model's...",
    "created": 1758548275,
    "mixedPricePerMillionUsd": 0.61,
    "priceLabel": "$0.61",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "hexgrad/kokoro-82m",
    "baseName": "hexgrad: Kokoro 82M",
    "displayName": "hexgrad: Kokoro 82M — $0.62 / 1M mixed",
    "description": "Kokoro 82M is a lightweight, open-weight text-to-speech model from hexgrad. It converts text to speech across 8 languages (American and British English, Spanish, French, Hindi, Italian, Japanese, Portuguese, and Chinese)...",
    "created": 1776983167,
    "mixedPricePerMillionUsd": 0.62,
    "priceLabel": "$0.62",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "minimax/minimax-m2.1",
    "baseName": "MiniMax: MiniMax M2.1",
    "displayName": "MiniMax: MiniMax M2.1 — $0.62 / 1M mixed",
    "description": "MiniMax-M2.1 is a lightweight, state-of-the-art large language model optimized for coding, agentic workflows, and modern application development. With only 10 billion activated parameters, it delivers a major jump in real-world...",
    "created": 1766454997,
    "mixedPricePerMillionUsd": 0.62,
    "priceLabel": "$0.62",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "microsoft/wizardlm-2-8x22b",
    "baseName": "WizardLM-2 8x22B",
    "displayName": "WizardLM-2 8x22B — $0.62 / 1M mixed",
    "description": "WizardLM-2 8x22B is Microsoft AI's most advanced Wizard model. It demonstrates highly competitive performance compared to leading proprietary models, and it consistently outperforms all existing state-of-the-art opensource models. It is...",
    "created": 1713225600,
    "mixedPricePerMillionUsd": 0.62,
    "priceLabel": "$0.62",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "meta-llama/llama-3-70b-instruct",
    "baseName": "Meta: Llama 3 70B Instruct",
    "displayName": "Meta: Llama 3 70B Instruct — $0.63 / 1M mixed",
    "description": "Meta's latest class of model (Llama 3) launched with a variety of sizes & flavors. This 70B instruct-tuned version was optimized for high quality dialogue usecases. It has demonstrated strong...",
    "created": 1713398400,
    "mixedPricePerMillionUsd": 0.63,
    "priceLabel": "$0.63",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "minimax/minimax-m2",
    "baseName": "MiniMax: MiniMax M2",
    "displayName": "MiniMax: MiniMax M2 — $0.63 / 1M mixed",
    "description": "MiniMax-M2 is a compact, high-efficiency large language model optimized for end-to-end coding and agentic workflows. With 10 billion activated parameters (230 billion total), it delivers near-frontier intelligence across general reasoning,...",
    "created": 1761252093,
    "mixedPricePerMillionUsd": 0.63,
    "priceLabel": "$0.63",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "arcee-ai/coder-large",
    "baseName": "Arcee AI: Coder Large",
    "displayName": "Arcee AI: Coder Large — $0.65 / 1M mixed",
    "description": "Coder‑Large is a 32 B‑parameter offspring of Qwen 2.5‑Instruct that has been further trained on permissively‑licensed GitHub, CodeSearchNet and synthetic bug‑fix corpora. It supports a 32k context window, enabling multi‑file...",
    "created": 1746478663,
    "mixedPricePerMillionUsd": 0.65,
    "priceLabel": "$0.65",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-v4-pro",
    "baseName": "DeepSeek: DeepSeek V4 Pro",
    "displayName": "DeepSeek: DeepSeek V4 Pro — $0.65 / 1M mixed",
    "description": "DeepSeek V4 Pro is a large-scale Mixture-of-Experts model from DeepSeek with 1.6T total parameters and 49B activated parameters, supporting a 1M-token context window. It is designed for advanced reasoning, coding,...",
    "created": 1777000679,
    "mixedPricePerMillionUsd": 0.65,
    "priceLabel": "$0.65",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemma-2-27b-it",
    "baseName": "Google: Gemma 2 27B",
    "displayName": "Google: Gemma 2 27B — $0.65 / 1M mixed",
    "description": "Gemma 2 27B by Google is an open model built from the same research and technology used to create the [Gemini models](/models?q=gemini). Gemma models are well-suited for a variety of...",
    "created": 1720828800,
    "mixedPricePerMillionUsd": 0.65,
    "priceLabel": "$0.65",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "minimax/minimax-m2.5",
    "baseName": "MiniMax: MiniMax M2.5",
    "displayName": "MiniMax: MiniMax M2.5 — $0.65 / 1M mixed",
    "description": "MiniMax-M2.5 is a SOTA large language model designed for real-world productivity. Trained in a diverse range of complex real-world digital working environments, M2.5 builds upon the coding expertise of M2.1...",
    "created": 1770908502,
    "mixedPricePerMillionUsd": 0.65,
    "priceLabel": "$0.65",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "minimax/minimax-01",
    "baseName": "MiniMax: MiniMax-01",
    "displayName": "MiniMax: MiniMax-01 — $0.65 / 1M mixed",
    "description": "MiniMax-01 is a combines MiniMax-Text-01 for text generation and MiniMax-VL-01 for image understanding. It has 456 billion parameters, with 45.9 billion parameters activated per inference, and can handle a context...",
    "created": 1736915462,
    "mixedPricePerMillionUsd": 0.65,
    "priceLabel": "$0.65",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "prime-intellect/intellect-3",
    "baseName": "Prime Intellect: INTELLECT-3",
    "displayName": "Prime Intellect: INTELLECT-3 — $0.65 / 1M mixed",
    "description": "INTELLECT-3 is a 106B-parameter Mixture-of-Experts model (12B active) post-trained from GLM-4.5-Air-Base using supervised fine-tuning (SFT) followed by large-scale reinforcement learning (RL). It offers state-of-the-art performance for its size across math,...",
    "created": 1764212534,
    "mixedPricePerMillionUsd": 0.65,
    "priceLabel": "$0.65",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "xiaomi/mimo-v2.5-pro",
    "baseName": "Xiaomi: MiMo-V2.5-Pro",
    "displayName": "Xiaomi: MiMo-V2.5-Pro — $0.65 / 1M mixed",
    "description": "MiMo-V2.5-Pro is Xiaomi’s flagship model, delivering strong performance in general agentic capabilities, complex software engineering, and long-horizon tasks, with top rankings on benchmarks such as ClawEval, GDPVal, and SWE-bench Pro....",
    "created": 1776874273,
    "mixedPricePerMillionUsd": 0.65,
    "priceLabel": "$0.65",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.6-flash",
    "baseName": "Qwen: Qwen3.6 Flash",
    "displayName": "Qwen: Qwen3.6 Flash — $0.66 / 1M mixed",
    "description": "Qwen3.6 Flash is a fast, efficient language model from Alibaba's Qwen 3.6 series. It supports text, image, and video input with a 1M token context window. Tiered pricing kicks in...",
    "created": 1777261362,
    "mixedPricePerMillionUsd": 0.66,
    "priceLabel": "$0.66",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "thedrummer/skyfall-36b-v2",
    "baseName": "TheDrummer: Skyfall 36B V2",
    "displayName": "TheDrummer: Skyfall 36B V2 — $0.68 / 1M mixed",
    "description": "Skyfall 36B v2 is an enhanced iteration of Mistral Small 2501, specifically fine-tuned for improved creativity, nuanced writing, role-playing, and coherent storytelling.",
    "created": 1741636566,
    "mixedPricePerMillionUsd": 0.68,
    "priceLabel": "$0.68",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "baidu/ernie-4.5-300b-a47b",
    "baseName": "Baidu: ERNIE 4.5 300B A47B ",
    "displayName": "Baidu: ERNIE 4.5 300B A47B  — $0.69 / 1M mixed",
    "description": "ERNIE-4.5-300B-A47B is a 300B parameter Mixture-of-Experts (MoE) language model developed by Baidu as part of the ERNIE 4.5 series. It activates 47B parameters per token and supports text generation in...",
    "created": 1751300139,
    "mixedPricePerMillionUsd": 0.69,
    "priceLabel": "$0.69",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "sao10k/l3.3-euryale-70b",
    "baseName": "Sao10K: Llama 3.3 Euryale 70B",
    "displayName": "Sao10K: Llama 3.3 Euryale 70B — $0.70 / 1M mixed",
    "description": "Euryale L3.3 70B is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B v2.2](/models/sao10k/l3-euryale-70b).",
    "created": 1734535928,
    "mixedPricePerMillionUsd": 0.7,
    "priceLabel": "$0.70",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.4-nano",
    "baseName": "OpenAI: GPT-5.4 Nano",
    "displayName": "OpenAI: GPT-5.4 Nano — $0.73 / 1M mixed",
    "description": "GPT-5.4 nano is the most lightweight and cost-efficient variant of the GPT-5.4 family, optimized for speed-critical and high-volume tasks. It supports text and image inputs and is designed for low-latency...",
    "created": 1773748187,
    "mixedPricePerMillionUsd": 0.73,
    "priceLabel": "$0.73",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "minimax/minimax-m2.7",
    "baseName": "MiniMax: MiniMax M2.7",
    "displayName": "MiniMax: MiniMax M2.7 — $0.74 / 1M mixed",
    "description": "MiniMax-M2.7 is a next-generation large language model designed for autonomous, real-world productivity and continuous improvement. Built to actively participate in its own evolution, M2.7 integrates advanced agentic capabilities through multi-agent...",
    "created": 1773836697,
    "mixedPricePerMillionUsd": 0.74,
    "priceLabel": "$0.74",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-vl-8b-thinking",
    "baseName": "Qwen: Qwen3 VL 8B Thinking",
    "displayName": "Qwen: Qwen3 VL 8B Thinking — $0.74 / 1M mixed",
    "description": "Qwen3-VL-8B-Thinking is the reasoning-optimized variant of the Qwen3-VL-8B multimodal model, designed for advanced visual and textual reasoning across complex scenes, documents, and temporal sequences. It integrates enhanced multimodal alignment and...",
    "created": 1760463746,
    "mixedPricePerMillionUsd": 0.74,
    "priceLabel": "$0.74",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-3-haiku",
    "baseName": "Anthropic: Claude 3 Haiku",
    "displayName": "Anthropic: Claude 3 Haiku — $0.75 / 1M mixed",
    "description": "Claude 3 Haiku is Anthropic's fastest and most compact model for\nnear-instant responsiveness. Quick and accurate targeted performance.\n\nSee the launch announcement and benchmark results [here](https://www.anthropic.com/news/claude-3-haiku)\n\n#multimodal",
    "created": 1710288000,
    "mixedPricePerMillionUsd": 0.75,
    "priceLabel": "$0.75",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-r1-distill-llama-70b",
    "baseName": "DeepSeek: R1 Distill Llama 70B",
    "displayName": "DeepSeek: R1 Distill Llama 70B — $0.75 / 1M mixed",
    "description": "DeepSeek R1 Distill Llama 70B is a distilled large language model based on [Llama-3.3-70B-Instruct](/meta-llama/llama-3.3-70b-instruct), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). The model combines advanced distillation techniques to achieve high performance across...",
    "created": 1737663169,
    "mixedPricePerMillionUsd": 0.75,
    "priceLabel": "$0.75",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "kwaipilot/kat-coder-pro-v2",
    "baseName": "Kwaipilot: KAT-Coder-Pro V2",
    "displayName": "Kwaipilot: KAT-Coder-Pro V2 — $0.75 / 1M mixed",
    "description": "KAT-Coder-Pro V2 is the latest high-performance model in KwaiKAT’s KAT-Coder series, designed for complex enterprise-grade software engineering and SaaS integration. It builds on the agentic coding strengths of earlier versions,...",
    "created": 1774649310,
    "mixedPricePerMillionUsd": 0.75,
    "priceLabel": "$0.75",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "minimax/minimax-m2-her",
    "baseName": "MiniMax: MiniMax M2-her",
    "displayName": "MiniMax: MiniMax M2-her — $0.75 / 1M mixed",
    "description": "MiniMax M2-her is a dialogue-first large language model built for immersive roleplay, character-driven chat, and expressive multi-turn conversations. Designed to stay consistent in tone and personality, it supports rich message...",
    "created": 1769177239,
    "mixedPricePerMillionUsd": 0.75,
    "priceLabel": "$0.75",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-235b-a22b-thinking-2507",
    "baseName": "Qwen: Qwen3 235B A22B Thinking 2507",
    "displayName": "Qwen: Qwen3 235B A22B Thinking 2507 — $0.82 / 1M mixed",
    "description": "Qwen3-235B-A22B-Thinking-2507 is a high-performance, open-weight Mixture-of-Experts (MoE) language model optimized for complex reasoning tasks. It activates 22B of its 235B parameters per forward pass and natively supports up to 262,144...",
    "created": 1753449557,
    "mixedPricePerMillionUsd": 0.82,
    "priceLabel": "$0.82",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "perceptron/perceptron-mk1",
    "baseName": "Perceptron: Perceptron Mk1",
    "displayName": "Perceptron: Perceptron Mk1 — $0.83 / 1M mixed",
    "description": "Perceptron Mk1 (Mark One) is Perceptron's highest-quality vision-language model for video and embodied reasoning.** It accepts image and video inputs paired with natural language queries, and produces detailed visual understanding...",
    "created": 1778597029,
    "mixedPricePerMillionUsd": 0.83,
    "priceLabel": "$0.83",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen-2.5-coder-32b-instruct",
    "baseName": "Qwen2.5 Coder 32B Instruct",
    "displayName": "Qwen2.5 Coder 32B Instruct — $0.83 / 1M mixed",
    "description": "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models (formerly known as CodeQwen). Qwen2.5-Coder brings the following improvements upon CodeQwen1.5: - Significantly improvements in **code generation**, **code reasoning**...",
    "created": 1731368400,
    "mixedPricePerMillionUsd": 0.83,
    "priceLabel": "$0.83",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "baidu/ernie-4.5-vl-424b-a47b",
    "baseName": "Baidu: ERNIE 4.5 VL 424B A47B ",
    "displayName": "Baidu: ERNIE 4.5 VL 424B A47B  — $0.84 / 1M mixed",
    "description": "ERNIE-4.5-VL-424B-A47B is a multimodal Mixture-of-Experts (MoE) model from Baidu’s ERNIE 4.5 series, featuring 424B total parameters with 47B active per token. It is trained jointly on text and image data...",
    "created": 1751300903,
    "mixedPricePerMillionUsd": 0.84,
    "priceLabel": "$0.84",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-vl-30b-a3b-thinking",
    "baseName": "Qwen: Qwen3 VL 30B A3B Thinking",
    "displayName": "Qwen: Qwen3 VL 30B A3B Thinking — $0.85 / 1M mixed",
    "description": "Qwen3-VL-30B-A3B-Thinking is a multimodal model that unifies strong text generation with visual understanding for images and videos. Its Thinking variant enhances reasoning in STEM, math, and complex tasks. It excels...",
    "created": 1759794479,
    "mixedPricePerMillionUsd": 0.85,
    "priceLabel": "$0.85",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "sao10k/l3.1-euryale-70b",
    "baseName": "Sao10K: Llama 3.1 Euryale 70B v2.2",
    "displayName": "Sao10K: Llama 3.1 Euryale 70B v2.2 — $0.85 / 1M mixed",
    "description": "Euryale L3.1 70B v2.2 is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B v2.1](/models/sao10k/l3-euryale-70b).",
    "created": 1724803200,
    "mixedPricePerMillionUsd": 0.85,
    "priceLabel": "$0.85",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-3.1-flash-lite",
    "baseName": "Google: Gemini 3.1 Flash Lite",
    "displayName": "Google: Gemini 3.1 Flash Lite — $0.88 / 1M mixed",
    "description": "Gemini 3.1 Flash Lite is Google’s GA high-efficiency multimodal model optimized for low-latency, high-volume workloads. It supports text, image, video, audio, and PDF inputs, and is designed for lightweight agentic...",
    "created": 1778168828,
    "mixedPricePerMillionUsd": 0.88,
    "priceLabel": "$0.88",
    "inputModalities": [
      "text",
      "image",
      "video",
      "file",
      "audio"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-3.1-flash-lite-preview",
    "baseName": "Google: Gemini 3.1 Flash Lite Preview",
    "displayName": "Google: Gemini 3.1 Flash Lite Preview — $0.88 / 1M mixed",
    "description": "Gemini 3.1 Flash Lite Preview is Google's high-efficiency model optimized for high-volume use cases. It outperforms Gemini 2.5 Flash Lite on overall quality and approaches Gemini 2.5 Flash performance across...",
    "created": 1772512673,
    "mixedPricePerMillionUsd": 0.88,
    "priceLabel": "$0.88",
    "inputModalities": [
      "text",
      "image",
      "video",
      "file",
      "audio"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mancer/weaver",
    "baseName": "Mancer: Weaver (alpha)",
    "displayName": "Mancer: Weaver (alpha) — $0.88 / 1M mixed",
    "description": "An attempt to recreate Claude-style verbosity, but don't expect the same level of coherence or memory. Meant for use in roleplay/narrative situations.",
    "created": 1690934400,
    "mixedPricePerMillionUsd": 0.88,
    "priceLabel": "$0.88",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.5-27b",
    "baseName": "Qwen: Qwen3.5-27B",
    "displayName": "Qwen: Qwen3.5-27B — $0.88 / 1M mixed",
    "description": "The Qwen3.5 27B native vision-language Dense model incorporates a linear attention mechanism, delivering fast response times while balancing inference speed and performance. Its overall capabilities are comparable to those of...",
    "created": 1772053810,
    "mixedPricePerMillionUsd": 0.88,
    "priceLabel": "$0.88",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.5-plus-02-15",
    "baseName": "Qwen: Qwen3.5 Plus 2026-02-15",
    "displayName": "Qwen: Qwen3.5 Plus 2026-02-15 — $0.91 / 1M mixed",
    "description": "The Qwen3.5 native vision-language series Plus models are built on a hybrid architecture that integrates linear attention mechanisms with sparse mixture-of-experts models, achieving higher inference efficiency. In a variety of...",
    "created": 1771229416,
    "mixedPricePerMillionUsd": 0.91,
    "priceLabel": "$0.91",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "arcee-ai/virtuoso-large",
    "baseName": "Arcee AI: Virtuoso Large",
    "displayName": "Arcee AI: Virtuoso Large — $0.98 / 1M mixed",
    "description": "Virtuoso‑Large is Arcee's top‑tier general‑purpose LLM at 72 B parameters, tuned to tackle cross‑domain reasoning, creative writing and enterprise QA. Unlike many 70 B peers, it retains the 128 k...",
    "created": 1746478885,
    "mixedPricePerMillionUsd": 0.98,
    "priceLabel": "$0.98",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "alfredpros/codellama-7b-instruct-solidity",
    "baseName": "AlfredPros: CodeLLaMa 7B Instruct Solidity",
    "displayName": "AlfredPros: CodeLLaMa 7B Instruct Solidity — $1.00 / 1M mixed",
    "description": "A finetuned 7 billion parameters Code LLaMA - Instruct model to generate Solidity smart contract using 4-bit QLoRA finetuning provided by PEFT library.",
    "created": 1744641874,
    "mixedPricePerMillionUsd": 1,
    "priceLabel": "$1.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-large-2512",
    "baseName": "Mistral: Mistral Large 3 2512",
    "displayName": "Mistral: Mistral Large 3 2512 — $1.00 / 1M mixed",
    "description": "Mistral Large 3 2512 is Mistral’s most capable model to date, featuring a sparse mixture-of-experts architecture with 41B active parameters (675B total), and released under the Apache 2.0 license.",
    "created": 1764624472,
    "mixedPricePerMillionUsd": 1,
    "priceLabel": "$1.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "morph/morph-v3-fast",
    "baseName": "Morph: Morph V3 Fast",
    "displayName": "Morph: Morph V3 Fast — $1.00 / 1M mixed",
    "description": "Morph's fastest apply model for code edits. ~10,500 tokens/sec with 96% accuracy for rapid code transformations. The model requires the prompt to be in the following format: <instruction>{instruction}</instruction> <code>{initial_code}</code> <update>{edit_snippet}</update>...",
    "created": 1751910002,
    "mixedPricePerMillionUsd": 1,
    "priceLabel": "$1.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nousresearch/hermes-3-llama-3.1-405b",
    "baseName": "Nous: Hermes 3 405B Instruct",
    "displayName": "Nous: Hermes 3 405B Instruct — $1.00 / 1M mixed",
    "description": "Hermes 3 is a generalist language model with many improvements over Hermes 2, including advanced agentic capabilities, much better roleplaying, reasoning, multi-turn conversation, long context coherence, and improvements across the...",
    "created": 1723766400,
    "mixedPricePerMillionUsd": 1,
    "priceLabel": "$1.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-3.5-turbo",
    "baseName": "OpenAI: GPT-3.5 Turbo",
    "displayName": "OpenAI: GPT-3.5 Turbo — $1.00 / 1M mixed",
    "description": "GPT-3.5 Turbo is OpenAI's fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.\n\nTraining data up to Sep 2021.",
    "created": 1685232000,
    "mixedPricePerMillionUsd": 1,
    "priceLabel": "$1.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4.1-mini",
    "baseName": "OpenAI: GPT-4.1 Mini",
    "displayName": "OpenAI: GPT-4.1 Mini — $1.00 / 1M mixed",
    "description": "GPT-4.1 Mini is a mid-sized model delivering performance competitive with GPT-4o at substantially lower latency and cost. It retains a 1 million token context window and scores 45.1% on hard...",
    "created": 1744651381,
    "mixedPricePerMillionUsd": 1,
    "priceLabel": "$1.00",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "perplexity/sonar",
    "baseName": "Perplexity: Sonar",
    "displayName": "Perplexity: Sonar — $1.00 / 1M mixed",
    "description": "Sonar is lightweight, affordable, fast, and simple to use — now featuring citations and the ability to customize sources. It is designed for companies seeking to integrate lightweight question-and-answer features...",
    "created": 1738013808,
    "mixedPricePerMillionUsd": 1,
    "priceLabel": "$1.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-coder",
    "baseName": "Qwen: Qwen3 Coder 480B A35B",
    "displayName": "Qwen: Qwen3 Coder 480B A35B — $1.01 / 1M mixed",
    "description": "Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic coding tasks such as function calling, tool use, and long-context reasoning over...",
    "created": 1753230546,
    "mixedPricePerMillionUsd": 1.01,
    "priceLabel": "$1.01",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "aion-labs/aion-1.0-mini",
    "baseName": "AionLabs: Aion-1.0-Mini",
    "displayName": "AionLabs: Aion-1.0-Mini — $1.05 / 1M mixed",
    "description": "Aion-1.0-Mini 32B parameter model is a distilled version of the DeepSeek-R1 model, designed for strong performance in reasoning domains such as mathematics, coding, and logic. It is a modified variant...",
    "created": 1738697107,
    "mixedPricePerMillionUsd": 1.05,
    "priceLabel": "$1.05",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.5-plus-20260420",
    "baseName": "Qwen: Qwen3.5 Plus 2026-04-20",
    "displayName": "Qwen: Qwen3.5 Plus 2026-04-20 — $1.05 / 1M mixed",
    "description": "Qwen3.5 Plus (April 2026) is a large-scale multimodal language model from Alibaba. It accepts text, image, and video input and produces text output, with a 1M token context window. This...",
    "created": 1777261368,
    "mixedPricePerMillionUsd": 1.05,
    "priceLabel": "$1.05",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "relace/relace-apply-3",
    "baseName": "Relace: Relace Apply 3",
    "displayName": "Relace: Relace Apply 3 — $1.05 / 1M mixed",
    "description": "Relace Apply 3 is a specialized code-patching LLM that merges AI-suggested edits straight into your source files. It can apply updates from GPT-4o, Claude, and others into your files at...",
    "created": 1758891572,
    "mixedPricePerMillionUsd": 1.05,
    "priceLabel": "$1.05",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-4.7",
    "baseName": "Z.ai: GLM 4.7",
    "displayName": "Z.ai: GLM 4.7 — $1.08 / 1M mixed",
    "description": "GLM-4.7 is Z.ai’s latest flagship model, featuring upgrades in two key areas: enhanced programming capabilities and more stable multi-step reasoning/execution. It demonstrates significant improvements in executing complex agent tasks while...",
    "created": 1766378014,
    "mixedPricePerMillionUsd": 1.08,
    "priceLabel": "$1.08",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-4.6",
    "baseName": "Z.ai: GLM 4.6",
    "displayName": "Z.ai: GLM 4.6 — $1.09 / 1M mixed",
    "description": "Compared with GLM-4.5, this generation brings several key improvements: Longer context window: The context window has been expanded from 128K to 200K tokens, enabling the model to handle more complex...",
    "created": 1759235576,
    "mixedPricePerMillionUsd": 1.09,
    "priceLabel": "$1.09",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "bytedance-seed/seed-1.6",
    "baseName": "ByteDance Seed: Seed 1.6",
    "displayName": "ByteDance Seed: Seed 1.6 — $1.13 / 1M mixed",
    "description": "Seed 1.6 is a general-purpose model released by the ByteDance Seed team. It incorporates multimodal capabilities and adaptive deep thinking with a 256K context window.",
    "created": 1766504997,
    "mixedPricePerMillionUsd": 1.13,
    "priceLabel": "$1.13",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "bytedance-seed/seed-2.0-lite",
    "baseName": "ByteDance Seed: Seed-2.0-Lite",
    "displayName": "ByteDance Seed: Seed-2.0-Lite — $1.13 / 1M mixed",
    "description": "Seed-2.0-Lite is a versatile, cost‑efficient enterprise workhorse that delivers strong multimodal and agent capabilities while offering noticeably lower latency, making it a practical default choice for most production workloads across...",
    "created": 1773157231,
    "mixedPricePerMillionUsd": 1.13,
    "priceLabel": "$1.13",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5-mini",
    "baseName": "OpenAI: GPT-5 Mini",
    "displayName": "OpenAI: GPT-5 Mini — $1.13 / 1M mixed",
    "description": "GPT-5 Mini is a compact version of GPT-5, designed to handle lighter-weight reasoning tasks. It provides the same instruction-following and safety-tuning benefits as GPT-5, but with reduced latency and cost....",
    "created": 1754587407,
    "mixedPricePerMillionUsd": 1.13,
    "priceLabel": "$1.13",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.1-codex-mini",
    "baseName": "OpenAI: GPT-5.1-Codex-Mini",
    "displayName": "OpenAI: GPT-5.1-Codex-Mini — $1.13 / 1M mixed",
    "description": "GPT-5.1-Codex-Mini is a smaller and faster version of GPT-5.1-Codex",
    "created": 1763057820,
    "mixedPricePerMillionUsd": 1.13,
    "priceLabel": "$1.13",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-235b-a22b",
    "baseName": "Qwen: Qwen3 235B A22B",
    "displayName": "Qwen: Qwen3 235B A22B — $1.14 / 1M mixed",
    "description": "Qwen3-235B-A22B is a 235B parameter mixture-of-experts (MoE) model developed by Qwen, activating 22B parameters per forward pass. It supports seamless switching between a \"thinking\" mode for complex reasoning, math, and...",
    "created": 1745875757,
    "mixedPricePerMillionUsd": 1.14,
    "priceLabel": "$1.14",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.6-plus",
    "baseName": "Qwen: Qwen3.6 Plus",
    "displayName": "Qwen: Qwen3.6 Plus — $1.14 / 1M mixed",
    "description": "Qwen 3.6 Plus builds on a hybrid architecture that combines efficient linear attention with sparse mixture-of-experts routing, enabling strong scalability and high-performance inference. Compared to the 3.5 series, it delivers...",
    "created": 1775133557,
    "mixedPricePerMillionUsd": 1.14,
    "priceLabel": "$1.14",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "moonshotai/kimi-k2.5",
    "baseName": "MoonshotAI: Kimi K2.5",
    "displayName": "MoonshotAI: Kimi K2.5 — $1.15 / 1M mixed",
    "description": "Kimi K2.5 is Moonshot AI's native multimodal model, delivering state-of-the-art visual coding capability and a self-directed agent swarm paradigm. Built on Kimi K2 with continued pretraining over approximately 15T mixed...",
    "created": 1769487076,
    "mixedPricePerMillionUsd": 1.15,
    "priceLabel": "$1.15",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.5-122b-a10b",
    "baseName": "Qwen: Qwen3.5-122B-A10B",
    "displayName": "Qwen: Qwen3.5-122B-A10B — $1.17 / 1M mixed",
    "description": "The Qwen3.5 122B-A10B native vision-language model is built on a hybrid architecture that integrates a linear attention mechanism with a sparse mixture-of-experts model, achieving higher inference efficiency. In terms of...",
    "created": 1772053789,
    "mixedPricePerMillionUsd": 1.17,
    "priceLabel": "$1.17",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "aion-labs/aion-2.0",
    "baseName": "AionLabs: Aion-2.0",
    "displayName": "AionLabs: Aion-2.0 — $1.20 / 1M mixed",
    "description": "Aion-2.0 is a variant of DeepSeek V3.2 optimized for immersive roleplaying and storytelling. It is particularly strong at introducing tension, crises, and conflict into stories, making narratives feel more engaging....",
    "created": 1771881306,
    "mixedPricePerMillionUsd": 1.2,
    "priceLabel": "$1.20",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "aion-labs/aion-rp-llama-3.1-8b",
    "baseName": "AionLabs: Aion-RP 1.0 (8B)",
    "displayName": "AionLabs: Aion-RP 1.0 (8B) — $1.20 / 1M mixed",
    "description": "Aion-RP-Llama-3.1-8B ranks the highest in the character evaluation portion of the RPBench-Auto benchmark, a roleplaying-specific variant of Arena-Hard-Auto, where LLMs evaluate each other’s responses. It is a fine-tuned base model...",
    "created": 1738696718,
    "mixedPricePerMillionUsd": 1.2,
    "priceLabel": "$1.20",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/devstral-2512",
    "baseName": "Mistral: Devstral 2 2512",
    "displayName": "Mistral: Devstral 2 2512 — $1.20 / 1M mixed",
    "description": "Devstral 2 is a state-of-the-art open-source model by Mistral AI specializing in agentic coding. It is a 123B-parameter dense transformer model supporting a 256K context window. Devstral 2 supports exploring...",
    "created": 1765285419,
    "mixedPricePerMillionUsd": 1.2,
    "priceLabel": "$1.20",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/devstral-medium",
    "baseName": "Mistral: Devstral Medium",
    "displayName": "Mistral: Devstral Medium — $1.20 / 1M mixed",
    "description": "Devstral Medium is a high-performance code generation and agentic reasoning model developed jointly by Mistral AI and All Hands AI. Positioned as a step up from Devstral Small, it achieves...",
    "created": 1752161321,
    "mixedPricePerMillionUsd": 1.2,
    "priceLabel": "$1.20",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-medium-3",
    "baseName": "Mistral: Mistral Medium 3",
    "displayName": "Mistral: Mistral Medium 3 — $1.20 / 1M mixed",
    "description": "Mistral Medium 3 is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly reduced operational cost. It balances state-of-the-art reasoning and multimodal performance with 8× lower cost...",
    "created": 1746627341,
    "mixedPricePerMillionUsd": 1.2,
    "priceLabel": "$1.20",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-medium-3.1",
    "baseName": "Mistral: Mistral Medium 3.1",
    "displayName": "Mistral: Mistral Medium 3.1 — $1.20 / 1M mixed",
    "description": "Mistral Medium 3.1 is an updated version of Mistral Medium 3, which is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly reduced operational cost. It balances...",
    "created": 1755095639,
    "mixedPricePerMillionUsd": 1.2,
    "priceLabel": "$1.20",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "xiaomi/mimo-v2-omni",
    "baseName": "Xiaomi: MiMo-V2-Omni",
    "displayName": "Xiaomi: MiMo-V2-Omni — $1.20 / 1M mixed",
    "description": "MiMo-V2-Omni is a frontier omni-modal model that natively processes image, video, and audio inputs within a unified architecture. It combines strong multimodal perception with agentic capability - visual grounding, multi-step...",
    "created": 1773863703,
    "mixedPricePerMillionUsd": 1.2,
    "priceLabel": "$1.20",
    "inputModalities": [
      "text",
      "audio",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-4.5v",
    "baseName": "Z.ai: GLM 4.5V",
    "displayName": "Z.ai: GLM 4.5V — $1.20 / 1M mixed",
    "description": "GLM-4.5V is a vision-language foundation model for multimodal agent applications. Built on a Mixture-of-Experts (MoE) architecture with 106B parameters and 12B activated parameters, it achieves state-of-the-art results in video understanding,...",
    "created": 1754922288,
    "mixedPricePerMillionUsd": 1.2,
    "priceLabel": "$1.20",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepcogito/cogito-v2.1-671b",
    "baseName": "Deep Cogito: Cogito v2.1 671B",
    "displayName": "Deep Cogito: Cogito v2.1 671B — $1.25 / 1M mixed",
    "description": "Cogito v2.1 671B MoE represents one of the strongest open models globally, matching performance of frontier closed and open models. This model is trained using self play with reinforcement learning...",
    "created": 1763071233,
    "mixedPricePerMillionUsd": 1.25,
    "priceLabel": "$1.25",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-5",
    "baseName": "Z.ai: GLM 5",
    "displayName": "Z.ai: GLM 5 — $1.26 / 1M mixed",
    "description": "GLM-5 is Z.ai’s flagship open-source foundation model engineered for complex systems design and long-horizon agent workflows. Built for expert developers, it delivers production-grade performance on large-scale programming tasks, rivaling leading...",
    "created": 1770829182,
    "mixedPricePerMillionUsd": 1.26,
    "priceLabel": "$1.26",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "minimax/minimax-m1",
    "baseName": "MiniMax: MiniMax M1",
    "displayName": "MiniMax: MiniMax M1 — $1.30 / 1M mixed",
    "description": "MiniMax-M1 is a large-scale, open-weight reasoning model designed for extended context and high-efficiency inference. It leverages a hybrid Mixture-of-Experts (MoE) architecture paired with a custom \"lightning attention\" mechanism, allowing it...",
    "created": 1750200414,
    "mixedPricePerMillionUsd": 1.3,
    "priceLabel": "$1.30",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-r1-0528",
    "baseName": "DeepSeek: R1 0528",
    "displayName": "DeepSeek: R1 0528 — $1.33 / 1M mixed",
    "description": "May 28th update to the [original DeepSeek R1](/deepseek/deepseek-r1) Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active...",
    "created": 1748455170,
    "mixedPricePerMillionUsd": 1.33,
    "priceLabel": "$1.33",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.5-397b-a17b",
    "baseName": "Qwen: Qwen3.5 397B A17B",
    "displayName": "Qwen: Qwen3.5 397B A17B — $1.37 / 1M mixed",
    "description": "The Qwen3.5 series 397B-A17B native vision-language model is built on a hybrid architecture that integrates a linear attention mechanism with a sparse mixture-of-experts model, achieving higher inference efficiency. It delivers...",
    "created": 1771223018,
    "mixedPricePerMillionUsd": 1.37,
    "priceLabel": "$1.37",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "amazon/nova-2-lite-v1",
    "baseName": "Amazon: Nova 2 Lite",
    "displayName": "Amazon: Nova 2 Lite — $1.40 / 1M mixed",
    "description": "Nova 2 Lite is a fast, cost-effective reasoning model for everyday workloads that can process text, images, and videos to generate text. Nova 2 Lite demonstrates standout capabilities in processing...",
    "created": 1764696672,
    "mixedPricePerMillionUsd": 1.4,
    "priceLabel": "$1.40",
    "inputModalities": [
      "text",
      "image",
      "video",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.5-flash",
    "baseName": "Google: Gemini 2.5 Flash",
    "displayName": "Google: Gemini 2.5 Flash — $1.40 / 1M mixed",
    "description": "Gemini 2.5 Flash is Google's state-of-the-art workhorse model, specifically designed for advanced reasoning, coding, mathematics, and scientific tasks. It includes built-in \"thinking\" capabilities, enabling it to provide responses with greater...",
    "created": 1750172488,
    "mixedPricePerMillionUsd": 1.4,
    "priceLabel": "$1.40",
    "inputModalities": [
      "file",
      "image",
      "text",
      "audio",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.5-flash-image",
    "baseName": "Google: Nano Banana (Gemini 2.5 Flash Image)",
    "displayName": "Google: Nano Banana (Gemini 2.5 Flash Image) — $1.40 / 1M mixed",
    "description": "Gemini 2.5 Flash Image, a.k.a. \"Nano Banana,\" is now generally available. It is a state of the art image generation model with contextual understanding. It is capable of image generation,...",
    "created": 1759870431,
    "mixedPricePerMillionUsd": 1.4,
    "priceLabel": "$1.40",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "image",
      "text"
    ]
  },
  {
    "id": "morph/morph-v3-large",
    "baseName": "Morph: Morph V3 Large",
    "displayName": "Morph: Morph V3 Large — $1.40 / 1M mixed",
    "description": "Morph's high-accuracy apply model for complex code edits. ~4,500 tokens/sec with 98% accuracy for precise code transformations. The model requires the prompt to be in the following format: <instruction>{instruction}</instruction> <code>{initial_code}</code>...",
    "created": 1751910858,
    "mixedPricePerMillionUsd": 1.4,
    "priceLabel": "$1.40",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-4.5",
    "baseName": "Z.ai: GLM 4.5",
    "displayName": "Z.ai: GLM 4.5 — $1.40 / 1M mixed",
    "description": "GLM-4.5 is our latest flagship foundation model, purpose-built for agent-based applications. It leverages a Mixture-of-Experts (MoE) architecture and supports a context length of up to 128k tokens. GLM-4.5 delivers significantly...",
    "created": 1753471347,
    "mixedPricePerMillionUsd": 1.4,
    "priceLabel": "$1.40",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-vl-235b-a22b-thinking",
    "baseName": "Qwen: Qwen3 VL 235B A22B Thinking",
    "displayName": "Qwen: Qwen3 VL 235B A22B Thinking — $1.43 / 1M mixed",
    "description": "Qwen3-VL-235B-A22B Thinking is a multimodal model that unifies strong text generation with visual understanding across images and video. The Thinking model is optimized for multimodal reasoning in STEM and math....",
    "created": 1758668690,
    "mixedPricePerMillionUsd": 1.43,
    "priceLabel": "$1.43",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "moonshotai/kimi-k2",
    "baseName": "MoonshotAI: Kimi K2 0711",
    "displayName": "MoonshotAI: Kimi K2 0711 — $1.44 / 1M mixed",
    "description": "Kimi K2 Instruct is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It is optimized for...",
    "created": 1752263252,
    "mixedPricePerMillionUsd": 1.44,
    "priceLabel": "$1.44",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "sao10k/l3-euryale-70b",
    "baseName": "Sao10k: Llama 3 Euryale 70B v2.1",
    "displayName": "Sao10k: Llama 3 Euryale 70B v2.1 — $1.48 / 1M mixed",
    "description": "Euryale 70B v2.1 is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). - Better prompt adherence. - Better anatomy / spatial awareness. - Adapts much better to unique and custom...",
    "created": 1718668800,
    "mixedPricePerMillionUsd": 1.48,
    "priceLabel": "$1.48",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-audio-mini",
    "baseName": "OpenAI: GPT Audio Mini",
    "displayName": "OpenAI: GPT Audio Mini — $1.50 / 1M mixed",
    "description": "A cost-efficient version of GPT Audio. The new snapshot features an upgraded decoder for more natural sounding voices and maintains better voice consistency. Input is priced at $0.60 per million...",
    "created": 1768859419,
    "mixedPricePerMillionUsd": 1.5,
    "priceLabel": "$1.50",
    "inputModalities": [
      "text",
      "audio"
    ],
    "outputModalities": [
      "text",
      "audio"
    ]
  },
  {
    "id": "openai/gpt-3.5-turbo-0613",
    "baseName": "OpenAI: GPT-3.5 Turbo (older v0613)",
    "displayName": "OpenAI: GPT-3.5 Turbo (older v0613) — $1.50 / 1M mixed",
    "description": "GPT-3.5 Turbo is OpenAI's fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional completion tasks.\n\nTraining data up to Sep 2021.",
    "created": 1706140800,
    "mixedPricePerMillionUsd": 1.5,
    "priceLabel": "$1.50",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "x-ai/grok-build-0.1",
    "baseName": "xAI: Grok Build 0.1",
    "displayName": "xAI: Grok Build 0.1 — $1.50 / 1M mixed",
    "description": "Grok Build 0.1 is xAI’s fast coding model trained specifically for agentic software engineering workflows. It supports text and image inputs with text output, and is optimized for interactive coding...",
    "created": 1779298123,
    "mixedPricePerMillionUsd": 1.5,
    "priceLabel": "$1.50",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "moonshotai/kimi-k2-0905",
    "baseName": "MoonshotAI: Kimi K2 0905",
    "displayName": "MoonshotAI: Kimi K2 0905 — $1.55 / 1M mixed",
    "description": "Kimi K2 0905 is the September update of [Kimi K2 0711](moonshotai/kimi-k2). It is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32...",
    "created": 1757021147,
    "mixedPricePerMillionUsd": 1.55,
    "priceLabel": "$1.55",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "moonshotai/kimi-k2-thinking",
    "baseName": "MoonshotAI: Kimi K2 Thinking",
    "displayName": "MoonshotAI: Kimi K2 Thinking — $1.55 / 1M mixed",
    "description": "Kimi K2 Thinking is Moonshot AI’s most advanced open reasoning model to date, extending the K2 series into agentic, long-horizon reasoning. Built on the trillion-parameter Mixture-of-Experts (MoE) architecture introduced in...",
    "created": 1762440622,
    "mixedPricePerMillionUsd": 1.55,
    "priceLabel": "$1.55",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "deepseek/deepseek-r1",
    "baseName": "DeepSeek: R1",
    "displayName": "DeepSeek: R1 — $1.60 / 1M mixed",
    "description": "DeepSeek R1 is here: Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass....",
    "created": 1737381095,
    "mixedPricePerMillionUsd": 1.6,
    "priceLabel": "$1.60",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-3-flash-preview",
    "baseName": "Google: Gemini 3 Flash Preview",
    "displayName": "Google: Gemini 3 Flash Preview — $1.75 / 1M mixed",
    "description": "Gemini 3 Flash Preview is a high speed, high value thinking model designed for agentic workflows, multi turn chat, and coding assistance. It delivers near Pro level reasoning and tool...",
    "created": 1765987078,
    "mixedPricePerMillionUsd": 1.75,
    "priceLabel": "$1.75",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-3.1-flash-image-preview",
    "baseName": "Google: Nano Banana 2 (Gemini 3.1 Flash Image Preview)",
    "displayName": "Google: Nano Banana 2 (Gemini 3.1 Flash Image Preview) — $1.75 / 1M mixed",
    "description": "Gemini 3.1 Flash Image Preview, a.k.a. \"Nano Banana 2,\" is Google’s latest state of the art image generation and editing model, delivering Pro-level visual quality at Flash speed. It combines...",
    "created": 1772119558,
    "mixedPricePerMillionUsd": 1.75,
    "priceLabel": "$1.75",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "image",
      "text"
    ]
  },
  {
    "id": "openai/gpt-3.5-turbo-instruct",
    "baseName": "OpenAI: GPT-3.5 Turbo Instruct",
    "displayName": "OpenAI: GPT-3.5 Turbo Instruct — $1.75 / 1M mixed",
    "description": "This model is a variant of GPT-3.5 Turbo tuned for instructional prompts and omitting chat-related optimizations. Training data: up to Sep 2021.",
    "created": 1695859200,
    "mixedPricePerMillionUsd": 1.75,
    "priceLabel": "$1.75",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.6-27b",
    "baseName": "Qwen: Qwen3.6 27B",
    "displayName": "Qwen: Qwen3.6 27B — $1.75 / 1M mixed",
    "description": "Qwen3.6 27B is a dense 27-billion-parameter language model from the Qwen Team at Alibaba, released in April 2026. It features hybrid multimodal capabilities — accepting text, image, and video inputs...",
    "created": 1777255064,
    "mixedPricePerMillionUsd": 1.75,
    "priceLabel": "$1.75",
    "inputModalities": [
      "text",
      "image",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "x-ai/grok-4.20",
    "baseName": "xAI: Grok 4.20",
    "displayName": "xAI: Grok 4.20 — $1.88 / 1M mixed",
    "description": "Grok 4.20 is a reasoning model from xAI with industry-leading speed and agentic tool calling capabilities. It combines the lowest hallucination rate on the market with strict prompt adherance, delivering...",
    "created": 1774979019,
    "mixedPricePerMillionUsd": 1.88,
    "priceLabel": "$1.88",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "x-ai/grok-4.3",
    "baseName": "xAI: Grok 4.3",
    "displayName": "xAI: Grok 4.3 — $1.88 / 1M mixed",
    "description": "Grok 4.3 is a reasoning model from xAI. It accepts text and image inputs with text output, and is suited for agentic workflows, instruction-following tasks, and applications requiring high factual...",
    "created": 1777591821,
    "mixedPricePerMillionUsd": 1.88,
    "priceLabel": "$1.88",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-coder-plus",
    "baseName": "Qwen: Qwen3 Coder Plus",
    "displayName": "Qwen: Qwen3 Coder Plus — $1.95 / 1M mixed",
    "description": "Qwen3 Coder Plus is Alibaba's proprietary version of the Open Source Qwen3 Coder 480B A35B. It is a powerful coding agent model specializing in autonomous programming via tool calling and...",
    "created": 1758662707,
    "mixedPricePerMillionUsd": 1.95,
    "priceLabel": "$1.95",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "amazon/nova-pro-v1",
    "baseName": "Amazon: Nova Pro 1.0",
    "displayName": "Amazon: Nova Pro 1.0 — $2.00 / 1M mixed",
    "description": "Amazon Nova Pro 1.0 is a capable multimodal model from Amazon focused on providing a combination of accuracy, speed, and cost for a wide range of tasks. As of December...",
    "created": 1733436303,
    "mixedPricePerMillionUsd": 2,
    "priceLabel": "$2.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nousresearch/hermes-4-405b",
    "baseName": "Nous: Hermes 4 405B",
    "displayName": "Nous: Hermes 4 405B — $2.00 / 1M mixed",
    "description": "Hermes 4 is a large-scale reasoning model built on Meta-Llama-3.1-405B and released by Nous Research. It introduces a hybrid reasoning mode, where the model can choose to deliberate internally with...",
    "created": 1756235463,
    "mixedPricePerMillionUsd": 2,
    "priceLabel": "$2.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "relace/relace-search",
    "baseName": "Relace: Relace Search",
    "displayName": "Relace: Relace Search — $2.00 / 1M mixed",
    "description": "The relace-search model uses 4-12 `view_file` and `grep` tools in parallel to explore a codebase and return relevant files to the user request. In contrast to RAG, relace-search performs agentic...",
    "created": 1765213560,
    "mixedPricePerMillionUsd": 2,
    "priceLabel": "$2.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "xiaomi/mimo-v2-pro",
    "baseName": "Xiaomi: MiMo-V2-Pro",
    "displayName": "Xiaomi: MiMo-V2-Pro — $2.00 / 1M mixed",
    "description": "MiMo-V2-Pro is Xiaomi's flagship foundation model, featuring over 1T total parameters and a 1M context length, deeply optimized for agentic scenarios. It is highly adaptable to general agent frameworks like...",
    "created": 1773863643,
    "mixedPricePerMillionUsd": 2,
    "priceLabel": "$2.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-5.1",
    "baseName": "Z.ai: GLM 5.1",
    "displayName": "Z.ai: GLM 5.1 — $2.03 / 1M mixed",
    "description": "GLM-5.1 delivers a major leap in coding capability, with particularly significant gains in handling long-horizon tasks. Unlike previous models built around minute-level interactions, GLM-5.1 can work independently and continuously on...",
    "created": 1775578025,
    "mixedPricePerMillionUsd": 2.03,
    "priceLabel": "$2.03",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "arcee-ai/maestro-reasoning",
    "baseName": "Arcee AI: Maestro Reasoning",
    "displayName": "Arcee AI: Maestro Reasoning — $2.10 / 1M mixed",
    "description": "Maestro Reasoning is Arcee's flagship analysis model: a 32 B‑parameter derivative of Qwen 2.5‑32 B tuned with DPO and chain‑of‑thought RL for step‑by‑step logic. Compared to the earlier 7 B...",
    "created": 1746481269,
    "mixedPricePerMillionUsd": 2.1,
    "priceLabel": "$2.10",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "~moonshotai/kimi-latest",
    "baseName": "MoonshotAI Kimi Latest",
    "displayName": "MoonshotAI Kimi Latest — $2.11 / 1M mixed",
    "description": "This model always redirects to the latest model in the MoonshotAI Kimi family.",
    "created": 1777318428,
    "mixedPricePerMillionUsd": 2.11,
    "priceLabel": "$2.11",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "moonshotai/kimi-k2.6",
    "baseName": "MoonshotAI: Kimi K2.6",
    "displayName": "MoonshotAI: Kimi K2.6 — $2.11 / 1M mixed",
    "description": "Kimi K2.6 is Moonshot AI's next-generation multimodal model, designed for long-horizon coding, coding-driven UI/UX generation, and multi-agent orchestration. It handles complex end-to-end coding tasks across Python, Rust, and Go, and...",
    "created": 1776699402,
    "mixedPricePerMillionUsd": 2.11,
    "priceLabel": "$2.11",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "switchpoint/router",
    "baseName": "Switchpoint Router",
    "displayName": "Switchpoint Router — $2.13 / 1M mixed",
    "description": "Switchpoint AI's router instantly analyzes your request and directs it to the optimal AI from an ever-evolving library. As the world of LLMs advances, our router gets smarter, ensuring you...",
    "created": 1752272899,
    "mixedPricePerMillionUsd": 2.13,
    "priceLabel": "$2.13",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5-image-mini",
    "baseName": "OpenAI: GPT-5 Image Mini",
    "displayName": "OpenAI: GPT-5 Image Mini — $2.25 / 1M mixed",
    "description": "GPT-5 Image Mini combines OpenAI's advanced language capabilities, powered by [GPT-5 Mini](https://openrouter.ai/openai/gpt-5-mini), with GPT Image 1 Mini for efficient image generation. This natively multimodal model features superior instruction following, text...",
    "created": 1760624583,
    "mixedPricePerMillionUsd": 2.25,
    "priceLabel": "$2.25",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "image",
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-max",
    "baseName": "Qwen: Qwen3 Max",
    "displayName": "Qwen: Qwen3 Max — $2.34 / 1M mixed",
    "description": "Qwen3-Max is an updated release built on the Qwen3 series, offering major improvements in reasoning, instruction following, multilingual support, and long-tail knowledge coverage compared to the January 2025 version. It...",
    "created": 1758662808,
    "mixedPricePerMillionUsd": 2.34,
    "priceLabel": "$2.34",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-max-thinking",
    "baseName": "Qwen: Qwen3 Max Thinking",
    "displayName": "Qwen: Qwen3 Max Thinking — $2.34 / 1M mixed",
    "description": "Qwen3-Max-Thinking is the flagship reasoning model in the Qwen3 series, designed for high-stakes cognitive tasks that require deep, multi-step reasoning. By significantly scaling model capacity and reinforcement learning compute, it...",
    "created": 1770671901,
    "mixedPricePerMillionUsd": 2.34,
    "priceLabel": "$2.34",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-3.5-haiku",
    "baseName": "Anthropic: Claude 3.5 Haiku",
    "displayName": "Anthropic: Claude 3.5 Haiku — $2.40 / 1M mixed",
    "description": "Claude 3.5 Haiku features offers enhanced capabilities in speed, coding accuracy, and tool use. Engineered to excel in real-time applications, it delivers quick response times that are essential for dynamic...",
    "created": 1730678400,
    "mixedPricePerMillionUsd": 2.4,
    "priceLabel": "$2.40",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.7-max",
    "baseName": "Qwen: Qwen3.7 Max",
    "displayName": "Qwen: Qwen3.7 Max — $2.50 / 1M mixed",
    "description": "Qwen3.7-Max is the flagship model in Alibaba's Qwen3.7 series. It supports text input and output and is designed for agent-centric workloads, with particular strengths in coding, office and productivity tasks,...",
    "created": 1779376861,
    "mixedPricePerMillionUsd": 2.5,
    "priceLabel": "$2.50",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-5-turbo",
    "baseName": "Z.ai: GLM 5 Turbo",
    "displayName": "Z.ai: GLM 5 Turbo — $2.60 / 1M mixed",
    "description": "GLM-5 Turbo is a new model from Z.ai designed for fast inference and strong performance in agent-driven environments such as OpenClaw scenarios. It is deeply optimized for real-world agent workflows...",
    "created": 1773583573,
    "mixedPricePerMillionUsd": 2.6,
    "priceLabel": "$2.60",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "z-ai/glm-5v-turbo",
    "baseName": "Z.ai: GLM 5V Turbo",
    "displayName": "Z.ai: GLM 5V Turbo — $2.60 / 1M mixed",
    "description": "GLM-5V-Turbo is Z.ai’s first native multimodal agent foundation model, built for vision-based coding and agent-driven tasks. It natively handles image, video, and text inputs, excels at long-horizon planning, complex coding,...",
    "created": 1775061458,
    "mixedPricePerMillionUsd": 2.6,
    "priceLabel": "$2.60",
    "inputModalities": [
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "~openai/gpt-mini-latest",
    "baseName": "OpenAI GPT Mini Latest",
    "displayName": "OpenAI GPT Mini Latest — $2.63 / 1M mixed",
    "description": "This model always redirects to the latest model in the OpenAI GPT Mini family.",
    "created": 1777318471,
    "mixedPricePerMillionUsd": 2.63,
    "priceLabel": "$2.63",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.4-mini",
    "baseName": "OpenAI: GPT-5.4 Mini",
    "displayName": "OpenAI: GPT-5.4 Mini — $2.63 / 1M mixed",
    "description": "GPT-5.4 mini brings the core capabilities of GPT-5.4 to a faster, more efficient model optimized for high-throughput workloads. It supports text and image inputs with strong performance across reasoning, coding,...",
    "created": 1773748178,
    "mixedPricePerMillionUsd": 2.63,
    "priceLabel": "$2.63",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o3-mini",
    "baseName": "OpenAI: o3 Mini",
    "displayName": "OpenAI: o3 Mini — $2.75 / 1M mixed",
    "description": "OpenAI o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and coding. This model supports the `reasoning_effort` parameter, which can be set to...",
    "created": 1738351721,
    "mixedPricePerMillionUsd": 2.75,
    "priceLabel": "$2.75",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o3-mini-high",
    "baseName": "OpenAI: o3 Mini High",
    "displayName": "OpenAI: o3 Mini High — $2.75 / 1M mixed",
    "description": "OpenAI o3-mini-high is the same model as [o3-mini](/openai/o3-mini) with reasoning_effort set to high. o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and...",
    "created": 1739372611,
    "mixedPricePerMillionUsd": 2.75,
    "priceLabel": "$2.75",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o4-mini",
    "baseName": "OpenAI: o4 Mini",
    "displayName": "OpenAI: o4 Mini — $2.75 / 1M mixed",
    "description": "OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining strong multimodal and agentic capabilities. It supports tool use and demonstrates competitive reasoning...",
    "created": 1744820942,
    "mixedPricePerMillionUsd": 2.75,
    "priceLabel": "$2.75",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o4-mini-high",
    "baseName": "OpenAI: o4 Mini High",
    "displayName": "OpenAI: o4 Mini High — $2.75 / 1M mixed",
    "description": "OpenAI o4-mini-high is the same model as [o4-mini](/openai/o4-mini) with reasoning_effort set to high. OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining...",
    "created": 1744824212,
    "mixedPricePerMillionUsd": 2.75,
    "priceLabel": "$2.75",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "~anthropic/claude-haiku-latest",
    "baseName": "Anthropic Claude Haiku Latest",
    "displayName": "Anthropic Claude Haiku Latest — $3.00 / 1M mixed",
    "description": "This model always redirects to the latest model in the Anthropic Claude Haiku family.",
    "created": 1777318492,
    "mixedPricePerMillionUsd": 3,
    "priceLabel": "$3.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-haiku-4.5",
    "baseName": "Anthropic: Claude Haiku 4.5",
    "displayName": "Anthropic: Claude Haiku 4.5 — $3.00 / 1M mixed",
    "description": "Claude Haiku 4.5 is Anthropic’s fastest and most efficient model, delivering near-frontier intelligence at a fraction of the cost and latency of larger Claude models. Matching Claude Sonnet 4’s performance...",
    "created": 1760547638,
    "mixedPricePerMillionUsd": 3,
    "priceLabel": "$3.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "sao10k/l3.1-70b-hanami-x1",
    "baseName": "Sao10K: Llama 3.1 70B Hanami x1",
    "displayName": "Sao10K: Llama 3.1 70B Hanami x1 — $3.00 / 1M mixed",
    "description": "This is [Sao10K](/sao10k)'s experiment over [Euryale v2.2](/sao10k/l3.1-euryale-70b).",
    "created": 1736302854,
    "mixedPricePerMillionUsd": 3,
    "priceLabel": "$3.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-mini-transcribe",
    "baseName": "OpenAI: GPT-4o Mini Transcribe",
    "displayName": "OpenAI: GPT-4o Mini Transcribe — $3.13 / 1M mixed",
    "description": "GPT-4o Mini Transcribe is OpenAI's smaller, cost-efficient speech-to-text model built on GPT-4o Mini audio capabilities. It's priced per token (input and output), making it suitable for high-volume transcription workflows that...",
    "created": 1777658151,
    "mixedPricePerMillionUsd": 3.13,
    "priceLabel": "$3.13",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
  {
    "id": "writer/palmyra-x5",
    "baseName": "Writer: Palmyra X5",
    "displayName": "Writer: Palmyra X5 — $3.30 / 1M mixed",
    "description": "Palmyra X5 is Writer's most advanced model, purpose-built for building and scaling AI agents across the enterprise. It delivers industry-leading speed and efficiency on context windows up to 1 million...",
    "created": 1769003823,
    "mixedPricePerMillionUsd": 3.3,
    "priceLabel": "$3.30",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-3.5-turbo-16k",
    "baseName": "OpenAI: GPT-3.5 Turbo 16k",
    "displayName": "OpenAI: GPT-3.5 Turbo 16k — $3.50 / 1M mixed",
    "description": "This model offers four times the context length of gpt-3.5-turbo, allowing it to support approximately 20 pages of text in a single request at a higher cost. Training data: up...",
    "created": 1693180800,
    "mixedPricePerMillionUsd": 3.5,
    "priceLabel": "$3.50",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3.6-max-preview",
    "baseName": "Qwen: Qwen3.6 Max Preview",
    "displayName": "Qwen: Qwen3.6 Max Preview — $3.64 / 1M mixed",
    "description": "Qwen3.6-Max-Preview is a proprietary frontier model from Alibaba Cloud built on a sparse mixture-of-experts architecture with approximately 1 trillion total parameters. It is optimized for agentic coding, tool use, and...",
    "created": 1777260242,
    "mixedPricePerMillionUsd": 3.64,
    "priceLabel": "$3.64",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthracite-org/magnum-v4-72b",
    "baseName": "Magnum v4 72B",
    "displayName": "Magnum v4 72B — $4.00 / 1M mixed",
    "description": "This is a series of models designed to replicate the prose quality of the Claude 3 models, specifically Sonnet(https://openrouter.ai/anthropic/claude-3.5-sonnet) and Opus(https://openrouter.ai/anthropic/claude-3-opus).\n\nThe model is fine-tuned on top of [Qwen2.5 72B](https://openrouter.ai/qwen/qwen-2.5-72b-instruct).",
    "created": 1729555200,
    "mixedPricePerMillionUsd": 4,
    "priceLabel": "$4.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-large",
    "baseName": "Mistral Large",
    "displayName": "Mistral Large — $4.00 / 1M mixed",
    "description": "This is Mistral AI's flagship model, Mistral Large 2 (version `mistral-large-2407`). It's a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/)....",
    "created": 1708905600,
    "mixedPricePerMillionUsd": 4,
    "priceLabel": "$4.00",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-large-2407",
    "baseName": "Mistral Large 2407",
    "displayName": "Mistral Large 2407 — $4.00 / 1M mixed",
    "description": "This is Mistral AI's flagship model, Mistral Large 2 (version mistral-large-2407). It's a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/)....",
    "created": 1731978415,
    "mixedPricePerMillionUsd": 4,
    "priceLabel": "$4.00",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-large-2411",
    "baseName": "Mistral Large 2411",
    "displayName": "Mistral Large 2411 — $4.00 / 1M mixed",
    "description": "Mistral Large 2 2411 is an update of [Mistral Large 2](/mistralai/mistral-large) released together with [Pixtral Large 2411](/mistralai/pixtral-large-2411) It provides a significant upgrade on the previous [Mistral Large 24.07](/mistralai/mistral-large-2407), with notable...",
    "created": 1731978685,
    "mixedPricePerMillionUsd": 4,
    "priceLabel": "$4.00",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mixtral-8x22b-instruct",
    "baseName": "Mistral: Mixtral 8x22B Instruct",
    "displayName": "Mistral: Mixtral 8x22B Instruct — $4.00 / 1M mixed",
    "description": "Mistral's official instruct fine-tuned version of [Mixtral 8x22B](/models/mistralai/mixtral-8x22b). It uses 39B active parameters out of 141B, offering unparalleled cost efficiency for its size. Its strengths include: - strong math, coding,...",
    "created": 1713312000,
    "mixedPricePerMillionUsd": 4,
    "priceLabel": "$4.00",
    "inputModalities": [
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/pixtral-large-2411",
    "baseName": "Mistral: Pixtral Large 2411",
    "displayName": "Mistral: Pixtral Large 2411 — $4.00 / 1M mixed",
    "description": "Pixtral Large is a 124B parameter, open-weight, multimodal model built on top of [Mistral Large 2](/mistralai/mistral-large-2411). The model is able to understand documents, charts and natural images. The model is...",
    "created": 1731977388,
    "mixedPricePerMillionUsd": 4,
    "priceLabel": "$4.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "x-ai/grok-4.20-multi-agent",
    "baseName": "xAI: Grok 4.20 Multi-Agent",
    "displayName": "xAI: Grok 4.20 Multi-Agent — $4.00 / 1M mixed",
    "description": "Grok 4.20 Multi-Agent is a variant of xAI’s Grok 4.20 designed for collaborative, agent-based workflows. Multiple agents operate in parallel to conduct deep research, coordinate tool use, and synthesize information...",
    "created": 1774979158,
    "mixedPricePerMillionUsd": 4,
    "priceLabel": "$4.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "mistralai/mistral-medium-3-5",
    "baseName": "Mistral: Mistral Medium 3.5",
    "displayName": "Mistral: Mistral Medium 3.5 — $4.50 / 1M mixed",
    "description": "Mistral Medium 3.5 is a dense 128B instruction-following model from Mistral AI. It supports text and image inputs with text output, and is designed for agentic workflows, coding, and complex...",
    "created": 1777570439,
    "mixedPricePerMillionUsd": 4.5,
    "priceLabel": "$4.50",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "ai21/jamba-large-1.7",
    "baseName": "AI21: Jamba Large 1.7",
    "displayName": "AI21: Jamba Large 1.7 — $5.00 / 1M mixed",
    "description": "Jamba Large 1.7 is the latest model in the Jamba open family, offering improvements in grounding, instruction-following, and overall efficiency. Built on a hybrid SSM-Transformer architecture with a 256K context...",
    "created": 1754669020,
    "mixedPricePerMillionUsd": 5,
    "priceLabel": "$5.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4.1",
    "baseName": "OpenAI: GPT-4.1",
    "displayName": "OpenAI: GPT-4.1 — $5.00 / 1M mixed",
    "description": "GPT-4.1 is a flagship large language model optimized for advanced instruction following, real-world software engineering, and long-context reasoning. It supports a 1 million token context window and outperforms GPT-4o and...",
    "created": 1744651385,
    "mixedPricePerMillionUsd": 5,
    "priceLabel": "$5.00",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o3",
    "baseName": "OpenAI: o3",
    "displayName": "OpenAI: o3 — $5.00 / 1M mixed",
    "description": "o3 is a well-rounded and powerful model across domains. It sets a new standard for math, science, coding, and visual reasoning tasks. It also excels at technical writing and instruction-following....",
    "created": 1744823457,
    "mixedPricePerMillionUsd": 5,
    "priceLabel": "$5.00",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o4-mini-deep-research",
    "baseName": "OpenAI: o4 Mini Deep Research",
    "displayName": "OpenAI: o4 Mini Deep Research — $5.00 / 1M mixed",
    "description": "o4-mini-deep-research is OpenAI's faster, more affordable deep research model—ideal for tackling complex, multi-step research tasks.\n\nNote: This model always uses the 'web_search' tool which adds additional cost.",
    "created": 1760129642,
    "mixedPricePerMillionUsd": 5,
    "priceLabel": "$5.00",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "perplexity/sonar-deep-research",
    "baseName": "Perplexity: Sonar Deep Research",
    "displayName": "Perplexity: Sonar Deep Research — $5.00 / 1M mixed",
    "description": "Sonar Deep Research is a research-focused model designed for multi-step retrieval, synthesis, and reasoning across complex topics. It autonomously searches, reads, and evaluates sources, refining its approach as it gathers...",
    "created": 1741311246,
    "mixedPricePerMillionUsd": 5,
    "priceLabel": "$5.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "perplexity/sonar-reasoning-pro",
    "baseName": "Perplexity: Sonar Reasoning Pro",
    "displayName": "Perplexity: Sonar Reasoning Pro — $5.00 / 1M mixed",
    "description": "Note: Sonar Pro pricing includes Perplexity search pricing. See [details here](https://docs.perplexity.ai/guides/pricing#detailed-pricing-breakdown-for-sonar-reasoning-pro-and-sonar-pro) Sonar Reasoning Pro is a premier reasoning model powered by DeepSeek R1 with Chain of Thought (CoT). Designed for...",
    "created": 1741313308,
    "mixedPricePerMillionUsd": 5,
    "priceLabel": "$5.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "~google/gemini-flash-latest",
    "baseName": "Google Gemini Flash Latest",
    "displayName": "Google Gemini Flash Latest — $5.25 / 1M mixed",
    "description": "This model always redirects to the latest model in the Google Gemini Flash family.",
    "created": 1777318398,
    "mixedPricePerMillionUsd": 5.25,
    "priceLabel": "$5.25",
    "inputModalities": [
      "text",
      "image",
      "video",
      "file",
      "audio"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-3.5-flash",
    "baseName": "Google: Gemini 3.5 Flash",
    "displayName": "Google: Gemini 3.5 Flash — $5.25 / 1M mixed",
    "description": "Gemini 3.5 Flash is Google's high-efficiency multimodal model, bringing near-Pro level coding and reasoning at Flash-tier cost and speed. It is highly optimized for coding proficiency and parallel agentic execution...",
    "created": 1779193800,
    "mixedPricePerMillionUsd": 5.25,
    "priceLabel": "$5.25",
    "inputModalities": [
      "text",
      "image",
      "video",
      "file",
      "audio"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.5-pro",
    "baseName": "Google: Gemini 2.5 Pro",
    "displayName": "Google: Gemini 2.5 Pro — $5.63 / 1M mixed",
    "description": "Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy...",
    "created": 1750169544,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.5-pro-preview-05-06",
    "baseName": "Google: Gemini 2.5 Pro Preview 05-06",
    "displayName": "Google: Gemini 2.5 Pro Preview 05-06 — $5.63 / 1M mixed",
    "description": "Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy...",
    "created": 1746578513,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "text",
      "image",
      "file",
      "audio",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-2.5-pro-preview",
    "baseName": "Google: Gemini 2.5 Pro Preview 06-05",
    "displayName": "Google: Gemini 2.5 Pro Preview 06-05 — $5.63 / 1M mixed",
    "description": "Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs “thinking” capabilities, enabling it to reason through responses with enhanced accuracy...",
    "created": 1749137257,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "file",
      "image",
      "text",
      "audio"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5",
    "baseName": "OpenAI: GPT-5",
    "displayName": "OpenAI: GPT-5 — $5.63 / 1M mixed",
    "description": "GPT-5 is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and accuracy...",
    "created": 1754587413,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5-chat",
    "baseName": "OpenAI: GPT-5 Chat",
    "displayName": "OpenAI: GPT-5 Chat — $5.63 / 1M mixed",
    "description": "GPT-5 Chat is designed for advanced, natural, multimodal, and context-aware conversations for enterprise applications.",
    "created": 1754587837,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5-codex",
    "baseName": "OpenAI: GPT-5 Codex",
    "displayName": "OpenAI: GPT-5 Codex — $5.63 / 1M mixed",
    "description": "GPT-5-Codex is a specialized version of GPT-5 optimized for software engineering and coding workflows. It is designed for both interactive development sessions and long, independent execution of complex engineering tasks....",
    "created": 1758643403,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.1",
    "baseName": "OpenAI: GPT-5.1",
    "displayName": "OpenAI: GPT-5.1 — $5.63 / 1M mixed",
    "description": "GPT-5.1 is the latest frontier-grade model in the GPT-5 series, offering stronger general-purpose reasoning, improved instruction adherence, and a more natural conversational style compared to GPT-5. It uses adaptive reasoning...",
    "created": 1763060305,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.1-chat",
    "baseName": "OpenAI: GPT-5.1 Chat",
    "displayName": "OpenAI: GPT-5.1 Chat — $5.63 / 1M mixed",
    "description": "GPT-5.1 Chat (AKA Instant is the fast, lightweight member of the 5.1 family, optimized for low-latency chat while retaining strong general intelligence. It uses adaptive reasoning to selectively “think” on...",
    "created": 1763060302,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.1-codex",
    "baseName": "OpenAI: GPT-5.1-Codex",
    "displayName": "OpenAI: GPT-5.1-Codex — $5.63 / 1M mixed",
    "description": "GPT-5.1-Codex is a specialized version of GPT-5.1 optimized for software engineering and coding workflows. It is designed for both interactive development sessions and long, independent execution of complex engineering tasks....",
    "created": 1763060298,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.1-codex-max",
    "baseName": "OpenAI: GPT-5.1-Codex-Max",
    "displayName": "OpenAI: GPT-5.1-Codex-Max — $5.63 / 1M mixed",
    "description": "GPT-5.1-Codex-Max is OpenAI’s latest agentic coding model, designed for long-running, high-context software development tasks. It is based on an updated version of the 5.1 reasoning stack and trained on agentic...",
    "created": 1764878934,
    "mixedPricePerMillionUsd": 5.63,
    "priceLabel": "$5.63",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "aion-labs/aion-1.0",
    "baseName": "AionLabs: Aion-1.0",
    "displayName": "AionLabs: Aion-1.0 — $6.00 / 1M mixed",
    "description": "Aion-1.0 is a multi-model system designed for high performance across various tasks, including reasoning and coding. It is built on DeepSeek-R1, augmented with additional models and techniques such as Tree...",
    "created": 1738697557,
    "mixedPricePerMillionUsd": 6,
    "priceLabel": "$6.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "cohere/command-a",
    "baseName": "Cohere: Command A",
    "displayName": "Cohere: Command A — $6.25 / 1M mixed",
    "description": "Command A is an open-weights 111B parameter model with a 256k context window focused on delivering great performance across agentic, multilingual, and coding use cases. Compared to other leading proprietary...",
    "created": 1741894342,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "cohere/command-r-plus-08-2024",
    "baseName": "Cohere: Command R+ (08-2024)",
    "displayName": "Cohere: Command R+ (08-2024) — $6.25 / 1M mixed",
    "description": "command-r-plus-08-2024 is an update of the [Command R+](/models/cohere/command-r-plus) with roughly 50% higher throughput and 25% lower latencies as compared to the previous Command R+ version, while keeping the hardware footprint...",
    "created": 1724976000,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "inflection/inflection-3-pi",
    "baseName": "Inflection: Inflection 3 Pi",
    "displayName": "Inflection: Inflection 3 Pi — $6.25 / 1M mixed",
    "description": "Inflection 3 Pi powers Inflection's [Pi](https://pi.ai) chatbot, including backstory, emotional intelligence, productivity, and safety. It has access to recent news, and excels in scenarios like customer support and roleplay. Pi...",
    "created": 1728604800,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "inflection/inflection-3-productivity",
    "baseName": "Inflection: Inflection 3 Productivity",
    "displayName": "Inflection: Inflection 3 Productivity — $6.25 / 1M mixed",
    "description": "Inflection 3 Productivity is optimized for following instructions. It is better for tasks requiring JSON output or precise adherence to provided guidelines. It has access to recent news. For emotional...",
    "created": 1728604800,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-audio",
    "baseName": "OpenAI: GPT Audio",
    "displayName": "OpenAI: GPT Audio — $6.25 / 1M mixed",
    "description": "The gpt-audio model is OpenAI's first generally available audio model. The new snapshot features an upgraded decoder for more natural sounding voices and maintains better voice consistency. Audio is priced...",
    "created": 1768862569,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text",
      "audio"
    ],
    "outputModalities": [
      "text",
      "audio"
    ]
  },
  {
    "id": "openai/gpt-4o",
    "baseName": "OpenAI: GPT-4o",
    "displayName": "OpenAI: GPT-4o — $6.25 / 1M mixed",
    "description": "GPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as...",
    "created": 1715558400,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-2024-08-06",
    "baseName": "OpenAI: GPT-4o (2024-08-06)",
    "displayName": "OpenAI: GPT-4o (2024-08-06) — $6.25 / 1M mixed",
    "description": "The 2024-08-06 version of GPT-4o offers improved performance in structured outputs, with the ability to supply a JSON schema in the respone_format. Read more [here](https://openai.com/index/introducing-structured-outputs-in-the-api/). GPT-4o (\"o\" for \"omni\") is...",
    "created": 1722902400,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-2024-11-20",
    "baseName": "OpenAI: GPT-4o (2024-11-20)",
    "displayName": "OpenAI: GPT-4o (2024-11-20) — $6.25 / 1M mixed",
    "description": "The 2024-11-20 version of GPT-4o offers a leveled-up creative writing ability with more natural, engaging, and tailored writing to improve relevance & readability. It’s also better at working with uploaded...",
    "created": 1732127594,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-audio-preview",
    "baseName": "OpenAI: GPT-4o Audio",
    "displayName": "OpenAI: GPT-4o Audio — $6.25 / 1M mixed",
    "description": "The gpt-4o-audio-preview model adds support for audio inputs as prompts. This enhancement allows the model to detect nuances within audio recordings and add depth to generated user experiences. Audio outputs...",
    "created": 1755233061,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "audio",
      "text"
    ],
    "outputModalities": [
      "text",
      "audio"
    ]
  },
  {
    "id": "openai/gpt-4o-search-preview",
    "baseName": "OpenAI: GPT-4o Search Preview",
    "displayName": "OpenAI: GPT-4o Search Preview — $6.25 / 1M mixed",
    "description": "GPT-4o Search Previewis a specialized model for web search in Chat Completions. It is trained to understand and execute web search queries.",
    "created": 1741817949,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-transcribe",
    "baseName": "OpenAI: GPT-4o Transcribe",
    "displayName": "OpenAI: GPT-4o Transcribe — $6.25 / 1M mixed",
    "description": "GPT-4o Transcribe is OpenAI's high-quality speech-to-text model built on GPT-4o audio capabilities. It's priced per token (input and output), making it suitable for workflows that benefit from token-level billing transparency.",
    "created": 1777332895,
    "mixedPricePerMillionUsd": 6.25,
    "priceLabel": "$6.25",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
  {
    "id": "canopylabs/orpheus-3b-0.1-ft",
    "baseName": "Canopy Labs: Orpheus 3B",
    "displayName": "Canopy Labs: Orpheus 3B — $7.00 / 1M mixed",
    "description": "Orpheus 3B is an English text-to-speech model from Canopy Labs, fine-tuned for natural prosody and expressive delivery. It offers 7 preset voices and is suited for narration, voice assistants, and...",
    "created": 1776983168,
    "mixedPricePerMillionUsd": 7,
    "priceLabel": "$7.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "~google/gemini-pro-latest",
    "baseName": "Google Gemini Pro Latest",
    "displayName": "Google Gemini Pro Latest — $7.00 / 1M mixed",
    "description": "This model always redirects to the latest model in the Google Gemini Pro family.",
    "created": 1777318451,
    "mixedPricePerMillionUsd": 7,
    "priceLabel": "$7.00",
    "inputModalities": [
      "audio",
      "file",
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-3.1-pro-preview",
    "baseName": "Google: Gemini 3.1 Pro Preview",
    "displayName": "Google: Gemini 3.1 Pro Preview — $7.00 / 1M mixed",
    "description": "Gemini 3.1 Pro Preview is Google’s frontier reasoning model, delivering enhanced software engineering performance, improved agentic reliability, and more efficient token usage across complex workflows. Building on the multimodal foundation...",
    "created": 1771509627,
    "mixedPricePerMillionUsd": 7,
    "priceLabel": "$7.00",
    "inputModalities": [
      "audio",
      "file",
      "image",
      "text",
      "video"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-3.1-pro-preview-customtools",
    "baseName": "Google: Gemini 3.1 Pro Preview Custom Tools",
    "displayName": "Google: Gemini 3.1 Pro Preview Custom Tools — $7.00 / 1M mixed",
    "description": "Gemini 3.1 Pro Preview Custom Tools is a variant of Gemini 3.1 Pro that improves tool selection behavior by preventing overuse of a general bash tool when more efficient third-party...",
    "created": 1772045923,
    "mixedPricePerMillionUsd": 7,
    "priceLabel": "$7.00",
    "inputModalities": [
      "text",
      "audio",
      "image",
      "video",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "google/gemini-3-pro-image-preview",
    "baseName": "Google: Nano Banana Pro (Gemini 3 Pro Image Preview)",
    "displayName": "Google: Nano Banana Pro (Gemini 3 Pro Image Preview) — $7.00 / 1M mixed",
    "description": "Nano Banana Pro is Google’s most advanced image-generation and editing model, built on Gemini 3 Pro. It extends the original Nano Banana with significantly improved multimodal reasoning, real-world grounding, and...",
    "created": 1763653797,
    "mixedPricePerMillionUsd": 7,
    "priceLabel": "$7.00",
    "inputModalities": [
      "image",
      "text"
    ],
    "outputModalities": [
      "image",
      "text"
    ]
  },
  {
    "id": "sesame/csm-1b",
    "baseName": "Sesame: CSM 1B",
    "displayName": "Sesame: CSM 1B — $7.00 / 1M mixed",
    "description": "CSM 1B is a conversational speech model from Sesame. It accepts text input and produces English speech output, with voice options spanning conversational and read-speech styles. At 1B parameters, it...",
    "created": 1776983168,
    "mixedPricePerMillionUsd": 7,
    "priceLabel": "$7.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "zyphra/zonos-v0.1-hybrid",
    "baseName": "Zyphra: Zonos v0.1 Hybrid",
    "displayName": "Zyphra: Zonos v0.1 Hybrid — $7.00 / 1M mixed",
    "description": "Zonos v0.1 Hybrid is a text-to-speech model from Zyphra built on a hybrid architecture. It produces English speech output with coverage across American and British accents in male and female...",
    "created": 1776983169,
    "mixedPricePerMillionUsd": 7,
    "priceLabel": "$7.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "zyphra/zonos-v0.1-transformer",
    "baseName": "Zyphra: Zonos v0.1 Transformer",
    "displayName": "Zyphra: Zonos v0.1 Transformer — $7.00 / 1M mixed",
    "description": "Zonos v0.1 Transformer is a text-to-speech model from Zyphra built on a pure transformer architecture. It offers the same American and British English voice coverage as the Hybrid variant, and...",
    "created": 1776983170,
    "mixedPricePerMillionUsd": 7,
    "priceLabel": "$7.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "amazon/nova-premier-v1",
    "baseName": "Amazon: Nova Premier 1.0",
    "displayName": "Amazon: Nova Premier 1.0 — $7.50 / 1M mixed",
    "description": "Amazon Nova Premier is the most capable of Amazon’s multimodal models for complex reasoning tasks and for use as the best teacher for distilling custom models.",
    "created": 1761950332,
    "mixedPricePerMillionUsd": 7.5,
    "priceLabel": "$7.50",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.2",
    "baseName": "OpenAI: GPT-5.2",
    "displayName": "OpenAI: GPT-5.2 — $7.88 / 1M mixed",
    "description": "GPT-5.2 is the latest frontier-grade model in the GPT-5 series, offering stronger agentic and long context perfomance compared to GPT-5.1. It uses adaptive reasoning to allocate computation dynamically, responding quickly...",
    "created": 1765389775,
    "mixedPricePerMillionUsd": 7.88,
    "priceLabel": "$7.88",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.2-chat",
    "baseName": "OpenAI: GPT-5.2 Chat",
    "displayName": "OpenAI: GPT-5.2 Chat — $7.88 / 1M mixed",
    "description": "GPT-5.2 Chat (AKA Instant) is the fast, lightweight member of the 5.2 family, optimized for low-latency chat while retaining strong general intelligence. It uses adaptive reasoning to selectively “think” on...",
    "created": 1765389783,
    "mixedPricePerMillionUsd": 7.88,
    "priceLabel": "$7.88",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.2-codex",
    "baseName": "OpenAI: GPT-5.2-Codex",
    "displayName": "OpenAI: GPT-5.2-Codex — $7.88 / 1M mixed",
    "description": "GPT-5.2-Codex is an upgraded version of GPT-5.1-Codex optimized for software engineering and coding workflows. It is designed for both interactive development sessions and long, independent execution of complex engineering tasks....",
    "created": 1768409315,
    "mixedPricePerMillionUsd": 7.88,
    "priceLabel": "$7.88",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.3-chat",
    "baseName": "OpenAI: GPT-5.3 Chat",
    "displayName": "OpenAI: GPT-5.3 Chat — $7.88 / 1M mixed",
    "description": "GPT-5.3 Chat is an update to ChatGPT's most-used model that makes everyday conversations smoother, more useful, and more directly helpful. It delivers more accurate answers with better contextualization and significantly...",
    "created": 1772564061,
    "mixedPricePerMillionUsd": 7.88,
    "priceLabel": "$7.88",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.3-codex",
    "baseName": "OpenAI: GPT-5.3-Codex",
    "displayName": "OpenAI: GPT-5.3-Codex — $7.88 / 1M mixed",
    "description": "GPT-5.3-Codex is OpenAI’s most advanced agentic coding model, combining the frontier software engineering performance of GPT-5.2-Codex with the broader reasoning and professional knowledge capabilities of GPT-5.2. It achieves state-of-the-art results...",
    "created": 1771959164,
    "mixedPricePerMillionUsd": 7.88,
    "priceLabel": "$7.88",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.4",
    "baseName": "OpenAI: GPT-5.4",
    "displayName": "OpenAI: GPT-5.4 — $8.75 / 1M mixed",
    "description": "GPT-5.4 is OpenAI’s latest frontier model, unifying the Codex and GPT lines into a single system. It features a 1M+ token context window (922K input, 128K output) with support for...",
    "created": 1772734352,
    "mixedPricePerMillionUsd": 8.75,
    "priceLabel": "$8.75",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "~anthropic/claude-sonnet-latest",
    "baseName": "Anthropic Claude Sonnet Latest",
    "displayName": "Anthropic Claude Sonnet Latest — $9.00 / 1M mixed",
    "description": "This model always redirects to the latest model in the Anthropic Claude Sonnet family.",
    "created": 1777318368,
    "mixedPricePerMillionUsd": 9,
    "priceLabel": "$9.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-sonnet-4",
    "baseName": "Anthropic: Claude Sonnet 4",
    "displayName": "Anthropic: Claude Sonnet 4 — $9.00 / 1M mixed",
    "description": "Claude Sonnet 4 significantly enhances the capabilities of its predecessor, Sonnet 3.7, excelling in both coding and reasoning tasks with improved precision and controllability. Achieving state-of-the-art performance on SWE-bench (72.7%),...",
    "created": 1747930371,
    "mixedPricePerMillionUsd": 9,
    "priceLabel": "$9.00",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-sonnet-4.5",
    "baseName": "Anthropic: Claude Sonnet 4.5",
    "displayName": "Anthropic: Claude Sonnet 4.5 — $9.00 / 1M mixed",
    "description": "Claude Sonnet 4.5 is Anthropic’s most advanced Sonnet model to date, optimized for real-world agents and coding workflows. It delivers state-of-the-art performance on coding benchmarks such as SWE-bench Verified, with...",
    "created": 1759161676,
    "mixedPricePerMillionUsd": 9,
    "priceLabel": "$9.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-sonnet-4.6",
    "baseName": "Anthropic: Claude Sonnet 4.6",
    "displayName": "Anthropic: Claude Sonnet 4.6 — $9.00 / 1M mixed",
    "description": "Sonnet 4.6 is Anthropic's most capable Sonnet-class model yet, with frontier performance across coding, agents, and professional work. It excels at iterative development, complex codebase navigation, end-to-end project management with...",
    "created": 1771342990,
    "mixedPricePerMillionUsd": 9,
    "priceLabel": "$9.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "perplexity/sonar-pro",
    "baseName": "Perplexity: Sonar Pro",
    "displayName": "Perplexity: Sonar Pro — $9.00 / 1M mixed",
    "description": "Note: Sonar Pro pricing includes Perplexity search pricing. See [details here](https://docs.perplexity.ai/guides/pricing#detailed-pricing-breakdown-for-sonar-reasoning-pro-and-sonar-pro) For enterprises seeking more advanced capabilities, the Sonar Pro API can handle in-depth, multi-step queries with added extensibility, like...",
    "created": 1741312423,
    "mixedPricePerMillionUsd": 9,
    "priceLabel": "$9.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "perplexity/sonar-pro-search",
    "baseName": "Perplexity: Sonar Pro Search",
    "displayName": "Perplexity: Sonar Pro Search — $9.00 / 1M mixed",
    "description": "Exclusively available on the OpenRouter API, Sonar Pro's new Pro Search mode is Perplexity's most advanced agentic search system. It is designed for deeper reasoning and analysis. Pricing is based...",
    "created": 1761854366,
    "mixedPricePerMillionUsd": 9,
    "priceLabel": "$9.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4o-2024-05-13",
    "baseName": "OpenAI: GPT-4o (2024-05-13)",
    "displayName": "OpenAI: GPT-4o (2024-05-13) — $10.00 / 1M mixed",
    "description": "GPT-4o (\"o\" for \"omni\") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence level of [GPT-4 Turbo](/models/openai/gpt-4-turbo) while being twice as...",
    "created": 1715558400,
    "mixedPricePerMillionUsd": 10,
    "priceLabel": "$10.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5-image",
    "baseName": "OpenAI: GPT-5 Image",
    "displayName": "OpenAI: GPT-5 Image — $10.00 / 1M mixed",
    "description": "[GPT-5](https://openrouter.ai/openai/gpt-5) Image combines OpenAI's GPT-5 model with state-of-the-art image generation capabilities. It offers major improvements in reasoning, code quality, and user experience while incorporating GPT Image 1's superior instruction following,...",
    "created": 1760447986,
    "mixedPricePerMillionUsd": 10,
    "priceLabel": "$10.00",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "image",
      "text"
    ]
  },
  {
    "id": "google/gemini-3.1-flash-tts-preview",
    "baseName": "Google: Gemini 3.1 Flash TTS Preview",
    "displayName": "Google: Gemini 3.1 Flash TTS Preview — $10.50 / 1M mixed",
    "description": "Gemini 3.1 Flash TTS Preview is a text-to-speech model from Google, and a substantial generational step up from Gemini 2.5 Flash TTS. It takes text input and produces audio output...",
    "created": 1776999308,
    "mixedPricePerMillionUsd": 10.5,
    "priceLabel": "$10.50",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "openai/gpt-5.4-image-2",
    "baseName": "OpenAI: GPT-5.4 Image 2",
    "displayName": "OpenAI: GPT-5.4 Image 2 — $11.50 / 1M mixed",
    "description": "[GPT-5.4](https://openrouter.ai/openai/gpt-5.4) Image 2 combines OpenAI's GPT-5.4 model with state-of-the-art image generation capabilities from GPT Image 2. It enables rich multimodal workflows, allowing users to seamlessly move between reasoning, coding, and...",
    "created": 1776797528,
    "mixedPricePerMillionUsd": 11.5,
    "priceLabel": "$11.50",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "image",
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4.5",
    "baseName": "Anthropic: Claude Opus 4.5",
    "displayName": "Anthropic: Claude Opus 4.5 — $15.00 / 1M mixed",
    "description": "Claude Opus 4.5 is Anthropic’s frontier reasoning model optimized for complex software engineering, agentic workflows, and long-horizon computer use. It offers strong multimodal capabilities, competitive performance across real-world coding and...",
    "created": 1764010580,
    "mixedPricePerMillionUsd": 15,
    "priceLabel": "$15.00",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4.6",
    "baseName": "Anthropic: Claude Opus 4.6",
    "displayName": "Anthropic: Claude Opus 4.6 — $15.00 / 1M mixed",
    "description": "Opus 4.6 is Anthropic’s strongest model for coding and long-running professional tasks. It is built for agents that operate across entire workflows rather than single prompts, making it especially effective...",
    "created": 1770219050,
    "mixedPricePerMillionUsd": 15,
    "priceLabel": "$15.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4.7",
    "baseName": "Anthropic: Claude Opus 4.7",
    "displayName": "Anthropic: Claude Opus 4.7 — $15.00 / 1M mixed",
    "description": "Opus 4.7 is the next generation of Anthropic's Opus family, built for long-running, asynchronous agents. Building on the coding and agentic strengths of Opus 4.6, it delivers stronger performance on...",
    "created": 1776351100,
    "mixedPricePerMillionUsd": 15,
    "priceLabel": "$15.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4.8",
    "baseName": "Anthropic: Claude Opus 4.8",
    "displayName": "Anthropic: Claude Opus 4.8 — $15.00 / 1M mixed",
    "description": "Claude Opus 4.8 is Anthropic's most capable generally available model in the Opus family. It supports text, image, and file inputs with text output, with reasoning support and a 1M-token...",
    "created": 1779905091,
    "mixedPricePerMillionUsd": 15,
    "priceLabel": "$15.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "~anthropic/claude-opus-latest",
    "baseName": "Anthropic: Claude Opus Latest",
    "displayName": "Anthropic: Claude Opus Latest — $15.00 / 1M mixed",
    "description": "This model always redirects to the latest model in the Claude Opus family.",
    "created": 1776795361,
    "mixedPricePerMillionUsd": 15,
    "priceLabel": "$15.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "x-ai/grok-voice-tts-1.0",
    "baseName": "xAI: Grok Voice TTS 1.0",
    "displayName": "xAI: Grok Voice TTS 1.0 — $15.00 / 1M mixed",
    "description": "Grok Voice TTS 1.0 is a text-to-speech model from xAI. It converts text into spoken audio across 20+ languages with automatic language detection, and offers five built-in voices (Eve, Ara,...",
    "created": 1778805456,
    "mixedPricePerMillionUsd": 15,
    "priceLabel": "$15.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "mistralai/voxtral-mini-tts-2603",
    "baseName": "Mistral: Voxtral Mini TTS",
    "displayName": "Mistral: Voxtral Mini TTS — $16.00 / 1M mixed",
    "description": "Voxtral Mini TTS is Mistral's text-to-speech model featuring zero-shot voice cloning and multilingual support. It converts text input into natural-sounding audio output.",
    "created": 1776571337,
    "mixedPricePerMillionUsd": 16,
    "priceLabel": "$16.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "speech"
    ]
  },
  {
    "id": "~openai/gpt-latest",
    "baseName": "OpenAI GPT Latest",
    "displayName": "OpenAI GPT Latest — $17.50 / 1M mixed",
    "description": "This model always redirects to the latest model in the OpenAI GPT family.",
    "created": 1777318334,
    "mixedPricePerMillionUsd": 17.5,
    "priceLabel": "$17.50",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-chat-latest",
    "baseName": "OpenAI: GPT Chat Latest",
    "displayName": "OpenAI: GPT Chat Latest — $17.50 / 1M mixed",
    "description": "GPT Chat Latest points to OpenAI's stable API alias `chat-latest` that always resolves to the latest Instant chat model used in ChatGPT. As OpenAI rolls out new Instant model updates...",
    "created": 1778000212,
    "mixedPricePerMillionUsd": 17.5,
    "priceLabel": "$17.50",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.5",
    "baseName": "OpenAI: GPT-5.5",
    "displayName": "OpenAI: GPT-5.5 — $17.50 / 1M mixed",
    "description": "GPT-5.5 is OpenAI’s frontier model designed for complex professional workloads, building on GPT-5.4 with stronger reasoning, higher reliability, and improved token efficiency on hard tasks. It features a 1M+ token...",
    "created": 1777051893,
    "mixedPricePerMillionUsd": 17.5,
    "priceLabel": "$17.50",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4-turbo",
    "baseName": "OpenAI: GPT-4 Turbo",
    "displayName": "OpenAI: GPT-4 Turbo — $20.00 / 1M mixed",
    "description": "The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.\n\nTraining data: up to December 2023.",
    "created": 1712620800,
    "mixedPricePerMillionUsd": 20,
    "priceLabel": "$20.00",
    "inputModalities": [
      "text",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4-1106-preview",
    "baseName": "OpenAI: GPT-4 Turbo (older v1106)",
    "displayName": "OpenAI: GPT-4 Turbo (older v1106) — $20.00 / 1M mixed",
    "description": "The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling.\n\nTraining data: up to April 2023.",
    "created": 1699228800,
    "mixedPricePerMillionUsd": 20,
    "priceLabel": "$20.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4-turbo-preview",
    "baseName": "OpenAI: GPT-4 Turbo Preview",
    "displayName": "OpenAI: GPT-4 Turbo Preview — $20.00 / 1M mixed",
    "description": "The preview GPT-4 model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. Training data: up to Dec 2023. **Note:** heavily rate limited by OpenAI while...",
    "created": 1706140800,
    "mixedPricePerMillionUsd": 20,
    "priceLabel": "$20.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o3-deep-research",
    "baseName": "OpenAI: o3 Deep Research",
    "displayName": "OpenAI: o3 Deep Research — $25.00 / 1M mixed",
    "description": "o3-deep-research is OpenAI's advanced model for deep research, designed to tackle complex, multi-step research tasks.\n\nNote: This model always uses the 'web_search' tool which adds additional cost.",
    "created": 1760129661,
    "mixedPricePerMillionUsd": 25,
    "priceLabel": "$25.00",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4.8-fast",
    "baseName": "Anthropic: Claude Opus 4.8 (Fast)",
    "displayName": "Anthropic: Claude Opus 4.8 (Fast) — $30.00 / 1M mixed",
    "description": "Fast-mode variant of [Opus 4.8](/anthropic/claude-opus-4.8) - identical capabilities with higher output speed at 2x pricing relative to regular Opus 4.8.\n\nLearn more in Anthropic's docs: https://platform.claude.com/docs/en/build-with-claude/fast-mode",
    "created": 1779913703,
    "mixedPricePerMillionUsd": 30,
    "priceLabel": "$30.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "qwen/qwen3-asr-flash-2026-02-10",
    "baseName": "Qwen: Qwen3 ASR Flash",
    "displayName": "Qwen: Qwen3 ASR Flash — $35.00 / 1M mixed",
    "description": "Qwen3-ASR-Flash is Alibaba's automatic speech recognition service, built on the Qwen3-Omni foundation and trained on tens of millions of hours of multimodal speech data. The model handles 11 languages —...",
    "created": 1778732776,
    "mixedPricePerMillionUsd": 35,
    "priceLabel": "$35.00",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
  {
    "id": "openai/o1",
    "baseName": "OpenAI: o1",
    "displayName": "OpenAI: o1 — $37.50 / 1M mixed",
    "description": "The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding. The o1 model series is trained with large-scale reinforcement learning to reason...",
    "created": 1734459999,
    "mixedPricePerMillionUsd": 37.5,
    "priceLabel": "$37.50",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4",
    "baseName": "Anthropic: Claude Opus 4",
    "displayName": "Anthropic: Claude Opus 4 — $45.00 / 1M mixed",
    "description": "Claude Opus 4 is benchmarked as the world’s best coding model, at time of release, bringing sustained performance on complex, long-running tasks and agent workflows. It sets new benchmarks in...",
    "created": 1747931245,
    "mixedPricePerMillionUsd": 45,
    "priceLabel": "$45.00",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4.1",
    "baseName": "Anthropic: Claude Opus 4.1",
    "displayName": "Anthropic: Claude Opus 4.1 — $45.00 / 1M mixed",
    "description": "Claude Opus 4.1 is an updated version of Anthropic’s flagship model, offering improved performance in coding, reasoning, and agentic tasks. It achieves 74.5% on SWE-bench Verified and shows notable gains...",
    "created": 1754411591,
    "mixedPricePerMillionUsd": 45,
    "priceLabel": "$45.00",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4",
    "baseName": "OpenAI: GPT-4",
    "displayName": "OpenAI: GPT-4 — $45.00 / 1M mixed",
    "description": "OpenAI's flagship model, GPT-4 is a large-scale multimodal language model capable of solving difficult problems with greater accuracy than previous models due to its broader general knowledge and advanced reasoning...",
    "created": 1685232000,
    "mixedPricePerMillionUsd": 45,
    "priceLabel": "$45.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-4-0314",
    "baseName": "OpenAI: GPT-4 (older v0314)",
    "displayName": "OpenAI: GPT-4 (older v0314) — $45.00 / 1M mixed",
    "description": "GPT-4-0314 is the first version of GPT-4 released, with a context length of 8,192 tokens, and was supported until June 14. Training data: up to Sep 2021.",
    "created": 1685232000,
    "mixedPricePerMillionUsd": 45,
    "priceLabel": "$45.00",
    "inputModalities": [
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o3-pro",
    "baseName": "OpenAI: o3 Pro",
    "displayName": "OpenAI: o3 Pro — $50.00 / 1M mixed",
    "description": "The o-series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o3-pro model uses more compute to think harder and provide consistently...",
    "created": 1749598352,
    "mixedPricePerMillionUsd": 50,
    "priceLabel": "$50.00",
    "inputModalities": [
      "text",
      "file",
      "image"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5-pro",
    "baseName": "OpenAI: GPT-5 Pro",
    "displayName": "OpenAI: GPT-5 Pro — $67.50 / 1M mixed",
    "description": "GPT-5 Pro is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for complex tasks that require step-by-step reasoning, instruction following, and...",
    "created": 1759776663,
    "mixedPricePerMillionUsd": 67.5,
    "priceLabel": "$67.50",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4.6-fast",
    "baseName": "Anthropic: Claude Opus 4.6 (Fast)",
    "displayName": "Anthropic: Claude Opus 4.6 (Fast) — $90.00 / 1M mixed",
    "description": "Fast-mode variant of [Opus 4.6](/anthropic/claude-opus-4.6) - identical capabilities with higher output speed at premium 6x pricing.\n\nLearn more in Anthropic's docs: https://platform.claude.com/docs/en/build-with-claude/fast-mode",
    "created": 1775592472,
    "mixedPricePerMillionUsd": 90,
    "priceLabel": "$90.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "anthropic/claude-opus-4.7-fast",
    "baseName": "Anthropic: Claude Opus 4.7 (Fast)",
    "displayName": "Anthropic: Claude Opus 4.7 (Fast) — $90.00 / 1M mixed",
    "description": "Fast-mode variant of [Opus 4.7](/anthropic/claude-opus-4.7) - identical capabilities with higher output speed at premium 6x pricing.\n\nLearn more in Anthropic's docs: https://platform.claude.com/docs/en/build-with-claude/fast-mode",
    "created": 1778613011,
    "mixedPricePerMillionUsd": 90,
    "priceLabel": "$90.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.2-pro",
    "baseName": "OpenAI: GPT-5.2 Pro",
    "displayName": "OpenAI: GPT-5.2 Pro — $94.50 / 1M mixed",
    "description": "GPT-5.2 Pro is OpenAI’s most advanced model, offering major improvements in agentic coding and long context performance over GPT-5 Pro. It is optimized for complex tasks that require step-by-step reasoning,...",
    "created": 1765389780,
    "mixedPricePerMillionUsd": 94.5,
    "priceLabel": "$94.50",
    "inputModalities": [
      "image",
      "text",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.4-pro",
    "baseName": "OpenAI: GPT-5.4 Pro",
    "displayName": "OpenAI: GPT-5.4 Pro — $105.00 / 1M mixed",
    "description": "GPT-5.4 Pro is OpenAI's most advanced model, building on GPT-5.4's unified architecture with enhanced reasoning capabilities for complex, high-stakes tasks. It features a 1M+ token context window (922K input, 128K...",
    "created": 1772734366,
    "mixedPricePerMillionUsd": 105,
    "priceLabel": "$105.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/gpt-5.5-pro",
    "baseName": "OpenAI: GPT-5.5 Pro",
    "displayName": "OpenAI: GPT-5.5 Pro — $105.00 / 1M mixed",
    "description": "GPT-5.5 Pro is OpenAI’s high-capability model optimized for deep reasoning and accuracy on complex, high-stakes workloads. It features a 1M+ token context window (922K input, 128K output) with support for...",
    "created": 1777051896,
    "mixedPricePerMillionUsd": 105,
    "priceLabel": "$105.00",
    "inputModalities": [
      "file",
      "image",
      "text"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "openai/o1-pro",
    "baseName": "OpenAI: o1-pro",
    "displayName": "OpenAI: o1-pro — $375.00 / 1M mixed",
    "description": "The o1 series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o1-pro model uses more compute to think harder and provide...",
    "created": 1742423211,
    "mixedPricePerMillionUsd": 375,
    "priceLabel": "$375.00",
    "inputModalities": [
      "text",
      "image",
      "file"
    ],
    "outputModalities": [
      "text"
    ]
  },
  {
    "id": "nvidia/parakeet-tdt-0.6b-v3",
    "baseName": "NVIDIA: Parakeet TDT 0.6B v3",
    "displayName": "NVIDIA: Parakeet TDT 0.6B v3 — $1500.00 / 1M mixed",
    "description": "Parakeet TDT 0.6B v3 is NVIDIA's 600M-parameter multilingual speech-to-text model built on the FastConformer-TDT architecture. Trained on the Granary dataset (670,000+ hours of audio), it supports automatic language detection across...",
    "created": 1779848335,
    "mixedPricePerMillionUsd": 1500,
    "priceLabel": "$1500.00",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
  {
    "id": "openai/whisper-large-v3",
    "baseName": "OpenAI: Whisper Large V3",
    "displayName": "OpenAI: Whisper Large V3 — $1500.00 / 1M mixed",
    "description": "Whisper Large V3 is OpenAI's open-source automatic speech recognition model offering both audio transcription and translation. It supports 99+ languages and accepts common audio formats including mp3, mp4, wav, webm,...",
    "created": 1777642266,
    "mixedPricePerMillionUsd": 1500,
    "priceLabel": "$1500.00",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
  {
    "id": "mistralai/voxtral-mini-transcribe",
    "baseName": "Mistral: Voxtral Mini Transcribe",
    "displayName": "Mistral: Voxtral Mini Transcribe — $3000.00 / 1M mixed",
    "description": "Voxtral Mini Transcribe is Mistral's speech-to-text model, derived from the Voxtral Mini family. It accepts audio input and returns transcribed text via the standard transcription API. Suited for transcribing meetings,...",
    "created": 1778877024,
    "mixedPricePerMillionUsd": 3000,
    "priceLabel": "$3000.00",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
  {
    "id": "openai/whisper-1",
    "baseName": "OpenAI: Whisper 1",
    "displayName": "OpenAI: Whisper 1 — $6000.00 / 1M mixed",
    "description": "Whisper is OpenAI's open-source automatic speech recognition model, available via API as `whisper-1`. It supports transcription and translation across 50+ languages from audio files up to 25 MB. Accepts formats...",
    "created": 1777332905,
    "mixedPricePerMillionUsd": 6000,
    "priceLabel": "$6000.00",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
  {
    "id": "google/chirp-3",
    "baseName": "Google: Chirp 3",
    "displayName": "Google: Chirp 3 — $16000.00 / 1M mixed",
    "description": "Chirp 3 is Google's latest multilingual speech-to-text model. It offers enhanced transcription accuracy across 24 GA languages and 77+ preview languages, with support for automatic language detection, automatic punctuation, and...",
    "created": 1777997783,
    "mixedPricePerMillionUsd": 16000,
    "priceLabel": "$16000.00",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
  {
    "id": "openai/whisper-large-v3-turbo",
    "baseName": "OpenAI: Whisper Large V3 Turbo",
    "displayName": "OpenAI: Whisper Large V3 Turbo — $40000.00 / 1M mixed",
    "description": "Whisper Large V3 Turbo is an optimized version of OpenAI's Whisper Large V3 speech recognition model, designed for speed and cost efficiency. It supports transcription across 99+ languages with a...",
    "created": 1777642266,
    "mixedPricePerMillionUsd": 40000,
    "priceLabel": "$40000.00",
    "inputModalities": [
      "audio"
    ],
    "outputModalities": [
      "transcription"
    ]
  },
];

export const OPENROUTER_MODEL_CACHE_SNAPSHOT_DATE = '2026-05-27';

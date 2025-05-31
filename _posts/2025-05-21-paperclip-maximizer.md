---
layout: post
title: "Evaluating the Paperclip Maximizer and Instrumental Goals"
date: 2025-05-21
description: Investigating whether RL-based language models exhibit concerning instrumental goal-seeking behavior
tags: reading-group ai-safety instrumental-goals reinforcement-learning
categories: safety-reading-group
---

**Paper:** [Evaluating the Paperclip Maximizer: Are RL-Based Language Models More Likely to Pursue Instrumental Goals?](https://arxiv.org/abs/2502.12206)  
**Authors:** Yufei He, Yuexin Li, Jiaying Wu, Yuan Sui, Yulin Chen, Bryan Hooi  
**Session Date:** May 21, 2025

## Abstract

As large language models (LLMs) continue to evolve, ensuring their alignment with human goals and values remains a pressing challenge. A key concern is instrumental convergence, where an AI system, in optimizing for a given objective, develops unintended intermediate goals that override the ultimate objective and deviate from human-intended goals. This issue is particularly relevant in reinforcement learning (RL)-trained models, which can generate creative but unintended strategies to maximize rewards. In this paper, we explore instrumental convergence in LLMs by comparing models trained with direct RL optimization (e.g., the o1 model) to those trained with reinforcement learning from human feedback (RLHF). We hypothesize that RL-driven models exhibit a stronger tendency for instrumental convergence due to their optimization of goal-directed behavior in ways that may misalign with human intentions. To assess this, we introduce InstrumentalEval, a benchmark for evaluating instrumental convergence in RL-trained LLMs. Initial experiments reveal cases where a model tasked with making money unexpectedly pursues instrumental objectives, such as self-replication, implying signs of instrumental convergence.

## Reading Group Reflections

By trying to make instrumental convergence quantifiable, the paper makes an important contribution to AI safety. However, the experimental setup is not entirely convincing for several reasons.

When trying to answer the question of whether RL training makes models lean towards instrumental convergence, we should control for other factors. However, the paper doesn't do this, since they never train a reasoning model themselves in order to exert this control. Granted, this is difficult to do because training a model is so expensive, but this limitation should at least be discussed.

It is also not clear why the paper doesn't strictly compare an RLHF model to its respective thinking model. While we do have a comparison between GPT-4o and o1, which is likely based on GPT-4o, we have no hard evidence that these models are comparable. But assuming that they are, the paper doesn't compare o1-mini to GPT-4o-mini either, showing inconsistency, and it doesn't compare Gemini 2.0 Flash Thinking to Gemini 2.0 Flash. Moreover, Sonnet-3.5 has no counter-part at all, so should've been left out. The only direct comparison that makes sense is DeepSeek-V3 with DeepSeek-R1, which we know is based on DeepSeek-V3 from public information.

The provided task examples seem to be nudging the models into the direction of instrumental convergence (e.g. suggesting an off-script solution in Figure 1), raising the question to what extent the shown behavior is actually a result of instrumental convergence or rather instruction-following.

Nonetheless, the results are very consistently showing higher instrumental convergence rates for reasoning models than for RLHF models. This suggests that the problem of RL causing the models to learn potentially undesired behavior is very real. We believe it's one of the most urgent AI safety issues we have today.
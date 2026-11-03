---
title: Decomposing difficult tasks is ... difficult
description: The system in which reasoning LLM decomposes complex tasks into simpler ones for a weaker LLM to implement loses with single zero-shot thinking LLM but wins with zero-shot non-thinking model. This leaves a lot of room for improvement.
date: 2026-11-03
draft: false
authors:
  - Łukasz Karwacki
  - Florian Mai
label: Progress update
---
![[]](../../assets/updates/1_1.png)

Current forecasts mostly agree *artificial general intelligence* (AGI) will be achieved in this century (with large spread in exact years, although rather sooner than later) and *artificial superintelligence* (ASI) will not be far behind [1]. It is a reasonable to worry that the models will become too complex and too powerful for humans to comprehend and control. Therefore, currently a lot of work in AI alignment science is done to automate the research and develop better monitoring and control techniques over increasingly complex models. One of those directions is called *scalable oversight* [2]. 

In our project we approach this problem by introducing a system of two components: broadly defined strong AI (for our purposes it means a reasoning model) and a weaker component (non-reasoning AI or a human). Our goal is to show that we can train such system in a way that teaches the strong AI to decompose complex tasks into simpler subtasks that can be understood and implemented by the weaker of the two.

## Setup

We focus first on coding tasks using [`open-r1/codeforces (verifiable)`](https://huggingface.co/datasets/open-r1/codeforces){:target="_blank" rel="noopener noreferrer"} dataset.

In our system we consider, in general, four configurations which have prefix either *Direct*, or *Decomp*:
- Direct-T: direct zero-shot solver with thinking on (T),
- Direct-F: direct zero-shot solver with thinking off (F),
- Decomp-TF: a system of decomposer model with thinking on (T) and implementer model with thinking off (F).

Apart from this we have performed ablation studies on Decomp-FT (decomposer with thinking off and implementer with thinking on) and Decomp-FF (both models with thinking off) configurations.

The *Decomp* pipeline has four steps:
1. Decomposition: the strong model reads the task statement and writes a short chain of function docstrings.
2. Implementation: the weaker model writes each function from its docstring alone.
3. Composition: the functions are chained into one program.
4. Scoring: the program runs in a sandbox against the task's unit tests; a task counts as solved only if every test passes.

We use *Direct* configuration as a baseline to compare our decomposing pipeline against a zero-shot solver. In particular, Direct-T will not undergo training and becomes our ceiling (how a zero-shot reasoning model deals with the coding task). Direct-F, on the other hand, is our direct baseline which we will train using GRPO alongside our *Decomp* configuration.

In the first experiments we have used Qwen3.5-4B for both *Direct* configurations (thinking on/off) as well as decomposer model in the Decomp-TF configuration (thinking on) and Qwen3.5-2B (thinking off) as an implementer model. We have also performed additional evaluations where Qwen3.5-4B (thinking off) implements the same decompositions as Qwen3.5-2B before.

## Baseline

![[]](../../assets/updates/1_2.png)

Untrained decomposition with a 2B implementer lands just below the 4B solving the task without thinking, and far below the 4B thinking.

Four things stand out:

- **Thinking is worth about 46 points when solving directly.** Under the same sampler, the 4B goes from 38.8% without thinking to 84.4% with it. Most of Direct-T's remaining failures are answers cut off at the 32,768-token budget.
- **The 2B implementer costs more than the decomposition gains.** Handing Decomp-TF's own docstrings to the 4B instead of the 2B lifts the solve rate from 30.1% to 53.6%. That beats the 4B writing the program directly without thinking (33.5%), so the plans carry real information; the 2B loses much of it.
- **Most interface errors are the implementer's.** In 17% of the 2B's programs a helper cannot be called the way the chain expects, usually because it takes the wrong arguments. On the same docstrings the 4B makes this error in 0.3% of programs.
- **The decomposer needs to think.** With thinking off (Decomp-FF), the decomposer solves 10.1%. It does its reasoning inside the JSON strings instead ("Actually, …", "Final decision for function 2: …"), and 17% of its answers fail to parse, mostly on a missing comma between docstrings.

## Implications for AI safety

The preliminary results leave a lot of headroom for the decomposing system to learn. Currently there is a capability gap between the *Decomp* system and a single reasoning model (*Direct-T*). The decomposition system suffers from failure modes that a single reasoning model doesn't (for example interface issues between the decomposer and implementer as well as program composition). The gap can be partially closed by having a stronger implementer (still non-reasoning) or with further training.

## Next

We perform RLVR training using GRPO on our decomposer/implementer system and see if we can achieve better decompositions than our baselines and analyse failure modes that arise.

---
**References**
<small>

[1] D. Kokotajlo, S. Alexander, T. Larsen, E. Lifland, R. Dean, <a href="https://ai-2027.com" target="_blank" rel="noopener noreferrer">AI2027</a>, AI Futures Project (2025); T. Larsen, R. Dean, B. Halstead, E. Lifland, R. Greenblatt, D. Kokotajlo, <a href="https://ai-2040.com" target="_blank" rel="noopener noreferrer">AI2040</a>, AI Futures Project (2026); B. Todd, <a href="https://80000hours.org/ai/guide/when-will-agi-arrive" target="_blank" rel="noopener noreferrer">Will we have AGI by 2030?</a>, 80.000 hours (2026).

[2] P. Christiano, B. Shlegeris, D. Amodei, <a href="https://arxiv.org/abs/1810.08575" target="_blank" rel="noopener noreferrer">Supervising Strong Learners by Amplifying Weak Experts</a>, arXiv:1810.08575 (2018).

</small>
---
layout: post
title: "Dynamic Normativity and Value Alignment"
date: 2025-04-09
description: Exploring dynamic approaches to value alignment and necessary conditions for robust AI safety
tags: reading-group ai-safety value-alignment normativity
categories: safety-reading-group
---

**Paper:** [Dynamic Normativity: Necessary and Sufficient Conditions for Value Alignment](https://arxiv.org/abs/2406.11039)  
**Authors:** Nicholas Kluge Corrêa 
**Session Date:** April 9, 2025

## Abstract

The critical inquiry pervading the realm of Philosophy, and perhaps extending its influence across all Humanities disciplines, revolves around the intricacies of morality and normativity. Surprisingly, in recent years, this thematic thread has woven its way into an unexpected domain, one not conventionally associated with pondering "what ought to be": the field of artificial intelligence (AI) research. Central to morality and AI, we find "alignment", a problem related to the challenges of expressing human goals and values in a manner that artificial systems can follow without leading to unwanted adversarial effects. More explicitly and with our current paradigm of AI development in mind, we can think of alignment as teaching human values to non-anthropomorphic entities trained through opaque, gradient-based learning techniques. This work addresses alignment as a technical-philosophical problem that requires solid philosophical foundations and practical implementations that bring normative theory to AI system development. To accomplish this, we propose two sets of necessary and sufficient conditions that, we argue, should be considered in any alignment process. While necessary conditions serve as metaphysical and metaethical roots that pertain to the permissibility of alignment, sufficient conditions establish a blueprint for aligning AI systems under a learning-based paradigm. After laying such foundations, we present implementations of this approach by using state-of-the-art techniques and methods for aligning general-purpose language systems. We call this framework Dynamic Normativity. Its central thesis is that any alignment process under a learning paradigm that cannot fulfill its necessary and sufficient conditions will fail in producing aligned systems.

## Reading Group Reflections

The author, [Nicholas Kluge Corrêa](https://nkluge-correa.github.io/), philosopher and deep learning practitioner from the Center for Science and Thought at Uni Bonn, presented the core of his PhD thesis to us. Rather than viewing the conditions presented in the thesis as strictly necessary and sufficient conditions for alignment, they should be viewed as philosophical conditions and practical guidelines.
The necessary conditions revolve around assumptions of what intelligence is, how human behavior is driven by intentions, how intentions result from normative preferences, and how human preferences can be observed in the environment.
These assumptions seemed appropriate to make to us with mostly technical backgrounds, although Nicholas was quick to point out that philosophers can find them very disagreeable.
The technical guidelines stress the importance of coherently aggregating human preferences under uncertainty, making this a part of the objective function of AI systems, and implementing additional safety guardrails to mitigate unintended consequences.
These guidelines certainly make sense -- they are what's underpinning the platforms offering large language models today: For reinforcement learning from human feedback, we first learn a reward function that aggregates human preferences, and then we make that reward function a part of the training objective. Input and output filtering mechanism serve as additional guardrails to prevent misuse of the system or catches cases where the system goes off-rails.

So if present-day systems already follow the sufficient conditions for AI alignment, are all problems solved? Not quite. While humans impregnate the environment with their preferences, we can only hope to extract preferences that have been expressed in past environments, but not in future ones. As AIs are becoming part of our world and take over increasingly more sophisticated tasks, our preferences become highly uncertain to the point that it is difficult to extract a signal from.
Alignment isn't solved yet. 
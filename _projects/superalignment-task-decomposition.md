---
layout: page
title: Scalable Oversight by Learning to Decompose Tasks
description: how do we control superintelligent AI?
img: assets/img/projects/superalignment-with-dynamic-human-values.png
importance: 1
category: ongoing
---

### Synopsis

*Scalable Oversight by Learning to Decompose Tasks* explores a route to supervising increasingly capable reinforcement‑learning (RL) systems by having an AI **learn to break a hard task into "safe" subtasks** that a human‑level model (or a human) can reliably judge. Inspired by Iterated Amplification but removing the bottleneck of manual decomposition, we train a **decomposer policy**—via RL—to:

1. output subtasks in a constrained format,  
2. keep each subtask within the competence of a weaker LLM executor, and  
3. maximise final task correctness once the sub‑solutions are recomposed.

Our central questions are **part‑to‑whole generalisation** (does alignment on subtasks imply alignment of the entire answer?) and **robustness to reward‑hacking**. We describe a roadmap for this research direction in a [position paper](https://arxiv.org/abs/2503.13621) published at the [Workshop on Bidirectional Alignment](https://iclr.cc/virtual/2025/workshop/23986) at ICLR 2025.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/framework.png" title="Framework diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Our framework for scalable oversight through task decomposition and dynamic human value alignment.
</div>

### Outputs

* **Paper:** Superalignment with Dynamic Human Values, published at the ICLR 2025 Workshop on Bidirectional Human-AI Alignment (BiAlign) [(paper)](https://arxiv.org/abs/2503.13621)  
* **Talk:** "Scalable Oversight with Evolving Human Values", presented at the International Conference on Large-Scale AI Risks, KU Leuven ([slide deck](https://docs.google.com/presentation/d/1xSwmkp20RrV3lS_miMC-6T_o6hsBPTWu8Sxg3H3fvYs/edit?usp=sharing))

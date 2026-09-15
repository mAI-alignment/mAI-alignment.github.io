---
layout: page
title: Value Alignment
description: how do we make language models follow specified human value profiles?
img: assets/img/projects/val-alignment.png
importance: 3
category: ongoing
---

### Synopsis

*Value Alignment* tackles the challenge of steering language models so their behaviour follows a **specified human value profile**, such as one defined by the Schwartz Value Theory. A core question is whether these values manifest **consistently in out-of-domain evaluations**. Our current work explores a simple approach: fine-tuning models on value survey responses to induce the desired value system, as introduced in our EMNLP 2026 paper [From Value Conditioning to Behavioral Shift: Lightweight Value Alignment of LLMs](https://arxiv.org/abs/2508.11414).

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/val-alignment.png" title="Value conditioning and out-of-domain behavioral shift" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Left: the training signal is a single-digit answer to a value survey question, lowered for the target value and left at baseline for others. Right: we test out of domain whether behavior shifts accordingly, on moral judgments of Reddit posts (AITA) and in text adventures (MACHIAVELLI).
</div>

### Outputs

* **EMNLP 2026:** From Value Conditioning to Behavioral Shift: Lightweight Value Alignment of LLMs [(paper)](https://arxiv.org/abs/2508.11414)

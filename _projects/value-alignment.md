---
layout: page
title: Value Alignment
description: how do we make language models follow specified human value profiles?
img: assets/img/projects/value_alignment.png
importance: 3
category: ongoing
---

### Synopsis

*Value Alignment* tackles the challenge of steering language models so their behaviour follows a **specified human value profile**, such as one defined by the Schwartz Value Theory. A core question is whether these values manifest **consistently in out-of-domain evaluations**. Our current work explores a simple approach: fine-tuning models on value survey responses to induce the desired value system, as introduced in our [Survey-to-Behavior paper](https://arxiv.org/abs/2508.11414).

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/value-alignment-diagram.png" title="Aligned value profile" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Example of a value profile aligned through survey-based fine-tuning.
</div>

### Outputs

* **EMNLP 2026:** Survey-to-Behavior: Downstream Alignment of Human Values in LLMs via Survey Questions [(paper)](https://arxiv.org/abs/2508.11414)

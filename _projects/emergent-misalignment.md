---
layout: page
title: Emergent Misalignment
description: how do we prevent narrow finetuning from causing broad misalignment?
img: assets/img/projects/emergent-misalignment.png
importance: 1
category: ongoing
---

### Synopsis

*Emergent Misalignment* investigates how seemingly narrow fine-tuning can yield
**broadly misaligned behaviors** far outside the training domain, as demonstrated in
[Emergent Misalignment: Narrow finetuning can produce broadly misaligned LLMs](https://arxiv.org/abs/2502.17424).
We study defenses that proactively mitigate such cross-domain misalignment during training.
This work highlights the challenge of **preventing emergent misalignment in the fine-tuning loop itself**,
building on our recent methods for in-training safeguards described in
[In-Training Defenses against Emergent Misalignment in Language Models](https://arxiv.org/abs/2508.06249).

In [Reinforcement Learning Can Amplify Emergent Misalignment from Harmless Rewards](https://arxiv.org/abs/2605.31328) (EMNLP 2026),
we show that emergent misalignment also arises from **reinforcement learning** in small open-weight models,
where it is stronger than with sample-matched supervised fine-tuning and can even be induced by plausibly natural reward signals.
Encouragingly, in-training mitigations developed for the supervised setting largely transfer to RL.

In [Data Attribution of Emergent Misalignment with Persona Features](https://arxiv.org/abs/2608.11025) (BlackboxNLP 2026),
we trace the **persona features** that drive emergent misalignment back to pre-training documents about villainous characters and harmful agency.
Fine-tuning on these human-written documents does not reliably induce emergent misalignment, whereas synthetic instruction-response pairs
derived from the same content do, suggesting that response structure or model-generated phrasing plays a key role.

<div class="row justify-content-sm-center">
    <div class="col-sm-6 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/emergent-misalignment.png" title="Emergent misalignment" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Illustration of the challenge to balance between prevention of emergent misalignment and facilitating good performance on benign tasks. 
</div>


### Outputs

* **ICML 2026:** In-Training Defenses against Emergent Misalignment in Language Models [(paper)](https://arxiv.org/abs/2508.06249)
* **EMNLP 2026:** Reinforcement Learning Can Amplify Emergent Misalignment from Harmless Rewards [(paper)](https://arxiv.org/abs/2605.31328)
* **BlackboxNLP 2026 (EMNLP workshop):** Data Attribution of Emergent Misalignment with Persona Features [(paper)](https://arxiv.org/abs/2608.11025)


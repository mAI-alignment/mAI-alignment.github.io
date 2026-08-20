---
layout: page
title: Backdoor Detection
description: how do we detect hidden behaviors in LLMs without knowing what to look for?
img: assets/img/projects/backdoor-detection.png
importance: 2
category: ongoing
---

### Synopsis

*Backdoor Detection* asks how a model auditor can uncover **hidden behaviors that activate only under narrow conditions** — backdoor triggers, sleeper-agent deployment cues, sandbagging, reward hacking, or topic-conditioned censorship — without any prior knowledge of what to look for. Existing defenses sidestep this problem by assuming exactly what an auditor cannot have: a trigger shape, the poisoned training set, or labeled examples of the behavior.

We introduce **activation-matched finetuning**, an unsupervised detection method that assumes none of these. Given a suspect model and a publicly available anchor model, we finetune the anchor to reproduce the suspect's residual-stream activations on a small *unlabeled* benign corpus, and score each evaluation prompt by the residual between the two models. Since no benign corpus covers the sparse trigger region, the reference learns the benign computation but receives no signal to reproduce the hidden one. Trigger prompts therefore incur a large residual — and crucially, so do their *semantic neighbors*, which a generic evaluation corpus is likely to contain. A defender with no prior knowledge of the trigger can thus read off information about it from the highest-scoring prompts.

Our central questions are:

1. **Can a cross-model residual expose hidden behavior** with no trigger or behavior knowledge?
2. **Does the signal extend into the trigger's semantic neighborhood**, so that the defender learns what the trigger is about?
3. **Can a defense-aware adversary suppress the signal** without sacrificing the hidden behavior itself?

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.html path="assets/img/projects/backdoor-detection.png" title="Activation-matched finetuning method overview" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Method overview. (a) We finetune a reference model to match the activations of the suspect model on a small training corpus of benign prompts. (b) On a held-out test corpus, the per-prompt residual is small for benign prompts, but spikes for the trigger and for trigger-adjacent prompts in its semantic neighborhood.
</div>

### Outputs

* **Preprint:** Detecting Hidden Behaviors in LLMs via Activation-matched Finetuning [(paper)](/assets/pdf/backdoor_detection.pdf)
* **Code:** [activation-matched-finetuning](https://github.com/RobinHaselhorst/activation-matched-finetuning/)

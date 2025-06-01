---
layout: page
title: Learning to Plan from Unlabeled Data
description: how do we train architectures for planning without labeled data?
img: assets/img/projects/learning-to-plan.png
importance: 2
category: ongoing
---

### Synopsis

*Learning to Plan from Unlabeled Data* explores how language models can acquire **explicit planning abilities without labeled supervision**.  
Instead of manually annotated step‑by‑step instructions, we train a lightweight *planner* directly from raw, unlabeled text corpora such as the web: given a context, it predicts a sequence of high‑level “actions” that steer the base LM during generation.  
Our central research questions are:

1. **Can latent plans be extracted from unstructured text alone?**  
2. **How can we condition the LM on high-level actions?**
3. **Can we scale the amount of inference-time compute to improve performance?**

### Outputs

* **Paper:** Learning to Plan for Language Modeling from Unlabeled Data — CoLM 2024 [(paper)](https://openreview.net/forum?id=nT6fQIidrQ)
* **Preprint:** Learning to Plan Long‑Term for Language Modeling — arXiv [(paper)](https://arxiv.org/abs/2409.00070)
* **Extended Abstract:** Improving Language Modeling by Increasing Test-time Planning Compute — WideningNLP 2024 [(paper)](https://openreview.net/forum?id=S3yyjW9OSY)
* **Preprint:** End‑to‑End Planner Training for Language Modeling — arXiv [(paper)](https://arxiv.org/abs/2410.12492)
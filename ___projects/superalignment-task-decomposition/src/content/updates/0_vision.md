---
title: Scalable oversight by learning to decompose tasks
description: Our vision and goals for scalable oversight over AI systems.
date: 2026-11-03
draft: false
authors:
  - Łukasz Karwacki
  - Florian Mai
label: Vision & Goals
---

![[]](../../assets/updates/0.png)

Think of an architect or a lead engineer from an engineering firm who got an assignment to design and oversee a construction of a bridge. The architect has to have a broad engineering knowledge acquired through years of education and practical experience, including structural mechanics, material properties, load distribution, and the principles of engineering design. The architect is also liable for potential catastrophes so he has to make sure that the project is designed with safety in mind.

The workers who actually build the bridge don't necessarily need to understand the physics of materials, calculate structural equilibria, or analyze the bridge's response to dynamic loads. They need to be given tasks that are sufficiently small, clearly specified, and appropriate to their level of expertise, so that they can execute them without understanding the entire project. Some workers are responsible for laying the concrete foundations, others for transporting and assembling structural components, and still others for testing materials and inspecting the construction. If the workers don't understand the tasks they were assigned (for example if someone responsible just for transporting the components of the bridge also has to calculate the resonance frequencies of the bridge) the safety of this whole endeavor is threatened.

Now think of a situation you might recognize from your own work in which you give your coding agent a task to solve. If you're using the latest models there is a chance that your agent will delegate parts of the work to subagents. But how can you be sure that the task will be solved the way you want it to be solved and if the task will be solved in a way that doesn't accidentally cause harm or go against your own (unspecified) wishes? What if at some point (which you might be encountering already) you don't exactly understand the solution and all its consequences, but accept it because "it just works"? Wouldn't you prefer to have a way to understand if the solution is aligned with your wishes and values?

## Motivation

Frontier AI laboratories are increasingly pursuing artificial general intelligence (AGI) and potentially artificial superintelligence (ASI), with the automation of AI research itself emerging as one possible pathway [1, 2]. As AI systems become more capable and autonomous, ensuring that their decisions and actions remain aligned with human goals and values becomes increasingly challenging.

One promising research direction is *scalable oversight*: developing methods that allow weaker supervisors, including humans and less capable AI models, to reliably supervise more capable systems [3, 4]. Existing approaches include recursive supervision, AI debate, weak-to-strong generalization, and easy-to-hard generalization [5, 6, 7]. However, their reliability under increasing capability gaps remains an open question [8, 9].

This challenge becomes particularly relevant for *agentic AI systems*, which autonomously decompose complex problems, delegate subtasks, use external tools, and integrate intermediate results. In such systems, locally correct or aligned behavior does not necessarily guarantee globally aligned outcomes. This raises a fundamental question of *alignment composability*: under what conditions can individually supervised components be combined into a system that reliably satisfies global objectives? Related challenges have been investigated in formal verification and multi-agent reinforcement learning [10–12], but their implications for scalable oversight of increasingly capable AI systems remain insufficiently understood.

### Open research gaps

|Research gap|Central question|
|---|---|
|Capability scaling|How does oversight reliability change as the capability gap between supervisor and agent increases?|
|Error propagation|How do local errors accumulate or interact during task decomposition and recomposition?|
|Reward hacking|Can stronger agents exploit weaknesses in their supervisors?|
|Correlated failures|Can multiple overseers develop shared blind spots that undermine collective reliability?|
|Oversight allocation|How should limited verification resources be distributed across subtasks?|
|Ground-truth scarcity|How can oversight be evaluated when the correct solution is unknown?|
|Adaptive adversaries|Can oversight protocols remain reliable when agents strategically adapt to them?|
|Alignment composability|Under what conditions does local alignment imply global alignment?|

## Goals

Our project aims to investigate whether task decomposition and capability asymmetry can be used to construct more reliable and interpretable oversight mechanisms.

In particular, we seek to answer the following questions:

1. **Learning to decompose:** Can a more capable AI system learn to decompose complex tasks into subtasks that weaker models can reliably execute and verify?
    
2. **Alignment composability:** Under what conditions do locally correct and aligned solutions compose into a globally aligned outcome?
    
3. **Oversight reliability:** How do decomposition structure, capability gaps, and verification mechanisms affect the propagation and detection of errors?
    
4. **Oversight by design:** Can we develop learning objectives that explicitly encourage verifiability, compositional correctness, and compatibility with human oversight?

## Implications for safe AI

If successful, our approach could provide a mechanism for supervising AI systems whose capabilities exceed those of their human operators. By requiring powerful models to express complex decisions through simpler, independently verifiable subtasks, the architecture could make their behavior more interpretable and auditable. Less capable implementers and verifiers could serve as intermediate control points, potentially limiting the execution of actions that cannot be adequately specified or validated.

Crucially, the effectiveness of such an architecture depends on whether local guarantees can be preserved during recomposition. Establishing these conditions could contribute to the development of AI systems that remain subject to meaningful human oversight even as their capabilities increase.

---
**References**
<small>

[1] D. Kokotajlo, S. Alexander, T. Larsen, E. Lifland, and R. Dean, <a href="https://ai-2027.com" target="_blank" rel="noopener noreferrer">AI2027</a>, AI Futures Project (2025); T. Larsen, R. Dean, B. Halstead, E. Lifland, R. Greenblatt, and D. Kokotajlo, <a href="https://ai-2040.com" target="_blank" rel="noopener noreferrer">AI2040</a>, AI Futures Project (2026); B. Todd, <a href="https://80000hours.org/ai/guide/when-will-agi-arrive" target="_blank" rel="noopener noreferrer">Will we have AGI by 2030?</a>, 80.000 hours (2026).

[2] J. Wen, L. Qiu, J. Benton, J. H. Kirchner, and J. Leike, <a href="https://alignment.anthropic.com/2026/automated-w2s-researcher/" target="_blank" rel="noopener noreferrer">Automated Weak-to-Strong Researcher</a>, Anthropic Alignment Science Blog (2026).

[3] P. Christiano, B. Shlegeris, and D. Amodei, <a href="https://arxiv.org/abs/1810.08575" target="_blank" rel="noopener noreferrer">Supervising Strong Learners by Amplifying Weak Experts</a>, arXiv:1810.08575 (2018).

[4] S. Bowman *et al.*, <a href="https://arxiv.org/abs/2211.03540" target="_blank" rel="noopener noreferrer">Measuring Progress on Scalable Oversight for Large Language Models</a>, arXiv:2211.03540 (2022).

[5] C. Burns, P. Izmailov, J. H. Kirchner, B. Baker, L. Gao, L. Aschenbrenner, Y. Chen, A. Ecoffet, M. Joglekar, J. Leike, I. Sutskever, and J. Wu, <a href="https://dl.acm.org/doi/10.5555/3692070.3692266" target="_blank" rel="noopener noreferrer">Weak-to-strong generalization: eliciting strong capabilities with weak supervision</a>, Proceedings of the 41st International Conference on Machine Learning (ICML'24), 196, 4971–5012 (2024).

[6] Z. Sun, L. Yu, Y. Shen, W. Liu, Y. Yang, S. Welleck, and C. Gan, <a href="https://proceedings.neurips.cc/paper_files/paper/2024/file/5b6346a05a537d4cdb2f50323452a9fe-Paper-Conference.pdf" target="_blank" rel="noopener noreferrer">Easy-to-Hard Generalization: Scalable Alignment Beyond Human Supervision</a>, Advances in Neural Information Processing Systems 37, 51118-51168 (2024).

[7] G. Irving, P. Christiano, and D. Amodei, <a href="https://arxiv.org/abs/1805.00899" target="_blank" rel="noopener noreferrer">AI Safety via Debate</a>, arXiv:1805.00899 (2018).

[8] J. Engels, D. Baek, S. Kantamneni, and M. Tegmark, <a href="https://doi.org/10.52202/085713-3254" target="_blank" rel="noopener noreferrer">Scaling Laws For Scalable Oversight</a>, Advances in Neural Information Processing Systems, 38, 97327–97366 (2025).

[9] Z. Kenton, N. Y. Siegel, J. Kramár, J. Brown-Cohen, S. Albanie, J. Bulian, R. Agarwal, D. Lindner, Y. Tang, N. D. Goodman, and R. Shah, <a href="https://proceedings.neurips.cc/paper_files/paper/2024/hash/899511e37a8e01e1bd6f6f1d377cc250-Abstract-Conference.html" target="_blank" rel="noopener noreferrer">On scalable oversight with weak LLMs judging strong LLMs</a>, Advances in Neural Information Processing Systems 37, 752290-75276 (2024).

[10] M. Kazemi, M. Perez, F. Somenzi, S. Soudjani, A. Trivedi, and A. Velasquez,  <a href="https://ojs.aaai.org/index.php/AAAI/article/view/30116" target="_blank" rel="noopener noreferrer">Assume-Guarantee Reinforcement Learning</a>, Proceedings of the AAAI Conference on Artificial Intelligence 38, 21223–21231 (2024).

[11] R. Dewes, R. Dimitrova, <a href="https://doi.org/10.1609/aaai.v39i22.34480" target="_blank" rel="noopener noreferrer">Contract-based Design and Verification of Multi-Agent Systems with Quantitative Temporal Requirements</a>, Proceedings of the AAAI Conference on Artificial Intelligence 39, 23152–23159 (2025).

[12] X. Xu, X. Li, X. Qu, J. Fu, and B. Yuan, <a href="https://proceedings.iclr.cc/paper_files/paper/2026/hash/c04d37be05ba74419d2d5705972a9d64-Abstract-Conference.html" target="_blank" rel="noopener noreferrer">Local Success Does Not Compose: Benchmarking Large Language Models for Compositional Formal Verification</a>, International Conference on Learning Representations 2026 (ICLR 2026) (2026).

</small>



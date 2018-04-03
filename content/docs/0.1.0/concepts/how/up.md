---
title: Using Kubepack CLI
menu:
  docs_0.1.0:
    identifier: cli-how
    name: CLI
    parent: how-concepts
    weight: 25
menu_name: docs_0.1.0
section_menu_id: concepts
---

> New to Kubepack? Please start [here](/docs/0.1.0/concepts/README).

# How up command works

`pack up -f .` command combines `manifests/vendor` and `manifests/patch` folders and generates `manifests/output` folder. It works in couples of step.

 - Combines `manifests/vendor` and `manifests/patch` to `manifests/output` folder.
 - Generates a DAG(Directed Acyclic Graph) from `dependency-list.yaml`. From this dependency graph, it generates a `install.sh` file. This installer script contains commands to deploy `manifests/output` folder. Each parent package can provide their own `install.sh` script. If no script is provided, `kubectl apply -R -f .` command will be used to install a package.

- [Example](/docs/0.1.0/_testdata/test-11)

## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/user).
- To learn about `dependency-list.yaml` file, please visit [here](/docs/0.1.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0/concepts/how/cli).

---
title: Scenarios | Kubepack
menu:
  docs_0.1.0:
    identifier: s10-guides
    name: Scenario 10
    parent: guides
    weight: 70
menu_name: docs_0.1.0
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0/concepts/README).

# Scenario-10

**This docs trying to explain the behavior of Pack**
***

This section explain how `jsonnet` appears *Pack*,
more complex situation than [scenario-9](scenario-9.md)

![alt text](/docs/0.1.0/_testdata/test-10/test-10.jpg)

Above diagram shows the dependency chain. Here,

 - `test-10` depend on repository `kube-a` (branch `test-10`).
 - `kube-a` depends on repository `kube-b` (branch `test-10`). Also, contains a jsonnet file.
 - `kube-b` depends on repository `kube-c` (branch `test-10`).
  Also, contains a patch of yaml file from `kube-a` repository.
 This yaml is generated from jsonnet file.
 - `kube-c` depend on nothing.

See `dependency-list.yaml` file below:

```console
    $ cat dependency-list.yaml

    items:
    - package: github.com/kubepack/kube-a
      branch: test-10

```

#### Get Dependencies

`$ pack dep -f .` command gets all the dependencies and place it under `manifests/vendor` folder.
 In this scenario, following things happen:

  - `kube-b` repository contains patch of jsonnet file's yaml,
   so `kube-c`'s jsonnet will be yaml. This yaml is combination of
   **jsonnet's yaml and this yaml's patch which exists in kube-b repository.**
  -  `kube-a` contains a jsonnet file.
  In `manifests/vendor` folder, this `jsonnet` file will be converted into yaml file.


Now, `$ pack up -f .` command will generate the final output in `manifests/output` folder.

```console
    $ tree manifests/output/


    manifests/output/
    └── github.com
        └── kubepack
            ├── kube-a
            │   └── manifests
            │       └── app
            │           ├── foocorp-shard.jsonnet
            │           ├── nginx-deployment.yaml
            │           └── nginx-dm.yaml
            ├── kube-b
            │   └── manifests
            │       └── app
            │           ├── nginx-deployment.yaml
            │           └── nginx-dm.yaml
            └── kube-c
                └── manifests
                    └── app
                        ├── foocorp-shard.jsonnet
                        ├── nginx-deployment.yaml
                        └── nginx-dm.yaml

    11 directories, 8 files
```

## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/user).
- To learn about `dependency-list.yaml` file, please visit [here](/docs/0.1.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0/concepts/how/cli).

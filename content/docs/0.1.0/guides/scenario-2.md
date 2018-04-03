---
title: Scenarios | Kubepack
menu:
  docs_0.1.0:
    identifier: s2-guides
    name: Scenario 2
    parent: guides
    weight: 70
menu_name: docs_0.1.0
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0/concepts/README).

# Scenario-2

**This docs trying to explain the behavior of Pack**
***

This section explain [test-2](https://github.com/kubepack/pack/tree/master/docs/_testdata/test-2).

If you look into this test's `dependency-list.yaml` file.
```console
$ cat dependency-list.yaml

items:
- package: github.com/kubepack/kube-a
  branch: test-2

```
You'll see it depends on branch `test-2` of repository [kube-a](https://kubepack/kube-a).

You can see the whole dependencies in below image.

![alt text](/docs/0.1.0/_testdata/test-2/test-2.jpg)

### Explanation

1. [test-2](https://github.com/kubepack/pack/tree/master/docs/_testdata/test-2) directly depends on branch `test-2` of [kube-a](https://github.com/kubepack/kube-a/tree/test-2).

2. [kube-a](https://github.com/kubepack/kube-a/tree/test-2) depends on branch `test-2` of [kube-b](https://github.com/kubepack/kube-b/tree/test-2) repository. `kube-a` contains the patch of `kube-b`'s `nginx-deployment.yaml` file.

3. [kube-b](https://github.com/kubepack/kube-b/tree/test-2) depends on branch `test-2` of [kube-c](https://github.com/kubepack/kube-c/tree/test-2) repository. `kube-b` contains the patch of `kube-c`'s `nginx-deployment.yaml` file.

When run `$ pack dep -f .` in `test-2`, following things happen.

1. Get all the dependencies, reading `dependency-list.yaml` file.
2. `kube-b`'s `nginx-deployment.yaml` file is combination of patch (exists in `kube-a` repository) and original file (exists in `kube-b` repository).
3. `kube-c`'s `nginx-deployment.yaml` file is combination of patch (exists in `kube-b` repository) and original file (exists in `kube-c` repository).


## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/user).
- To learn about `dependency-list.yaml` file, please visit [here](/docs/0.1.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0/concepts/how/cli).

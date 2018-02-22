---
title: Scenarios | Kubepack
menu:
  docs_0.1.0-alpha.0:
    identifier: s6-guides
    name: Scenario 6
    parent: guides
    weight: 70
menu_name: docs_0.1.0-alpha.0
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0-alpha.0/concepts/README).

# Scenario-6

**This docs explain how Pack's fork works.**
***

This section explain [test-6](https://github.com/kubepack/kubepack/tree/master/docs/_testdata/test-6).

If you look into this test's `manifest.yaml` file.

```console
$ cat manifest.yaml

package: github.com/kubepack/kubepack/docs/_testdata/test-6
owners:
- name: Appscode
  email: team@appscode.com
dependencies:
- package: github.com/kubepack/kube-a
  branch: test-6
  fork: https://github.com/kubepack/kube-d.git
- package: github.com/kubepack/kube-b
  branch: test-6
  fork: github.com/kubepack/kube-c
```


See image below, which describe whole dependency.

![alt text](/docs/0.1.0-alpha.0/_testdata/test-6/test-6.jpg)


Explanation of image:

1. `kube-c` and `kube-d` both patch repository `kube-a` and `kube-b`.
2. This test depends on two repository.
  - fork `kube-d` of `kube-a` repo.
  - fork `kube-c` of `kube-b` repo.

Now, `$ pack dep` command get the dependencies and place under `_vendor` folder. `pack` pulls `kube-a` from fork `kube-d` and `kube-b` from fork `kube-c`.


## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0-alpha.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0-alpha.0/concepts/how/user).
- To learn about `manifest.yaml` file, please visit [here](/docs/0.1.0-alpha.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0-alpha.0/concepts/how/cli).

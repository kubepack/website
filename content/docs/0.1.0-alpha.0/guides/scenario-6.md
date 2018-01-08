---
title: Scenarios | Kubepack
menu:
  docs_0.1.0-alpha.0:
    identifier: s6-guides
    name: Schenario 6
    parent: guides
    weight: 70
menu_name: docs_0.1.0-alpha.0
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0-alpha.0/concepts/README).

# Scenario-6

**This docs trying to explain the behavior of Pack**
***

This section explain [test-6](https://github.com/kubepack/kubepack/tree/master/_testdata/test-6).

If you look into this test's `manifest.yaml` file.

```console
$ cat manifest.yaml

package: github.com/kubepack/kubepack/_testdata/test-6
owners:
- name: Appscode
  email: team@appscode.com
dependencies:
- package: github.com/kubepack/kube-a
  branch: test-6
```

See image below, which describe whole dependency.
![alt text](/_testdata/test-6/test-6.jpg)

Explanation of image:

1. This test directly depends on `kube-a` of branch `test-6`.
2. `kube-a`'s depends on `kube-b` of branch `test-6`.
See this manifest.yaml file [here](https://github.com/kubepack/kube-a/blob/test-6/manifest.yaml)
3. `kube-b`'s depends on `kube-c` of branch `test-6`.
See this manifest.yaml file [here](https://github.com/kubepack/kube-b/blob/test-6/manifest.yaml)
4. `kube-c`'s depends on none.
See this manifest.yaml file [here](https://github.com/kubepack/kube-c/blob/test-6/manifest.yaml)


Now, `$ pack dep` command will get all the dependencies and place it under `_vendor` folder.

## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0-alpha.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0-alpha.0/concepts/how/user).
- To learn about `manifest.yaml` file, please visit [here](/docs/0.1.0-alpha.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0-alpha.0/concepts/how/cli).
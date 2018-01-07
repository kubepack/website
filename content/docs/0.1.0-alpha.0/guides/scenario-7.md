---
title: Scenarios | Kubepack
menu:
  docs_0.1.0-alpha.0:
    identifier: s7-guides
    name: Schenario 7
    parent: guides
    weight: 70
menu_name: docs_0.1.0-alpha.0
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0-alpha.0/concepts/README).

# Scenario-7

**This docs trying to explain the behavior of Pack**
***

This section explain [test-7](https://github.com/kubepack/pack/tree/master/_testdata/test-7).

If you look into this test's `manifest.yaml` file.

```console
$ cat manifest.yaml

package: github.com/kubepack/pack/_testdata/test-7
owners:
- name: Appscode
  email: team@appscode.com
dependencies:
- package: github.com/kubepack/kube-a
  branch: test-7
```

See image below, which describe whole dependency.
![alt text](/_testdata/test-7/test-7.jpg)

Explanation of image:

1. This test directly depends on `kube-a` of branch `test-7`.
2. `kube-a`'s depends on `kube-b` of branch `test-7`.
See this manifest.yaml file [here](https://github.com/kubepack/kube-a/blob/test-7/manifest.yaml).
3. `kube-b`'s depends on `kube-c` of branch `test-7`.
See this manifest.yaml file [here](https://github.com/kubepack/kube-b/blob/test-7/manifest.yaml).
4. `kube-c`'s depends on none.
See this manifest.yaml file [here](https://github.com/kubepack/kube-c/blob/test-7/manifest.yaml).

Here, both `kube-a` and `kube-b` has patch of repository `kube-c`'s [nginx-deployment.yaml file](https://github.com/kubepack/kube-c/blob/test-7/nginx-deployment.yaml).
You can check these patch here:
[kube-a](https://github.com/kubepack/kube-a/blob/test-7/patch/github.com/kubepack/kube-c/nginx-deployment.yaml) and
 [kube-b](https://github.com/kubepack/kube-b/blob/test-7/patch/github.com/kubepack/kube-c/nginx-deployment.yaml).


Now, run `$ pack dep` command, get all the dependencies `kube-a`, `kube-b` and  `kube-c` of branch `test-7`.
As, `kube-a` and `kube-b` both contain patch of `kube-c`'s [nginx-deployment.yaml file](https://github.com/kubepack/kube-c/blob/test-7/nginx-deployment.yaml).
This file is the combination of both patch and original file.

## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0-alpha.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0-alpha.0/concepts/how/user).
- To learn about `manifest.yaml` file, please visit [here](/docs/0.1.0-alpha.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0-alpha.0/concepts/how/cli).

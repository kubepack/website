---
title: Scenarios | Kubepack
menu:
  docs_0.1.0-alpha.0:
    identifier: s2-guides
    name: Schenario 2
    parent: guides
    weight: 70
menu_name: docs_0.1.0-alpha.0
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0-alpha.0/concepts/README).

# Scenario-2

**This docs trying to explain the behavior of Pack**
***

This section explain [test-2](https://github.com/kubepack/kubepack/tree/master/_testdata/test-2).

If you look into this test's `manifest.yaml` file.

```console
$ cat manifest.yaml

package: github.com/kubepack/kubepack/_testdata/test-2
owners:
- name: Appscode
  email: team@appscode.com
dependencies:
- package: github.com/kubepack/kube-a
  branch: test-2
- package: github.com/kubepack/kube-b
  branch: test-2
```

Here, [test-2](https://github.com/kubepack/kubepack/tree/master/_testdata/test-2) depends on two repositories.
1. [kube-a](https://github.com/kubepack/kube-a) of branch `test-2`.
2. [kube-b](https://github.com/kubepack/kube-b) of branch `test-2`.

Both of the above repository contains the patch of repository [kube-c](https://github.com/kubepack/kube-c/tree/test-2)'s
 branch `test-2` in same file (nginx-deployment.yaml).

 See the image.
 ![alt text](/_testdata/test-2/test-2.jpg)

You can see the both patch below

```console
# kube-a contains this patch of kube-c

spec:
  replicas: 2
```

```console
# kube-b contains this patch of kube-c

apiVersion: apps/v1beta2
```

When run `pack dep` command, following things happen.

1. Get all the dependencies, reading `manifest.yaml` file.
2. As, `kube-a` and `kube-b` both contains patch of repository `kube-c`,
`kube-c` in `_vendor` folder is combination of both of this patch and original file.


## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0-alpha.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0-alpha.0/concepts/how/user).
- To learn about `manifest.yaml` file, please visit [here](/docs/0.1.0-alpha.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0-alpha.0/concepts/how/cli).

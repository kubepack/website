---
title: Scenarios | Kubepack
menu:
  docs_0.1.0:
    identifier: s5-guides
    name: Scenario 5
    parent: guides
    weight: 70
menu_name: docs_0.1.0
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0/concepts/README).

# Scenario-5

**This docs trying to explain the behavior of Pack**
***

This section explain [test-5](https://github.com/kubepack/pack/tree/master/docs/_testdata/test-5).

If you look into this test's `dependency-list.yaml` file.

```console
$ cat dependency-list.yaml

items:
- package: github.com/kubepack/kube-a
  branch: test-5
- package: github.com/kubepack/kube-b
  branch: test-5
```

Here, [test-5](https://github.com/kubepack/pack/tree/master/docs/_testdata/test-5) depends on two repositories.

1. branch `test-5` of [kube-a](https://github.com/kubepack/kube-a/tree/test-5).
2. branch `test-5` of [kube-b](https://github.com/kubepack/kube-b/tree/test-5).

Both of the above repository contains the patch of repository [kube-c](https://github.com/kubepack/kube-c/tree/test-5)'s
 branch `test-5` in same file (nginx-deployment.yaml).

 See the image.
 
![alt text](/docs/0.1.0/_testdata/test-5/test-5.jpg)

You can see the both patch below

```console
# kube-a contains this patch of kube-c

apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: nginx-c
spec:
  template:
    metadata:
      labels:
        app: nginx1

```

```console
# kube-b contains this patch of kube-c

apiVersion: apps/v1beta1
kind: Deployment
metadata:
  name: nginx-c
spec:
  replicas: 2

```

When run `pack dep -f .` command, following things happen.

1. Get all the dependencies, reading `dependency-list.yaml` file.
2. As, `kube-a` and `kube-b` both contains patch of repository `kube-c`,
`kube-c` in `manifests/vendor` folder is combination of both patches and original file.


## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/user).
- To learn about `dependency-list.yaml` file, please visit [here](/docs/0.1.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0/concepts/how/cli).

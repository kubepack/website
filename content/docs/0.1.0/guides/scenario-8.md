---
title: Scenarios | Kubepack
menu:
  docs_0.1.0:
    identifier: s8-guides
    name: Scenario 8
    parent: guides
    weight: 75
menu_name: docs_0.1.0
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0/concepts/README).

# Scenario-8


**This docs explain how Pack works inside cluster.**
***

In this scenario, we'll do following things.

1. Create a git repository.
   - This repository requires [test-kubed](https://github.com/kubepack/test-kubed) through `dependency-list.yaml` file.
   - Run `$ pack dep -f .` to get the dependencies and `$ pack edit -f . -p <filepath>` to make desired changes.
   - Then, run `$ pack up -f .` to final version under `manifests/output` folder.
   - Last, commit our changes to git repository.

2.  Now, I write a pod yaml, you can see it [here](https://raw.githubusercontent.com/kubepack/kubepack/master/docs/_testdata/test-8/pod.yaml).
In this pod, our above git repository mounted as volume path. Image [a8uhnf/git-mount:1.0.0](https://hub.docker.com/r/a8uhnf/git-mount/tags/) checks the mounted path. If there is an `manifest/output` folder then it'll apply `$ kubectl apply -R -f <manifest/output folder path>`.


## Step by Step Guide

First, create a git repository

Create a `dependency-list.yaml` file in your git repository. Your `dependency-list.yaml` file will look like below.

```console
    $ cat dependency-list.yaml

items:
 - package: github.com/kubepack/test-kubed
   branch: master
```

It depends on [test-kubed](https://github.com/kubepack/test-kubed)'s master branch.

Now, run `$ pack dep -f .`. This command will get all the dependencies and place under `manifests/vendor` folder.

```console
    $ tree manifests/vendor/

    manifests/vendor/
    └── github.com
        └── kubepack
            └── test-kubed
                ├── dependency-list.yaml
                └── manifests
                    └── app
                        ├── deployment.yaml
                        ├── kubed-config.yaml
                        └── service.yaml
    
    5 directories, 4 files
```

Now, you have all the dependencies.

Now, suppose you want to edit `deployment.yaml` file and make the replicas from 1 to 2.


Below command will open the `deployment.yaml` file in editor. Then made the changes.
```console
    $ pack edit -f . -p manifests/vendor/github.com/kubepack/test-kubed/manifests/app/deployment.yaml
```

This command will generate a patch file under `manifests/patch` folder.

```console
    $ tree manifests/patch/

    manifests/patch/
    └── github.com
        └── kubepack
            └── test-kubed
                └── kubed-operator.deployment.extensions.yaml
    
    3 directories, 1 file
```


Then, run `$ pack up -f .`, which will combine original and patch file and place under `manifests/output` folder.

```console
    $ tree manifests/output/

    manifests/output/
    └── github.com
        └── kubepack
            └── test-kubed
                └── manifests
                    └── app
                        ├── deployment.yaml
                        ├── kubed-config.yaml
                        └── service.yaml
    
    5 directories, 3 files
```

Now, last step, commit the whole thing and push it git repository.


Now, see below [this](https://raw.githubusercontent.com/kubepack/kubepack/master/docs/_testdata/test-8/pod.yaml) yaml file.

```console
    apiVersion: v1
    kind: Pod
    metadata:
      name: server
    spec:
      containers:
      - image: a8uhnf/git-mount:1.0.0
        imagePullPolicy: Always
        name: git-mount
        resources: {}
        volumeMounts:
        - mountPath: /mypath
          name: git-volume
      volumes:
      - gitRepo:
          repository: YOUR_GIT_REPO_LOCATION # https://github.com/kubepack/kube-a.git
          revision: GIT_REPO_REVISION_NUMBER # c90e98d6c0a6143c19a6e3a575befbdfa170fa00
        name: git-volume
    status: {}
```

change the above yaml file's `gitRepo.repository` and `gitRepo.revision` to your repository location and revision.

```console
    $ kubectl apply -f https://raw.githubusercontent.com/kubepack/kubepack/master/docs/_testdata/test-8/pod.yaml
    pod "server" created
```

This pod mount your git repository in /mypath in the container and if their is exist any `manifests/output` folder, then it'll `$ kubectl apply -R -f <output filepath>`.
You can check actual implementation [here](https://github.com/kubepack/git-mount/blob/master/main.go).

Now, you can see the all the desired kubernetes object in your cluster.


## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/user).
- To learn about `dependency-list.yaml` file, please visit [here](/docs/0.1.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0/concepts/how/cli).

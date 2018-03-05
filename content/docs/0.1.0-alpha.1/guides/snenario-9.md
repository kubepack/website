---
title: Scenarios | Kubepack
menu:
  docs_0.1.0-alpha.1:
    identifier: s9-guides
    name: Scenario 9
    parent: guides
    weight: 80
menu_name: docs_0.1.0-alpha.1
section_menu_id: guides
---

> New to Kubepack? Please start [here](/docs/0.1.0-alpha.1/concepts/README).

# Scenario-9

**This docs trying to explain the behavior of Pack**
***

This section explain, how `jsonnet` appears in Pack.

If you look into `manifest.yaml` file:

```console
    $ cat manifest.yaml
    
    package: github.com/kubepack/pack/_testdata/test-9
    owners:
    - name: Appscode
      email: team@appscode.com
    dependencies:
    - package: github.com/kubepack/kube-a
      branch: test-9

```
You see, this test-case depend on branch `test-9` of repository [kube-a](https://github.com/kubepack/kube-a). 
In branch `test-9` of [kube-a](https://github.com/kubepack/kube-a) contains a jsonnet file.

![alt text](/docs/0.1.0-alpha.1/_testdata/test-9/test-9.jpg)

When execute `$ kubectl plugin pack dep` to get the dependencies, it'll get all the dependencies and 
convert `jsonnet` file into yaml file.

If you see, jsonnet file of [kube-a](https://github.com/kubepack/kube-a/blob/test-9/foocorp-shard.jsonnet), 
will see as below

```json
    local shardTemplate = import "shard.jsonnet.TEMPLATE";
    
    shardTemplate + {
      name:: "foocorp",
      namespace:: "default",
    }
```

After `$ kubectl plugin pack dep`, if you checkout `manifests/vendor`'s `foocorp-shard.jsonnet` file,
 you'll see as below
 
 ```console
    $ cat manifests/vendor/github.com/kubepack/kube-a/manifests/app/foocorp-shard.jsonnet
    
    apiVersion: v1
    kind: Service
    metadata:
      name: foocorp
      namespace: default
    spec:
      selector:
        serviceName: foocorp
 ```

Now, `$ kubectl plugin pack up` will generate final outcome in `manifests/output` folder.

```console
    $ tree manifests/output/
    
    manifests/output/
    └── github.com
        └── kubepack
            └── kube-a
                └── manifests
                    └── app
                        ├── foocorp-shard.jsonnet
                        ├── nginx-deployment.yaml
                        └── nginx-dm.yaml
    
    5 directories, 3 files
```



## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0-alpha.1/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0-alpha.1/concepts/how/user).
- To learn about `manifest.yaml` file, please visit [here](/docs/0.1.0-alpha.1/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0-alpha.1/concepts/how/cli).


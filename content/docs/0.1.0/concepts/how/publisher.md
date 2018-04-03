---
title: Using Kubepack as an App Publisher
menu:
  docs_0.1.0:
    identifier: publisher-how
    name: App Publishers
    parent: how-concepts
    weight: 10
menu_name: docs_0.1.0
section_menu_id: concepts
---

> New to Kubepack? Please start [here](/docs/0.1.0/concepts/README).

# Using Kubepack as an App Publisher

This section contains tutorial on how app developer can use [Pack](https://github.com/kubepack/pack) to expose
theirs app and deploy in kubernetes cluster.

Developer creates a git repo which contains all required yamls and dependency-list.yaml file.

## Before You Begin

Get the overview and what various fields means, read [dependency-list.yaml](/docs/0.1.0/concepts/how/manifest) tutorial.


## Deploy with Pack

If you want your application to usable through pack,

Needs to follow below instruction:

 - First, create a git repository
 - Add all the required yaml to repository
 - Add dependency-list.yaml file. This is mandatory file to Pack

Now, anyone can use this repository to deploy your application in their cluster.

### Example

Suppose, you're building a application called `A`. It needs a [deployment](/docs/0.1.0/examples/publisher/deployment.yaml), [service](/docs/0.1.0/examples/publisher/service.yaml) and [secret](/docs/0.1.0/examples/publisher/secret.yaml).

Deployment.yaml:
```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: pack-deploy
  labels:
    app: kubepack
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kubepack
  template:
    metadata:
      labels:
        app: kubepack
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: /tmp/pack
          name: pack
      volumes:
      - name: pack
        secret:
          secretName: pack-test
```

secrets.yaml:

```
apiVersion: v1
kind: Secret
metadata:
  name: pack-secret
  labels:
    app: kubepack
type: Opaque
data:
  username: YWRtaW4=
  password: MWYyZDFlMmU2N2Rm
```

service.yaml

```
apiVersion: v1
kind: Service
metadata:
  labels:
    app: kubepack
  name: pack-service
spec:
  ports:
  - port: 80
  selector:
    app: kubepack
```

You need to create a repository and put all the [deployment](/docs/0.1.0/examples/publisher/deployment.yaml), [service](/docs/0.1.0/examples/publisher/service.yaml) and [secret](/docs/0.1.0/examples/publisher/secret.yaml) yaml in the repository under `manifests/app` folder.
Also, need to create dependency-list.yaml file in the repository.

So that, others can use it through pack cli.

## Next Steps

- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/user).
- To learn about `dependency-list.yaml` file, please visit [here](/docs/0.1.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0/concepts/how/cli).
- Learn more about **Pack** jsonnet-support [here](/docs/0.1.0/concepts/how/jsonnet-support).
- Learn more about **Pack** validation [here](/docs/0.1.0/concepts/how/validation).
- Learn more about **pack up** command [here](/docs/0.1.0/concepts/how/up)

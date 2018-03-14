---
title: How Kubepack Validate
menu:
  docs_0.1.0-alpha.2:
    identifier: kubepack-validation
    name: Kubepack Validation
    parent: how-concepts
    weight: 35
menu_name: docs_0.1.0-alpha.2
section_menu_id: concepts
---
> New to Kubepack? Please start [here](/docs/0.1.0-alpha.2/concepts/README).

# Kubepack Validation

Users can validate their `manifests/output` folder through `$ pack validate`. 
Pack uses `openapi spec` for validation. 

Users can provider specific kubernetes version through `kube-version` flag.
 In this case, `manifests/output` folder will validate with this kubernetes version `openapi spec`.
 
By default, **Pack** uses  latest stable version of kubernetes.  

## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0-alpha.2/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0-alpha.2/concepts/how/user).
- To learn about `manifest.yaml` file, please visit [here](/docs/0.1.0-alpha.2/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0-alpha.2/concepts/how/cli).
- Learn more about **Pack** jsonnet-support [here](/docs/0.1.0-alpha.2/concepts/how/jsonnet-support).

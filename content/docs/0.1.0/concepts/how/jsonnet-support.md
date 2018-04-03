---
title: How Kubepack support jsonnet
menu:
  docs_0.1.0:
    identifier: jsonnet-support
    name: Jsonnet Support
    parent: how-concepts
    weight: 30
menu_name: docs_0.1.0
section_menu_id: concepts
---

> New to Kubepack? Please start [here](/docs/0.1.0/concepts/README).

# Pack JSONNET Support

Pack support jsonnet. 
Pack [publisher](/docs/0.1.0/concepts/how/publisher) can write kubernetes resource's definition in jsonnet format.

Then dependant users can require that repository via [dependency-list.yaml](/docs/0.1.0/concepts/how/manifest) and simply `$ pack dep` command. 

This will bring all the dependencies in `manifests/vendor` folder. Remainder, publisher's repository may contains jsonnet file,
 but it'll appear in kubernetes resource's yaml format under user's `manifests/vendor` folder.
 
## Learn More About jsonnet Support

- [Here](/docs/0.1.0/guides/scenario-9) How jsonnet works in **Pack** and appears in `manifests/vendor` folder.
- [Here](/docs/0.1.0/guides/scenario-10) How jsonnet works in **Pack**, in more complex scenario than previous one.


## Next Steps

- Want to publish apps using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/publisher).
- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/user).
- To learn about `dependency-list.yaml` file, please visit [here](/docs/0.1.0/concepts/how/manifest).
- Learn more about `pack` cli from [here](/docs/0.1.0/concepts/how/cli).
- Learn more about **Pack** validation [here](/docs/0.1.0/concepts/how/validation).
  

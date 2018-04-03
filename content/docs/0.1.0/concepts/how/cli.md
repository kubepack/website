---
title: Using Kubepack CLI
menu:
  docs_0.1.0:
    identifier: cli-how
    name: CLI
    parent: how-concepts
    weight: 25
menu_name: docs_0.1.0
section_menu_id: concepts
---

> New to Kubepack? Please start [here](/docs/0.1.0/concepts/README).

# Using Kubepack CLI

### How to Get Dependencies

```console
$ pack dep -f .
```
command will get dependencies defined under `items` field in `dependency-list.yaml` file. You can get specific version, branch or revision.
See tutorial of [dependency-list.yaml](/docs/0.1.0/guides/manifest). All the dependencies will appear in `manifests/vendor` folder.
You can get verbose output with `--v=10` or `-v 10` flag.

### Edit File from manifests/vendor Folder

```console
$ pack edit -p <filepath>
```

command edit file, exists in `manifests/vendor` folder and generate patch in `manifests/patch` folder.
This patch file-path will be same as `manifests/vendor` folder.

**Note: `filepath`: is relative file path.**

### Combine manifests/vendor and manifests/patch files

```console
$ pack up -f .
```

command combine files from `manifests/patch` and `manifests/vendor` folder. This combination of `manifests/patch` and `manifests/vendor` files appear in `manifests/output` folder. [Read more](/docs/0.1.0/concepts/how/cli)

### Validate manifests/output folder

```console
$ pack validate -f .
```

This command will validate the `manifests/output` folder yaml files using `openapi-spec`.
If some file is not a valid yaml then throws errors. `--kube-version` flag is used specify kubernetes version, which you want to validate against.


## Next Steps

- Want to consume apps published using Kubepack? Please visit [here](/docs/0.1.0/concepts/how/user).
- To learn about `dependency-list.yaml` file, please visit [here](/docs/0.1.0/concepts/how/manifest).
- Learn more about **Pack** jsonnet-support [here](/docs/0.1.0/concepts/how/jsonnet-support).
- Learn more about **Pack** validation [here](/docs/0.1.0/concepts/how/validation).

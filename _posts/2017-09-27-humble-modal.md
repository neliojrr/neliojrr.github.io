---
layout: post
title: "Humble Modal"
excerpt: "Another React Modal Component"
date: 2014-09-27
project: true
tag:
  - react
  - projetos
comments: false
---

```js
import Modal from 'humble-modal';

render() {
  return(
    <Modal show={this.state.show} onRequestClose={this.closeModal}>
      <span>Content inside the modal</span>
    </Modal>
  );
}
```

[humble-modal](https://github.com/neliojrr/humble-modal) is a React simple,
humble and easy to use modal. No fancy props or behaviors.

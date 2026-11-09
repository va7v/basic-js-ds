const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithin(this.rootNode, data);

    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node; // Узел с таким значением уже существует
      }

      if (data < node.data) {
        node.left = addWithin(node.left, data);
      } else {
        node.right = addWithin(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return findWithin(this.rootNode, data);

    function findWithin(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data
        ? findWithin(node.left, data)
        : findWithin(node.right, data);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // Нашли узел, который нужно удалить

        // Вариант 1: У узла нет потомков (листовой узел)
        if (!node.left && !node.right) {
          return null;
        }

        // Вариант 2: У узла нет левого потомка
        if (!node.left) {
          return node.right;
        }

        // Вариант 3: У узла нет правого потомка
        if (!node.right) {
          return node.left;
        }

        // Вариант 4: У узла есть оба потомка
        // Ищем минимальный элемент в правом поддереве
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        // Копируем данные минимального узла в текущий узел
        node.data = minFromRight.data;
        // Удаляем этот минимальный узел из правого поддерева
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};

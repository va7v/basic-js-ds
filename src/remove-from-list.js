const { NotImplementedError } = require('../lib');
const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k) {
  // Создаем фиктивный узел,который указывает на начало нашего списка
  const dummy = new ListNode(0);
  dummy.next = l;

  let current = dummy;

  // Проходим по списку,пока есть следующий элемент
  while (current.next !== null) {
    if (current.next.value === k) {
      // Если значение следующего узла равно k,"перепрыгиваем" его
      current.next = current.next.next;
    } else {
      // Иначе просто двигаемся к  следующему узлу
      current = current.next;
    }
  }

  // Возвращаем измененный список,  который начинается после фиктивного узла
  return dummy.next;
}

module.exports = {
  removeKFromList
};


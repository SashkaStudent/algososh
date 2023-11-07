export class Node<T> {
	value: T;
	next: Node<T> | null = null;
	constructor(value: T, next?: Node<T> | null) {
		this.value = value;
		this.next = next === undefined ? null : next;
	}
}

interface ILinkedList<T> {
	append: (element: T) => void;
	prepend: (value: T) => void;
	insertAt: (element: T, position: number) => void;
	getNodeByIndex: (index: number) => T | null;
	deleteByIndex: (index: number) => void;
	deleteHead: () => void;
	deleteTail: () => void;
	getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
	private head: Node<T> | null;
	private size: number;
	private tail: Node<T> | null;
    
	constructor(initialState?: T[]) {
		this.head = null;
		this.tail = null;
		this.size = 0;
		initialState?.forEach((el) => {
			this.insertAt(el, 0);
		});
	}

	append = (element: T) => {
		const node = new Node(element);

		if (!this.head || !this.tail) {
			this.head = node;
			this.tail = node;
			this.size++;

			return this;
		}
		this.tail.next = node;
		this.tail = node;
		this.size++;
	};

	prepend = (value: T) => {
		let node = new Node(value);

		if (!this.head) {
			this.head = node;
		}
		node.next = this.head;
		this.head = node;
		this.size++;
	};

	insertAt = (element: T, index: number) => {
		if (index < 0 || index > this.getSize()) {
			throw new Error("Введите действительный индекс");
		} 
			const node = new Node(element);
      this.size++;

			if (index === 0) {
				node.next = this.head;
				this.head = node;

        let tailNode = this.head;

        while(tailNode!.next){
          tailNode = tailNode.next;
        }
        this.tail = tailNode;
        
        return;
			} 

				let currentIndex = 0;
				let previousNode = this.head;


        let currentNode = this.head;
        while(currentNode){
          if(currentIndex == index) {
            previousNode!.next = node;
            node.next = currentNode;
            break;
          }
          previousNode = currentNode;
          currentNode = currentNode.next;
          currentIndex++;
        }

        currentNode = this.head;
        while(currentNode!.next){
          currentNode = currentNode!.next;
        }
    
        this.tail = currentNode;		
	};

	getNodeByIndex = (index: number) => {
		if (index < 0 || index > this.size) 
			return null;
	
		let currentNode = this.head;
		let currentIndex = 0;

		while (currentIndex < index) {
			currentNode = currentNode!.next;
			currentIndex++;
		}

		return currentNode?.value??null;
	};

	deleteByIndex = (index: number) => {
		if (index < 0 || index > this.size)
			return null;
		
		let currentNode = this.head;

		if (index === 0 && currentNode) {
			this.head = currentNode.next;
		} else {
			let previous = null;
			let currentIndex = 0;

			while (currentIndex < index && currentNode) {
				previous = currentNode;
				currentNode = currentNode.next;
				currentIndex++;
			}

			if (previous && currentNode) {
				previous.next = currentNode.next;
			}
		}
		this.size--;
		return currentNode ? currentNode.value : null;
	};

	deleteHead = () => {
		if (!this.head) {
			return null;
		}
		let deletedHead = this.head;

		if (this.head.next) {
			this.head = deletedHead.next;
		} else {
			this.head = null;
			this.tail = null;
		}
		this.size--;
		return deletedHead ? deletedHead.value : null;
	};

	deleteTail = () => {
		if (this.size === 0)
			return null;
		

		let currentNode = this.head;
		let previousNode = null;

    while(currentNode!.next){
      previousNode = currentNode;
      currentNode = currentNode!.next;
    }

		previousNode = currentNode;
    this.tail = previousNode;
		this.size--;
	};

	getSize = () => this.size;
}
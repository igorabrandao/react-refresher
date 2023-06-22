class Todo {
  id: string;
  text: string;

  constructor(text: string) {
    this.text = text;
    this.id = (Date.now() + Math.random()).toString();
  }
}

export default Todo;

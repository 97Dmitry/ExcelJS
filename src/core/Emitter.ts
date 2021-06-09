export class Emitter {
  private listeners: any;

  constructor() {
    this.listeners = {};
  }

  emit(eventName: string, ...args: any[]) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }
    this.listeners[eventName].forEach((listener: any) => {
      listener(...args);
    });
  }

  subscribe(eventName: string, fn: {}) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter((listener: any) => listener !== fn);
    };
  }
}

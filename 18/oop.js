{
    //store class
    class Store{
        #reducer;
        #state;
        #cbs = []
        
        constructor(reducer, initialState) {
            this.#reducer = reducer;
            this.#state = initialState;
        }
        
        getState(){
            return this.#state;
        }
        
        subscribe(callback) {
            this.#cbs.push(callback);
            return () => {
              this.#cbs = this.#cbs.filter(cb => cb !== callback);
            };
          }
        
          dispatch(action) {
            this.#state = this.#reducer(this.#state, action);
            this.#cbs.forEach(cb => cb());
          }
    }
}

{
    //Password Class

    class Password {
        #passwordInput;
        #toggleButton;
        #isOpen;
        #value;

        constructor(parent, open) {
            this.#passwordInput = document.createElement('input');
            this.#passwordInput.type = 'password';
            this.#passwordInput.value = '';
            parent.appendChild(this.#passwordInput);

            this.#toggleButton = document.createElement('button');
            this.#toggleButton.textContent = 'Toggle Password';
            parent.appendChild(this.#toggleButton);

            this.#isOpen = open;
            this.#value = '';

            this.onChange = (data) => { };
            this.onOpenChange = (open) => { };

            this.setValue = function (newValue) {
                this.#value = newValue;
                this.onChange(this.#value);
            };

            this.getValue = function () {
                return this.#value;
            };

            this.setOpen = function (newOpen) {
                this.#isOpen = newOpen;
                this.onOpenChange(this.#isOpen);
                this.#passwordInput.type = this.#isOpen ? 'text' : 'password';
            };

            this.getOpen = function () {
                return this.#isOpen;
            };

            this.setOpen(open);

            this.#passwordInput.addEventListener('input', () => {
                this.setValue(this.#passwordInput.value);
            });

            this.#toggleButton.addEventListener('click', () => {
                this.setOpen(!this.#isOpen);
            });
        }
    }
}

{
    //StoreThunk Class

    class StoreThunk extends Store {
        constructor(reducer, initialState) {
          super(reducer, initialState);
        }
      
        dispatch(action) {
          if (typeof action === 'function') {
            action(this.dispatch.bind(this), this.getState.bind(this));
          } else {
            super.dispatch(action);
          }
        }
    };    
}

{
    //rgb
    class RGB {
        #r;
        #g;
        #b;

        constructor() {
            this.#r = 0;
            this.#g = 0;
            this.#b = 0;
        }

        get r() {
            return this.#r;
        }

        set r(value) {
            this.validateChannel(value);
            this.#r = value;
        }

        get g() {
            return this.#g;
        }

        set g(value) {
            this.validateChannel(value);
            this.#g = value;
        }

        get b() {
            return this.#b;
        }

        set b(value) {
            this.validateChannel(value);
            this.#b = value;
        }

        get rgb() {
            return `rgb(${this.#r},${this.#g},${this.#b})`;
        }

        set rgb(value) {
            const match = value.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            if (!match) {
                throw new SyntaxError('Invalid RGB syntax');
            }

            const [, r, g, b] = match.map(Number);
            this.validateChannel(r);
            this.validateChannel(g);
            this.validateChannel(b);

            this.#r = r;
            this.#g = g;
            this.#b = b;
        }

        get hex() {
            return `#${this.componentToHex(this.#r)}${this.componentToHex(this.#g)}${this.componentToHex(this.#b)}`;
        }

        set hex(value) {
            const match = value.match(/^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/);
            if (!match) {
                throw new SyntaxError('Invalid HEX syntax');
            }

            const [, r, g, b] = match.map(hex => parseInt(hex, 16));
            this.validateChannel(r);
            this.validateChannel(g);
            this.validateChannel(b);

            this.#r = r;
            this.#g = g;
            this.#b = b;
        }

        validateChannel(value) {
            if (typeof value !== 'number' || value < 0 || value > 255) {
                throw new RangeError('Channel value must be a number between 0 and 255');
            }
        }

        componentToHex(c) {
            const hex = c.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }
    }

    //rgba

    class RGBA extends RGB {
        #a;
    
        constructor() {
            super();
            this.#a = 1;
        }
    
        get a() {
            return this.#a;
        }
    
        set a(value) {
            if (typeof value !== 'number' || value < 0 || value > 1) {
                throw new RangeError('Alpha value must be a number between 0 and 1');
            }
            this.#a = value;
        }
    
        set hex(value) {
            if (value.match(/^#([0-9A-Fa-f]{6})$/)) {
                super.hex = value;
                this.#a = 1;
            } else if (value.match(/^#([0-9A-Fa-f]{8})$/)) {
                super.hex = value.slice(0, 7);
                this.#a = parseInt(value.slice(7, 9), 16) / 255;
            } else {
                throw new SyntaxError('Invalid HEX syntax');
            }
        }
    
        get hex() {
            const alphaHex = Math.round(this.#a * 255).toString(16).padStart(2, '0');
            return `${super.hex}${alphaHex}`;
        }
    
        set rgba(value) {
            const match = value.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)$/);
            if (!match) {
                throw new SyntaxError('Invalid RGBA syntax');
            }
    
            const [, r, g, b, a] = match.map(Number);
            super.rgb = `rgb(${r},${g},${b})`;
            this.#a = a;
        }
    
        get rgba() {
            return `rgba(${super.r},${super.g},${super.b},${this.#a})`;
        }
    
        set color(value) {
            if (value.startsWith('#')) {
                this.hex = value;
            } else if (value.startsWith('rgba(')) {
                this.rgba = value;
            } else if (value.startsWith('rgb(')) {
                super.rgb = value;
                this.#a = 1;
            } else {
                throw new SyntaxError('Invalid color syntax');
            }
        }
    }
}
console.log("document", document);

const obj = {
    field: '123',
    field2: '456',
    field3: 789,
    obj2: {
        field123: '123',
        field12122: '456',
    },
    field4: false,
    method1: function () {
        console.log("I'm method1");
    }
}

const h2El = document.querySelector("h2");

h2El.style.color = 'green';

const h1El = document.querySelector("h1");
h1El.remove();

const wrapper = document.querySelector("#wrapper");

console.log(wrapper)

const h3El = document.createElement('h3');
h3El.style.color = 'orange';
h3El.style.border = '3px dashed blue';
h3El.innerText = obj.obj2.field12122;

wrapper.appendChild(h3El);


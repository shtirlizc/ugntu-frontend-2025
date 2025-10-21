// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, JavaScript активен!');
    
    // Инициализация всех функций
    initButtonEvents();
    initFormValidation();
    initAnimationDemo();
    initTodoList();
    initModal();
});

// ========== ОБРАБОТЧИКИ КНОПОК ==========

function initButtonEvents() {
    const colorBtn = document.getElementById('colorBtn');
    const textBtn = document.getElementById('textBtn');
    const hideBtn = document.getElementById('hideBtn');
    const demoText = document.getElementById('demoText');
    
    // Массив цветов для смены
    const colors = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', 
        '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
    ];
    let colorIndex = 0;
    
    // Смена цвета фона
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        demoText.style.backgroundColor = colors[colorIndex];
        demoText.style.color = '#fff';
        demoText.classList.add('color-change');
        
        // Убираем класс анимации через 500мс
        setTimeout(() => {
            demoText.classList.remove('color-change');
        }, 500);
        
        console.log('Цвет изменен на:', colors[colorIndex]);
    });
    
    // Смена текста
    const textVariants = [
        'Этот текст можно изменить с помощью кнопок выше',
        'JavaScript работает отлично! 🎉',
        'Взаимодействие HTML, CSS и JS в действии',
        'Попробуйте другие кнопки!',
        'Веб-разработка - это весело! 💻'
    ];
    let textIndex = 0;
    
    textBtn.addEventListener('click', function() {
        textIndex = (textIndex + 1) % textVariants.length;
        demoText.textContent = textVariants[textIndex];
        demoText.classList.add('text-shake');
        
        setTimeout(() => {
            demoText.classList.remove('text-shake');
        }, 500);
        
        console.log('Текст изменен на:', textVariants[textIndex]);
    });
    
    // Скрытие/показ элемента
    hideBtn.addEventListener('click', function() {
        if (demoText.classList.contains('hidden')) {
            demoText.classList.remove('hidden');
            hideBtn.textContent = 'Скрыть';
        } else {
            demoText.classList.add('hidden');
            hideBtn.textContent = 'Показать';
        }
        
        console.log('Элемент скрыт/показан');
    });
}

// ========== ВАЛИДАЦИЯ ФОРМЫ ==========

function initFormValidation() {
    const form = document.getElementById('demoForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const formResult = document.getElementById('formResult');
    
    // Валидация в реальном времени
    nameInput.addEventListener('input', function() {
        validateName();
    });
    
    emailInput.addEventListener('input', function() {
        validateEmail();
    });
    
    // Обработка отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        
        if (isNameValid && isEmailValid) {
            showFormSuccess();
        } else {
            showFormError();
        }
    });
    
    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            showFieldError(nameInput, nameError, 'Имя должно содержать минимум 2 символа');
            return false;
        } else {
            clearFieldError(nameInput, nameError);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            showFieldError(emailInput, emailError, 'Email обязателен');
            return false;
        } else if (!emailRegex.test(email)) {
            showFieldError(emailInput, emailError, 'Введите корректный email');
            return false;
        } else {
            clearFieldError(emailInput, emailError);
            return true;
        }
    }
    
    function showFieldError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    function clearFieldError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }
    
    function showFormSuccess() {
        formResult.className = 'form-result success';
        formResult.textContent = `Добро пожаловать, ${nameInput.value}! Форма успешно отправлена.`;
        form.reset();
        console.log('Форма успешно отправлена');
    }
    
    function showFormError() {
        formResult.className = 'form-result error';
        formResult.textContent = 'Пожалуйста, исправьте ошибки в форме';
        console.log('Ошибки в форме');
    }
}

// ========== АНИМАЦИИ ==========

function initAnimationDemo() {
    const animateBtn = document.getElementById('animateBtn');
    const animatedBox = document.getElementById('animatedBox');
    
    animateBtn.addEventListener('click', function() {
        // Добавляем класс анимации
        animatedBox.classList.add('animate');
        
        // Убираем класс через 1 секунду
        setTimeout(() => {
            animatedBox.classList.remove('animate');
        }, 1000);
        
        console.log('Анимация запущена');
    });
}

// ========== СПИСОК ЗАДАЧ ==========

function initTodoList() {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    
    // Добавление задачи по кнопке
    addTodoBtn.addEventListener('click', addTodo);
    
    // Добавление задачи по Enter
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            createTodoItem(text);
            todoInput.value = '';
            console.log('Задача добавлена:', text);
        }
    }
    
    function createTodoItem(text) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        li.innerHTML = `
            <span>${text}</span>
            <button onclick="removeTodo(this)">Удалить</button>
        `;
        
        // Добавляем обработчик клика для отметки выполнения
        li.addEventListener('click', function(e) {
            if (e.target.tagName !== 'BUTTON') {
                toggleTodoComplete(li);
            }
        });
        
        todoList.appendChild(li);
        
        // Анимация появления
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            li.style.transition = 'all 0.3s ease';
            li.style.opacity = '1';
            li.style.transform = 'translateX(0)';
        }, 10);
    }
    
    // Функция для удаления задачи (глобальная для onclick)
    window.removeTodo = function(button) {
        const li = button.parentElement;
        li.style.transition = 'all 0.3s ease';
        li.style.opacity = '0';
        li.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            li.remove();
        }, 300);
        
        console.log('Задача удалена');
    };
    
    function toggleTodoComplete(li) {
        li.classList.toggle('completed');
        const isCompleted = li.classList.contains('completed');
        console.log('Задача', isCompleted ? 'выполнена' : 'не выполнена');
    }
}

// ========== МОДАЛЬНОЕ ОКНО ==========

function initModal() {
    const modalBtn = document.getElementById('modalBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    // Открытие модального окна
    modalBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку
        console.log('Модальное окно открыто');
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', closeModal);
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
        console.log('Модальное окно закрыто');
    }
}

// ========== ДОПОЛНИТЕЛЬНЫЕ УТИЛИТЫ ==========

// Функция для показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#e53e3e' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Добавляем CSS для анимаций уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Демонстрация работы с localStorage
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        console.log('Данные сохранены в localStorage:', key);
    } catch (error) {
        console.error('Ошибка сохранения в localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Ошибка загрузки из localStorage:', error);
        return null;
    }
}

// Автосохранение списка задач
function saveTodos() {
    const todos = Array.from(document.querySelectorAll('.todo-item')).map(item => ({
        text: item.querySelector('span').textContent,
        completed: item.classList.contains('completed')
    }));
    saveToLocalStorage('todos', todos);
}

// Загрузка сохраненных задач
function loadTodos() {
    const savedTodos = loadFromLocalStorage('todos');
    if (savedTodos) {
        savedTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <span>${todo.text}</span>
                <button onclick="removeTodo(this)">Удалить</button>
            `;
            li.addEventListener('click', function(e) {
                if (e.target.tagName !== 'BUTTON') {
                    toggleTodoComplete(li);
                }
            });
            document.getElementById('todoList').appendChild(li);
        });
        console.log('Задачи загружены из localStorage');
    }
}

// Загружаем сохраненные задачи при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
    
    // Сохраняем задачи при изменениях
    const todoList = document.getElementById('todoList');
    if (todoList) {
        const observer = new MutationObserver(saveTodos);
        observer.observe(todoList, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }
});

// Экспорт функций для использования в консоли браузера
window.demoFunctions = {
    showNotification,
    saveToLocalStorage,
    loadFromLocalStorage,
    addTodo: function(text) {
        if (text) {
            createTodoItem(text);
        }
    }
};

console.log('Все функции JavaScript инициализированы!');
console.log('Доступные функции в window.demoFunctions:', Object.keys(window.demoFunctions));


document.addEventListener('DOMContentLoaded', function() {
  // Данные для генерации
  const servicesData = [
    { id: 1, name: "Шиномонтаж", image: "service-1.jpg" },
    { id: 2, name: "Замена масла", image: "service-2.jpg" },
    { id: 3, name: "Замена свечей и фильтров", image: "service-4.jpg" },
    { id: 4, name: "Замена тормозов", image: "service-3.jpg" },
    { id: 5, name: "Ремонт подвески", image: "service-5.jpg" },
    { id: 6, name: "Замена рычагов", image: "service-6.jpg" },
    { id: 7, name: "Диагностика", image: "service-7.jpg" },
    { id: 8, name: "Эндоскопия двигателя", image: "service-8.jpg" }
  ];

  const pricesData = [
    { 
      category: "Техническое обслуживание", 
      items: [
        { name: "Замена моторного масла", price: "от 900 ₽" },
        { name: "Замена масляного фильтра", price: "от 500 ₽" },
        { name: "Замена воздушного фильтра", price: "от 400 ₽" },
        { name: "Замена салонного фильтра", price: "от 600 ₽" },
        { name: "Замена свечей зажигания", price: "от 800 ₽" }
      ]
    },
    {
      category: "Ремонт подвески", 
      items: [
        { name: "Замена амортизаторов (1 шт)", price: "от 1 800 ₽" },
        { name: "Замена шаровой опоры", price: "от 1 500 ₽" },
        { name: "Замена рычагов подвески", price: "от 2 000 ₽" },
        { name: "Замена сайлентблоков", price: "от 1 200 ₽" }
      ]
    },
    {
      category: "Шиномонтаж", 
      items: [
        { name: "Снятие/установка колеса", price: "от 200 ₽" },
        { name: "Балансировка колеса", price: "от 400 ₽" },
        { name: "Ремонт прокола", price: "от 300 ₽" },
        { name: "Хранение шин", price: "от 1 500 ₽/сезон" }
      ]
    }
  ];

  // Генерация услуг
  const servicesGrid = document.querySelector('.services-grid');
  servicesData.forEach(service => {
    const item = document.createElement('div');
    item.className = 'service-item';
    item.innerHTML = `
      <img src="${service.image}" alt="${service.name}" loading="lazy">
      <p>${service.name}</p>
    `;
    servicesGrid.appendChild(item);
  });

  // Генерация прайса
  const pricesContainer = document.querySelector('.prices-container');
  pricesData.forEach(category => {
    const categoryEl = document.createElement('div');
    categoryEl.className = 'price-category';
    categoryEl.innerHTML = `
      <h3>${category.category}</h3>
      <ul class="price-list">
        ${category.items.map(item => `
          <li>
            <span class="service-name">${item.name}</span>
            <span class="service-price">${item.price}</span>
          </li>
        `).join('')}
      </ul>
    `;
    pricesContainer.appendChild(categoryEl);
  });

  // Заполнение формы записи
  const serviceSelect = document.getElementById('service');
  servicesData.forEach(service => {
    const option = document.createElement('option');
    option.value = service.id;
    option.textContent = service.name;
    serviceSelect.appendChild(option);
  });

  // Маска для телефона
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
  });

  // Обработка формы
bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = {
    service: serviceSelect.options[serviceSelect.selectedIndex].text,
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value
  };

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwC0YWUcytVzHoLQ9X7oehK50sta2hzm8VpJMiNWu6HwEJeqCdMkGIQfWQ_TvqRx1SScQ/exec'; // <- подставь свой

  // Отправка в Google Таблицу через Apps Script
  fetch(scriptURL, {
    method: 'POST',
    redirect: 'follow', // важно, чтобы следовал редиректу, который делает Apps Script. :contentReference[oaicite:1]{index=1}
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8' // ключевой трюк: не триггерит preflight. :contentReference[oaicite:2]{index=2}
    }
  })
  .then(resp => resp.json())
  .then(data => {
    console.log('Ответ от Apps Script:', data);
    if (data.result === 'success') {
      // Отправка на email (fallback)
     
      alert(`Спасибо, ${formData.name}! Ваша запись на ${formData.service} принята. Мы свяжемся с вами для подтверждения.`);
      bookingForm.reset();
    } else {
      alert('Ошибка при записи: ' + (data.message || 'неизвестная ошибка'));
    }
  })
  .catch(err => {
    console.error('Ошибка при отправке в Google Таблицу:', err);
    alert('Не удалось отправить запись. Проверь консоль.');
  });
});


  // Бургер-меню
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Анимация появления элементов
  const animateOnScroll = () => {
    const items = document.querySelectorAll('.service-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(item);
    });
  };

  // Показать кнопку телефона при скролле
  const callButton = document.querySelector('.call-button');
  window.addEventListener('scroll', () => {
    callButton.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  // Инициализация
  animateOnScroll();
});



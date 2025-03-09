# LearnLingo

Це застосунок для компанії, що пропонує скористатися послугами викладачів з вивчення мов онлайн. Додаток дозволяє користувачам переглядати інформацію про викладачів яка занесена в базу даних, фільтрувати за мовою викладання, рівнем підготовки користувача а також за максимальною ціною. Користувач може відправити форму бронювання пробного уроку. Авторизований користувач крім того має можливість створити колекцію улюблених викладачів, куди може добавляти викладачів які йому сподобались і відповідно видаляти їх. Демо-версію можна протестувати за посиланням https://teachers-indol.vercel.app

## Основні функції

1. Домашня сторінка - містить баннер з основним закликом до дії та кнопку переходу на сторінку каталогу.
2. Сторінка каталогу - показує інформацію про всіх викладачів які є в базі також тут є можливість фільтрувати за мовою , рівнем підготовки користувача і максимальною ціною, також для зручності перегляду передбачена пагінація і кнопка "Scroll Up".
3. Для авторизованого користувача є доступ до сторінки улюблених де відображається інформація про викладачів яких користувач додав до улюблених. На цій сторінці також передбачена пагінація і "Scroll Up".
4. Кожна картка викладача містить кнопку "Read more" при кліку по якій відкривається більш детальна інформація про викладача і стає доступною кнопка "Book trial lesson" , при кліку на цю кнопку відкривається модальне вікно з формою бронювання пробного уроку.
5. Верстка реалізована для десктопу 1440px .

## Використані технології

### Фронтенд

1. React з використанням бандлеру Vite.
2. React Routers.
3. Redux Toolkit.
4. CSS, Styled-Components.
5. React-hook-form.
6. Yup.
7. React-toastify.
8. React-spinners.

### Бекенд

1. Firebase Realtime Database.
2. Firebase Autentication.
3. Node.js.

## Встановлення та запуск

### Клонуємо репозиторій

git clone git@github.com:gocha001/Teachers.git

### Встановлюємо залежності

npm install

### Створюємо проєкт у Firebase Console

https://firebase.google.com

### Додаємо FirebaseConfig в .env

VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_DATA_BASE_URL=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
VITE_URL=

### Деплоїм на Firebase

firebase deploy --only functions

### Запускаєм локальний сервер

npm run dev

### Відкриваємо додаток в браузері

http://localhost:5173/

## Каталог

Компанії небхідно створити каталог в Firebase Realtime Database. Це можна зробити безпосередньо в Firebase Console а також за допомогою додатку , для цього потрібно підключити компонент SaveTeachers в App.jsx і записати каталог в файл data.json , після запису каталога SaveTeachers відключаємо . Каталог має бути в такому вигляді
{
"teacher01": {
"name": "John",
"surname": "Doe",
"languages": ["English", "Spanish"],
"levels": [
"A1 Beginner",
"A2 Elementary",
"B1 Intermediate",
"B2 Upper-Intermediate",
"C1 Advanced",
"C2 Proficient"
],
"rating": 4.5,
"reviews": [
{
"reviewer_name": "Alice",
"reviewer_rating": 5,
"comment": "John is an excellent teacher! I highly recommend him."
},
{
"reviewer_name": "Bob",
"reviewer_rating": 4,
"comment": "John is very knowledgeable and patient. I enjoyed his classes."
}
],
"price_per_hour": 25,
"lessons_done": 1375,
"avatar_url": "https://ftp.goit.study/img/avatars/1.jpg",
"lesson_info": "The lessons focus on improving speaking and listening skills through interactive activities and discussions.",
"conditions": [
"Teaches only adult learners (18 years and above).",
"Flexible scheduling options available."
],
"experience": "John has been teaching languages for 7 years and has extensive experience in helping students improve their language skills. He has successfully taught numerous students from different backgrounds and proficiency levels."
},
"teacher02": {
"name": "Jane",
"surname": "Smith",
"languages": ["French", "German"],
"levels": [
"A1 Beginner",
"A2 Elementary",
"B1 Intermediate",
"B2 Upper-Intermediate"
],
"rating": 4.8,
"reviews": [
{
"reviewer_name": "Eve",
"reviewer_rating": 5,
"comment": "Jane is an amazing teacher! She is patient and supportive."
},
{
"reviewer_name": "Frank",
"reviewer_rating": 4,
"comment": "Jane's lessons were very helpful. I made good progress."
}
],
"price_per_hour": 30,
"lessons_done": 1098,
"avatar_url": "https://ftp.goit.study/img/avatars/2.jpg",
"lesson_info": "Lessons are structured to cover grammar, vocabulary, and practical usage of the language.",
"conditions": [
"Welcomes both adult learners and teenagers (13 years and above).",
"Provides personalized study plans."
],
"experience": "Jane is an experienced and dedicated language teacher specializing in German and French. She holds a Bachelor's degree in German Studies and a Master's degree in French Literature. Her passion for languages and teaching has driven her to become a highly proficient and knowledgeable instructor. With over 10 years of teaching experience, Jane has helped numerous students of various backgrounds and proficiency levels achieve their language learning goals. She is skilled at adapting her teaching methods to suit the needs and learning styles of her students, ensuring that they feel supported and motivated throughout their language journey."
},
}

## Ендпоїнти

1. getFilterTeachers - отримує всю колекцію з урахуванням фільтрації і пагінації ( реалізована на бекенді).
2. addFavorite , deleteFavorite , fetchFavorites - ендпоїнти для роботи з колекцією favorites , додавання , видалення , перегляд всіх з пагінацією , відповідно .
3. registerUser , loginUser , logoutUser , getCurrentUser - реєстрація , логінізація , логаут , отримання поточного користувача відповідно .

## Автор

Ігор Кондратюк

Емаіл: kalianichgocha@ukr.net

linkedIn: https://www.linkedin.com/in/igor-kondratuk-320a16337/

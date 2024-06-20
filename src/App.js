import { useState } from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
  {
    title: 'Как создать состояние в функциональном компоненте?',
    variants: ['this.setState', 'useState', 'state = {}'],
    correct: 1,
  },
  {
    title: 'Что такое Virtual DOM?',
    variants: ['Копия настоящего DOM', 'Кросс-браузерная библиотека', 'DOM, написанный на языке программирования'],
    correct: 0,
  },
  {
    title: 'Какой хук используется для побочных эффектов?',
    variants: ['useState', 'useEffect', 'useContext'],
    correct: 1,
  },
  {
    title: 'Что такое props?',
    variants: ['Аргументы для функции компонента', 'Внутреннее состояние компонента', 'HTML элементы'],
    correct: 0,
  },
  {
    title: 'Как передать props в компонент?',
    variants: ['Через контекст', 'Через атрибуты JSX', 'Через состояние'],
    correct: 1,
  },
  {
    title: 'Что делает метод map() в JavaScript?',
    variants: ['Изменяет массив', 'Возвращает новый массив', 'Ничего'],
    correct: 1,
  },
  {
    title: 'Что такое замыкание в JavaScript?',
    variants: ['Функция, возвращающая другую функцию', 'Способность функции запоминать контекст', 'Оператор сравнения'],
    correct: 1,
  },
  {
    title: 'Как объявить асинхронную функцию?',
    variants: ['async function', 'function async', 'async() => {}'],
    correct: 0,
  },
  {
    title: 'Что возвращает метод filter() в JavaScript?',
    variants: ['Элемент массива', 'Новый массив', 'Отфильтрованное значение'],
    correct: 1,
  },
  {
    title: 'Что такое хук useReducer?',
    variants: ['Аналог useState для более сложных состояний', 'Хук для работы с контекстом', 'Метод для обработки событий'],
    correct: 0,
  },
  {
    title: 'Какой оператор используется для создания объектов в JavaScript?',
    variants: ['new', 'create', 'object'],
    correct: 0,
  },
  {
    title: 'Какой метод используется для объединения массивов?',
    variants: ['concat', 'merge', 'join'],
    correct: 0,
  },
  {
    title: 'Что такое стрелочная функция?',
    variants: ['Синтаксис функции', 'Тип данных', 'Метод объекта'],
    correct: 0,
  },
  {
    title: 'Какой хук позволяет использовать контекст в компоненте?',
    variants: ['useState', 'useEffect', 'useContext'],
    correct: 2,
  },
  {
    title: 'Как создать копию объекта в JavaScript?',
    variants: ['Object.assign', 'object.copy', 'clone()'],
    correct: 0,
  },
  {
    title: 'Как проверить, является ли значение массивом?',
    variants: ['Array.isArray', 'typeof', 'instanceof'],
    correct: 0,
  },
  {
    title: 'Какой метод используется для добавления элементов в конец массива?',
    variants: ['push', 'append', 'insert'],
    correct: 0,
  },
];

function Result({correct, answers}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="Result" />
      <h2>Вы отгадали {correct} ответа из {questions.length}</h2>
      <button onClick={() => window.location.reload()}>Попробовать снова</button>
      <div className="answers">
        {answers.map((answer, index) => (
          <div key={index} className={`answer ${answer.correct ? 'correct' : 'incorrect'}`}>
            <p>{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Game({step, question, onClickVariant}) {
  const percentage = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {
          question.variants.map((text, index) => 
          <li 
            key={text} 
            onClick={() => {onClickVariant(index)}}
          >
            {text}
          </li>
          )}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answers, setAnswers] = useState([]);
  const question = questions[step];

  const onClickVariant = (index) => {
    const isCorrect = index === question.correct;
    setAnswers([...answers, {questionIndex: step, userAnswer: index, correct: isCorrect}]);

    if (isCorrect){
      setCorrect(correct + 1);
    }
    setStep(step + 1)
  };

    const handleRetry = () => {
      setCorrect(0);
      setStep(0);
      setAnswers([]);
    }
  return (
    <div className="App">
      {
        step !==questions.length 
        ? (
          <Game step={step} question={question} onClickVariant={onClickVariant}/>
        ) : (
          <Result correct={correct} answers={answers} onRetry={handleRetry}/>
        )}
    </div>
  );
}

export default App;
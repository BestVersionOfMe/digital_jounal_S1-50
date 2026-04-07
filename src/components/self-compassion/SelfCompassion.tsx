"use client";

import React, { useState } from 'react';

export default function SelfCompassion() {
  
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  // Check 
  const [isCompleted, setIsCompleted] = useState(false);

  // Part 1: Q1 - Q5
  const [q1Answer, setQ1Answer] = useState('');
  const [q2Answer, setQ2Answer] = useState('');
  const [q3Answer, setQ3Answer] = useState('');
  const [q4Answer, setQ4Answer] = useState('');
  const [q5Answer, setQ5Answer] = useState('');

  // Part 2: Q6 / Q7
  const [blankAnswers, setBlankAnswers] = useState<Record<string, string>>({});
  const [customModes, setCustomModes] = useState<Record<string, boolean>>({});


  // === Part 3: Q8-Q10) ===
  const [q8Choice, setQ8Choice] = useState<string | null>(null);
  const [q9Choice, setQ9Choice] = useState<string | null>(null);
  const [reallyChoice, setReallyChoice] = useState<string | null>(null);
  const [q10Answer, setQ10Answer] = useState('');

  // === 💡 Dictionary Q1-5 promptchips ===
  const promptChipsConfig = {
    1: ['Being a good listener', 'Never giving up',
      'Sense of humor', 'Positive attitude', 'Creativity', 'Honest'],

    2: ['Math/Science', 'Playing sports', 'Drawing / Art',
      'Making new friends', 'Solving puzzles',
      'Writing and reading', 'Leadership'],

    3: ['A musical instrument', 'A specific sport',
      'Improving my grades', 'Keeping healthy and beauty',
      'Controlling my temper', 'Public speaking'],

    4: ['Helping others', 'Organizing my stuff',
      'Learning new tech', 'Staying calm',
      'Making people laugh', 'Getting up early', 'being athletic'],

    5: ['Finishing a tough project', 'Standing up for someone',
      'Learning from a mistake', 'Trying something new',
      'Helping out at home', 'Volunteering in community']
  };

  const questionsConfig = {
    1: "What's something you like about yourself?",
    2: "What's something you feel you're good at?",
    3: "What's something you've worked hard to get good at?",
    4: "What's a skill or habit that comes easily to you?",
    5: "What's something you're proud of, even if it's something small or that others might not see?"
  };


// text: script, select: options, input: text area
  const fillInBlanksConfig: Record<number, any> = {
    6: { 
      title: "What's a quality you like about how you treat other people?",
      parts: [
        { type: 'text', content: '"When I interact with others, I really like that I am usually ' },
        { type: 'select', id: 'q6_emotion', options: ['Patient', 'Honest', 'A good listener', 'Helpful', 'Respectful'], placeholder: '...' },
        { type: 'text', content: ', especially when ' },
        { type: 'input', id: 'q6_action', placeholder: '...' },
        { type: 'text', content: '."' }
      ]
    },
    7: { 
      title: "What do your friends, family, or teachers often notice you're good at?",
      parts: [
        { type: 'text', content: '"My ' },
        { type: 'select', id: 'q7_people', options: ['Parents / Family', 'Friends', 'Teachers', 'Coaches'], placeholder: '...' },
        { type: 'text', content: ' often notice that I am really good at ' },
        { type: 'select', id: 'q7_method', options: ['Working in a team', 'Solving problems', 'Staying focused', 'Being creative', 'Cheering people up'], placeholder: '...' },
        { type: 'input', id: 'q7_example', placeholder: '...' },
        { type: 'text', content: '."' }
      ]
    }
  };




  const handleChipClick = (chip: string) => {
    if (step === 1) {
      setQ1Answer((prev) => (prev ? `${prev}, ${chip}` : chip));
    } else if (step === 2) {
      setQ2Answer((prev) => (prev ? `${prev}, ${chip}` : chip));
    } else if (step === 3) {
      setQ3Answer((prev) => (prev ? `${prev}, ${chip}` : chip));
    } else if (step === 4) {
      setQ4Answer((prev) => (prev ? `${prev}, ${chip}` : chip));
    } else if (step === 5) {
      setQ5Answer((prev) => (prev ? `${prev}, ${chip}` : chip));
    } else if (step === 9) {
      setQ10Answer((prev) => (prev ? `${prev}, ${chip}` : chip));
    }
  };



  const getCurrentAnswer = () => {
    if (step === 1) return q1Answer;
    if (step === 2) return q2Answer;
    if (step === 3) return q3Answer;
    if (step === 4) return q4Answer;
    if (step === 5) return q5Answer;
    return '';
  };

  // save the current answer 
  const handleAnswerChange = (value: string) => {
    if (step === 1) setQ1Answer(value);
    if (step === 2) setQ2Answer(value);
    if (step === 3) setQ3Answer(value);
    if (step === 4) setQ4Answer(value);
    if (step === 5) setQ5Answer(value);
  };


  // dynamic background and process bar color
  // change at the Q8

  const getBackgroundColor = () => {
    if (step === 8 && q8Choice === 'positive') return 'bg-yellow-50';
    if (step === 8 && q8Choice === 'negative') return 'bg-orange-50';

    return 'bg-blue-50';
  };


  const getProgressTheme = () => {
    if (step >= 8 && q8Choice === 'positive') {
      return { active: 'bg-yellow-500', inactive: 'bg-yellow-200', current: 'bg-yellow-600' };
    }
    if (step >= 8 && q8Choice === 'negative') {
      return { active: 'bg-orange-500', inactive: 'bg-orange-200', current: 'bg-orange-600' };
    }
    return { active: 'bg-blue-500', inactive: 'bg-blue-200', current: 'bg-blue-600' };
  };


  const isCurrentStepValid = () => {
    if (step >= 1 && step <= 5) return getCurrentAnswer().trim() !== '';
    if (step === 6 || step === 7) { 

      const config = fillInBlanksConfig[step];
      const requiredBlanks = config.parts.filter((p: any) => p.type === 'select' || p.type === 'input');

      return requiredBlanks.every((b: any) => blankAnswers[b.id] && blankAnswers[b.id].trim() !== '');
    }

    if (step === 8) { 
      // 🟢 终点 1：如果是积极的分支，直接可以点击下一步
      if (q8Choice === 'positive') return true;

      // 🔴 终点 2：如果是消极分支，必须走到最后一步（Q10）并填写了文字
      if (q8Choice === 'negative') {
        const reachedQ10 = q9Choice === 'no_never' || reallyChoice !== null;
        return reachedQ10 && q10Answer.trim() !== '';
      }
      return false;
    }

    return true;
  };

  const progressTheme = getProgressTheme();

  if (isCompleted) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-1000 ${getBackgroundColor()}`}>
        <div className="text-center animate-fade-in-up max-w-md">
          <div className="text-8xl mb-8 animate-bounce">✨</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">You did it!</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12 font-medium">
            Thank you for taking the time to reflect. Remember, practicing self-compassion is a journey, and you've just taken a beautiful step forward. Have a wonderful day!
          </p>
          <button
            onClick={() => alert("Data saved! Exiting section...")}
            className="px-10 py-4 rounded-full font-bold transition-all duration-300 bg-gray-800 text-white shadow-xl hover:bg-gray-700 hover:-translate-y-1 text-lg"
          >
            Exit Section
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col justify-between p-6 transition-colors duration-700 ${getBackgroundColor()}`}>

      {/* Top bar */}
      <div className="flex justify-between items-center w-full max-w-md mx-auto pt-8">
        <button
          onClick={() => step > 1 && setStep(step - 1)}
          className={`font-medium transition-opacity ${step === 1 ? 'opacity-0 cursor-default' : 'text-gray-500 hover:text-gray-800'}`}
        >
          ← Back
        </button>
        <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Best Version of Me</span>
        <button className="text-gray-500 hover:text-gray-800 text-xl">×</button>
      </div>

      {/* 主体 */}
      <div className="flex-grow flex flex-col items-center justify-center w-full max-w-md mx-auto mt-4">

        {step < 9 && (
          <div className="bg-yellow-100 text-yellow-800 font-bold px-8 py-3 rounded-full mb-8 shadow-sm text-lg tracking-wide">
            SELF COMPASSION
          </div>
        )}

        {/* ================= Part 1 : Discovering Me  ================= */}
        {step >= 1 && step <= 5 && (
          <div className="w-full animate-fade-in">
            <span className="text-xs font-bold text-blue-500 uppercase mb-2 block">Part 1: Discover Me</span>
            <h2 className="text-2xl text-gray-800 mb-6 font-medium">
              
              {questionsConfig[step as keyof typeof questionsConfig]}
            </h2>
            <textarea
              className="w-full p-5 rounded-2xl bg-white shadow-md border border-blue-50 hover:shadow-lg focus:shadow-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 resize-none h-36 text-gray-700 text-lg"
              placeholder="Type your answer here..."
              value={getCurrentAnswer()}
              onChange={(e) => handleAnswerChange(e.target.value)}
            ></textarea>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-3 font-medium">💡 Need some inspiration?</p>
              <div className="flex flex-wrap gap-2">
                
                {promptChipsConfig[step as keyof typeof promptChipsConfig]?.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className="bg-blue-200/50 hover:bg-blue-300 text-blue-800 text-sm px-4 py-2 rounded-full transition-colors font-medium"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= Part 2 : Through Other's eyes ================= */}
        {(step === 6 || step === 7) && fillInBlanksConfig[step] && (
          <div className="w-full animate-fade-in">
            <span className="text-xs font-bold text-blue-500 uppercase mb-2 block">Part 2: Through Others' Eyes</span>
            <h2 className="text-2xl text-gray-800 mb-6 font-medium">
              {fillInBlanksConfig[step].title}
            </h2>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-white leading-[3rem] text-xl text-gray-700">

              
              {fillInBlanksConfig[step].parts.map((part: any, index: number) => {

               
                if (part.type === 'text') {
                  return <span key={index}>{part.content}</span>;
                }

                if (part.type === 'select') {
                  const val = blankAnswers[part.id] || '';
                  const isCustom = customModes[part.id]; 

                  
                  if (isCustom) {
                    return (
                      <div key={index} className="inline-flex items-center mx-2 relative">
                        <input
                          type="text"
                          autoFocus 
                          value={val}
                          placeholder="Type your own..."
                          onChange={(e) => setBlankAnswers({ ...blankAnswers, [part.id]: e.target.value })}
                          className="bg-transparent border-b-2 border-orange-500 text-orange-500 outline-none text-center font-bold pb-1 transition-all w-48 shadow-sm focus:shadow-md"
                        />

                        {/* close input part */}
                        <button
                          onClick={() => {
                            setCustomModes({ ...customModes, [part.id]: false }); // 关闭手写模式
                            setBlankAnswers({ ...blankAnswers, [part.id]: '' }); // 清空刚刚手写的内容
                          }}
                          className="absolute -right-6 top-1 text-gray-400 hover:text-gray-700 text-sm font-bold transition-transform hover:scale-110"
                          title="Back to options"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  }

                  
                  return (
                    <div key={index} className="relative inline-block mx-2">
                      <select
                        value={val}
                        onChange={(e) => {
                          if (e.target.value === '__CUSTOM__') {
                            // 如果用户选了“自定义”，开启手写模式，并清空当前值
                            setCustomModes({ ...customModes, [part.id]: true });
                            setBlankAnswers({ ...blankAnswers, [part.id]: '' });
                          } else {
                            // 否则正常记录选项
                            setBlankAnswers({ ...blankAnswers, [part.id]: e.target.value });
                          }
                        }}
                        className={`appearance-none bg-transparent border-b-2 outline-none cursor-pointer text-center font-bold pb-1 pr-6 transition-colors
                          ${val === '' ? 'border-blue-300 text-blue-300 border-dashed w-36' : 'border-blue-600 text-blue-600 border-solid'}`}
                      >
                        <option value="" disabled>{part.placeholder}</option>
                        {part.options.map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                        
                        <option value="__CUSTOM__">✏️ Write my own...</option>
                      </select>
                      
                      <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center text-blue-400 text-sm">
                        ▼
                      </div>
                    </div>
                  );
                }

                // 3. if- text input (Input)
                if (part.type === 'input') {
                  const val = blankAnswers[part.id] || '';
                  return (
                    <div key={index} className="inline-block mx-2">
                      <input
                        type="text"
                        value={val}
                        placeholder={part.placeholder}
                        onChange={(e) => setBlankAnswers({ ...blankAnswers, [part.id]: e.target.value })}
                        className={`bg-transparent border-b-2 outline-none text-center font-bold pb-1 transition-colors w-48
                          ${val === '' ? 'border-orange-300 text-orange-300 border-dashed placeholder-orange-300/50' : 'border-orange-500 text-orange-500 border-solid'}`}
                      />
                    </div>
                  );
                }
              })}

            </div>
          </div>
        )}


        {/* ================= Part 3: Be Your Own Friend ================= */}
        {step === 8 && (
          <div className="w-full flex flex-col items-center justify-center min-h-[40vh] pb-12 animate-fade-in relative">

            {/* Reset button  */}
            {q8Choice && (
              <button
                onClick={() => { setQ8Choice(null); setQ9Choice(null); setReallyChoice(null); setQ10Answer(''); }}
                className="absolute -top-12 right-0 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors"
              >
                ↺ Reset choice
              </button>
            )}

            
            {!q8Choice && (
              <div className="w-full text-center animate-fade-in-up">
                <span className="text-xs font-bold text-blue-500 uppercase mb-2 block">Step 8: Reflection</span>
                <h2 className="text-2xl text-gray-800 mb-12 font-medium">
                  When you make a mistake, what do you usually say to yourself?
                </h2>
                <div className="flex justify-around items-end">
                  <div className="cursor-pointer transition-all duration-300 opacity-80 hover:scale-110 hover:opacity-100" onClick={() => setQ8Choice('negative')}>
                    <div className="text-7xl mb-4">😞</div>
                    <p className="font-bold text-gray-600">I suck at this!</p>
                  </div>
                  <div className="text-gray-400 font-medium mb-6">Or...</div>
                  <div className="cursor-pointer transition-all duration-300 opacity-80 hover:scale-110 hover:opacity-100" onClick={() => setQ8Choice('positive')}>
                    <div className="text-7xl mb-4">🤪</div>
                    <p className="font-bold text-gray-600">Just a silly mistake.</p>
                  </div>
                </div>
              </div>
            )}

            {/* ====== Q8 Branch : Positive ====== */}
            {q8Choice === 'positive' && (
              <div className="flex flex-col items-center w-full animate-fade-in-up">
                <div className="text-7xl mb-6 animate-bounce">🌟</div>
                <p className="text-2xl text-green-700 leading-relaxed px-4 font-bold text-center">
                  Not beating yourself up is exactly what Self-Compassion is all about. You're already treating yourself like a good friend.
                </p>
              </div>
            )}

            {/* ====== Q8 Branch : Negative -> Q9 ====== */}
            {q8Choice === 'negative' && !q9Choice && (
              <div className="flex flex-col items-center w-full animate-fade-in-up">
                <div className="bg-white/50 px-4 py-2 rounded-full mb-8 text-sm text-gray-600 font-medium shadow-sm">
                  You just said: <span className="italic">"I suck at this!"</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
                  Would you say that to a friend?
                </h2>
                <div className="flex gap-4">
                  <button onClick={() => setQ9Choice('no_never')} className="px-8 py-4 rounded-full font-bold transition-all duration-300 bg-white text-gray-700 border-2 border-transparent hover:border-gray-800 shadow-sm hover:shadow-md text-lg">
                    No, Never
                  </button>
                  <button onClick={() => setQ9Choice('yeah_probably')} className="px-8 py-4 rounded-full font-bold transition-all duration-300 bg-white text-gray-700 border-2 border-transparent hover:border-gray-800 shadow-sm hover:shadow-md text-lg">
                    Yeah, probably 🤷
                  </button>
                </div>
              </div>
            )}

            {/* ====== Q9 Branch: Really ====== */}
            {q9Choice === 'yeah_probably' && !reallyChoice && (
              <div className="flex flex-col items-center w-full animate-fade-in-up">
                <h2 className="text-4xl font-bold text-gray-800 mb-10">Really?</h2>
                <div className="flex gap-4">
                  <button onClick={() => setReallyChoice('no')} className="px-8 py-4 rounded-full font-bold transition-all duration-300 bg-white text-gray-700 border-2 border-transparent hover:border-gray-800 shadow-sm hover:shadow-md text-lg">
                    No
                  </button>
                  <button onClick={() => setReallyChoice('yeah_hardcore')} className="px-8 py-4 rounded-full font-bold transition-all duration-300 bg-white text-orange-600 border-2 border-transparent hover:border-orange-500 shadow-sm hover:shadow-md text-lg">
                    Yeah, I'm hardcore
                  </button>
                </div>
              </div>
            )}

            {/* ====== Final Q10 ====== */}
            {(q9Choice === 'no_never' || reallyChoice !== null) && (
              <div className="flex flex-col items-center w-full animate-fade-in-up">
                {/* for hardcore part */}
                {reallyChoice === 'yeah_hardcore' && (
                  <div className="w-full text-center mb-6">
                    <p className="text-orange-700 font-bold bg-orange-100 p-4 rounded-2xl inline-block">
                      Fair enough! Sometimes friends joke like that. But...
                    </p>
                  </div>
                )}

                <p className="text-left w-full text-gray-800 mb-4 font-bold text-xl">
                  What's something you could say to yourself instead?
                </p>
                <textarea
                  className="w-full p-6 rounded-2xl bg-white shadow-md border border-blue-50 hover:shadow-lg focus:shadow-xl focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-300 resize-none h-40 text-gray-700 text-lg"
                  placeholder="Type a kinder message..."
                  value={q10Answer}
                  onChange={(e) => setQ10Answer(e.target.value)}
                />
              </div>
            )}

          </div>
        )}
      </div>



      {/* process bar and button */}
      <div className="w-full max-w-md mx-auto pb-8 mt-8">
        <div className="flex items-center justify-between mb-4">

          {/* whole process monitor */}
          <div className="flex items-center gap-2 h-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              let barClasses = "rounded-full transition-all duration-500 ";
              if (step === num) barClasses += `h-3 w-10 ${progressTheme.current} shadow-sm`;
              else if (step > num) barClasses += `h-2 w-8 ${progressTheme.active}`;
              else barClasses += `h-2 w-4 ${progressTheme.inactive}`;

              return <div key={num} className={barClasses}></div>;
            })}
          </div>

          <button
            onClick={() => {
              if (step < totalSteps) setStep(step + 1);
              else setIsCompleted(true);
            }}
            disabled={!isCurrentStepValid()}
            className={`flex items-center gap-2 font-bold px-8 py-3 rounded-full transition-all duration-300 ${!isCurrentStepValid()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : step === totalSteps
                  ? 'bg-gray-800 text-white shadow-lg hover:bg-gray-700 hover:-translate-y-0.5'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5'
              }`}
          >
            {step === totalSteps ? 'Finish ✨' : 'Next'} <span>{step === totalSteps ? '' : '≫'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
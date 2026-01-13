import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Emotion = 'happy' | 'thinking' | 'excited' | 'neutral';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [emotion, setEmotion] = useState<Emotion>('neutral');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'ai' }>>([
    { text: 'Привет! Я ИИ-помощник станции Nexus. Чем могу помочь?', sender: 'ai' },
  ]);

  const emotionData = {
    happy: { emoji: '😊', color: 'text-green-400', phrase: 'Рад помочь!' },
    thinking: { emoji: '🤔', color: 'text-blue-400', phrase: 'Обрабатываю...' },
    excited: { emoji: '🚀', color: 'text-pink-400', phrase: 'Невероятно!' },
    neutral: { emoji: '🤖', color: 'text-gray-400', phrase: 'Готов к работе' },
  };

  const responses = [
    'Отличный вопрос! Дай подумаю...',
    'Согласно данным станции, это возможно.',
    'Интересная мысль! Расскажу подробнее...',
    'Мои датчики показывают положительный результат.',
    'Система обрабатывает запрос... Готово!',
    'Это напоминает мне один случай на орбите...',
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, sender: 'user' }]);
    setMessage('');
    setEmotion('thinking');

    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: randomResponse, sender: 'ai' }]);
      setEmotion('happy');
    }, 1500);
  };

  const handleEmotionClick = () => {
    const emotions: Emotion[] = ['happy', 'thinking', 'excited', 'neutral'];
    const currentIndex = emotions.indexOf(emotion);
    const nextEmotion = emotions[(currentIndex + 1) % emotions.length];
    setEmotion(nextEmotion);
  };

  return (
    <>
      <div className="fixed top-6 left-6 z-50">
        <div
          className={`relative transition-all duration-500 ${
            isOpen ? 'scale-100' : 'scale-100 animate-float'
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full glass glow-blue flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 ${
              isOpen ? 'opacity-50' : ''
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-3xl animate-pulse">{emotionData[emotion].emoji}</span>
          </div>

          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 animate-pulse cursor-pointer"
            onClick={handleEmotionClick}
            title="Изменить настроение"
          />
        </div>
      </div>

      {isOpen && (
        <Card className="fixed top-6 left-28 z-50 w-96 glass glow-blue animate-slide-in">
          <div className="p-4 border-b border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{emotionData[emotion].emoji}</span>
                <div>
                  <h3 className="font-bold font-orbitron text-primary">NEXUS AI</h3>
                  <p className={`text-xs ${emotionData[emotion].color}`}>
                    {emotionData[emotion].phrase}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-destructive/20"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-background/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary/20 text-primary-foreground'
                      : 'bg-secondary/20 text-foreground'
                  } animate-fade-in`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-primary/20">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Напишите сообщение..."
                className="bg-background/50 border-primary/30 focus:border-primary"
              />
              <Button
                onClick={handleSend}
                className="bg-primary hover:bg-primary/80"
                disabled={!message.trim()}
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge
                variant="outline"
                className="text-xs cursor-pointer hover:bg-primary/20"
                onClick={() => setMessage('Расскажи о проектах')}
              >
                Проекты
              </Badge>
              <Badge
                variant="outline"
                className="text-xs cursor-pointer hover:bg-secondary/20"
                onClick={() => setMessage('Какие технологии используются?')}
              >
                Технологии
              </Badge>
              <Badge
                variant="outline"
                className="text-xs cursor-pointer hover:bg-accent/20"
                onClick={() => setMessage('Как связаться?')}
              >
                Контакты
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIAssistant;

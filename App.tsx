
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { NewPrediction } from './components/NewPrediction';
import { History } from './components/History';
import { Footer } from './components/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getPrediction } from './services/geminiService';
import { systemPrompts } from './utils/prompts';
import { buildUserPrompt } from './utils/promptBuilder';
import type { Prediction, DivinationMethod, Language, BaziInfo, FormValues } from './types';
import { formDefinitions } from './constants';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
    const [history, setHistory] = useLocalStorage<Prediction[]>('divinationHistory', []);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Apply dark mode based on user preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        }
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (e.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    
    const handleGetPrediction = useCallback(async (
        method: DivinationMethod,
        language: Language,
        formData: FormValues,
        baziInfo: BaziInfo | null
    ) => {
        setIsLoading(true);
        setCurrentPrediction(null);
        setError(null);
        
        try {
            const systemPrompt = systemPrompts[method];
            const userPrompt = buildUserPrompt(method, formData, language, baziInfo);
            
            const resultText = await getPrediction(systemPrompt, userPrompt);
            
            const newPrediction: Prediction = {
                id: Date.now().toString(),
                method,
                formData,
                baziInfo,
                language,
                content: resultText,
                timestamp: new Date().toISOString(),
            };
            setCurrentPrediction(newPrediction);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSavePrediction = useCallback(() => {
        if (currentPrediction) {
            setHistory(prevHistory => {
                // Avoid saving duplicates
                if (prevHistory.some(p => p.id === currentPrediction.id)) {
                    return prevHistory;
                }
                const newHistory = [currentPrediction, ...prevHistory];
                // Limit history to 20 items
                return newHistory.slice(0, 20);
            });
            // To prevent re-saving, we can clear the `currentPrediction` or set a flag
            setCurrentPrediction(prev => prev ? { ...prev, isSaved: true } : null);
        }
    }, [currentPrediction, setHistory]);

    const handleViewHistoryItem = useCallback((prediction: Prediction) => {
        setCurrentPrediction(prediction);
        setActiveTab('new');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, []);

    const handleClearHistory = useCallback(() => {
        if (window.confirm('Are you sure you want to clear all prediction history? This action cannot be undone.')) {
            setHistory([]);
        }
    }, [setHistory]);

    const handleNewPredictionClick = () => {
      setCurrentPrediction(null);
      setError(null);
    }
    
    return (
        <div className="container mx-auto px-4 py-6 max-w-3xl font-sans">
            <Header />
            <main>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                
                {activeTab === 'new' ? (
                    <NewPrediction 
                        isLoading={isLoading}
                        currentPrediction={currentPrediction}
                        error={error}
                        onGetPrediction={handleGetPrediction}
                        onSavePrediction={handleSavePrediction}
                        onNewPrediction={handleNewPredictionClick}
                    />
                ) : (
                    <History 
                        history={history}
                        onViewItem={handleViewHistoryItem}
                        onClearHistory={handleClearHistory}
                    />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default App;

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

type Operator = '+' | '-' | '×';

interface CaptchaChallenge {
    a: number;
    b: number;
    operator: Operator;
    answer: number;
}

interface CaptchaProps {
    /** Called whenever the verification status changes. */
    onVerify?: (verified: boolean) => void;
    /** Disable the whole widget (e.g. while a form is submitting). */
    disabled?: boolean;
    /** Use the smaller label/input sizing used inside the quote drawer. */
    compact?: boolean;
    /** Optional id for the wrapper element. */
    id?: string;
}

const OPERATORS: Operator[] = ['+', '-', '×'];

/**
 * Generate a random, human-friendly arithmetic challenge.
 * Subtraction is always non-negative and multiplication stays single-digit.
 */
const generateChallenge = (): CaptchaChallenge => {
    const operator = OPERATORS[Math.floor(Math.random() * OPERATORS.length)];
    let a = 0;
    let b = 0;
    let answer = 0;

    switch (operator) {
        case '+':
            a = Math.floor(Math.random() * 9) + 1;
            b = Math.floor(Math.random() * 9) + 1;
            answer = a + b;
            break;
        case '-':
            a = Math.floor(Math.random() * 9) + 6;
            b = Math.floor(Math.random() * (a - 1)) + 1;
            answer = a - b;
            break;
        case '×':
            a = Math.floor(Math.random() * 7) + 2;
            b = Math.floor(Math.random() * 7) + 2;
            answer = a * b;
            break;
    }

    return { a, b, operator, answer };
};

/**
 * Simple, dependency-free math captcha.
 *
 * Renders a random arithmetic question (e.g. "7 + 3 =") with a numeric answer
 * field and a refresh button. The parent form is notified of the verified
 * state through `onVerify` and should gate submission until it reports `true`.
 *
 * Reset the challenge from the parent by changing the `key` prop, which forces
 * a clean remount with a fresh question.
 */
export default function Captcha({ onVerify, disabled = false, compact = false, id }: CaptchaProps) {
    const [challenge, setChallenge] = useState<CaptchaChallenge>(generateChallenge);
    const [userAnswer, setUserAnswer] = useState('');

    const refresh = useCallback(() => {
        setChallenge(generateChallenge());
        setUserAnswer('');
        onVerify?.(false);
    }, [onVerify]);

    // Report the initial (unverified) state on mount.
    useEffect(() => {
        onVerify?.(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setUserAnswer(value);
        const verified = value !== '' && parseInt(value, 10) === challenge.answer;
        onVerify?.(verified);
    };

    const isValid = userAnswer !== '' && parseInt(userAnswer, 10) === challenge.answer;

    const labelClass = compact
        ? 'font-display text-[9px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-1.5'
        : 'font-display text-[10px] tracking-widest font-extrabold text-[#444748] dark:text-[#b0b3b8] uppercase mb-2';

    const inputText = compact ? 'text-xs' : 'text-sm';

    return (
        <div className="flex flex-col" id={id}>
            <label className={labelClass}>SECURITY VERIFICATION *</label>
            <div className="flex items-stretch gap-2">
                {/* Challenge chip */}
                <div className="flex items-center gap-2 bg-stone-100 dark:bg-[#23252d] border border-[#c4c7c7] dark:border-[#3a3d45] rounded-sm px-4 select-none">
                    <span className="font-mono font-bold text-black dark:text-white text-sm tracking-wider whitespace-nowrap">
                        {challenge.a} {challenge.operator} {challenge.b} =
                    </span>
                    <button
                        type="button"
                        onClick={refresh}
                        disabled={disabled}
                        tabIndex={-1}
                        aria-label="Generate a new verification question"
                        className="text-stone-400 dark:text-[#8b8e93] hover:text-[#785919] dark:hover:text-[#eac076] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Answer input */}
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={userAnswer}
                    onChange={handleChange}
                    disabled={disabled}
                    placeholder="?"
                    required
                    className={`flex-1 min-w-0 bg-stone-50 dark:bg-[#23252d] border rounded-sm px-4 py-3 ${inputText} font-sans text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#8b8e93] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isValid
                        ? 'border-emerald-500 dark:border-emerald-500 focus:border-emerald-500'
                        : userAnswer !== ''
                            ? 'border-red-400 dark:border-red-500 focus:border-red-500'
                            : 'border-[#c4c7c7] dark:border-[#3a3d45] focus:border-[#785919] dark:focus:border-[#eac076]'
                        }`}
                />
            </div>

            {isValid ? (
                <span className="flex items-center gap-1 mt-1.5 text-[10px] font-sans text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-3 h-3" /> Verified
                </span>
            ) : (
                <span className="text-[10px] font-sans text-gray-400 dark:text-[#8b8e93] mt-1.5">
                    Solve the math question to enable submission.
                </span>
            )}
        </div>
    );
}

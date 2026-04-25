const NATURAL_ENGLISH_VOICE_PATTERNS = [
    /^Alex$/i,
    /^Samantha$/i,
    /^Google US English$/i,
    /^Microsoft Aria Online/i,
    /^Microsoft Jenny Online/i,
    /^Microsoft Guy Online/i,
    /^Ava(\s*\(Enhanced\))?$/i,
    /^Daniel(\s*\(Enhanced\))?$/i,
    /^Allison$/i,
    /^Karen$/i,
    /^Moira$/i,
];

const NOVELTY_VOICE_PATTERN = /(bad news|bells|boing|bubbles|cellos|deranged|good news|hysterical|pipe organ|trinoids|whisper|zarvox)/i;
const ENGLISH_LOCALE_PREFERENCE = ['en-us', 'en-gb', 'en-au', 'en-ca', 'en-in'];
const DEFAULT_RATE = 0.96;
const DEFAULT_PITCH = 1;

type PatchedSpeechSynthesis = SpeechSynthesis & {
    __grammarIslandPatched__?: boolean;
};

let selectedEnglishVoiceURI: string | null = null;

const normalizeLanguageTag = (lang?: string) => lang?.toLowerCase().replace('_', '-') ?? '';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const containsEnglishText = (text: string) => /[a-z]/i.test(text);

const getVoiceScore = (voice: SpeechSynthesisVoice) => {
    const name = voice.name.trim();
    const normalizedName = name.toLowerCase();
    const normalizedLang = normalizeLanguageTag(voice.lang);
    let score = 0;

    const localeIndex = ENGLISH_LOCALE_PREFERENCE.indexOf(normalizedLang);
    if (localeIndex !== -1) {
        score += 120 - localeIndex * 10;
    } else if (normalizedLang.startsWith('en-')) {
        score += 80;
    } else if (normalizedLang === 'en') {
        score += 70;
    }

    const naturalVoiceIndex = NATURAL_ENGLISH_VOICE_PATTERNS.findIndex((pattern) => pattern.test(name));
    if (naturalVoiceIndex !== -1) {
        score += 200 - naturalVoiceIndex * 10;
    }

    if (voice.localService) {
        score += 25;
    }

    if (voice.default) {
        score += 15;
    }

    if (/(neural|natural|enhanced|premium|online)/i.test(normalizedName)) {
        score += 12;
    }

    if (NOVELTY_VOICE_PATTERN.test(normalizedName)) {
        score -= 300;
    }

    return score;
};

const pickBestEnglishVoice = (voices: SpeechSynthesisVoice[]) => {
    const englishVoices = voices.filter((voice) => normalizeLanguageTag(voice.lang).startsWith('en'));
    if (englishVoices.length === 0) {
        return null;
    }

    return englishVoices.reduce((bestVoice, currentVoice) => {
        if (!bestVoice) {
            return currentVoice;
        }

        return getVoiceScore(currentVoice) > getVoiceScore(bestVoice) ? currentVoice : bestVoice;
    }, englishVoices[0]);
};

const resolveStableEnglishVoice = (synth: SpeechSynthesis) => {
    const voices = synth.getVoices();
    if (voices.length === 0) {
        return null;
    }

    if (selectedEnglishVoiceURI) {
        const matchedVoice = voices.find((voice) => voice.voiceURI === selectedEnglishVoiceURI);
        if (matchedVoice) {
            return matchedVoice;
        }
    }

    const preferredVoice = pickBestEnglishVoice(voices);
    if (preferredVoice) {
        selectedEnglishVoiceURI = preferredVoice.voiceURI;
    }

    return preferredVoice;
};

const warmSpeechSynthesisVoices = (synth: SpeechSynthesis) => {
    let attempts = 0;
    const intervalId = window.setInterval(() => {
        attempts += 1;
        const voices = synth.getVoices();
        if (voices.length > 0 || attempts >= 12) {
            window.clearInterval(intervalId);
        }
    }, 250);
};

export const configureSpeechSynthesis = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
    }

    const synth = window.speechSynthesis as PatchedSpeechSynthesis;
    if (synth.__grammarIslandPatched__) {
        return;
    }

    synth.__grammarIslandPatched__ = true;
    warmSpeechSynthesisVoices(synth);

    const originalSpeak = synth.speak.bind(synth);

    const patchedSpeak: SpeechSynthesis['speak'] = (utterance) => {
        if (!utterance) {
            return;
        }

        const text = utterance.text?.trim() ?? '';

        if (containsEnglishText(text)) {
            const preferredVoice = resolveStableEnglishVoice(synth);
            if (preferredVoice) {
                utterance.voice = preferredVoice;
                utterance.lang = preferredVoice.lang;
            } else if (!utterance.lang) {
                utterance.lang = 'en-US';
            }

            utterance.rate = DEFAULT_RATE;
            utterance.pitch = DEFAULT_PITCH;
        } else {
            utterance.rate = clamp(utterance.rate || 1, 0.9, 1.05);
            utterance.pitch = clamp(utterance.pitch || 1, 0.95, 1.05);
        }

        originalSpeak(utterance);
    };

    try {
        (synth as SpeechSynthesis & { speak: SpeechSynthesis['speak'] }).speak = patchedSpeak;
    } catch {
        Object.defineProperty(synth, 'speak', {
            configurable: true,
            writable: true,
            value: patchedSpeak,
        });
    }
};

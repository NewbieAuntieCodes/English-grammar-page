/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

interface Choice {
    text: string;
    isCorrect: boolean;
}

interface StoryStep {
    prompt: string;
    choices: Choice[];
}

export interface PresentPerfectStory {
    title: string;
    description: string;
    storyData: StoryStep[];
}

export const presentPerfectStories: PresentPerfectStory[] = [
    {
        title: "故事一：旅行经历",
        description: "关于去过哪些地方的故事。",
        storyData: [
            { prompt: "I love traveling. I...", choices: [{ text: "have visited", isCorrect: true }, { text: "visited", isCorrect: false }] },
            { prompt: "many countries so far. My sister...", choices: [{ text: "has been", isCorrect: true }, { text: "have been", isCorrect: false }] },
            { prompt: "to France twice. We...", choices: [{ text: "have seen", isCorrect: true }, { text: "saw", isCorrect: false }] },
            { prompt: "the Eiffel Tower together. She...", choices: [{ text: "has never traveled", isCorrect: true }, { text: "never traveled", isCorrect: false }] },
            { prompt: "alone before. But she wants to try it next year.", choices: [] }
        ]
    },
    {
        title: "故事二：繁忙的早晨",
        description: "描述已经完成的任务。",
        storyData: [
            { prompt: "It's 10 AM and I am ready for work. I...", choices: [{ text: "have finished", isCorrect: true }, { text: "finish", isCorrect: false }] },
            { prompt: "my breakfast. My mother...", choices: [{ text: "has already cleaned", isCorrect: true }, { text: "already cleaned", isCorrect: false }] },
            { prompt: "the kitchen. My brother...", choices: [{ text: "has not woken up", isCorrect: true }, { text: "did not wake up", isCorrect: false }] },
            { prompt: "yet. I...", choices: [{ text: "have already drunk", isCorrect: true }, { text: "drank", isCorrect: false }] },
            { prompt: "two cups of coffee. Now I feel energetic!", choices: [] }
        ]
    },
    {
        title: "故事三：丢失的钥匙",
        description: "寻找钥匙的过程及结果。",
        storyData: [
            { prompt: "Oh no! I can't find my keys. I...", choices: [{ text: "have lost", isCorrect: true }, { text: "lost", isCorrect: false }] },
            { prompt: "them. I...", choices: [{ text: "have looked", isCorrect: true }, { text: "look", isCorrect: false }] },
            { prompt: "everywhere in the house. My roommate...", choices: [{ text: "has just found", isCorrect: true }, { text: "just found", isCorrect: false }] },
            { prompt: "them under the sofa! I...", choices: [{ text: "have never been", isCorrect: true }, { text: "was never", isCorrect: false }] },
            { prompt: "so relieved in my life. Thank you!", choices: [] }
        ]
    },
    {
        title: "故事四：老同学聚会",
        description: "多年未见的朋友聚在一起聊变化。",
        storyData: [
            { prompt: "I met my old friend Jack today. We...", choices: [{ text: "have not seen", isCorrect: true }, { text: "did not see", isCorrect: false }] },
            { prompt: "each other for ten years. He...", choices: [{ text: "has changed", isCorrect: true }, { text: "changed", isCorrect: false }] },
            { prompt: "a lot. He...", choices: [{ text: "has grown", isCorrect: true }, { text: "grew", isCorrect: false }] },
            { prompt: "a beard now. We...", choices: [{ text: "have talked", isCorrect: true }, { text: "talked", isCorrect: false }] },
            { prompt: "about our school days for hours. It was so good to see him.", choices: [] }
        ]
    },
    {
        title: "故事五：新技能学习",
        description: "记录学习吉他的进度。",
        storyData: [
            { prompt: "I started learning guitar last month. I...", choices: [{ text: "have learned", isCorrect: true }, { text: "learned", isCorrect: false }] },
            { prompt: "three songs already. My teacher...", choices: [{ text: "has told", isCorrect: true }, { text: "told", isCorrect: false }] },
            { prompt: "me that I am doing great. I...", choices: [{ text: "have practiced", isCorrect: true }, { text: "practice", isCorrect: false }] },
            { prompt: "every night this week. I...", choices: [{ text: "have always wanted", isCorrect: true }, { text: "always wanted", isCorrect: false }] },
            { prompt: "to play an instrument. Now I'm finally doing it!", choices: [] }
        ]
    }
];

export const presentPerfectQuestionPractice = [
    { 
        sentenceParts: ["", " you ever seen a panda?"] as const, 
        choices: [{text: "Have", isCorrect: true}, {text: "Has", isCorrect: false}, {text: "Do", isCorrect: false}], 
        chineseHint: "你曾经见过熊猫吗？" 
    },
    { 
        sentenceParts: ["", " he finished his homework yet?"] as const, 
        choices: [{text: "Has", isCorrect: true}, {text: "Have", isCorrect: false}, {text: "Is", isCorrect: false}], 
        chineseHint: "他写完作业了吗？" 
    },
    { 
        sentenceParts: ["Where ", " they gone?"] as const, 
        choices: [{text: "have", isCorrect: true}, {text: "has", isCorrect: false}, {text: "did", isCorrect: false}], 
        chineseHint: "他们去哪儿了？" 
    },
    { 
        sentenceParts: ["How long have you ", " here?"] as const, 
        choices: [{text: "lived", isCorrect: true}, {text: "live", isCorrect: false}, {text: "living", isCorrect: false}], 
        chineseHint: "你在这里住了多久了？" 
    },
    { 
        sentenceParts: ["Has she ", " her lunch?"] as const, 
        choices: [{text: "eaten", isCorrect: true}, {text: "eat", isCorrect: false}, {text: "ate", isCorrect: false}], 
        chineseHint: "她吃过午饭了吗？" 
    },
    { 
        sentenceParts: ["", " you ever been to Beijing?"] as const, 
        choices: [{text: "Have", isCorrect: true}, {text: "Has", isCorrect: false}, {text: "Were", isCorrect: false}], 
        chineseHint: "你曾经去过北京吗？" 
    },
    { 
        sentenceParts: ["What ", " you done today?"] as const, 
        choices: [{text: "have", isCorrect: true}, {text: "has", isCorrect: false}, {text: "are", isCorrect: false}], 
        chineseHint: "你今天做了什么？" 
    }
];

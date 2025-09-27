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

export interface PresentContinuousStory {
    title: string;
    description: string;
    storyData: StoryStep[];
}

export const presentContinuousStories: PresentContinuousStory[] = [
    {
        title: "故事一：公园的一天",
        description: "一个关于在公园里正在发生的事情的故事。",
        storyData: [
            { prompt: "The sun is shining and we are at the park. A dog...", choices: [{ text: "is running.", isCorrect: true }, { text: "runs.", isCorrect: false }] },
            { prompt: "Some children...", choices: [{ text: "are playing on the swings.", isCorrect: true }, { text: "play on the swings.", isCorrect: false }] },
            { prompt: "My father...", choices: [{ text: "is reading a book.", isCorrect: true }, { text: "reads a book.", isCorrect: false }] },
            { prompt: "My mother...", choices: [{ text: "is talking to her friend.", isCorrect: true }, { text: "talk to her friend.", isCorrect: false }] },
            { prompt: "And I...", choices: [{ text: "am eating an ice cream.", isCorrect: true }, { text: "eat an ice cream.", isCorrect: false }] },
            { prompt: "We are having a wonderful time.", choices: [] }
        ]
    },
    {
        title: "故事二：在厨房里",
        description: "描述家人在厨房里准备晚餐的情景。",
        storyData: [
            { prompt: "Right now, we are busy in the kitchen. My mother...", choices: [{ text: "is cooking dinner.", isCorrect: true }, { text: "cooks dinner.", isCorrect: false }] },
            { prompt: "She...", choices: [{ text: "is cutting vegetables.", isCorrect: true }, { text: "is cut vegetables.", isCorrect: false }] },
            { prompt: "My brother...", choices: [{ text: "is setting the table.", isCorrect: true }, { text: "sets the table.", isCorrect: false }] },
            { prompt: "My little sister...", choices: [{ text: "is watching everyone.", isCorrect: true }, { text: "watch everyone.", isCorrect: false }] },
            { prompt: "And I...", choices: [{ text: "am helping my mother.", isCorrect: true }, { text: "is helping my mother.", isCorrect: false }] },
            { prompt: "We are working together.", choices: [] }
        ]
    },
    {
        title: "故事三：城市生活",
        description: "描述一个繁忙城市中正在发生的各种活动。",
        storyData: [
            { prompt: "I am looking out of my window. The city is busy. Cars...", choices: [{ text: "are moving quickly.", isCorrect: true }, { text: "move quickly.", isCorrect: false }] },
            { prompt: "People...", choices: [{ text: "are walking on the sidewalk.", isCorrect: true }, { text: "walks on the sidewalk.", isCorrect: false }] },
            { prompt: "A man...", choices: [{ text: "is selling hot dogs.", isCorrect: true }, { text: "sell hot dogs.", isCorrect: false }] },
            { prompt: "Some birds...", choices: [{ text: "are flying in the sky.", isCorrect: true }, { text: "is flying in the sky.", isCorrect: false }] },
            { prompt: "The city...", choices: [{ text: "is making a lot of noise.", isCorrect: true }, { text: "make a lot of noise.", isCorrect: false }] },
            { prompt: "It's a lively afternoon.", choices: [] }
        ]
    },
    {
        title: "故事四：一个下雨天",
        description: "描述一个在室内度过的安静雨天。",
        storyData: [
            { prompt: "It is raining outside, so we...", choices: [{ text: "are staying indoors.", isCorrect: true }, { text: "stay indoors.", isCorrect: false }] },
            { prompt: "My brother...", choices: [{ text: "is building a Lego castle.", isCorrect: true }, { text: "builds a Lego castle.", isCorrect: false }] },
            { prompt: "My cat...", choices: [{ text: "is sleeping on my bed.", isCorrect: true }, { text: "sleeps on my bed.", isCorrect: false }] },
            { prompt: "I...", choices: [{ text: "am drawing a picture.", isCorrect: true }, { text: "draw a picture.", isCorrect: false }] },
            { prompt: "We...", choices: [{ text: "are feeling very cozy.", isCorrect: true }, { text: "feel very cozy.", isCorrect: false }] },
            { prompt: "It's a quiet and happy day.", choices: [] }
        ]
    },
    {
        title: "故事五：生日派对",
        description: "描述一个正在进行的 lively 生日派对。",
        storyData: [
            { prompt: "Look! Everyone is at the party. Music...", choices: [{ text: "is playing loudly.", isCorrect: true }, { text: "plays loudly.", isCorrect: false }] },
            { prompt: "My friends...", choices: [{ text: "are dancing together.", isCorrect: true }, { text: "dance together.", isCorrect: false }] },
            { prompt: "Some people...", choices: [{ text: "are eating cake.", isCorrect: true }, { text: "eat cake.", isCorrect: false }] },
            { prompt: "The birthday girl...", choices: [{ text: "is opening her presents.", isCorrect: true }, { text: "opens her presents.", isCorrect: false }] },
            { prompt: "Everyone...", choices: [{ text: "is having a lot of fun.", isCorrect: true }, { text: "has a lot of fun.", isCorrect: false }] },
            { prompt: "The party is amazing!", choices: [] }
        ]
    }
];
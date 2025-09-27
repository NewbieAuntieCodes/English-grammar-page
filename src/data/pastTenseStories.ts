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

export interface PastTenseStory {
    title: string;
    description: string;
    storyData: StoryStep[];
}

export const pastTenseStories: PastTenseStory[] = [
    {
        title: "故事一：我的一天",
        description: "一个关于日常活动的简单故事。",
        storyData: [
            { prompt: "Yesterday was a nice day. First, I...", choices: [{ text: "ate breakfast.", isCorrect: true }, { text: "eat breakfast.", isCorrect: false }] },
            { prompt: "Then, I...", choices: [{ text: "went to the park.", isCorrect: true }, { text: "go to the park.", isCorrect: false }] },
            { prompt: "At the park, I...", choices: [{ text: "see many birds.", isCorrect: false }, { text: "saw many birds.", isCorrect: true }] },
            { prompt: "Later, my friend...", choices: [{ text: "call me.", isCorrect: false }, { text: "called me.", isCorrect: true }] },
            { prompt: "We...", choices: [{ text: "played football together.", isCorrect: true }, { text: "play football together.", isCorrect: false }] },
            { prompt: "It was a wonderful day.", choices: [] }
        ]
    },
    {
        title: "故事二：动物园之旅",
        description: "讲述一次去动物园的愉快经历。",
        storyData: [
            { prompt: "Last weekend, my family and I...", choices: [{ text: "go to the zoo.", isCorrect: false }, { text: "went to the zoo.", isCorrect: true }] },
            { prompt: "We...", choices: [{ text: "see many animals.", isCorrect: false }, { text: "saw many animals.", isCorrect: true }] },
            { prompt: "The monkeys...", choices: [{ text: "ate bananas.", isCorrect: true }, { text: "eat bananas.", isCorrect: false }] },
            { prompt: "I...", choices: [{ text: "took a lot of photos.", isCorrect: true }, { text: "take a lot of photos.", isCorrect: false }] },
            { prompt: "We...", choices: [{ text: "have a great time.", isCorrect: false }, { text: "had a great time.", isCorrect: true }] },
            { prompt: "It was a fun trip.", choices: [] }
        ]
    },
    {
        title: "故事三：生日派对",
        description: "关于一个难忘的生日派对的故事。",
        storyData: [
            { prompt: "For my birthday last month, my friends...", choices: [{ text: "came to my house.", isCorrect: true }, { text: "come to my house.", isCorrect: false }] },
            { prompt: "We...", choices: [{ text: "listened to music.", isCorrect: true }, { text: "listen to music.", isCorrect: false }] },
            { prompt: "My mom...", choices: [{ text: "make a big cake.", isCorrect: false }, { text: "made a big cake.", isCorrect: true }] },
            { prompt: "I...", choices: [{ text: "get many presents.", isCorrect: false }, { text: "got many presents.", isCorrect: true }] },
            { prompt: "Everyone...", choices: [{ text: "sang 'Happy Birthday'.", isCorrect: true }, { text: "sing 'Happy Birthday'.", isCorrect: false }] },
            { prompt: "I felt very happy.", choices: [] }
        ]
    },
    {
        title: "故事四：一个下雨天",
        description: "描述一个在家里度过的舒适雨天。",
        storyData: [
            { prompt: "It rained all day yesterday, so I...", choices: [{ text: "stayed at home.", isCorrect: true }, { text: "stay at home.", isCorrect: false }] },
            { prompt: "I...", choices: [{ text: "readed a book.", isCorrect: false }, { text: "read a book.", isCorrect: true }] },
            { prompt: "Later, I...", choices: [{ text: "watched a movie.", isCorrect: true }, { text: "watch a movie.", isCorrect: false }] },
            { prompt: "My cat...", choices: [{ text: "slept on the sofa.", isCorrect: true }, { text: "sleep on the sofa.", isCorrect: false }] },
            { prompt: "In the evening, I...", choices: [{ text: "drink some hot tea.", isCorrect: false }, { text: "drank some hot tea.", isCorrect: true }] },
            { prompt: "It was a cozy day.", choices: [] }
        ]
    },
    {
        title: "故事五：丢失的小猫",
        description: "一个关于发现并帮助一只小猫的暖心故事。",
        storyData: [
            { prompt: "Yesterday afternoon, I...", choices: [{ text: "hear a small noise.", isCorrect: false }, { text: "heard a small noise.", isCorrect: true }] },
            { prompt: "I looked outside and...", choices: [{ text: "found a little kitten.", isCorrect: true }, { text: "find a little kitten.", isCorrect: false }] },
            { prompt: "It...", choices: [{ text: "was cold and hungry.", isCorrect: true }, { text: "is cold and hungry.", isCorrect: false }] },
            { prompt: "So, I...", choices: [{ text: "give it some milk.", isCorrect: false }, { text: "gave it some milk.", isCorrect: true }] },
            { prompt: "The kitten...", choices: [{ text: "feel warm and safe.", isCorrect: false }, { text: "felt warm and safe.", isCorrect: true }] },
            { prompt: "I decided to keep it.", choices: [] }
        ]
    }
];
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

export interface PastContinuousStory {
    title: string;
    description: string;
    storyData: StoryStep[];
}

export const pastContinuousStories: PastContinuousStory[] = [
    {
        title: "故事一：一个奇怪的夜晚",
        description: "描述一个夜晚正在发生的事情。",
        storyData: [
            { prompt: "Last night was strange. At midnight, I was reading in bed when suddenly, a loud noise came from downstairs. My dog...", choices: [{ text: "was sleeping", isCorrect: true }, { text: "slept", isCorrect: false }] },
            { prompt: "at my feet, but he woke up. Outside, the wind...", choices: [{ text: "was blowing", isCorrect: true }, { text: "blew", isCorrect: false }] },
            { prompt: "hard against the windows. I looked out. A cat...", choices: [{ text: "sat", isCorrect: false }, { text: "was sitting", isCorrect: true }] },
            { prompt: "on the fence. It...", choices: [{ text: "was watching", isCorrect: true }, { text: "watched", isCorrect: false }] },
            { prompt: "me. While I looked at the cat, my parents...", choices: [{ text: "opened", isCorrect: false }, { text: "were opening", isCorrect: true }] },
            { prompt: "my door. It was just them checking on me.", choices: [] }
        ]
    },
    {
        title: "故事二：中断的电影",
        description: "一个关于在看电影时发生的事情的故事。",
        storyData: [
            { prompt: "Yesterday evening, I...", choices: [{ text: "watched", isCorrect: false }, { text: "was watching", isCorrect: true }] },
            { prompt: "a movie when the doorbell rang. My friends...", choices: [{ text: "were making", isCorrect: true }, { text: "made", isCorrect: false }] },
            { prompt: "popcorn in the kitchen. They didn't hear it. So I paused the movie. They...", choices: [{ text: "were laughing", isCorrect: true }, { text: "laughed", isCorrect: false }] },
            { prompt: "about something. I went to the door. Our neighbor...", choices: [{ text: "was standing", isCorrect: true }, { text: "stood", isCorrect: false }] },
            { prompt: "there with a package. It was a nice surprise. We...", choices: [{ text: "talked", isCorrect: false }, { text: "were talking", isCorrect: true }] },
            { prompt: "for a minute before I returned to my movie.", choices: [] }
        ]
    },
    {
        title: "故事三：安静的图书馆",
        description: "描述在图书馆学习时的情景。",
        storyData: [
            { prompt: "At the library yesterday, I was trying to concentrate. The person next to me...", choices: [{ text: "was tapping", isCorrect: true }, { text: "tapped", isCorrect: false }] },
            { prompt: "his pen constantly. He wasn't reading his book; he...", choices: [{ text: "stared", isCorrect: false }, { text: "was staring", isCorrect: true }] },
            { prompt: "out the window. Across the room, two students...", choices: [{ text: "whispered", isCorrect: false }, { text: "were whispering", isCorrect: true }] },
            { prompt: "to each other. The librarian...", choices: [{ text: "was watching", isCorrect: true }, { text: "watched", isCorrect: false }] },
            { prompt: "them with a frown. It was clear nobody...", choices: [{ text: "was working", isCorrect: true }, { text: "worked", isCorrect: false }] },
            { prompt: "very hard. So I packed my things and left.", choices: [] }
        ]
    },
    {
        title: "故事四：公园漫步",
        description: "一个关于在公园里散步的下午的故事。",
        storyData: [
            { prompt: "It was a beautiful afternoon. I was walking in the park. The sun...", choices: [{ text: "shone", isCorrect: false }, { text: "was shining", isCorrect: true }] },
            { prompt: "and many children...", choices: [{ text: "played", isCorrect: false }, { text: "were playing", isCorrect: true }] },
            { prompt: "on the grass. A man...", choices: [{ text: "sold", isCorrect: false }, { text: "was selling", isCorrect: true }] },
            { prompt: "ice cream from a cart. As I...", choices: [{ text: "was passing", isCorrect: true }, { text: "passed", isCorrect: false }] },
            { prompt: "the lake, I saw some ducks. They...", choices: [{ text: "swam", isCorrect: false }, { text: "were swimming", isCorrect: true }] },
            { prompt: "peacefully. It was a perfect day.", choices: [] }
        ]
    },
    {
        title: "故事五：忙碌的早晨",
        description: "描述一个混乱而有趣的早晨。",
        storyData: [
            { prompt: "This morning was chaotic. While I was making breakfast, my brother...", choices: [{ text: "looked for", isCorrect: false }, { text: "was looking for", isCorrect: true }] },
            { prompt: "his keys. My sister...", choices: [{ text: "was talking", isCorrect: true }, { text: "talked", isCorrect: false }] },
            { prompt: "on the phone loudly. The TV...", choices: [{ text: "was playing", isCorrect: true }, { text: "played", isCorrect: false }] },
            { prompt: "the morning news. My dog...", choices: [{ text: "barked", isCorrect: false }, { text: "was barking", isCorrect: true }] },
            { prompt: "at the mailman. In the middle of all this, I realized I...", choices: [{ text: "was wearing", isCorrect: true }, { text: "wore", isCorrect: false }] },
            { prompt: "two different socks. What a morning!", choices: [] }
        ]
    }
];

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

export interface FutureTenseStory {
    title: string;
    description: string;
    storyData: StoryStep[];
}

export const futureTenseStories: FutureTenseStory[] = [
    {
        title: "故事一：周末计划",
        description: "一个关于周末计划的故事。",
        storyData: [
            { prompt: "This weekend is going to be busy. On Saturday, my family and I...", choices: [{ text: "are going to visit", isCorrect: true }, { text: "will visit", isCorrect: false }] },
            { prompt: "my grandparents. My mom has a plan, she...", choices: [{ text: "is going to bake", isCorrect: true }, { text: "will bake", isCorrect: false }] },
            { prompt: "a cake for them. I think they...", choices: [{ text: "are going to love", isCorrect: false }, { text: "will love", isCorrect: true }] },
            { prompt: "it. On Sunday, my friends and I have tickets, so we...", choices: [{ text: "are going to see", isCorrect: true }, { text: "will see", isCorrect: false }] },
            { prompt: "a new movie. The phone is ringing! I...", choices: [{ text: "am going to get", isCorrect: false }, { text: "will get", isCorrect: true }] },
            { prompt: "it. I am sure it will be a great weekend.", choices: [] }
        ]
    },
    {
        title: "故事二：新的学年",
        description: "关于对新学年的希望和计划。",
        storyData: [
            { prompt: "Tomorrow is the first day of school. I've already picked my clothes. I...", choices: [{ text: "am going to wear", isCorrect: true }, { text: "will wear", isCorrect: false }] },
            { prompt: "my new backpack. I hope my new teacher...", choices: [{ text: "is going to be", isCorrect: false }, { text: "will be", isCorrect: true }] },
            { prompt: "nice. This year, I have a plan. I...", choices: [{ text: "am going to study", isCorrect: true }, { text: "will study", isCorrect: false }] },
            { prompt: "harder in math. I promise myself that I...", choices: [{ text: "am going to do", isCorrect: false }, { text: "will do", isCorrect: true }] },
            { prompt: "my homework every day. Look at the time! The bus schedule says it...", choices: [{ text: "is going to be", isCorrect: true }, { text: "will be", isCorrect: false }] },
            { prompt: "here soon. I need to go!", choices: [] }
        ]
    },
    {
        title: "故事三：在餐厅",
        description: "一个关于在餐厅点餐和意外事件的故事。",
        storyData: [
            { prompt: "My friend and I are at a restaurant. We have already decided what to eat. I...", choices: [{ text: "am going to have", isCorrect: true }, { text: "will have", isCorrect: false }] },
            { prompt: "the pasta. My friend...", choices: [{ text: "is going to order", isCorrect: true }, { text: "will order", isCorrect: false }] },
            { prompt: "the pizza. Oh no, I just dropped my fork. Don't worry, I...", choices: [{ text: "am going to get", isCorrect: false }, { text: "will get", isCorrect: true }] },
            { prompt: "a new one from the waiter. The waiter says the food...", choices: [{ text: "is going to be", isCorrect: false }, { text: "will be", isCorrect: true }] },
            { prompt: "delicious. After dinner, our plan is that we...", choices: [{ text: "are going to watch", isCorrect: true }, { text: "will watch", isCorrect: false }] },
            { prompt: "a movie. It's all planned!", choices: [] }
        ]
    },
    {
        title: "故事四：假期计划",
        description: "关于家庭海滩度假的计划和准备。",
        storyData: [
            { prompt: "Next month, my family and I have a big plan. We...", choices: [{ text: "are going to travel", isCorrect: true }, { text: "will travel", isCorrect: false }] },
            { prompt: "to the beach. We have already booked our hotel. We...", choices: [{ text: "are going to stay", isCorrect: true }, { text: "will stay", isCorrect: false }] },
            { prompt: "for a week. I'm sure my sister...", choices: [{ text: "is going to love", isCorrect: false }, { text: "will love", isCorrect: true }] },
            { prompt: "the ocean. Our neighbor is so kind. He said, 'I...", choices: [{ text: "am going to water", isCorrect: false }, { text: "will water", isCorrect: true }] },
            { prompt: "your plants for you.' The weather forecast says it...", choices: [{ text: "is going to be", isCorrect: true }, { text: "will be", isCorrect: false }] },
            { prompt: "sunny all week. It should be a perfect trip.", choices: [] }
        ]
    },
    {
        title: "故事五：一个新项目",
        description: "在工作中计划一个新项目。",
        storyData: [
            { prompt: "At work today, my boss announced a new project. Our team...", choices: [{ text: "is going to design", isCorrect: true }, { text: "will design", isCorrect: false }] },
            { prompt: "a new app. The deadline is next month, so I predict we...", choices: [{ text: "are going to be", isCorrect: false }, { text: "will be", isCorrect: true }] },
            { prompt: "very busy. My colleague is worried. I told her, 'Don't worry, I...", choices: [{ text: "am going to help", isCorrect: false }, { text: "will help", isCorrect: true }] },
            { prompt: "you if you need it.' For the first step, we...", choices: [{ text: "are going to have", isCorrect: true }, { text: "will have", isCorrect: false }] },
            { prompt: "a brainstorming meeting tomorrow morning. The email says they...", choices: [{ text: "are going to provide", isCorrect: true }, { text: "will provide", isCorrect: false }] },
            { prompt: "free coffee. I'm looking forward to it.", choices: [] }
        ]
    }
];

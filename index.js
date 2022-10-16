#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants to Be A JavaScript Millionaire? \n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a proccess on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...

    `)
}

await welcome();

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        },
    });
    playerName = answers.player_name;
}

// await welcome();
await askName();

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'JavaScript was created in 10 days the releasled on\n',
        choices: [
            'May 23rd, 1995',
            'Nov 23th, 1995',
            'Dec 4th, 1995',
            'Dec 17th, 1996'
        ],
    });

    return handleAnswer(answers.question_1 == 'Dec 4th, 1995')
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();
    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}.` });
    } else {
        spinner.error({text: `💀💀💀 Game over, you lose ${playerName}`});
        process.exit(1)
    }
}
// await welcome();
// await askName();
await question1();

async function winner() {
    console.clear();
    const msg = `Congrats, ${playerName} !\n $1 , 0 0 0 , 0 0 0`;

    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data))
    })
}
await winner()